import Test from './Test'

export default class Settings {

  private _debugTextStrings:Array<string> = []
  private _currentPrefabName:string = null
  private _currentTest:Test = null

  public paused:boolean = false
  public singleStep:boolean = false

  constructor() {

  }

  public get currentTest() {
    return this._currentTest
  }

  public set currentTest(test:Test) {
    this._currentTest = test
  }

  public get currentPrefabName() {
    return this._currentPrefabName
  }

  public set currentPrefabName(prefabName:string) {
    this._currentPrefabName = prefabName
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
