import Test from './Test'

export default class Settings {

  private _debugTextStrings:Array<string> = []
  private _currentTest:Test = null

  private _prefabNames:Array<object> = []

  public paused:boolean = false
  public singleStep:boolean = false
  public currentTestIndex:number = null

  constructor() {

  }

  public set prefabNames(jsList) {
    for (let jsFile of jsList) {
      let index:number = jsFile.lastIndexOf('assets/scripts/tests/')
      if (index > -1) {
        let jsSplit:Array<string> = jsFile.split('/')
        let jsName:string = jsSplit[jsSplit.length-1]
        let mainName:string = jsName.slice(0, jsName.length-3)
        let prefabName:string = 'prefab/tests/' + mainName
        this._prefabNames.push({index: this._prefabNames.length, mainName, jsName, prefabName, jsFile})
      }
    }
    cc.log('prefabNames', this._prefabNames)
  }

  public get prefabNames() {
    return this._prefabNames
  }

  public get currentTest() {
    return this._currentTest
  }

  public set currentTest(test:Test) {
    this._currentTest = test
  }

  public clearDebugText() {
    this._debugTextStrings = []
  }

  public get debugText() {
    return this._debugTextStrings.join('\n')
  }

  public addDebugText(txt:string) {
    this._debugTextStrings.push(txt)
  }

  public removeDebugText(txt:string) {
    let index:number = this._debugTextStrings.indexOf(txt)
    if (index > -1) {
      this._debugTextStrings.splice(index, 1)
    }
  }
}
