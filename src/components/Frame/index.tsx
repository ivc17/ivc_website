import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { arrayBuffer } from 'stream/consumers'
import { WaveMaterial } from './GlassMesh'

export default function Frame() {
  return (
    <Suspense fallback={null}>
      <Canvas>
        {/* <Effects /> */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh position={[0, 0, 0]}>
          <bufferGeometry>
            <bufferAttribute></bufferAttribute>
          </bufferGeometry>
          <meshBasicMaterial attach="material" color="red" />
        </mesh>
        <Mesh
          material={
            <meshPhysicalMaterial
              reflectivity={1}
              roughness={0.4}
              transmission={1}
              thickness={1}
            />
          }
          position={[0, 0, 0]}
        />
        <Mesh material={<WaveMaterial />} position={[0, 0, -5]} />
      </Canvas>
    </Suspense>
  )
}

function Mesh({ material, ...props }: any & { material: JSX.Element }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>()
  // Set up state for the hovered and active state

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (!mesh.current) return
    // mesh.current.rotation.x += 0.01
  })

  return (
    <mesh {...props} ref={mesh}>
      {material}
      <boxGeometry args={[5, 5, 3]} />
      {/* <WaveMaterial /> */}
      {/* <meshStandardMaterial color={'hotpink'} /> */}
    </mesh>
  )
}
