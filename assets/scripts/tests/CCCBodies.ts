/**
 * see http://www.iforce2d.net/b2dtut/bodies
 */

const {ccclass, property} = cc._decorator;
import Test from '../Test'

@ccclass
export default class CCCBodies extends Test { 

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
}
