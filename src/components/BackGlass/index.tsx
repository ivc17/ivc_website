import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
// import normalUrl from 'assets/img/water_normal.jpg'
import { GlassMaterial } from './GlassMaterial'

export default function BackGlass({ isDownMd }: { isDownMd?: boolean }) {
  const ref = useRef<Mesh>()
  const light = useRef<any>()

  useFrame(({ clock }) => {
    // if (!light.current) return
    light.current.position.x = Math.sin(clock.elapsedTime * 7) * 300
    light.current.lookAt([0, 0, 0])
    // ref.current && (ref.current.rotation.x = -1)
  })

  // const normalMap = useLoader(TextureLoader, normalUrl)

  return (
    <group>
      <mesh ref={ref} position={[0, 0, 0]} receiveShadow>
        <spotLight
          ref={light}
          color="#ffffff"
          intensity={0.1}
          position={[0, 50, 1000]}
          distance={2000}
          decay={0}
        />
        <planeGeometry args={[200, 200]} />
        {/* <spotLight
          ref={light}
          color="green"
          intensity={10}
          position={[0, 0, 0]}
          distance={10000}
          decay={0}
        /> */}
        {/* <meshBasicMaterial color="#00a2ff" /> */}
        {/* <meshPhongMaterial color="#00a2ff" opacity={1} reflectivity={1} /> */}
        {/* <meshPhysicalMaterial
          // reflectivity={1}
          // roughness={0.4}
          // transmission={1}
          // thickness={1}
          {...{
            transmission: 0,
            roughness: 0.9,
            reflectivity: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            // thickness: 1,
            // attenuationTint: '#00dd00',
            // envMapIntensity: 1,
            // clearcoat: 0.5,
            // attenuationDistance: 0.15,
            // ior: 1.7,
            normalMap: normalMap,
            normalScale: new Vector2(1, 1),
            metalness: 0,
            color: '#ff0000'

            // map: matcapTexture,
            // clearcoatNormalScale: new Vector2(2.0, -2.0)
          }}
        /> */}
        {/* <WaveMaterial /> */}
        {/* <meshPhongMaterial
          normalMap={normalMap}
          color="red"
          normalScale={new Vector2(1, 1)}
        /> */}
        <GlassMaterial />
      </mesh>
    </group>
  )
}
