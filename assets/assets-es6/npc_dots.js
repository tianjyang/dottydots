import MovingObjects from './moving_objects';

class NpcDots extends MovingObjects {
  constructor(stage,game,options) {
    super(stage,game,options);
    this.updateVelocity = this.updateVelocity.bind(this);
    this.scaredColor = [255,255,0];
    this.normalColor = [0,255,0];
    this.angryColor = [255,0,0];
    this.currentColor = [0,255,0];
    this.displayColor = this.graphics._fill.style;

  }

  updateVelocity() {

  }
}
export default NpcDots;
