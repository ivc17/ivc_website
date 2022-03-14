
#ifdef GL_ES
precision mediump float;
#endif

uniform float iTime; 
uniform sampler2D uTexture;

// void mainImage(inout vec2 uv){
//   gl_FragColor=vec4(1,0.5 ,0.5,0.5);
// }

// uniform vec2 angle;
// uniform float scale;
// float pattern(const in vec2 uv){
//   vec2 point=scale*vec2(dot(angle.yx,vec2(uv.x,-uv.y)),dot(angle,uv));return(sin(point.x)*sin(point.y))*4.0;
//   }

void mainImage(const in vec4 fragCoord,const in vec2 uv,out vec4 fragColor){

  // vec4 solidRed = vec4(1.0-uv.x,1.0-uv.y,1.0-uv.y,1);//This is actually black right now
///Arbitrary number, we don't know how big our screen is!
    //     solidRed.r = mod(iTime,5.0)*0.2;//Set its red component to 1.0
    // vec4 color=fragCoord;
    // color.x=uv.x;
    // color.y=uv.y;
    // color.z=fragCoord.z;
    vec2 coord=uv*2.0-1.0;

    coord *= 2.0;
    // coord=fract(coord);

    float time=mod(iTime,2.0);

    float isine = abs(sin(coord.x * 3.1415*time ));
    float icos=abs(cos(coord.y * 3.1415*(10.0-time) ));
    vec4 solidRed=vec4(isine/icos,coord.x,icos,1.0);

    float dist=distance(coord,vec2(0.5,0.0));
    float stepDist=step(time-2.0,1.0-dist);
    float smoothDist= smoothstep(time-0.1,time+0.1,dist);
    vec4 color=vec4(0.0,0.0,0.0,1.0);
    // color.r=dist;
    // color.b=stepDist;
    color.g=smoothDist;
    fragColor = solidRed;
    // fragColor = texture2D(uTexture,uv);
// vec2 coords=uv;

//     for(float i = 1.0; i < 10.0; i++){
//         coords.x += 0.6 / i * cos(i * 2.5* coords.y + iTime*0.8);
//         coords.y += 0.6 / i * cos(i * 1.5 * coords.x + iTime*0.8);
//     }
    
//     fragColor = vec4(vec3(0.1)/abs(sin(iTime-coords.y-coords.x)),1.0);
}