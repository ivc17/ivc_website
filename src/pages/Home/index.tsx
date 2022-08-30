import Box from 'components/Box'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Pineapple from 'components/Frame/Pineapple'
import Skybox from 'components/Skybox'
import { Suspense } from 'react'
import Chrometype from 'components/Chrometype/Chrometype'
import CameraWork from 'components/CameraWork'
import { useLocation } from 'react-router-dom'
import { initCameraPosition } from 'constants/index'
import useSkybox from 'hooks/useSkybox'
import AboutPlane from 'components/Skybox/AboutPlane'

export default function Home() {
  const location = useLocation()
  const { setPlane, leftPlane, backPlane, rightPlane, cameraTarget } =
    useSkybox()

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
              position: initCameraPosition,
              fov: 50,
              near: 1,
              far: 1000
            }}
          >
            {/* <hemisphereLight intensity={0.2} />
            <ambientLight intensity={0.1} /> 
            {/* <Pineapple /> */}
            {/* <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            /> */}
            <CameraWork
              pathname={location.pathname}
              aboutPlane={leftPlane}
              galleryPlane={backPlane}
              contactPlane={rightPlane}
              cameraTarget={cameraTarget}
            />

            <Chrometype
              pathname={location.pathname}
              cameraTarget={cameraTarget}
            />

            <Skybox setPlane={setPlane} />
          </Canvas>
        </Suspense>
      </Box>
    </Box>
  )
}
