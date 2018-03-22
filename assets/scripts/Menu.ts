const {ccclass, property} = cc._decorator;
import Main from './Main'

@ccclass
export default class Menu extends cc.Component {

  @property(cc.Node)
  debugDrawLayout:cc.Node = null

  @property(cc.Node)
  stepBtnNode:cc.Node = null

  main:Main = null

  initMenu(main) {
    this.main = main
    this._updatePause()
  }

  onLoad () {
    this.setDebugDraw()
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  start () {

  }

  onKeyUp(evt:cc.Event) {
    if (evt.keyCode === cc.KEY.r) {
      this.onRestart(null)
    }
    else if (evt.keyCode === cc.KEY.p) {
      this.onPaused(null)
    }
    else if(evt.keyCode === cc.KEY.o) {
      this.onStep(null)
    }
  }

  onDebugDrawChecked(evt:cc.Event.EventCustom, customEventData:string) {
    this.setDebugDraw()
  }

  private _updatePause() {
    let stepBtn:cc.Button = this.stepBtnNode.getComponent(cc.Button)
    stepBtn.enabled = this.main.setting.paused
    if (this.main.setting.paused) {
      this.main.setting.addDebugText('***PAUSED***')
    }
    else {
      this.main.setting.removeDebugText('***PAUSED***')
    }
    this.main.updatePaused(this.main.setting.paused)
  }

  onPaused (evt:cc.Event.EventCustom) {
    this.main.setting.paused = !this.main.setting.paused
    this._updatePause()
  }

  onRestart(evt:cc.Event.EventCustom) {
    this.main.setting.paused = false
    this._updatePause()
    this.main.reloadTest()
  }

  onStep(evt:cc.Event.EventCustom) {
    this.main.setting.singleStep = true
  }

  setDebugDraw() {
    let bits:number = 0
    for (let c of this.debugDrawLayout.getComponentsInChildren(cc.Toggle)) {
      if (c.isChecked) {
        bits |= parseInt(c.node.name.split(' ')[0])
      }
    }
    cc.log('setDebugDraw', bits)
    cc.director.getPhysicsManager().debugDrawFlags = bits
  }
}
