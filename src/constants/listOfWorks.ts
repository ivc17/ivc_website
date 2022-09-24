import cryotoLog from 'assets/works/crypto_log.gif'
import asf2y from 'assets/works/asf2y.gif'
import whiteNoise from 'assets/works/white_noise.gif'
import susi from 'assets/works/susi.gif'
import coffee from 'assets/works/coffee.gif'

export const LIST_OF_WORKS = [
  {
    title: 'SUSISOMOS',
    description: `Official website for jewellery brand SUSISOMOS.`,
    technology: 'Next.js, Pixi.js',
    gif: susi,
    link: 'https://www.susisomos.com/',
    param: 'susisomos',
    hashtag:'Fashion, Jewellery, ECommerce'
  },
  {
    title: 'Asf2y',
    description: `Story about after sleeping for two years  underwater one(I) finally popped up, and saw how the sun shines on ocean surface. Also an attempt to deliver graphic layout with code, and animations.`,
    technology: 'Vue.js, Three.js, SVG, GLSL',
    gif: asf2y,
    link: 'https://ivc17.github.io/asf2y-view',
    param: 'asf2y',
    hashtag:'FineArt, Experimental, GraphicDesign, PersonalProject'
  },
  {
    title: 'Crypto Study Log',
    description: `An experimental project that aims to test out the possibility of svg animation, as well as to what extent css mix-blend-mode is able to replicate layer effect in photoshop/illustrator. Also a place to document my journey navigating the web3 world. Updates irregurarly. `,
    technology: 'React, tsParticles, MaterialUI, SVG',
    gif: cryotoLog,
    link: 'https://ivc17.github.io/crypto-study-log/',
    param: 'crypto-study-log',
    hashtag:'Crypto, Experimental, PersonalProject'
  },
  {
    title: 'White_Noise',
    description: `Explore image possibility’s with only grayscale colors. An react three fiber based experiment to test out object manipulation with react mechanism. Also explores noise, curve, shaders and other techniques. `,
    technology: 'React, React-Three-Fiber, Three.js, GLSL',
    gif: whiteNoise,
    link: 'https://ivc17.github.io/whiteNoise/',
    param: 'white_noise',
    hashtag:'Experimental, PersonalProject, Study, Generative'
  },
  {
    title: '芸術は爆発だ (Art is an Explosion)',
    description: `Pure JavaScript scroll trigger animations. And use of sprite. `,
    technology: 'Pixi.js, JavaScript',
    param: 'art-is-explosion',
    hashtag:'ScrollTrigger, VanillaJS, PersonalProject'
  },
  {
    title: 'Coffee Party',
    description: `Single page website based on SUSISOMOS AW2022 collection subset coffee break. A practice piece based purely on css animation.`,
    technology: 'Blender, Next.js, CSS',
    link: 'https://coffee-party-delta.vercel.app/',
    param:'coffee-party',
    gif: coffee,
    hashtag:'CSSAnimation, CommercialWebsite'
  }
]
