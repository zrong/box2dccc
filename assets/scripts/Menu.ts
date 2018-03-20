const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  @property(cc.Node)
  debugDrawLayout:cc.Node = null

  onLoad () {
  }

  start () {

  }

  onDebugDrawChecked(evt:cc.Event.EventCustom, customEventData:string) {
    this.setDebugDraw()
  }

  setDebugDraw() {
    let bits:number = 0
    for (let c of this.debugDrawLayout.getComponentsInChildren(cc.Toggle)) {
      if (c.isChecked) {
        bits |= parseInt(c.node.name.split(' ')[0])
      }
      cc.log('bits', bits)
    }
    cc.director.getPhysicsManager().debugDrawFlags = bits
  }
}
