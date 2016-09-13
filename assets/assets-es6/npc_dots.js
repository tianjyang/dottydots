import MovingObjects from './moving_objects';
import * as Util from './utils';

class NpcDots extends MovingObjects {
  constructor(stage,game,options) {
    super(stage,game,options);
    this.updateVelocity = this.updateVelocity.bind(this);
    this.scaredColor = [255,255,0];
    this.normalColor = [0,255,0];
    this.angryColor = [255,0,0];
    this.currentColor = [0,255,0];
    // this.displayColor = this.graphics._fill;
    this.transitionColor = this.transitionColor.bind(this);

  }

  updateVelocity(userDot) {
    if (this.affectedByUser(userDot)){
      if ( userDot.radius < this.radius ) {
        this.transitionColor(this.angryColor);
        this.chargeAtTarget(userDot);
      } else if (userDot.radius > this.radius) {
        this.transitionColor( this.scaredColor );
        this.runAwayFrom(userDot);
      }
    } else {
      this.transitionColor( this.normalColor );
    }
  }

  chargeAtTarget(userDot) {
    let pos1 = Util.coordFromObj(this);
    let pos2 = Util.coordFromObj(userDot);
    let vectorSelfToA = Util.vectorBetweenCenters(pos1,pos2);
    vectorSelfToA = Util.normalizedVector(vectorSelfToA);
    this.vel[0] += 0.005*vectorSelfToA[0];
    this.vel[1] += 0.005*vectorSelfToA[1];
    // console.log(this.vel);
  }

  runAwayFrom(userDot) {
    let pos1 = Util.coordFromObj(this);
    let pos2 = Util.coordFromObj(userDot);
    let vectorSelfToA = Util.vectorBetweenCenters(pos2,pos1);
    let vectorSelftoA = Util.normalizedVector(vectorSelfToA);
    this.vel[0] += 0.001*vectorSelfToA[0];
    this.vel[1] += 0.001*vectorSelfToA[1];
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
