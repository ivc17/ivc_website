import { Suspense, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import matcapURL from 'assets/img/matcap8.png'
import { TextureLoader } from 'three'
import { CameraWorkMovement } from 'components/CameraWork'

const maxWidth = 2440
const minWidth = 300
const maxScale = 300
const minScale = 40

const unitScale = (maxScale - minScale) / (maxWidth - minWidth)

export default function Chrometype({ pathname }: { pathname: string }) {
  const { nodes } = useGLTF('/models/ivc17-3.glb') as any
  const mesh = useRef<any>()
  // const light = useRef<any>()
  // const light2 = useRef<any>()
  // const light3 = useRef<any>()

  const { camera } = useThree()
  const matcapTexture = useLoader(TextureLoader, matcapURL)

  useFrame(({ clock }) => {
    // light.current.lookAt(0, -5, -30)
    // light2.current.lookAt(0, -5, -30)
    // light3.current.lookAt(-5, -5, -30)
    mesh.current.rotation.y +=
      (Math.cos(1000 + clock.elapsedTime) * Math.PI) / 4000
    mesh.current.rotation.x +=
      (Math.sin(1000 + clock.elapsedTime) * Math.PI) / 5000
  })

  useEffect(() => {
    mesh.current.geometry.center()
    mesh.current.rotation.x = -0.3
    // mesh.current.position = -20
    const resize = () => {
      let scale = maxScale
      if (window.innerWidth >= maxWidth) {
        scale = maxScale
      } else if (window.innerWidth <= minWidth) {
        scale = minScale
      } else {
        scale = minScale + unitScale * (window.innerWidth - minWidth)
      }

      mesh.current.scale.x = scale
      mesh.current.scale.y = scale
      mesh.current.scale.z = scale
    }
    resize()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    // if (pathname === '/') {
    //   mesh.current.position.set(1, 0, -30)
    // } else {
    //   camera.position.copy(mesh.current.position)
    //   if (mesh.current) {
    //     mesh.current.scale.set(minScale, minScale, minScale)
    //   }
    // }
  }, [camera.position, pathname])

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
            {/* <meshStandardMaterial roughness={0} metalness={0.1} /> */}
            <meshMatcapMaterial matcap={matcapTexture} />
          </mesh>
        </group>
      </CameraWorkMovement>
    </Suspense>
  )
}
