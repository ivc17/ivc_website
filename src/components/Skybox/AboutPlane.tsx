import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import shaders from 'shaders/textMaterialShader'
import { useFrame, useThree } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Mesh, MeshBasicMaterial, Texture, WebGLRenderer } from 'three'
import { SetPlane } from 'context/SkyboxContext'
import { setPlaneProps } from '.'

const fontLoader = new FontLoader()

const textContent = `Expert knowledge of HTML/CSS/JavaScript/Browser
Familiar with one of React/Vue/Svelte frameworks.
Experience in accessibility, usability, and scalability
Knowledge of web performance-optimizing
Expert knowledge of HTML/CSS/JavaScript/Browser/NodeJS.
Master in Code testability, readability, maintainability, 
scalability, reusability, and modularization.
Master in web performance-optimizing.
Familiar with one of React/Vue/Svelte frameworks.
Familiar with unit/UI/integration testing.
Experience in building complete CI/CD.`

export default function AboutPlane({ setPlane }: { setPlane: SetPlane }) {
  const [textGeometry, setTextGeometry] = useState<TextGeometry | null>(null)
  const [renderer, setRenderer] = useState<null | WebGLRenderer>(null)
  const ref = useRef<Mesh>()
  const { scene, camera } = useThree()
  const renderFn = useRef<(elapsedTime: number) => void>()
  const texture = useRef<Texture>()

  useFrame(({ clock }) => {
    renderFn.current?.(clock.elapsedTime)
    if (ref.current && renderer) {
      // console.log(ref.current.material)
      texture.current = new THREE.CanvasTexture(renderer.domElement)
    }
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

  const material = useMemo(() => {
    if (!renderer) return

    return (
      <shaderMaterial
        vertexShader={shaders.vert}
        fragmentShader={shaders.frag}
        alphaToCoverage={true}
        uniforms={{
          uTime: { value: 0 },
          uTexture: { value: texture.current }
        }}
      />
    )
  }, [renderer])

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
    text.geometry.center()
    text.position.set(0, 0, -30)
    text.scale.set(0.8, 0.8, 0)
    rtScene.add(text)
    renderer.render(rtScene, rtCamera)
    renderFn.current = (elapsedTime: number) => {
      text.position.y += elapsedTime
      renderer.render(rtScene, rtCamera)
    }
    setRenderer(renderer)
  }, [camera, scene, textGeometry])

  useEffect(() => {
    if (ref.current) {
      setPlaneProps('left', ref.current, camera, setPlane)
    }
  }, [setPlane, camera])

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      {material}
    </mesh>
  )
}
