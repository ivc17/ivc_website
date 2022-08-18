import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { Canvas, render, useFrame, useThree } from '@react-three/fiber'
import Pineapple from 'components/Frame/Pineapple'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  WebGLRenderer
} from 'three'

const fontFile = require('assets/font/Orbitron-Black.fnt')
const fontAtlas = require('assets/font/Orbitron-Black.png')

const fontLoader = new FontLoader()

export default function Skybox() {
  const [textGeometry, setTextGeometry] = useState<TextGeometry | null>(null)

  const [boxMesh, setBoxMesh] = useState<Mesh | null>(null)

  const textTexture = useRef<any>()
  const renderFn = useRef<() => void>()
  const { scene } = useThree()

  useFrame(() => {
    // const canvas = document.getElementById('testCanvas') as HTMLCanvasElement

    renderFn.current && renderFn.current()
  })

  useEffect(() => {
    fontLoader.load(
      './fonts/helvetiker_regular.typeface.json',
      function (font) {
        let text = new TextGeometry('Hello three.js!', {
          font: font,
          size: 80
          // height: 5,
          // curveSegments: 12,
          // bevelEnabled: true,
          // bevelThickness: 10,
          // bevelSize: 8,
          // bevelOffset: 0,
          // bevelSegments: 5
        })
        setTextGeometry(text)
      }
    )
  }, [])

  useEffect(() => {
    if (!textGeometry) return
    var canvas = document.createElement('canvas')
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      alpha: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight / 3)

    renderer.setClearColor(0x20ffff, 0)

    // const rt = new THREE.WebGLRenderTarget(
    //   window.innerWidth,
    //   window.innerHeight / 3
    // )

    // renderer.setRenderTarget(rt)

    // var context = canvas.getContext('2d')
    // canvas.width = window.innerWidth
    // canvas.height = window.innerHeight

    // var margin = 10
    // const size = 30
    // var textWidth = context!.measureText(textContent).width

    // context!.strokeStyle = 'black'
    // context!.strokeRect(0, 0, canvas.width, canvas.height)

    // context!.strokeStyle = 'red'
    // context!.strokeRect(
    //   canvas.width / 2 - textWidth / 2 - margin / 2,
    //   canvas.height / 2 - size / 2 - +margin / 2,
    //   textWidth + margin,
    //   size + margin
    // )

    // context!.fillText(textContent, canvas.width / 2, canvas.height / 2)
    // var textWidth = context!.measureText(textContent).width

    // const rt = new THREE.WebGLRenderTarget(
    //   window.innerWidth,
    //   window.innerHeight
    // )

    // renderer.setRenderTarget(rt)

    // const rtCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    // rtCamera.position.z = 2.5

    const fov = 75
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 5
    const rtCamera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    rtCamera.position.z = 2

    const rtScene = new THREE.Scene()
    rtScene.background = new THREE.Color('#20ffff') // changed color to visualize uv coords

    // Create text mesh with font geometry and material
    const text = new THREE.Mesh(
      textGeometry,
      new MeshBasicMaterial({ color: 'green' })
    )

    // document.getElementsByTagName('body')[0].appendChild(canvas)
    // Adjust dimensions
    text.position.set(0, 0, 100)
    text.rotation.set(Math.PI, 0, 0)
    text.scale.set(-0.1, -0.1, 0)
    text.position.set(0, 0, 0)
    // Add text mesh to buffer scene
    rtScene.add(text)
    rtScene.add(
      new THREE.Mesh(
        new BoxGeometry(3, 3, 3),
        new MeshBasicMaterial({ color: 'green' })
      )
    )

    const sceneT = new THREE.Scene()
    sceneT.background = new THREE.Color('#20ffff')

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 }) // greenish blue
    const cube = new THREE.Mesh(geometry, material)
    // cube.position.x = 0
    // cube.position.y = 0
    // cube.position.z = 0
    sceneT.add(cube)

    const box = new THREE.Mesh(new BoxGeometry(100, 100, 100))
    setBoxMesh(box)

    renderFn.current = () => {
      renderer.render(sceneT, rtCamera)
      box.material = new THREE.MeshBasicMaterial({
        map: (textTexture.current = new THREE.CanvasTexture(
          renderer.domElement
        ))
      })
      cube.rotation.x = cube.rotation.x++
      cube.rotation.y = cube.rotation.x++
    }

    scene.add(text)

    if (renderer === null) return

    scene.add(box)
  }, [scene, textGeometry])

  return <></>
}
