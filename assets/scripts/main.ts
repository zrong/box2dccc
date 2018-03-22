const {ccclass, property} = cc._decorator;
import Menu from './Menu'
import Test from './Test'
import Settings from './Settings'

@ccclass
export default class Box2DCCC extends cc.Component {

  @property(cc.Node)
  debugTextNode:cc.Node = null

  @property(cc.Node)
  physicsNode:cc.Node = null

  pm:cc.PhysicsManager = null
  setting:Settings = null

  private _debugTextLabel:cc.Label = null

  constructor() {
    super()
    this.setting = new Settings()
    this._initPhysics()
  }

  private _initPhysics() {
    this.pm = cc.director.getPhysicsManager()
    this.pm.enabled = true
  } 

  private _loadTest(prefabName) {
    this.setting.clearDebugText()
    this.setting.currentPrefabName = prefabName
    cc.loader.loadRes(prefabName, (err, prefab) => {
      let testNode:cc.Node = cc.instantiate(prefab)
      testNode.setPosition(cc.p(0, 0))
      testNode.parent = this.physicsNode

      this.currentTestNode = testNode
      let testScript:Test = testNode.getComponent(testNode.name)
      testScript.initTest(this)
      this.setting.currentTest = testScript
    });
  }

  public reloadTest() {
    this.physicsNode.removeAllChildren()
    this.setting.currentTest = null
    if (this.setting.currentPrefabName) {
      this._loadTest(this.setting.currentPrefabName)
    }
  }

  public updatePaused(paused:boolean) {
    // 物理世界使用 cc.Scheduler 驱动，使用 Scheduler 提供的方法就可以暂停
    let sched:cc.Scheduler = cc.director.getScheduler()
    if (paused) {
      if (sched.isTargetPaused(this.pm)) return
      sched.pauseTarget(this.pm)
    }
    else {
      sched.resumeTarget(this.pm)
    }
  }

  onLoad() {
    cc.loader.loadRes('prefab/Menu', (err, prefab:cc.Prefab) => {
      let menuNode:cc.Node = cc.instantiate(prefab)
      menuNode.x = cc.winSize.width/2 - 100
      menuNode.parent = this.node
      let menuScript:Menu = menuNode.getComponent(menuNode.name)
      menuScript.initMenu(this)
    })
    this._debugTextLabel = this.debugTextNode.getComponent(cc.Label)
    cc.log('this._debugTextLabel', this._debugTextLabel)
  }

  start () {
    this._loadTest("prefab/RongTest1")
  }

  update (dt) {
    this._debugTextLabel.string = this.setting.debugText
    if(this.setting.paused) {
      if (this.setting.singleStep) {
        this.updatePaused(false)
      }
      else {
        this.updatePaused(true)
      }
      this.setting.singleStep = false
    }
  }
}
