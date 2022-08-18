import Box from 'components/Box'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Pineapple from 'components/Frame/Pineapple'
import Skybox from 'components/Skybox'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Box>
      <Box
        position="fixed"
        top={'0'}
        left={'0'}
        width="100vw"
        height="100vh"
        zIndex="-1"
        // sx={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <Canvas
            shadows
            camera={{
              position: [0, 0, -300],
              fov: 50,
              near: -500,
              far: 200
            }}
          >
            <hemisphereLight intensity={0.2} />
            <ambientLight intensity={0.1} />
            {/* <Pineapple /> */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
            <Skybox />
          </Canvas>
        </Suspense>
      </Box>
    </Box>
  )
}
