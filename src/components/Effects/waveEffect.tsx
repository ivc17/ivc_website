import { useMemo, useRef } from 'react'
import { Effect } from 'components/Effects/Effect'

// @ts-ignore
import fragment from '../../shaders/wave.frag'
import { BlendFunction } from './Blend'
import { Uniform } from 'three'

export class WaveEffectImpl extends Effect {
  iTime: any

  constructor() {
    super('WaveEffect', fragment, {
      uniforms: new Map<string, any>([['iTime', new Uniform(0.0)]]),
      blendFunction: BlendFunction.NORMAL
    })
  }

  update(renderer: any, inputBuffer: any, deltaTime: any) {
    this.uniforms.get('iTime').value += deltaTime
  }
}

export function WaveEffect() {
  const ref = useRef<any>()
  const effect = useMemo(() => new WaveEffectImpl(), [])
  return <primitive ref={ref} object={effect} dispose={null} />
}
