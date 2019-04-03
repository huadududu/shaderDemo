import BlursFrag from './GaussBlursFrag';
import Fluxay from "./FluxayFrag";
import ShaderUtil from "./shader/ShaderUtil";
import ShaderMaterial from "./shader/ShaderMaterial";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GaussBlurEffect extends cc.Component {

    @property
    isAllChildrenUse: boolean = false;

    @property(cc.Slider)
    slider: cc.Slider = null;

    @property(cc.Label)
    blurText: cc.Label = null;

    program: cc.GLProgram;
    bluramount: number = 0.10;
    @property
    _material: ShaderMaterial = null;


    onLoad() {
        this.bluramount = this.slider.progress / 10;
        this.blurText.string = (this.slider.progress * 100).toString();
        // this.useBlur();
        let vert = BlursFrag.blurs_vert;
        let frag = BlursFrag.blurs_frag;
        let name = "blur";
        this._material = ShaderUtil.setShader(this.node.getComponent(cc.Sprite), {vert, frag, name})
        this._material.setNum(this.bluramount);
        this._material.setNum(this.bluramount);
    }

    start() {
    }
/*
    useBlur() {
        this.program = new cc.GLProgram();
        if (cc.sys.isNative) {
            this.program.initWithString(BlursFrag.blurs_vert, BlursFrag.blurs_frag);
        } else {
            this.program.initWithVertexShaderByteArray(BlursFrag.blurs_vert, BlursFrag.blurs_frag);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        }
        this.program.link();
        this.program.updateUniforms();
        this.program.use();

        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glProgram_state.setUniformFloat("bluramount", this.bluramount);
        } else {
            let ba = this.program.getUniformLocationForName("bluramount");
            this.program.setUniformLocationWith1f(ba, this.bluramount);
        }
        if (this.isAllChildrenUse) {
            this.setProgram(this.node._sgNode, this.program);
        } else {
            this.setProgram(this.node.getComponent(cc.Sprite)._sgNode, this.program);
        }
    }

    setProgram(node: any, program: any) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        } else {
            node.setShaderProgram(program);
        }
        var children = node.children;
        if (!children)
            return;

        for (var i = 0; i < children.length; i++) {
            this.setProgram(children[i], program);
        }
    }
*/
    onSliderBlurAmount(slider: cc.Slider, eventType: any) {
        this.bluramount = Number((this.slider.progress / 10).toFixed(3));
        this.blurText.string = (this.bluramount * 1000).toString();
        this.changeBlurAmount(this.bluramount);
    }

    changeBlurAmount(amount: number) {
        if (this.program) {
            this.program.use();
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glProgram_state.setUniformFloat("bluramount", this.bluramount);
            } else {
                let ba = this.program.getUniformLocationForName("bluramount");
                this.program.setUniformLocationWith1f(ba, this.bluramount);
            }
        }
        if (this._material) {
            this._material.setNum(this.bluramount);
        }
    }
}
