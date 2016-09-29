import MovingObjects from './moving_objects';
import * as Util from './utils';

class NpcDots extends MovingObjects {
  constructor(stage,game,options) {
    super(stage,game,options);
    this.updateState = this.updateState.bind(this);
    this.scaredColor = [216,230,66];
    this.normalColor = [149,162,10];
    this.angryColor = [165, 32, 11];
    this.currentColor = [149,162,10];
    this.transitionColor = this.transitionColor.bind(this);

    this.accelScale = 0.05;

  }

  updateState(userDot) {
    if (this.affectedByUser(userDot)){
      this.stutter = true;
      if ( userDot.radius <= this.radius ) {
        this.transitionColor(this.angryColor);
        this.chargeAtTarget(userDot);
      } else if (userDot.radius > this.radius) {
        this.transitionColor( this.scaredColor );
        this.runAwayFrom(userDot);
      }
    } else {
      this.stutter = false;
      this.transitionColor( this.normalColor );
      if (Util.vectorMagnitude(this.vel) > this.vMax) {
        this.vel = Util.vectorScale(this.vel,0.95);
      }
    }
    super.updateState(userDot);
  }

  chargeAtTarget(userDot) {
    let pos1 = Util.coordFromObj(this);
    let pos2 = Util.coordFromObj(userDot);
    let vectorSelfToA = Util.vectorBetweenCenters(pos1,pos2);
    vectorSelfToA = Util.normalizedVector(vectorSelfToA);
    this.vel[0] += 0.01*vectorSelfToA[0];
    this.vel[1] += 0.01*vectorSelfToA[1];
  }

  runAwayFrom(userDot) {
    let pos1 = Util.coordFromObj(this);
    let pos2 = Util.coordFromObj(userDot);
    let vectorSelfToA = Util.vectorBetweenCenters(pos2,pos1);
    vectorSelfToA = Util.normalizedVector(vectorSelfToA);
    this.vel[0] += this.accelScale*vectorSelfToA[0];
    this.vel[1] += this.accelScale*vectorSelfToA[1];
  }

  affectedByUser(userDot) {
    let pos1 = Util.coordFromObj(this);
    let pos2 = Util.coordFromObj(userDot);
    let distance = Util.distanceBetweenPoints(pos1,pos2);
    return( 10*userDot.radius > distance );
  }

  transitionColor(color){
    let newColor = [];
    for (var i = 0; i <3; i++) {
      newColor[i] = Math.floor(0.1*(color[i] - this.currentColor[i]) + this.currentColor[i]);
    }
    this.currentColor = newColor;
    this.graphics._fill.style = "rgb(" + newColor + ")";
  }
}
export default NpcDots;
