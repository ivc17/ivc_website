import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import matcapURL from 'assets/img/matcap8.png'
import { Mesh, Scene, TextureLoader, Vector3 } from 'three'
import { CameraWorkMovement } from 'components/CameraWork'
import {
  initCameraPosition,
  cameraPositions,
  cameraPositionsXs
} from 'constants/index'

const maxWidth = 2000
const minWidth = 300
const maxScale = 1400
const minScale = 1050

const defaultPosition = new Vector3(0, 15, 30)

const unitScale = (maxScale - minScale) / (maxWidth - minWidth)

export default function Chrometype({
  pathname,
  cameraTarget,
  isDownMd,
  setLoaderProgress
}: {
  pathname: string
  cameraTarget: Vector3
  isDownMd?: boolean
  setLoaderProgress: (current: number, total: number) => void
}) {
  const { nodes } = useGLTF(
    '/models/ivc17-3.glb',
    true,
    undefined,
    (loader) => {
      if (loader.manager) {
        loader.manager.onProgress = (progress, current, total) => {
          setLoaderProgress(current, total)
        }
      }
    }
  ) as any
  const mesh = useRef<Mesh>(null)
  const scene = useRef<Scene>(null)
  const [nextScale, setNextScale] = useState(maxScale)
  const [nextPosition, setNextPosition] = useState(defaultPosition)

  // const light = useRef<any>()
  // const light2 = useRef<any>()
  // const light3 = useRef<any>()

  // const vec = useRef(new Vector3())
  // const pos = useRef(new Vector3())

  const { camera } = useThree()
  const matcapTexture = useLoader(TextureLoader, matcapURL)

  const resize = useCallback(() => {
    let scale = maxScale
    if (window.innerWidth >= maxWidth) {
      scale = maxScale
    } else if (window.innerWidth <= minWidth) {
      scale = minScale
    } else {
      scale = minScale + unitScale * (window.innerWidth - minWidth)
    }
    return scale
  }, [])

  useFrame(({ clock, mouse }) => {
    // light.current.lookAt(mesh.current?.position)
    // light2.current.lookAt(mesh.current?.position)
    // light3.current.lookAt(mesh.current?.position)
    if (pathname === '/') {
      mesh.current?.rotation.set(
        mesh.current.rotation.x + Math.sin(clock.elapsedTime) / 500,
        mesh.current.rotation.y + Math.cos(clock.elapsedTime) / 700,
        0
      )

      // mesh.current?.rotation.set(
      //   (mesh.current?.rotation + Math.sin(clock.elapsedTime) / 10),
      //   (mesh.current?.rotation + Math.cos(clock.elapsedTime) / 7,
      //     0
      //   )
      if (mesh.current) {
        mesh.current.visible = true
      }
    } else {
      if (mesh.current) {
        mesh.current.visible = false
      }
    }

    // mesh.current?.lookAt(camera.position)
    mesh.current?.scale.lerp(new Vector3(nextScale, nextScale, nextScale), 0.05)
    mesh.current?.position.lerp(nextPosition, 0.1)
  })

  useEffect(() => {
    if (mesh.current) {
      mesh.current.geometry.center()
    }

    // const resizeListener = debounce(() => {
    //   setNextScale(resize())
    // }, 500)

    setNextScale(resize())
    // setNextScale(resize())
    // window.addEventListener('resize', resizeListener)
    // return () => {
    //   window.removeEventListener('resize', resizeListener)
    // }
  }, [resize])

  useEffect(() => {
    if (pathname === '/' && mesh.current) {
      mesh.current.rotation.set(0, 0, 0)
      setNextScale(resize())
      setNextPosition(defaultPosition)
    } else {
      const cp = isDownMd ? cameraPositionsXs : cameraPositions
      setNextScale(minScale)
      const nextCameraPosition = cp[pathname] ?? initCameraPosition
      setNextPosition(nextCameraPosition)
    }
  }, [camera, cameraTarget, isDownMd, pathname, resize])

  return (
    <Suspense fallback={null}>
      <CameraWorkMovement disable={pathname !== '/'} divider={20}>
        <group ref={scene}>
          {/* <spotLight
            ref={light}
            color="#ffffff"
            intensity={0.1}
            position={[0, 50, 1000]}
            distance={2000}
            decay={0}
          /> */}
          {/* <spotLight
            ref={light2}
            color="red"
            intensity={10}
            position={[-30, 0, 30]}
            distance={500}
            decay={0}
          />
          <spotLight
            ref={light3}
            color="green"
            intensity={10}
            position={[30, 0, 30]}
            distance={50}
            decay={0}
          /> */}
          <mesh
            ref={mesh}
            scale={maxScale}
            geometry={nodes.Curve005.geometry}
            castShadow
            receiveShadow
            position={[1, 0, -30]}
          >
            <meshMatcapMaterial matcap={matcapTexture} />
          </mesh>
        </group>
      </CameraWorkMovement>
    </Suspense>
  )
}
