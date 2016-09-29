import MovingObjects from './moving_objects';
import * as Util from './utils';

class UserDot extends MovingObjects {
  constructor(stage,game,options) {
    super(stage,game,options);
    this.updateVelocity = this.updateVelocity.bind(this);
    this.x = 450;
    this.y = 250;
    this.vel = [0,0];
    this.graphics._fill.style = "rgb(130, 146, 206)";
    this.color = "rgb(130, 146, 206)";
    this.beepPos = [0,0];
    this.realPosX = stage.canvas.width/2;
    this.realPosY = stage.canvas.height/2;
    this.vaMx = options.vMax;
  }

  updateVelocity(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    if ( Util.vectorMagnitude(this.vel) > this.vMax ) {
      this.vel = Util.setVectorMagnitude(this.vel,this.vMax);
    }

  }

  incrementRadius(){
    this.radius += 1
    let tempX = this.x;
    let tempY = this.y;
    this.graphics.beginFill(this.color).drawCircle(0,0,this.radius);
  }

  updateState() {
    let currentPos = [this.x,this.y]
    if ( this.game.playSounds && Util.distanceBetweenPoints(this.beepPos, currentPos) > 20 ) {
      this.beepPos = [this.x, this.y];
      createjs.Sound.play("beep");
    }
    super.updateState();
  }
}
export default UserDot;
