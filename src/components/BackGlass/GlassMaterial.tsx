import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import fragmentShader from '!raw-loader!../../shaders/glassMaterial.frag'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import vertextShader from '!raw-loader!../../shaders/vertex.vert'
import noiseURL from 'assets/img/noise.png'
import noise2URL from 'assets/img/noise2.png'
import { TextureLoader } from 'three'

export function GlassMaterial() {
  const material = useRef<any>()
  const noiseTexture = useLoader(TextureLoader, noiseURL)
  const noiseTexture2 = useLoader(TextureLoader, noise2URL)

  useFrame(({ clock }) => {
    if (!material?.current?.uniforms) return
    material.current.uniforms.iTime.value = clock.elapsedTime
  })

  return (
    <rawShaderMaterial
      ref={material}
      uniforms={{
        iTime: { value: 0.0 },
        uTexture: { value: noiseTexture },
        uTexture2: { value: noiseTexture2 }
      }}
      vertexShader={vertextShader}
      fragmentShader={fragmentShader}
    />
  )
}
