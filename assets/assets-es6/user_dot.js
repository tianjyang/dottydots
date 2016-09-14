import MovingObjects from './moving_objects';
import * as Util from './utils'

class UserDot extends MovingObjects {
  constructor(stage,game,options) {
    super(stage,game,options);
    this.updateVelocity = this.updateVelocity.bind(this);
    this.x = 450;
    this.y = 250;
    this.vel = [0,0];
    this.graphics._fill.style = "rgb(0,0,255)";
    this.color = "rgb(0,0,255)";
    this.beepPos = [0,0];
  }

  updateVelocity(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  incrementRadius(){
    this.radius += 1
    let tempX = this.x;
    let tempY = this.y;
    this.graphics.beginFill(this.color).drawCircle(0,0,this.radius);
  }

  updatePos() {
    let currentPos = [this.x,this.y]
    if ( Util.distanceBetweenPoints(this.beepPos, currentPos) > 20 ) {
      this.beepPos = [this.x, this.y];
      createjs.Sound.play("beep");
    }
    super.updatePos();
  }
}
export default UserDot;
