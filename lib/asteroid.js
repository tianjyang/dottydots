const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

function Asteroid(game) {
  this.scaredColor = [255,255,0];
  this.normalColor = [0,255,0];
  this.angryColor = [255,0,0];
  this.currentColor = [0,255,0];
  let randomPos = Util.randomVec(200);
  let options = {
    pos: [randomPos[0]+250,randomPos[1]+250],
    vel: Util.randomVec(1),
    radius: Math.random()*10+2,
    color: "rgb(" + this.normalColor + ")",
    game: game
  };
  MovingObject.call(this, options);
}
Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;

Asteroid.prototype.avoidObject = function(ship) {
  let magVectorStoA = Util.distanceBetweenPoints(this.pos,ship.pos);
  let velocityMagnitude = Util.vectorMagnitude(this.vel);
  if (magVectorStoA < 10*this.radius) {
    if (this.radius < ship.radius) {
      this.transitionColor(this.scaredColor);
      let vectorStoA = Util.vectorBetweenCenters(ship.pos,this.pos);
      let normalVectorStoA = Util.normalizedVector(vectorStoA);
      let accelFactor = 1/(magVectorStoA);
      let updatedVelocity = [0,0];
      this.vel[0] = this.vel[0]+normalVectorStoA[0]*accelFactor;
      // debugger
      this.vel[1] = this.vel[1]+normalVectorStoA[1]*accelFactor;
    } else {
      this.transitionColor(this.angryColor);
      let vectorStoA = Util.vectorBetweenCenters(this.pos,ship.pos);
      let normalVectorStoA = Util.normalizedVector(vectorStoA);
      let accelFactor = 5/(magVectorStoA);
      let updatedVelocity = [0,0];
      this.vel[0] = this.vel[0]+normalVectorStoA[0]*accelFactor;
      // debugger
      this.vel[1] = this.vel[1]+normalVectorStoA[1]*accelFactor;
    }

  } else if (velocityMagnitude > 1) {
    this.transitionColor(this.normalColor);
    this.vel[0] = this.vel[0] * 0.99;
    this.vel[1] = this.vel[1] * 0.99;
  } else {
    this.transitionColor(this.normalColor);
  }

};

Asteroid.prototype.transitionColor = function(color) {
  let newColor = [];
  for (var i = 0; i <3; i++) {
  newColor[i] = Math.floor(0.1*(color[i] - this.currentColor[i]) + this.currentColor[i]);
  }
  this.currentColor = newColor;
  this.color = "rgb(" + newColor + ")";

};
