const {ccclass, property} = cc._decorator;
import Main from './Main'

@ccclass
export default class Menu extends cc.Component {

  @property(cc.Node)
  debugDrawLayout:cc.Node = null

  @property(cc.Node)
  stepBtnNode:cc.Node = null

  @property(cc.Node)
  scrollContent:cc.Node = null

  @property(cc.Node)
  scrollView:cc.Node = null

  @property(cc.Node)
  scrollItemTPL:cc.Node = null

  main:Main = null

  initMenu(main) {
    this.main = main
    this._updatePause()
    this._buildScrollContent()
  }

  private _buildScrollContent() {
    let initX:number = 6
    let initY:number = -6
    for (let i=0; i<this.main.setting.prefabNames.length; i++) {
      let prefabInfo:object = this.main.setting.prefabNames[i]
      let btnNode:cc.Node = cc.instantiate(this.scrollItemTPL)
      btnNode.active = true
      btnNode.name = prefabInfo.mainName
      btnNode.x = initX
      btnNode.y = initY - i * 35
      btnNode.getChildByName('Label').getComponent(cc.Label).string = prefabInfo.mainName

      var clickEventHandler = new cc.Component.EventHandler();
      clickEventHandler.target = this.node
      clickEventHandler.component = "Menu"
      clickEventHandler.handler = "onTestSelect"
      clickEventHandler.customEventData = i.toString()

      let btnScript:cc.Button = btnNode.getComponent(cc.Button)
      btnScript.clickEvents.push(clickEventHandler);
      cc.log(btnNode.name)
      this.scrollContent.addChild(btnNode)
    }
  }

  onLoad () {
    this.setDebugDraw()
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  onTestSelect(evt:cc.Event.EventCustom, customEventData) {
    this.onSelectATestClick(null)
    this.main.loadTest(Number.parseInt(customEventData))
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

  onSelectATestClick(evt:cc.Event.EventCustom) {
    this.scrollView.active = !this.scrollView.active
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
