import * as THREE from 'three'

export const BlendFunction = {
  SKIP: 0,
  ADD: 1,
  ALPHA: 2,
  AVERAGE: 3,
  COLOR_BURN: 4,
  COLOR_DODGE: 5,
  DARKEN: 6,
  DIFFERENCE: 7,
  EXCLUSION: 8,
  LIGHTEN: 9,
  MULTIPLY: 10,
  DIVIDE: 11,
  NEGATION: 12,
  NORMAL: 13,
  OVERLAY: 14,
  REFLECT: 15,
  SCREEN: 16,
  SOFT_LIGHT: 17,
  SUBTRACT: 18
}

// src/effects/blending/glsl/add/shader.frag
var shader_default26 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return min(x+y,1.0)*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/alpha/shader.frag
var shader_default27 =
  'vec3 blend(const in vec3 x,const in vec3 y,const in float opacity){return y*opacity+x*(1.0-opacity);}vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){float a=min(y.a,opacity);return vec4(blend(x.rgb,y.rgb,a),max(x.a,a));}'

// src/effects/blending/glsl/average/shader.frag
var shader_default28 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return(x+y)*0.5*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/color-burn/shader.frag
var shader_default29 =
  'float blend(const in float x,const in float y){return(y==0.0)? y : max(1.0-(1.0-x)/y,0.0);}vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=vec4(blend(x.r,y.r),blend(x.g,y.g),blend(x.b,y.b),blend(x.a,y.a));return z*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/color-dodge/shader.frag
var shader_default30 =
  'float blend(const in float x,const in float y){return(y==1.0)? y : min(x/(1.0-y),1.0);}vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=vec4(blend(x.r,y.r),blend(x.g,y.g),blend(x.b,y.b),blend(x.a,y.a));return z*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/darken/shader.frag
var shader_default31 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return min(x,y)*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/difference/shader.frag
var shader_default32 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return abs(x-y)*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/exclusion/shader.frag
var shader_default33 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return(x+y-2.0*x*y)*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/lighten/shader.frag
var shader_default34 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return max(x,y)*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/multiply/shader.frag
var shader_default35 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return x*y*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/divide/shader.frag
var shader_default36 =
  'float blend(const in float x,const in float y){return(y>0.0)? min(x/y,1.0): 1.0;}vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=vec4(blend(x.r,y.r),blend(x.g,y.g),blend(x.b,y.b),blend(x.a,y.a));return z*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/negation/shader.frag
var shader_default37 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return(1.0-abs(1.0-x-y))*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/normal/shader.frag
var shader_default38 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/overlay/shader.frag
var shader_default39 =
  'float blend(const in float x,const in float y){return(x<0.5)?(2.0*x*y):(1.0-2.0*(1.0-x)*(1.0-y));}vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=vec4(blend(x.r,y.r),blend(x.g,y.g),blend(x.b,y.b),blend(x.a,y.a));return z*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/reflect/shader.frag
var shader_default40 =
  'float blend(const in float x,const in float y){return(y==1.0)? y : min(x*x/(1.0-y),1.0);}vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=vec4(blend(x.r,y.r),blend(x.g,y.g),blend(x.b,y.b),blend(x.a,y.a));return z*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/screen/shader.frag
var shader_default41 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return(1.0-(1.0-x)*(1.0-y))*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/soft-light/shader.frag
var shader_default42 =
  'float blend(const in float x,const in float y){return(y<0.5)?(2.0*x*y+x*x*(1.0-2.0*y)):(sqrt(x)*(2.0*y-1.0)+2.0*x*(1.0-y));}vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=vec4(blend(x.r,y.r),blend(x.g,y.g),blend(x.b,y.b),blend(x.a,y.a));return z*opacity+x*(1.0-opacity);}'

// src/effects/blending/glsl/subtract/shader.frag
var shader_default43 =
  'vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return max(x+y-1.0,0.0)*opacity+x*(1.0-opacity);}'

var blendFunctions = /* @__PURE__ */ new Map([
  [BlendFunction.SKIP, null],
  [BlendFunction.ADD, shader_default26],
  [BlendFunction.ALPHA, shader_default27],
  [BlendFunction.AVERAGE, shader_default28],
  [BlendFunction.COLOR_BURN, shader_default29],
  [BlendFunction.COLOR_DODGE, shader_default30],
  [BlendFunction.DARKEN, shader_default31],
  [BlendFunction.DIFFERENCE, shader_default32],
  [BlendFunction.EXCLUSION, shader_default33],
  [BlendFunction.LIGHTEN, shader_default34],
  [BlendFunction.MULTIPLY, shader_default35],
  [BlendFunction.DIVIDE, shader_default36],
  [BlendFunction.NEGATION, shader_default37],
  [BlendFunction.NORMAL, shader_default38],
  [BlendFunction.OVERLAY, shader_default39],
  [BlendFunction.REFLECT, shader_default40],
  [BlendFunction.SCREEN, shader_default41],
  [BlendFunction.SOFT_LIGHT, shader_default42],
  [BlendFunction.SUBTRACT, shader_default43]
])

export class BlendMode extends THREE.EventDispatcher {
  constructor(blendFunction, opacity = 1) {
    super()
    this.blendFunction = blendFunction
    this.opacity = new THREE.Uniform(opacity)
  }
  getOpacity() {
    return this.opacity.value
  }
  setOpacity(value) {
    this.opacity.value = value
  }
  getBlendFunction() {
    return this.blendFunction
  }
  setBlendFunction(blendFunction) {
    this.blendFunction = blendFunction
    this.dispatchEvent({ type: 'change' })
  }
  getShaderCode() {
    return blendFunctions.get(this.blendFunction)
  }
}
