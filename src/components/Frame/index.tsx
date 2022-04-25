import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import noiseShader from '!raw-loader!../../shaders/noiseMaterial.frag'
import { Environment, OrbitControls } from '@react-three/drei'
import Pineapple from './Pineapple'

export default function Frame() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows camera={{ position: [0, 0, -100], fov: 22 }}>
        {/* <Effects /> */}

        <hemisphereLight intensity={0.2} />
        <ambientLight intensity={0.5} />
        {/* <Environment preset="warehouse" /> */}
        {/* <fog attach="fog" args={['#f0f0f0', 100, 150]} /> */}
        <color attach="background" args={['#ededed']} />
        <spotLight
          penumbra={1}
          angle={1}
          castShadow
          position={[10, 40, -3]}
          intensity={8}
          shadow-mapSize={[512, 512]}
        />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <Pineapple />
      </Canvas>
    </Suspense>
  )
}
