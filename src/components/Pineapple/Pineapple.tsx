import { Suspense, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { WaveMaterial } from './WaveMesh'
import { Vector3 } from 'three'

export default function Pineapple() {
  const { nodes } = useGLTF('/models/pineapple.gltf') as any
  const mesh = useRef<any>()
  const maerial = useRef<any>()
  const group = useRef<any>()
  const vec = useRef(new Vector3())
  const pos = useRef(new Vector3())

  const { camera } = useThree()

  useFrame(() => {
    if (!mesh.current) return
    mesh.current.rotation.x = Math.PI / 2
    mesh.current.rotation.z += 0.005
    maerial.current.rotation.y += 0.005

    vec.current.set(
      -1 - 0.3,
      1 - 0.3,
      // -(1 - 1000 / window.innerWidth),
      // 1 - 1000 / window.innerHeight,
      1000
    )
    vec.current.unproject(camera)
    vec.current.sub(camera.position).normalize()
    var distance = (-20 - camera.position.z) / vec.current.z
    pos.current
      .copy(camera.position)
      .add(vec.current.multiplyScalar(distance > 32 ? 32 : distance))
    // group.current.position.set(pos.current)
    // if (mesh.current) {
    //   var scaleVector = new Vector3()
    //   var scaleFactor = 10
    //   var scale =
    //     scaleVector
    //       .subVectors(mesh.current.position, camera.position)
    //       .length() / scaleFactor
    //   mesh.current.scale.set(scale, scale, 1)
    // }
  })

  return (
    <Suspense fallback={null}>
      <scene ref={group} position={[0, -800, -2500]} scale={80}>
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
              transmission: 0.5,
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
      </scene>
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
