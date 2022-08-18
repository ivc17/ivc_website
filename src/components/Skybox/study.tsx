import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { useFrame, useThree } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'

const fontFile = require('assets/font/Orbitron-Black.fnt')
const fontAtlas = require('assets/font/Orbitron-Black.png')

const fontLoader = new FontLoader()

const textContent = `A render target in three.js is basicaly a texture you can render to. After you render to it you can use that texture like any other texture.

Let's make a simple example. We'll start with an example from the article on responsiveness.

Rendering to a render target is almost exactly the same as normal rendering. First we create a WebGLRenderTarget.`

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
        let text = new TextGeometry(textContent, {
          font: font,
          size: 16,
          height: 5
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
    var c = document.createElement('canvas')
    var ctx = c.getContext('2d')

    ctx!.font = '16px Arial'

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      alpha: true
    })

    console.log(ctx!.measureText(textContent))

    renderer.setSize(1000, 1000)

    renderer.setClearColor(0x2020ff, 0)

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
    rtScene.background = new THREE.Color('#ffffff') // changed color to visualize uv coords

    // Create text mesh with font geometry and material
    const text = new THREE.Mesh(
      textGeometry,
      new MeshBasicMaterial({ color: 'green' })
    )

    // document.getElementsByTagName('body')[0].appendChild(canvas)
    // Adjust dimensions
    text.position.set(2, -1, 0)
    text.rotation.set(Math.PI, 0, 0)
    text.scale.set(-0.005, 0.005, 0)
    // Add text mesh to buffer scene
    rtScene.add(text)
    // rtScene.add(
    //   new THREE.Mesh(
    //     new BoxGeometry(3, 3, 3),
    //     new MeshBasicMaterial({ color: 'green' })
    //   )
    // )

    const sceneT = new THREE.Scene()
    sceneT.background = new THREE.Color('#20ffff')

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 }) // greenish blue
    const cube = new THREE.Mesh(geometry, material)
    // cube.position.x = 0
    // cube.position.y = 0
    // cube.position.z = 0
    sceneT.add(cube)

    const box = new THREE.Mesh(new PlaneGeometry(105, 105))
    setBoxMesh(box)
    box.position.x = 0
    box.position.y = 0
    box.position.z = -100
    box.rotation.set(Math.PI, 0, 0)

    renderFn.current = () => {
      renderer.render(rtScene, rtCamera)
      box.material = new THREE.MeshBasicMaterial({
        map: (textTexture.current = new THREE.CanvasTexture(
          renderer.domElement
        ))
      })
      cube.rotation.x = cube.rotation.x++
      cube.rotation.y = cube.rotation.x++
    }

    // scene.add(text)

    if (renderer === null) return

    scene.add(box)
  }, [scene, textGeometry])

  return <></>
}
