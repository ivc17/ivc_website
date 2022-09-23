import cryotoLog from 'assets/works/crypto_log.gif'
import asf2y from 'assets/works/asf2y.gif'
import whiteNoise from 'assets/works/white_noise.gif'
import susi from 'assets/works/susi.gif'
import coffee from 'assets/works/coffee.gif'

export const LIST_OF_WORKS = [
  {
    title: 'SUSISOMOS',
    description: `Official website for jewellery brand SUSISOMOS.`,
    technology: 'next.js',
    gif: susi,
    link: 'https://www.susisomos.com/',
    param:'susisomos'
  },
  {
    title: 'Asf2y',
    description: `Story about after sleeping for two years  underwater one (I) finally popped up, and saw how the sun shines on ocean surface.Also an attempt to deliver graphic layout with code, and animations.`,
    technology: 'vue.js, three.js, svg, glsl',
    gif: asf2y,
    link: 'https://ivc17.github.io/asf2y-view',
    param:'asf2y'
  },
  {
    title: 'Crypto Study Log',
    description: ``,
    technology: 'React, tsparticles, material ui, svg',
    gif: cryotoLog,
    link: 'https://ivc17.github.io/crypto-study-log/',
    param:'crypto-study-log'
  },
  {
    title: 'White_Noise',
    description: `Explore image possibility’s with only grayscale colors. An react three fiber based experiment to test out object manipulation with react mechanism. Also explores noise, curve, shaders and other techniques. `, technology: 'react, react-three-fiber, three.js',
    gif: whiteNoise,
    link: 'https://ivc17.github.io/whiteNoise/',
    param:'white_noise'
  },
  {
    title: '芸術は爆発だ (Art is an Explosion)',
    description: `    Pure JavaScript scroll trigger animations. And use of sprite. `,
    technology: 'pixi, javaScript',
    param:'art-is-explosion'
  },
  {
    title: 'Coffee Party',
    description: `Single page website based on SUSISOMOS AW2022 collection subset coffee break. A practice piece based purely on css animation.`,
    technology: 'blender,next.js, css',
    link: 'https://coffee-party-delta.vercel.app/',
    param:'coffee-party',
    gif: coffee
  }
]