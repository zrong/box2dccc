const {ccclass, property} = cc._decorator;
import Test from './Test'

@ccclass
export default class NewClass extends Test { 

    @property(cc.Node)
    dynamicBody: cc.Node = null

    @property(cc.Node)
    staticBody: cc.Node = null

    @property(cc.Node)
    kinematicBody:cc.Node = null

    // onLoad () {}

    start () {
        cc.log(this.pm.debugDrawFlags)
    }

    // update (dt) {}
}
