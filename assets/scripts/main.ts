const {ccclass, property} = cc._decorator;
import Menu from './Menu'

@ccclass
export default class Box2DCCC extends cc.Component {

  @property(cc.Prefab)
  menuPrefab: cc.Prefab = null

  pm:cc.PhysicsManager = null

  constructor() {
    super()
    this._initPhysics()
  }

  private _initPhysics() {
    this.pm = cc.director.getPhysicsManager()
    this.pm.enabled = true
  } 

  onLoad() {
    let menuNode:cc.Node = cc.instantiate(this.menuPrefab)
    menuNode.x = cc.winSize.width/2 - 100
    menuNode.parent = this.node


    let b2draw = cc.PhysicsManager.DrawBits
    cc.log('pm.enabled', this.pm.enabled, this.pm.debugDrawFlags)
    // this.pm.debugDrawFlags = b2draw.e_aabbBit | b2draw.e_pairBit | b2draw.e_centerOfMassBit | b2draw.e_jointBit | b2draw.e_shapeBit

    let menu:Menu = menuNode.getComponent(Menu)
    menu.setDebugDraw()
    cc.log('pm.enabled', this.pm.enabled, this.pm.debugDrawFlags)
  }

  start () {
    cc.loader.loadRes("prefab/RongTest1", (err, prefab) => {
      let testNode:cc.Node = cc.instantiate(prefab)
      testNode.setPosition(cc.p(-cc.winSize.width/2, -cc.winSize.height/2))
      testNode.parent = this.node
  });
  }
}
