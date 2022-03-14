import { DotScreen, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from './Blend'
import { WaveEffect } from './waveEffect'
import { BlobEffect } from './blobEffect'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import img from 'assets/img/font_texture.png'

export default function Effects() {
  return (
    <EffectComposer>
      {/* <DotScreen
        blendFunction={BlendFunction.NORMAL} // blend mode
        angle={Math.PI * 0.5} // angle of the dot pattern
        scale={1.0} // scale of the dot pattern
      /> */}
      {/* <BlobEffect /> */}
      <WaveEffect />
    </EffectComposer>
  )
}
