import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Scene } from 'three'
import AboutPlane from './AboutPlane'
import BackPlane from './BackPlane'
import ContactPlane from './ContactPlane'
import TopPlane from './TopPlane'
import BottomPlane from './BottomPlane'

export default function Skybox({
  setPlane,
  cssScene,
  isDownMd
}: {
  setPlane: (
    direction: 'left' | 'right' | 'top' | 'bottom' | 'back',
    plane: Mesh | undefined
  ) => void
  cssScene: Scene
  isDownMd?: boolean
}) {
  const boxSceneRef = useRef<any>()

  useFrame(({ clock }) => {
    boxSceneRef.current.position.x +=
      (Math.cos(clock.elapsedTime) * Math.PI) / 1000
    boxSceneRef.current.position.y +=
      (Math.sin(clock.elapsedTime) * Math.PI) / 1000
  })

  return (
    <>
      <scene ref={boxSceneRef}>
        <BackPlane
          setPlane={setPlane}
          cssScene={cssScene}
          isDownMd={isDownMd}
        />
        <AboutPlane
          setPlane={setPlane}
          cssScene={cssScene}
          isDownMd={isDownMd}
        />
        <ContactPlane
          setPlane={setPlane}
          cssScene={cssScene}
          isDownMd={isDownMd}
        />
        <TopPlane setPlane={setPlane} cssScene={cssScene} isDownMd={isDownMd} />
        <BottomPlane
          setPlane={setPlane}
          cssScene={cssScene}
          isDownMd={isDownMd}
        />
      </scene>
    </>
  )
}
