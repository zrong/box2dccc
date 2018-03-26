let PTM_RATIO:number = cc.PhysicsManager.PTM_RATIO
const {ccclass, property, requireComponent, menu, mixins} = cc._decorator

/**
 * @class PhysicsEdgeCollider
 * @extends PhysicsCollider
 * @uses Collider.Box
 */

 @ccclass
 @requireComponent(cc.RigidBody)
 @menu('Edge')
class PhysicsEdgeCollider extends cc.PhysicsCollider {
  name: 'cc.PhysicsEdgeCollider'

  @property(cc.Vec2)
  _size:cc.Vec2 = new cc.Vec2()

  @property(cc.Vec2)
  get size(){
    return this._size
  }

  set size(value:cc.Vec2) {
    this._size.width = value.width < 0 ? 0 : value.width;
    this._size.height = value.height < 0 ? 0 : value.height;
  }

  _createShape (scale) {
    var scaleX = Math.abs(scale.x);
    var scaleY = Math.abs(scale.y);
    var width = this.size.width/2/PTM_RATIO * scaleX;
    var height = this.size.height/2/PTM_RATIO * scaleY;

    var shape = new b2.EdgeShape();
    shape.Set(new b2.Vec2(width, 0), new b2.Vec2(-width, 0));
    return shape;
  }
}

cc.PhysicsEdgeCollider = PhysicsEdgeCollider
export default PhysicsEdgeCollider


// var PhysicsEdgeCollider = cc.Class({
//     name: 'cc.PhysicsEdgeCollider',
//     extends: cc.PhysicsCollider,
//     mixins: [cc.Collider.Box],

//     editor: {
//         menu: CC_EDITOR && 'i18n:MAIN_MENU.component.physics/Collider/Box',
//         requireComponent: cc.RigidBody
//     },

//     _createShape: function (scale) {
//         var scaleX = Math.abs(scale.x);
//         var scaleY = Math.abs(scale.y);
//         var width = this.size.width/2/PTM_RATIO * scaleX;
//         var height = this.size.height/2/PTM_RATIO * scaleY;
//         var offsetX = this.offset.x/PTM_RATIO *scaleX;
//         var offsetY = this.offset.y/PTM_RATIO *scaleY;

//         var shape = new b2.PolygonShape();
//         shape.SetAsBox(width, height, new b2.Vec2(offsetX, offsetY), 0);
//         return shape;
//     }
// });

// cc.PhysicsBoxCollider = module.exports = PhysicsBoxCollider;
