export default class WaterWaveFrag{
    static waterwave_vert = `
    uniform mat4 viewProj;
    attribute vec4 a_position;
    attribute vec2 a_uv0;
     uniform vec4 color;
    varying vec2 uv0;
    varying vec4 v_fragmentColor;
    void main()
    {
        gl_Position = viewProj * a_position;
        v_fragmentColor = color;
        uv0 = a_uv0;
    }
    `;
       
    static waterwave_frag = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    #define F cos(x-y)*cos(y),sin(x+y)*sin(y)

    uniform float time;
    uniform vec2 resolution;
    uniform sampler2D texture;
    varying vec2 uv0;
     

    vec2 s(vec2 p)
    {
        float d=time*0.2,x=8.*(p.x+d),y=8.*(p.y+d);
        return vec2(F);
    }
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        // 换成resolution
        vec2 rs = resolution.xy;
        // 换成纹理坐标v_texCoord.xy
        vec2 uv = uv0.xy;
        vec2 q = uv+2./resolution.x*(s(uv)-s(uv+rs));
        //反转y
        // q.y=1.-q.y;
        fragColor = texture2D(texture,q);
    }
    void main()
    {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `;
}