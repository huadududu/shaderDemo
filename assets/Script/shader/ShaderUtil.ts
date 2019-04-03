import ShaderMaterial from './ShaderMaterial';
import CirclePortrait from "../CirclePortraitFrag";

export default class ShaderUtil {
    program: cc.GLProgram;

    public static setShader(sprite, lab) {
        cc.dynamicAtlasManager.enabled = false;
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
            cc.warn('Shader not surpport for canvas');
            return;
        }
        if (!sprite || !sprite.spriteFrame || sprite.lab == lab) {
            return;
        }
        if (lab) {
            if (lab.vert == null || lab.frag == null) {
                cc.warn('Shader not defined', lab);
                return;
            }
            cc.dynamicAtlasManager.enabled = false;
            let name = lab.name ? lab.name : "None"
            let material = new ShaderMaterial(lab.name, lab.vert, lab.frag, lab.define || []);

            // material.callfunc(name, lab.vert, lab.frag, lab.defines || []);

            let texture = sprite.spriteFrame._texture;
            material.setTexture(texture);
            material.updateHash();

            sprite._material = material;
            if (sprite._renderData) {
                sprite._renderData.material = material;
            }

            sprite.lab = lab;
            return material;
        } else {
            // 这个就是直接变成灰色
            sprite.setState(1);
        }


    }
}