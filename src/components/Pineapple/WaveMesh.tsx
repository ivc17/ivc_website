import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import fragmentShader from '!raw-loader!../../shaders/waveMaterial.frag'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import vertextShader from '!raw-loader!../../shaders/vertex.vert'
import { TextureLoader } from 'three'
import noiseURL from 'assets/img/font_texture.png'

export function WaveMaterial() {
  const material = useRef<any>()
  const noiseTexture = useLoader(TextureLoader, noiseURL)
  useFrame(({ clock }) => {
    if (!material?.current?.uniforms) return
    // material.current.uniforms.time.value = Math.sin(
    //   (2 * Math.PI * clock.getElapsedTime()) / 10
    // )
    material.current.uniforms.iTime.value = clock.elapsedTime
  })
  return (
    <rawShaderMaterial
      ref={material}
      uniforms={{
        iTime: { value: 0.0 },
        iChannel0: { value: noiseTexture }
      }}
      vertexShader={vertextShader}
      fragmentShader={fragmentShader}
    />
  )
}

export default function WaveMesh({
  geometry,
  ...props
}: { geometry: any } & any) {
  return (
    <mesh geometry={geometry} position={[0, 0, 0]} {...props}>
      <WaveMaterial />
    </mesh>
  )
}
