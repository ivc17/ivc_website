export const emptyFrag = `
  void main() {
      gl_FragColor = vec4(0.,0.,0., 0.);
  }
`;

export const defaultVert = `
varying vec2 vUv;

void main() {
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
`;