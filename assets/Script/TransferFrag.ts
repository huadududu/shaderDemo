export default class Transfer {
    static vert =`
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
    
    static frag=`
    #ifdef GL_ES
    precision lowp float;
     uniform sampler2D texture;
    #endif
    
    uniform float time;

    varying vec4 v_fragmentColor;
    varying vec2 uv0;
    void main()
    {
        vec4 c = v_fragmentColor * texture2D(texture, uv0);
        gl_FragColor = c;

        float temp = uv0.x - time;
        if (temp <= 0.0) {
            float temp2 = abs(temp);
            if (temp2 <= 0.2) {
                gl_FragColor.w = 1.0 - temp2/0.2;
            } else {
                gl_FragColor.w = 0.0;
            }
        } else {
            gl_FragColor.w = 1.0;
        }
    }
    `;
}