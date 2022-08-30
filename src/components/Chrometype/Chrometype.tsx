import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import matcapURL from 'assets/img/matcap8.png'
import { Mesh, TextureLoader, Vector3 } from 'three'
import { CameraWorkMovement } from 'components/CameraWork'
import { initCameraPosition, cameraPositions } from 'constants/index'

const maxWidth = 2440
const minWidth = 300
const maxScale = 300
const minScale = 40

const defaultPosition = new Vector3(1, 0, -30)

const unitScale = (maxScale - minScale) / (maxWidth - minWidth)

export default function Chrometype({
  pathname,
  cameraTarget
}: {
  pathname: string
  cameraTarget: Vector3
}) {
  const { nodes } = useGLTF('/models/ivc17-3.glb') as any
  const mesh = useRef<Mesh>(null)
  const [nextScale, setNextScale] = useState(maxScale)
  const [nextPosition, setNextPosition] = useState(defaultPosition)

  // const light = useRef<any>()
  // const light2 = useRef<any>()
  // const light3 = useRef<any>()

  const vec = useRef(
    new Vector3(500 / window.innerWidth, 500 / window.innerHeight, 0.1)
  )
  const pos = useRef(new Vector3())

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
    // light.current.lookAt(0, -5, -30)
    // light2.current.lookAt(0, -5, -30)
    // light3.current.lookAt(-5, -5, -30)
    if (pathname === '/') {
      mesh.current?.rotation.set(
        (Math.sin(1000 + clock.elapsedTime) * Math.PI) / 5000,
        (Math.cos(1000 + clock.elapsedTime) * Math.PI) / 4000,
        0
      )
    } else {
      vec.current.set(
        (1 / window.innerWidth) * 2,
        (-1 / window.innerHeight) * 2,
        1
      )
      vec.current.unproject(camera)
      vec.current.sub(nextPosition).normalize()
      var distance = (-20 - camera.position.z) / vec.current.z
      pos.current.copy(nextPosition).add(vec.current.multiplyScalar(distance))
      // pos.current.z = -40

      // camera.quaternion.copy(rotation)
    }

    // mesh.current.rotation.x +=
    mesh.current?.lookAt(camera.position)
    mesh.current?.scale.lerp(new Vector3(nextScale, nextScale, nextScale), 0.05)
    mesh.current?.position.lerp(
      pathname === '/' ? nextPosition : pos.current,
      pathname === '/' ? 0.1 : 1
    )
  })

  useEffect(() => {
    if (mesh.current) {
      mesh.current.geometry.center()
      mesh.current.rotation.x = -0.3
    }

    resize()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [resize])

  useEffect(() => {
    if (pathname === '/' && mesh.current) {
      mesh.current.rotation.set(0, 0, 0)
      setNextScale(resize())
      setNextPosition(defaultPosition)
    } else {
      setNextScale(minScale)
      const nextCameraPosition = cameraPositions[pathname] ?? initCameraPosition

      setNextPosition(nextCameraPosition)
    }
  }, [camera, cameraTarget, pathname, resize])

  return (
    <Suspense fallback={null}>
      <CameraWorkMovement>
        <group>
          {/* <spotLight
          ref={light}
          color="blue"
          intensity={10}
          position={[0, 0, 20]}
          distance={50}
        />
        <spotLight
          ref={light2}
          color="red"
          intensity={0}
          position={[-30, 0, 0]}
          distance={50}
        />
        <spotLight
          ref={light3}
          color="green"
          intensity={10}
          position={[30, 0, 0]}
          distance={50}
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
