import Box from 'components/Box'
import { Canvas } from '@react-three/fiber'
// import Pineapple from 'components/Pineapple/Pineapple'
import Skybox from 'components/Skybox'
import { Suspense, useContext } from 'react'
import Chrometype from 'components/Chrometype/Chrometype'
import CameraWork from 'components/CameraWork'
import { useLocation } from 'react-router-dom'
import { defaultZoom, initCameraPosition } from 'constants/index'
import useSkybox from 'hooks/useSkybox'
import SkyboxCSSRender from './SkyboxCssRenderer'
import useBreakpoint from 'hooks/useBreakpoints'
import ContactPage from 'pages/Contact'
import AboutPage from 'pages/About'
import GalleryPage from 'pages/Gallery'
import SingleWork from 'pages/SingleWork'
// import Loader from 'components/Loader'
import React from 'react'
import { LoaderContext } from 'context/LoaderContext'
// import BackGlass from 'components/BackGlass'

export default function Home() {
  const location = useLocation()
  const {
    setPlane,
    leftPlane,
    topPlane,
    rightPlane,
    cameraTarget,
    cssScene,
    bottomPlane
  } = useSkybox()
  const { setLoaderProgress } = useContext(LoaderContext)
  const isDownMd = useBreakpoint('md')

  return (
    <>
      <GalleryPage />
      <AboutPage />
      <ContactPage />
      <SingleWork />
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
              {/* <Pineapple /> */}
              {/* <BackGlass /> */}
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
                bottomPlane={bottomPlane}
                isDownMd={isDownMd}
              />

              <Suspense fallback={null}>
                <Chrometype
                  isDownMd={isDownMd}
                  pathname={location.pathname}
                  cameraTarget={cameraTarget}
                  setLoaderProgress={setLoaderProgress}
                />
              </Suspense>

              <Skybox
                setPlane={setPlane}
                cssScene={cssScene}
                isDownMd={isDownMd}
              />
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
          // '&:after': {
          //   content: '""',
          //   width: '100%',
          //   height: '100%',
          //   background: '#00000020',

          // },
          '& .hidden': {
            opacity: 0
          }
        }}
      />
    </>
  )
}
