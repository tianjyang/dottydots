import MovingObjects from './moving_objects';

class UserDot extends MovingObjects {
  constructor(stage,game,options) {
    super(stage,game,options);
    this.updateVelocity = this.updateVelocity.bind(this);
    this.x = 450;
    this.y = 250;
    this.vel = [0,0]

  }

  updateVelocity(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }
}
export default UserDot;
