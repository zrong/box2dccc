const {ccclass, property} = cc._decorator;
import Test from './Test'

@ccclass
export default class RongTest1 extends Test { 

  @property(cc.Node)
  dynamicBody: cc.Node = null

  @property(cc.Node)
  staticBody: cc.Node = null

  @property(cc.Node)
  kinematicBody:cc.Node = null

  onLoad () {
    super.onLoad()
    let body:cc.RigidBody = this.dynamicBody.getComponent(cc.RigidBody)
  }

  start () {
  }

  // update (dt) {}
}
