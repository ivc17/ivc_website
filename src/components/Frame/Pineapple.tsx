import { Suspense, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { WaveMaterial } from './WaveMesh'

export default function Pineapple() {
  const { nodes } = useGLTF('/models/pineapple.gltf') as any
  const mesh = useRef<any>()
  const maerial = useRef<any>()
  useFrame(() => {
    if (!mesh.current) return
    mesh.current.rotation.x = Math.PI / 2
    mesh.current.rotation.z += 0.005
    maerial.current.rotation.y += 0.005
  })
  return (
    <Suspense fallback={null}>
      <group>
        <mesh
          ref={mesh}
          scale={0.5}
          geometry={nodes.pineapple.geometry}
          castShadow
          receiveShadow
          position={[0, 5, -1]}
        >
          <WaveMaterial />
          <meshPhysicalMaterial
            // reflectivity={1}
            // roughness={0.4}
            // transmission={1}
            // thickness={1}
            {...{
              transmission: 0.7,
              roughness: 0.5,
              reflectivity: 1,
              thickness: 0.6,
              attenuationTint: '#00dd00',
              envMapIntensity: 0.2,
              clearcoat: 0.5,
              attenuationDistance: 0.15,
              ior: 1.7
            }}
          />
        </mesh>
        <mesh position={[-0.1, 6, -1]} ref={maerial}>
          <WaveMaterial />
          <boxGeometry args={[0.7, 6, 0.7]} />
        </mesh>
        <Mesh
          material={<WaveMaterial />}
          position={[-0.3, 1, -1]}
          args={[3, 3, 3]}
        />
        <mesh
          position={[0, -3, 0]}
          rotation-x={-Math.PI / 2}
          receiveShadow
          renderOrder={100000}
        >
          <planeBufferGeometry args={[40, 40, 1]} />
          <shadowMaterial color="#000000" transparent opacity={0.3} />
          {/* <ShaderMaterial fragmentShader={noiseShader} /> */}
        </mesh>
      </group>
    </Suspense>
  )
}
useGLTF.preload('/models/pineapple.gltf')

function Mesh({
  material,
  args,
  ...props
}: any & { material: JSX.Element; args?: number[] }) {
  const mesh = useRef<any>()
  useFrame(() => {
    if (!mesh.current) return
    mesh.current.rotation.x = 0.01
    mesh.current.rotation.y += 0.01
    mesh.current.rotation.z = 45
  })

  return (
    <mesh {...props} ref={mesh}>
      {material}
      <boxGeometry args={args ?? [5, 5, 5]} />
    </mesh>
  )
}
