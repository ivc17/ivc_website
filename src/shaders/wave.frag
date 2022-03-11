
#ifdef GL_ES
precision mediump float;
#endif

// void mainImage(inout vec2 uv){
//   gl_FragColor=vec4(1,0.5 ,0.5,0.5);
// }

// uniform vec2 angle;
// uniform float scale;
// float pattern(const in vec2 uv){
//   vec2 point=scale*vec2(dot(angle.yx,vec2(uv.x,-uv.y)),dot(angle,uv));return(sin(point.x)*sin(point.y))*4.0;
//   }

  
void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){
  vec3 color=vec3(0.3,0.9,0.3 );

  outputColor=vec4(color,1);
}