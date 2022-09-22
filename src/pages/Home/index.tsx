import Box from 'components/Box'
import { Canvas } from '@react-three/fiber'
import Pineapple from 'components/Frame/Pineapple'
import Skybox from 'components/Skybox'
import { Suspense } from 'react'
import Chrometype from 'components/Chrometype/Chrometype'
import CameraWork from 'components/CameraWork'
import { useLocation } from 'react-router-dom'
import { defaultZoom, initCameraPosition } from 'constants/index'
import useSkybox from 'hooks/useSkybox'
import SkyboxCSSRender from './SkyboxCssRenderer'
import useBreakpoint from 'hooks/useBreakpoints'
import ContactPage from 'pages/Contact'

export default function Home() {
  const location = useLocation()
  const { setPlane, leftPlane, topPlane, rightPlane, cameraTarget, cssScene } =
    useSkybox()
  const isDownMd = useBreakpoint()

  return (
    <>
      <ContactPage />
      <Box>
        <Box position="fixed" top={'0'} left={'0'} width="100vw" height="100vh">
          <Suspense fallback={null}>
            <Canvas
              shadows
              camera={{
                position: initCameraPosition,
                fov: 50,
                near: 1,
                far: 3000,
                zoom: isDownMd ? defaultZoom.xs : defaultZoom.md
              }}
            >
              <SkyboxCSSRender scene={cssScene} />
              <hemisphereLight intensity={0.2} />
              <ambientLight intensity={0.1} />
              <Pineapple />
              {/* <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            /> */}
              <CameraWork
                pathname={location.pathname}
                aboutPlane={leftPlane}
                galleryPlane={topPlane}
                contactPlane={rightPlane}
                cameraTarget={cameraTarget}
                isDownMd={isDownMd}
              />

              <Chrometype
                pathname={location.pathname}
                cameraTarget={cameraTarget}
              />
              <Skybox setPlane={setPlane} cssScene={cssScene} />
            </Canvas>
          </Suspense>
        </Box>
      </Box>
      <Box
        id="wrapper"
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          zIndex: -1
        }}
        sx={{
          '& .hidden': {
            opacity: 0
          }
        }}
      />
    </>
  )
}
