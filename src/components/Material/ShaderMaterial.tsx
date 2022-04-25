import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import defaultVertextShader from '!raw-loader!../../shaders/vertex.vert'
import { Uniform } from 'three'

export function ShaderMaterial({
  uniforms,
  fragmentShader,
  vertextShader
}: {
  uniforms?: { [key: string]: Uniform }
  fragmentShader: string
  vertextShader?: string
}) {
  const uniform = useRef({
    iTime: { value: 0.0 },
    ...uniforms
  })
  const material = useRef<any>()
  useFrame(({ clock }) => {
    if (!material?.current?.uniforms) return
    material.current.uniforms.iTime.value = clock.elapsedTime
  })

  return (
    <rawShaderMaterial
      ref={material}
      uniforms={uniform.current}
      vertexShader={vertextShader ?? defaultVertextShader}
      fragmentShader={fragmentShader}
    />
  )
}
