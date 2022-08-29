import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import shaders from 'shaders/textMaterialShader'
import { useThree } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Mesh, MeshBasicMaterial, WebGLRenderer } from 'three'
import { setPlaneProps } from '.'
import { SetPlane } from 'context/SkyboxContext'

const fontLoader = new FontLoader()

const textContent = `在3D的環境中可以把它當成視角, 我們可以給它定位、關注點, 也可以搭配相機的位置角度來達到畫面移動的效果, 在一般的情況下相機使用非常容易，我們只需要給他合理的定位以及目標即可。

我們有以下幾種預設相機可供選擇

PerspectiveCamera
OrthographicCamera
StereoCamera
CubeCamera
一般情況中我們最常用的即是視野相機PerspectiveCamera
相機都包含以下幾個屬性

position 相機的位置
up 相機的頂點
lookAt 相機的關注目標`

export default function ContactPlane({ setPlane }: { setPlane: SetPlane }) {
  const [textGeometry, setTextGeometry] = useState<TextGeometry | null>(null)
  const [renderer, setRenderer] = useState<null | WebGLRenderer>(null)
  const ref = useRef<Mesh>()
  const { scene, camera } = useThree()

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
          uTexture: { value: new THREE.CanvasTexture(renderer.domElement) }
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

    text.position.set(-350, 300, -20)
    text.scale.set(0.8, 0.8, 0)
    rtScene.add(text)
    renderer.render(rtScene, rtCamera)
    setRenderer(renderer)
  }, [camera, scene, textGeometry])

  useEffect(() => {
    if (ref.current) {
      setPlaneProps('right', ref.current, camera, setPlane)
    }
  }, [setPlane, camera])

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      {material}
    </mesh>
  )
}
