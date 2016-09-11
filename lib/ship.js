const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

function Ship(game) {
  let options = {
    pos: [250, 250],
    vel: [0,0],
    radius: 5,
    color: "#000000",
    game: game
  };
  MovingObject.call(this, options);
}
Util.inherits(Ship, MovingObject);

Ship.prototype.impulse = function(vector) {
  this.vel[0] += vector[0];
  this.vel[1] += vector[1];
};



module.exports = Ship;
