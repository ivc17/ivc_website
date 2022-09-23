
//https://www.shadertoy.com/view/XsKSWc

#ifdef GL_ES
precision mediump float;
#endif

uniform float iTime;
uniform sampler2D uTexture;
uniform sampler2D uTexture2;
varying vec2 vUv;

void main() {
  vec2 noise = texture2D(uTexture, vUv).xy*(cos(iTime)/10.+0.1);
  vec4 temp=texture2D(uTexture2,vUv+noise);
  temp.a=0.5;
  gl_FragColor =temp;

}