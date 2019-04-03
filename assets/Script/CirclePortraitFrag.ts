// Feofox Game
// Author:Lerry
// https://github.com/fylz1125/ShaderDemos
export default class CircleFrag {
    static circle_vert = `
     uniform mat4 viewProj;
attribute vec3 a_position;
attribute vec2 a_uv0;
varying vec2 uv0;
void main () {
    vec4 pos = viewProj * vec4(a_position, 1);
    gl_Position = pos;
    uv0 = a_uv0;
} `;
    static circle_frag = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec4 v_fragmentColor;
    varying vec2 uv0;

    uniform float num;
    uniform float u_offset; 
    uniform sampler2D texture; 

    void main()
    {
        float edge = num;
        float dis = 0.0;
        vec2 texCoord = uv0;
        if ( texCoord.x < edge )
        {
            if ( texCoord.y < edge )
            {
                dis = distance( texCoord, vec2(edge, edge) );
            }
            if ( texCoord.y > (1.0 - edge) )
            {
                dis = distance( texCoord, vec2(edge, (1.0 - edge)) );
            }
        }
        else if ( texCoord.x > (1.0 - edge) )
        {
            if ( texCoord.y < edge )
            {
                dis = distance( texCoord, vec2((1.0 - edge), edge ) );
            }
            if ( texCoord.y > (1.0 - edge) )
            {
                dis = distance( texCoord, vec2((1.0 - edge), (1.0 - edge) ) );
            }
        }
  
        if(dis > 0.001)
        {
            // 外圈沟
            float gap = edge * 0.02;
            if(dis <= edge - gap)
            {
                gl_FragColor = texture2D( texture,texCoord);
            }
            else if(dis <= edge)
            {
                // 平滑过渡
                float t = smoothstep(0.,gap,edge-dis);
                vec4 color = texture2D( texture,texCoord);
                gl_FragColor = vec4(color.rgb,t);
            }else{
                gl_FragColor = vec4(0.,0.,0.,0.);
            }
        }
        else
        {
            gl_FragColor = texture2D( texture,texCoord);
        }
    }

    `;
}