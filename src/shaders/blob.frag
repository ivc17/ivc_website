
#ifdef GL_ES
precision mediump float;
#endif

float r2D(vec2 p)
{
    return fract(sin(dot(p, vec2(961.761, 83.153)))*43091.241);
}

float noise(vec2 p)
{
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 e = vec2(1., 0.);
    
    float v1 = r2D(i+e.yy);
    float v2 = r2D(i+e.xy);
    float v3 = r2D(i+e.yx);
    float v4 = r2D(i+e.xx);
    
    vec2 u = smoothstep(0., 1., f);
    
    float a = mix(v1, v2, u.x);
    float b = mix(v3, v4, u.x);
    
    return mix(a, b, u.y);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float space2D(vec2 p, float s)
{
    p *= vec2(s*.25, s*.3);
    float t = iTime;
    
    p.y += sin(p.x*.5+t*1.)/4.;
    p.x += cos(p.x+t*.75)/2.;
    
    p.x *= noise(p.yy+t*.5)*.5;
    p.y += noise(p.xx-t*.1)*.25;
    p.y -= noise(p.yy+t*.1)*.125;
    p.x += noise(p.yx+t*.1)*.0625;
    
    p += p*rotate2d(sin(t*.5));
    
    // jitter effect from Shane
    p += fract(sin(p+vec2(13, 7))*1e6)*.01-.015;
    
    return noise(p)*.5;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.y;

    float sz = 16.;
    vec2 e = vec2(.01, 0.);
    float s = space2D(uv, sz);
    float dx = space2D(uv+e.xy, sz);
    float dy = space2D(uv+e.yx, sz);
    
    dx = (dx-s)/e.x;
    dy = (dy-s)/e.x;
    
    vec3 n = normalize(vec3(dx, dy, 1.));
    vec3 lP = vec3(6., -3., 1.);
    vec3 lD = normalize(lP-vec3(uv,s));
    vec3 eyeD = normalize(vec3(0., 0., 1.)-vec3(uv,s));
    vec3 hV = normalize(lD+eyeD);
    float ka = s;
    float kd = max(dot(n, lD), 0.);
    float ks = pow(max(dot(hV, n), 0.), 2.);
    vec3 k = ka*vec3(.1)+kd*vec3(.5)+ks*vec3(1.);
    
    vec3 ref = normalize(reflect(eyeD, n));
    vec3 t1 = texture(iChannel0, ref).rgb;
    
    vec3 col = vec3(0.);
    col += k*t1;

    fragColor = vec4(sqrt(clamp(col, 0., 1.)),1.0);
}