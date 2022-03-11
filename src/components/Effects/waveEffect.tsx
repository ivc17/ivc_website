import { useMemo, useRef } from 'react'
import { Effect } from 'components/Effects/Effect'

// @ts-ignore
import fragment from '../../shaders/wave.frag'

export class WaveEffectImpl extends Effect {
  time: any

  constructor() {
    super('WaveEffect', fragment, {
      uniforms: new Map([])
    })
  }

  update(renderer: any, inputBuffer: any, deltaTime: any) {
    this.time += deltaTime
  }
}

export function WaveEffect() {
  const ref = useRef<any>()
  const effect = useMemo(() => new WaveEffectImpl(), [])
  return <primitive ref={ref} object={effect} dispose={null} />
}
