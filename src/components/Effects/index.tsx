import { DotScreen, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from './Blend'
import { WaveEffect } from './waveEffect'

export default function Effects() {
  return (
    <EffectComposer>
      {/* <DotScreen
        blendFunction={BlendFunction.NORMAL} // blend mode
        angle={Math.PI * 0.5} // angle of the dot pattern
        scale={1.0} // scale of the dot pattern
      /> */}
      <WaveEffect />
    </EffectComposer>
  )
}
