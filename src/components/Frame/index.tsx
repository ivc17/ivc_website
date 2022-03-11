import { Canvas, useFrame } from '@react-three/fiber'
import Effects from 'components/Effects'
import { useRef } from 'react'

// @ts-ignore
declare module '!!raw-loader!*' {
  const content: string
  export default content
}

export default function Frame() {
  return (
    <Canvas>
      <Effects />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>()
  // Set up state for the hovered and active state

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (!mesh.current) return
    mesh.current.rotation.x += 0.01
  })

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 2, 3]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  )
}
