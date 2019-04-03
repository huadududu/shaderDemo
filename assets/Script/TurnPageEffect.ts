import TurnPageFrag from './TurnPageFrag';
import Fluxay from "./FluxayFrag";
import ShaderUtil from "./shader/ShaderUtil";
import ShaderMaterial from "./shader/ShaderMaterial";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TurnPageEffect extends cc.Component {

    program: cc.GLProgram;

    resolution = {x: 0.0, y: 0.0};
    mouse = {x: 0.0, y: 0.0};
    @property
    _material: ShaderMaterial = null;

    onLoad() {
        this.resolution.x = (this.node.getContentSize().width);
        this.resolution.y = (this.node.getContentSize().height);
        this.mouse.x = 0.0;
        this.mouse.y = 0.0;

        let self = this;
        // 添加触摸事件包含鼠标事件
        this.node.on(cc.Node.EventType.TOUCH_START, function (event: cc.Event.EventTouch) {
            // 转化为node的局部坐标
            let touchPos = self.node.convertToNodeSpaceAR(event.touch._point);
            self.mouse.x = touchPos.x;
            self.mouse.y = touchPos.y;
            self.changeLight();
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event: cc.Event.EventTouch) {
            let touchPos = self.node.convertToNodeSpaceAR(event.touch._point);
            self.mouse.x = touchPos.x;
            self.mouse.y = touchPos.y;
            self.changeLight();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            // cc.log('touch end');
        }, this);


        // this.useShader();
        let vert = TurnPageFrag.turnpage_vert;
        let frag = TurnPageFrag.turnpage_frag;
        let name = "turnpagefrag";
        this._material = ShaderUtil.setShader(this.node.getComponent(cc.Sprite), {vert, frag, name})
        this._material.setMouse(this.mouse.x, this.mouse.y);
        this._material.setResolution(this.resolution.x, this.resolution.y);
        // this._material.setTime(this.time);
    }

    /*
    useShader() {
        this.program = new cc.GLProgram();
        if (cc.sys.isNative) {
            this.program.initWithString(TurnPageFrag.turnpage_vert, TurnPageFrag.turnpage_frag);
        } else {
            this.program.initWithVertexShaderByteArray(TurnPageFrag.turnpage_vert, TurnPageFrag.turnpage_frag);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        }
        this.program.link();
        this.program.updateUniforms();
        this.program.use();

        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glProgram_state.setUniformVec2("resolution", this.resolution);
            glProgram_state.setUniformVec2("mouse", this.mouse);
        } else {
            let res = this.program.getUniformLocationForName("resolution");
            let ms = this.program.getUniformLocationForName("mouse");
            this.program.setUniformLocationWith2f(res, this.resolution.x, this.resolution.y);
            this.program.setUniformLocationWith2f(ms, this.mouse.x, this.mouse.y);
        }
        this.setProgram(this.node.getComponent(cc.Sprite)._sgNode, this.program);
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
    changeLight() {
        if (this.program) {
            this.program.use();
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glProgram_state.setUniformVec2("resolution", this.resolution);
                glProgram_state.setUniformVec2("mouse", this.mouse);
            } else {
                let res = this.program.getUniformLocationForName("resolution");
                let ms = this.program.getUniformLocationForName("mouse");
                this.program.setUniformLocationWith2f(res, this.resolution.x, this.resolution.y);
                this.program.setUniformLocationWith2f(ms, this.mouse.x, this.mouse.y);
            }
        }
        if (this._material) {
            this._material.setMouse(this.mouse.x, this.mouse.y);
            this._material.setResolution(this.resolution.x, this.resolution.y);
        }
    }
}
