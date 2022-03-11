import * as THREE from 'three'
import { BlendFunction } from './Blend'
import { BlendMode } from './Blend'

const EffectAttribute = {
  NONE: 0,
  DEPTH: 1,
  CONVOLUTION: 2
}

export class Effect extends THREE.EventDispatcher {
  constructor(
    name,
    fragmentShader,
    {
      attributes = EffectAttribute.NONE,
      blendFunction = BlendFunction.SCREEN,
      defines = /* @__PURE__ */ new Map(),
      uniforms = /* @__PURE__ */ new Map(),
      extensions = null,
      vertexShader = null
    } = {}
  ) {
    super()
    this.name = name
    this.renderer = null
    this.attributes = attributes
    this.fragmentShader = fragmentShader
    this.vertexShader = vertexShader
    this.defines = defines
    this.uniforms = uniforms
    this.extensions = extensions
    this.blendMode = new BlendMode(blendFunction)
    this.blendMode.addEventListener('change', (event) => this.setChanged())
  }
  getName() {
    return this.name
  }
  setRenderer(renderer) {
    this.renderer = renderer
  }
  getDefines() {
    return this.defines
  }
  getUniforms() {
    return this.uniforms
  }
  getExtensions() {
    return this.extensions
  }
  getBlendMode() {
    return this.blendMode
  }
  getAttributes() {
    return this.attributes
  }
  setAttributes(attributes) {
    this.attributes = attributes
    this.setChanged()
  }
  getFragmentShader() {
    return this.fragmentShader
  }
  setFragmentShader(fragmentShader) {
    this.fragmentShader = fragmentShader
    this.setChanged()
  }
  getVertexShader() {
    return this.vertexShader
  }
  setVertexShader(vertexShader) {
    this.vertexShader = vertexShader
    this.setChanged()
  }
  setChanged() {
    this.dispatchEvent({ type: 'change' })
  }
  setDepthTexture(depthTexture, depthPacking = THREE.BasicDepthPacking) { }
  update(renderer, inputBuffer, deltaTime) { }
  setSize(width, height) { }
  initialize(renderer, alpha, frameBufferType) { }
  dispose() {
    for (const key of Object.keys(this)) {
      const property = this[key]
      if (property !== null && typeof property.dispose === 'function') {
        if (property instanceof THREE.Scene) {
          continue
        }
        this[key].dispose()
      }
    }
  }
}

