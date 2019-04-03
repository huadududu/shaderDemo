import DissolveFrag from './DissolveFrag';
import Gray from "./GrayFrag";
import ShaderUtil from "./shader/ShaderUtil";
import ShaderMaterial from "./shader/ShaderMaterial";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DissolveEffect extends cc.Component {

    @property(cc.SpriteFrame)
    noiseTexture: cc.SpriteFrame = null;

    program: cc.GLProgram;
    startTime: number = Date.now();
    time: number = 0.;
    @property
    _material: ShaderMaterial = null;

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;
        // this.enabled = false;
    }

    useDissolve() {
        let vert = DissolveFrag.vert;
        let frag = DissolveFrag.frag;
        let name = "dissolve";
        this._material = ShaderUtil.setShader(this.node.getComponent(cc.Sprite), {vert, frag, name})
        let texture1 = this.noiseTexture.getTexture();
        // let gltext1 = sprite.spriteFrame._texture;
        this._material.setTime(this.time);
        this._material.setTexture1(texture1);


    }

    /*
    useDissolve1() {
        // 绑定噪音纹理
        let texture1 = this.noiseTexture.getTexture();
        let gltext1 = texture1._glID;
        if (cc.sys.isNative) {
        }
        else {
            cc.gl.bindTexture2DN(1, texture1);
        }

        this.program = new cc.GLProgram();
        if (cc.sys.isNative) {
            this.program.initWithString(DissolveFrag.vert, DissolveFrag.frag);
        } else {
            this.program.initWithVertexShaderByteArray(DissolveFrag.vert, DissolveFrag.frag);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        }
        this.program.link();
        this.program.updateUniforms();
        this.program.use();

        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glProgram_state.setUniformFloat("time", this.time);
            glProgram_state.setUniformTexture("texture1", gltext1);
        } else {
            let ba = this.program.getUniformLocationForName("time");
            let text1 = this.program.getUniformLocationForName("texture1");
            this.program.setUniformLocationWith1f(ba, this.time);
            this.program.setUniformLocationWith1i(text1, 1);
        }
        this.setProgram(this.node.getComponent(cc.Sprite)._sgNode, this.program);
        this.enabled = true;
    }

    setProgram(node: any, program: any) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        } else {
            node.setShaderProgram(program);
        }
    }
*/
    update(dt) {
        // 溶解速度

        if (this.program) {
            this.program.use();
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glProgram_state.setUniformFloat("time", this.time);
            } else {
                let ct = this.program.getUniformLocationForName("time");
                this.program.setUniformLocationWith1f(ct, this.time);
            }
        }
        if (this._material) {
            this.time += 0.008;
            // this.materialcount = 0;
            this._material.setTime(this.time)
        }
    }

    // update(){
    //
    // }
}
