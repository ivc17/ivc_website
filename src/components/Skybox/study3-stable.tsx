import { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import shaders from 'shaders/textMaterialShader'

import { useFrame, useThree } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Camera, Mesh, MeshBasicMaterial, Scene, WebGLRenderer } from 'three'
import useSkybox from 'hooks/useSkybox'
import AboutPlane from './AboutPlane'
import { SetPlane } from 'context/SkyboxContext'
import GalleryPlane from './BackPlane'
import ContactPlane from './ContactPlane'

const fontLoader = new FontLoader()

const textContent = `At some stage of your graphics adventures you will want to draw text in OpenGL.
Contrary to what you may expect, getting a simple string to render on screen is
all but easy with a low-level API like OpenGL.
If you don't care about rendering more than 128 different same-sized characters,
then it's probably not too difficult.
Things are getting difficult as soon as each character has a different width, height,
and margin. Based on where you live, you may also need more than 128 characters, and
what if you want to express special symbols for like mathematical expressions or sheet music symbols,
and what about rendering text from top to bottom?
Once you think about all these complicated matters of text, it wouldn't surprise you
that this probably doesn't belong in a low-level API like OpenGL.

Since there is no support for text capabilities within OpenGL, it is up to us
to define a system for rendering text to the screen. There are no graphical primitives
for text characters, we have to get creative. Some example techniques are: drawing letter
 shapes via GL_LINES, create 3D meshes of letters, or render character textures to 2D quads
 in a 3D environment.

Most developers choose to render character textures onto quads. Rendering textured quads
by itself shouldn't be too difficult, but getting the relevant character(s) onto a texture
could prove challenging. In this chapter we'll explore several methods and implement a more
advanced, but flexible technique for rendering text using the FreeType library.

Classical text rendering: bitmap fonts
In the early days, rendering text involved selecting a font (or create one yourself) you'd
like for your application and extracting all relevant characters out of this font to place
them within a single large texture. Such a texture, that we call a bitmap font, contains all
 character symbols we want to use in predefined regions of the texture. These character
 symbols of the font are known as glyphs. Each glyph has a specific region of texture
 coordinates associated with them. Whenever you want to render a character, you select the
  corresponding glyph by rendering this section of the bitmap font to a 2D quad.`

export const setPlaneProps = (
  plane: 'left' | 'right' | 'top' | 'bottom' | 'back',
  mesh: Mesh,
  camera: Camera,
  setPlane: SetPlane
) => {
  const width = 100
  const aspect = (camera as any).aspect
  const height = 100 / aspect + (aspect > 0 ? 10 : 0)
  const halfHeight = height / 2
  mesh.geometry.center()
  setPlane(plane, mesh)

  switch (plane) {
    case 'left':
      mesh.rotateY(Math.PI / 2)
      mesh.position.set(-width / 2, 0, -height / 2)
      mesh.geometry.scale(height, height, 0)
      break
    case 'right':
      mesh.rotateY(-Math.PI / 2)
      mesh.position.set(width / 2, 0, -halfHeight)
      mesh.geometry.scale(height, height, 0)
      break
    case 'top':
      mesh.rotateX(Math.PI / 2)
      mesh.position.set(0, halfHeight, -halfHeight)
      mesh.geometry.scale(width, width, 0)
      break
    case 'back':
      mesh.position.set(0, 0, -height)
      mesh.geometry.scale(width, height, 0)
      break
    default:
      mesh.position.y = -halfHeight
      mesh.position.z = -halfHeight
      mesh.rotateX(-Math.PI / 2)
      mesh.geometry.scale(width, width, 0)
  }
}

