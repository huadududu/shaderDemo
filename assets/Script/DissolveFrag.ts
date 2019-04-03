export default class DissolveFrag {
    static vert =`
uniform mat4 viewProj;
attribute vec4 a_position;
attribute vec2 a_uv0;
uniform vec4 color;
varying vec2 uv0;
varying vec4 v_fragmentColor;
void main () {
    vec4 pos = viewProj * a_position;
    gl_Position = pos;
    v_fragmentColor = color;
    uv0 = a_uv0;
}`;
    
    static frag=`
    #ifdef GL_ES
    precision lowp float;
    #endif

   // uniform vec2 resolution;
    uniform float time;
    uniform sampler2D texture1;
    uniform sampler2D texture;

    varying vec2 uv0;
    varying vec4 v_fragmentColor;
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        // 纹理坐标
        vec2 uv = uv0;
        // 法向纹理r通道
        float height = texture2D(texture1,uv).r;
        // 采样纹理
        vec4 color = v_fragmentColor * texture2D(texture, uv);

        if(height < time)
        {
            discard;
        }
        
        if(height < time+0.04)
        {
            // 溶解颜色，可以自定义
            color = vec4(.9,.6,0.3,color.a);
        }
        
        fragColor = color;
    }

    void main()
    {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `;
}