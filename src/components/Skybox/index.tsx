import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Scene } from 'three'
import AboutPlane from './AboutPlane'
import GalleryPlane from './GalleryPlane'
import ContactPlane from './ContactPlane'
import TopPlane from './TopPlane'
import BottomPlane from './BottomPlane'

export default function Skybox({
  setPlane,
  cssScene
}: {
  setPlane: (
    direction: 'left' | 'right' | 'top' | 'bottom' | 'back',
    plane: Mesh | undefined
  ) => void
  cssScene: Scene
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
        <GalleryPlane setPlane={setPlane} cssScene={cssScene} />
        <AboutPlane setPlane={setPlane} cssScene={cssScene} />
        <ContactPlane setPlane={setPlane} cssScene={cssScene} />
        <TopPlane setPlane={setPlane} cssScene={cssScene} />
        <BottomPlane setPlane={setPlane} cssScene={cssScene} />
      </scene>
    </>
  )
}
