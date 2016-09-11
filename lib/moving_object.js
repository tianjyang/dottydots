const Util = require('./utils.js');

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
};

MovingObject.prototype.move = function () {

  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

  this.pos = Util.wrapPos(this.pos);
};



MovingObject.prototype.isCollidedWith = function(otherObject) {

  let distanceBetween = Util.distanceBetweenPoints(this.pos, otherObject.pos);
  let minDistanceBetween = this.radius + otherObject.radius;
  if (distanceBetween < minDistanceBetween) {
    return true;
  } else {
    return false;
  }

};

module.exports = MovingObject;
