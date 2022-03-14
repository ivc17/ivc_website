import { useMemo, useRef } from 'react'
import { Effect } from 'components/Effects/Effect'

// @ts-ignore
import fragment from '../../shaders/blob.frag'
import { Uniform, Vector2 } from 'three'

export class BlobEffectImpl extends Effect {
  u_resolution: any
  u_mouse: any
  u_time: any
  u_noise: any

  constructor() {
    super('BlobEffect', fragment, {
      uniforms: new Map<any, any>([
        ['u_resolution', new Vector2(500, 500)],
        ['u_mouse', new Vector2(500, 500)],
        ['u_time', 0.0],
        ['u_noise', new Uniform(null)]
      ])
    })
  }

  update(renderer: any, inputBuffer: any, deltaTime: any) {
    this.u_time += deltaTime
  }
}

export function BlobEffect() {
  const ref = useRef<any>()
  const effect = useMemo(() => new BlobEffectImpl(), [])
  return <primitive ref={ref} object={effect} dispose={null} />
}
