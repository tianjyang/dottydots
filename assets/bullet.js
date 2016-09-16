import MovingObjects from './moving_objects';
import * as Util from './utils';

class Bullets extends MovingObjects {
  constructor(stage,game,options) {
    super(stage,game,options);
    this.updateVelocity = this.updateVelocity.bind(this);
    this.x = options.pos[0];
    this.y = options.pos[1];
    this.realPosX = this.x;
    this.realPosY = this.y;
    this.vel = options.vel;
    this.graphics._fill.style = "rgb(0,0,0)";
    this.color = "rgb(0,0,0)";
    this.timeCount = 0;
  }

  updateVelocity(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  updateState() {
    this.timeCount++;
    super.updateState();
  }
}
export default Bullets;
