const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
  }
`;

const fragmentShader = `
  varying vec2 vUv;

  uniform sampler2D uTexture;

  void main() {
    vec2 repeat = vec2(2., 2.);
    // To repeat the uvs we need to multiply them by a scalar
    // and then get the fractional part of it so they from 0 to 1
    vec2 uv = fract(vUv * repeat);

    vec3 texture = texture2D(uTexture, uv).rgb;

    // if (!gl_FrontFacing){
    //   gl_FragColor = vec4(1.0,0.95,0.01,1.0); // yellow
    // } else 
    
    if(texture.x>0.5||texture.y>0.5||texture.z>0.5){
      gl_FragColor = vec4(0.,255.,255., 0.);
    }else{
      gl_FragColor = vec4(texture, 1.);
    };




    //texture *= vec3(vUv.x, vUv.y, 1.); // To help visualize the repeated uvs


  }
`;

module.exports = {
  vert: vertexShader,
  frag: fragmentShader
};