export default function Skybox({
  setPlane,
  cssScene
}: {
  setPlane: (
    direction: 'left' | 'right' | 'top' | 'bottom' | 'back',
    plane: Mesh | undefined
  ) => void
  cssScene: Scene
}) {
  const [textGeometry, setTextGeometry] = useState<TextGeometry | null>(null)
  const [renderer, setRenderer] = useState<null | WebGLRenderer>(null)

  const boxSceneRef = useRef<any>()

  const { scene, camera } = useThree()

  useFrame(({ clock }) => {
    boxSceneRef.current.position.x +=
      (Math.cos(clock.elapsedTime) * Math.PI) / 1000
    boxSceneRef.current.position.y +=
      (Math.sin(clock.elapsedTime) * Math.PI) / 1000
  })

  //plane
  useEffect(() => {
    fontLoader.load(
      './fonts/helvetiker_regular.typeface.json',
      function (font) {
        let text = new TextGeometry(textContent, {
          font: font,
          size: 16,
          height: 5
        })
        setTextGeometry(text)
      }
    )
  }, [])

  useEffect(() => {
    if (!renderer) return

    const textMaterial = new THREE.ShaderMaterial({
      vertexShader: shaders.vert,
      fragmentShader: shaders.frag,
      alphaToCoverage: true,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: new THREE.CanvasTexture(renderer.domElement) }
      }
    })

    // for (let i = boxSceneRef.current.children.length - 1; i >= 0; i--) {
    //   const obj = boxSceneRef.current.children[i]
    //   boxSceneRef.current.remove(obj)
    // }

    const aspect = (camera as any).aspect

    const width = 100
    const height = 100 / aspect + (aspect > 0 ? 10 : 0)

    const halfHeight = height / 2
    const planeGeo = new THREE.PlaneGeometry(width, height)

    const planeTop = new THREE.Mesh(planeGeo, textMaterial)
    planeTop.position.y = halfHeight
    planeTop.position.z = -halfHeight
    planeTop.rotateX(Math.PI / 2)
    setPlane('top', planeTop)
    boxSceneRef.current.add(planeTop)

    const planeBottom = new THREE.Mesh(planeGeo, textMaterial)
    planeBottom.position.y = -halfHeight
    planeBottom.position.z = -halfHeight
    planeBottom.rotateX(-Math.PI / 2)
    setPlane('bottom', planeBottom)
    boxSceneRef.current.add(planeBottom)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, scene, (camera as any).aspect, renderer])

  useEffect(() => {
    if (!textGeometry) return
    var canvas = document.createElement('canvas')

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      alpha: true
    })

    renderer.setSize(1000, 1000)
    const rtScene = new THREE.Scene()
    rtScene.background = new THREE.Color('#ffffff') // changed color to visualize uv coords

    // const fov = 75
    // const aspect = 2 // the canvas default
    // const near = 0.1
    // const far = 5
    // const rtCamera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    // rtCamera.position.z = 3
    // const width = 10
    // const height = 100 / (camera as any).aspect

    const halfFrustumSize = 350
    const rtCamera = new THREE.OrthographicCamera(
      -halfFrustumSize,
      halfFrustumSize,
      halfFrustumSize,
      -halfFrustumSize
      // (0.5 * frustumSize * aspect) / -2,
      // (0.5 * frustumSize * aspect) / 2,
      // frustumSize / 2,
      // frustumSize / -2
      // 150,
      // 0.1
    )

    const cameraOrthoHelper = new THREE.CameraHelper(rtCamera)
    rtScene.add(cameraOrthoHelper)

    // Create text mesh with font geometry and material
    const text = new THREE.Mesh(
      textGeometry,
      new MeshBasicMaterial({ color: '#000000' })
    )

    text.position.set(-350, 300, -20)
    text.scale.set(0.8, 0.8, 0)
    rtScene.add(text)

    // renderFn.current = () => {
    renderer.render(rtScene, rtCamera)
    // if (leftPlaneRef.current) {
    //   leftPlaneRef.current.material = new THREE.MeshBasicMaterial({
    //     map: new THREE.CanvasTexture(renderer.domElement)
    //   })
    // }
    // backPlaneRef.current.material = new THREE.MeshBasicMaterial({
    //   map: new THREE.CanvasTexture(renderer.domElement)
    // })
    // topPlaneRef.current.material = new THREE.MeshBasicMaterial({
    //   map: new THREE.CanvasTexture(renderer.domElement)
    // })
    // bottomPlaneRef.current.material = new THREE.MeshBasicMaterial({
    //   map: new THREE.CanvasTexture(renderer.domElement)
    // })
    // }

    // renderFn.current()

    setRenderer(renderer)
  }, [camera, scene, setPlane, textGeometry])

  return (
    <>
      <scene ref={boxSceneRef}>
        <GalleryPlane setPlane={setPlane} cssScene={cssScene} />
        <AboutPlane setPlane={setPlane} cssScene={cssScene} />
        <ContactPlane setPlane={setPlane} cssScene={cssScene} />
      </scene>
    </>
  )
}
