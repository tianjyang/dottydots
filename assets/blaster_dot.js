import MovingObjects from './moving_objects';
import * as Utils from './utils';

class BlasterDot extends MovingObjects {
  constructor(stage,game,options) {
    super(stage,game,options);
    this.updateState = this.updateState.bind(this);
    this.color = [0,0,0];
    this.normalColor = [0,0,0];
    this.angryColor = [255,0,0];
    this.currentColor = [0,255,0];
    this.graphics.clear();
    this.graphics.beginFill(this.color).drawPolyStar(0,0,this.radius,3,0,0);
    this.velHolder = null;
    this.radiusHolder = null;
    let randomPos = Utils.initialSetupRandomPos(900,500);
  }

  updateState(userDot) {
    if ( this.seesUser(userDot) ) {
      this.freezePosition();
      this.stutter = true;
      this.pointAtUser(userDot);
      this.fireCannon();
    } else {
      this.unloadCannon();
      this.stutter = false;
      this.unfreezePosition();
      this.rotation++;
    }
    super.updateState(userDot);
  }

  fireCannon(){
    if (!this.radiusHolder) {
      this.radiusHolder = this.radius
    }
    this.radius += 0.25;
    this.graphics.beginFill(this.color).drawPolyStar(0,0,this.radius,3,0,0)
    if ( this.radius >= 35 ) {
      this.fireBullet()
      createjs.Sound.play("blaster")
      this.radius = this.radiusHolder;
      this.radiusHolder = null;
      this.graphics.clear();
      this.graphics.beginFill(this.color).drawPolyStar(0,0,this.radius,3,0,0);
    }
  }

  unloadCannon(){
    if (this.radiusHolder && this.radius > this.radiusHolder) {
      this.radius -=0.5;
      this.graphics.clear();
      this.graphics.beginFill(this.color).drawPolyStar(0,0,this.radius,3,0,0);
    } else {
      this.radiusHolder = null;
    }
  }

  freezePosition(){
    if (!this.velHolder) {
      this.velHolder = this.vel.slice(0);
      this.vel = [0,0];
    }
  }

  unfreezePosition(){
    if (this.velHolder){
      this.vel = this.velHolder.slice(0);
      this.velHolder = null;
    }
  }

  fireBullet(){
    this.game.addBullet(this);
  }

  pointAtUser(userDot){
    let y = userDot.y - this.y;
    let x = userDot.x - this.x;
    this.rotation = Math.atan2(y,x)*180/Math.PI
  }

  seesUser(userDot) {
    let pos1 = Utils.coordFromObj(userDot);
    let pos2 = Utils.coordFromObj(this);
    return Utils.distanceBetweenPoints(pos1,pos2) < 200
  }
}
export default BlasterDot;
