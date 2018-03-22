const {ccclass, property} = cc._decorator;
import Main from './main'

@ccclass
export default class Test extends cc.Component {

    main:Main = null

    constructor() {
      super();
    }

    initTest(main) {
      this.main = main
      this.main.setting.addDebugText(this.node.name + '\n')
    }

    onLoad () {
      // this.main.addDebugText(this.node.name)
    }

    start () {

    }

    // update (dt) {}
}
