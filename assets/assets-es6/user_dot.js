import MovingObjects from './moving_objects';

class UserDot extends MovingObjects {
  constructor(stage,game,options) {
    super(stage,game,options);
    this.updateVelocity = this.updateVelocity.bind(this);
    this.x = 450;
    this.y = 250;
    this.vel = [0,0];
    this.graphics._fill.style = "rgb(0,0,255)";
    this.color = "rgb(0,0,255)";
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
}
export default UserDot;
