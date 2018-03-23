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

  public loadTest(testIndex:number) {
    this.physicsNode.removeAllChildren()
    this.setting.clearDebugText()
    let prefabInfo:object = this.setting.prefabNames.length > testIndex ? this.setting.prefabNames[testIndex] : null
    if (!prefabInfo) {
      cc.error('DO NOT FIND THE Test INDEX '+testIndex)
      return
    }
    this.setting.currentTestIndex = testIndex
    cc.loader.loadRes(prefabInfo.prefabName, (err, prefab) => {
      let testNode:cc.Node = cc.instantiate(prefab)
      testNode.setPosition(cc.p(0, 0))
      testNode.parent = this.physicsNode

      let testScript:Test = testNode.getComponent(testNode.name)
      testScript.initTest(this)
      this.setting.currentTest = testScript
    });
  }

  public reloadTest() {
    this.setting.currentTest = null
    if (this.setting.currentTestIndex) {
      this.loadTest(this.setting.currentTestIndex)
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
    this._debugTextLabel = this.debugTextNode.getComponent(cc.Label)
    this.setting.prefabNames = cc.game.config.jsList
    cc.loader.loadRes('prefab/Menu', (err, prefab:cc.Prefab) => {
      let menuNode:cc.Node = cc.instantiate(prefab)
      menuNode.x = cc.winSize.width/2 - 100
      menuNode.parent = this.node
      let menuScript:Menu = menuNode.getComponent(menuNode.name)
      menuScript.initMenu(this)
    })
  }

  start () {
      this.loadTest(0)
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
