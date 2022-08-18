import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { useFrame, useThree } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Mesh, MeshBasicMaterial, PlaneGeometry, Scene } from 'three'

const fontFile = require('assets/font/Orbitron-Black.fnt')
const fontAtlas = require('assets/font/Orbitron-Black.png')

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

export default function Skybox() {
  const [textGeometry, setTextGeometry] = useState<TextGeometry | null>(null)

  const boxSceneRef = useRef<any>()
  const renderFn = useRef<() => void>()
  const { scene, gl, camera } = useThree()
  console.log(camera)

  useFrame(() => {
    // const canvas = document.getElementById('testCanvas') as HTMLCanvasElement

    renderFn.current && renderFn.current()
  })

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
    if (!textGeometry) return
    const width = 100
    const height = 100 / (camera as any).aspect

    const text = new THREE.Mesh(
      textGeometry,
      new MeshBasicMaterial({ color: '#000000' })
    )

    text.position.set(width / 2, 40, -100)
    text.rotateY(-Math.PI / 2)
    text.scale.set(0.1, 0.1, 0)
    scene.add(text)

    console.log(text)
  }, [camera, scene, textGeometry])

  useEffect(() => {
    const box = scene.children.find(
      ({ uuid }) => uuid && uuid === boxSceneRef.current
    )
    if (box) {
      scene.remove(box)
    }

    const boxScene = new Scene()
    boxSceneRef.current = boxScene.uuid

    const width = 100
    const height = 100 / (camera as any).aspect
    const halfHeight = height / 2
    const planeGeo = new THREE.PlaneGeometry(width, height)
    const planeVer = new THREE.PlaneGeometry(height, height)

    const standard = new THREE.Mesh(
      planeGeo,
      new THREE.MeshPhongMaterial({ color: 0xff584f })
    )
    standard.position.y = 0
    standard.rotateX(-Math.PI / 2)
    boxScene.add(standard)

    const planeTop = new THREE.Mesh(
      planeGeo,
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    )
    planeTop.position.y = halfHeight
    planeTop.position.z = -halfHeight
    planeTop.rotateX(Math.PI / 2)
    boxScene.add(planeTop)

    const planeBottom = new THREE.Mesh(
      planeGeo,
      new THREE.MeshPhongMaterial({ color: 0xf01fff })
    )
    planeBottom.position.y = -halfHeight
    planeBottom.position.z = -halfHeight
    planeBottom.rotateX(-Math.PI / 2)
    boxScene.add(planeBottom)

    const planeBack = new THREE.Mesh(
      planeGeo,
      new THREE.MeshPhongMaterial({ color: 0x7f7fff })
    )
    planeBack.position.z = -height
    planeBack.position.y = 0
    planeBack.position.x = 0
    boxScene.add(planeBack)

    // const planeRight = new THREE.Mesh(
    //   planeVer,
    //   new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    // )
    // planeRight.position.x = width / 2
    // planeRight.position.y = 0
    // planeRight.position.z = -halfHeight
    // planeRight.rotateY(-Math.PI / 2)
    // boxScene.add(planeRight)

    const planeLeft = new THREE.Mesh(
      planeVer,
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    )
    planeLeft.position.x = -width / 2
    planeLeft.position.y = 0
    planeLeft.position.z = -halfHeight
    planeLeft.rotateY(Math.PI / 2)
    boxScene.add(planeLeft)

    scene.add(boxScene)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, scene, (camera as any).aspect])

  return <></>
}
