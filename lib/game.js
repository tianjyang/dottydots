const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Text = require('./text.js');

function Game(dimX, dimY) {


  this.DIM_X = 900;
  this.DIM_Y = 900;

  this.NUM_ASTEROIDS = 10;
  this.movingObjects = [];
  this.movingShip = [];
  this.movingBullets = [];
  this.addAsteroids();
  this.addShip();
  this.chomps = [];

}

Game.prototype.makeChomp = function(ctx) {
  let ship = this.movingShip[0];

  let newChomp = new Text("Chomp!",10,ship.pos.slice(0,2));
  this.chomps.push(newChomp);
};

Game.prototype.updateVelocity = function() {
  let ship = this.movingShip[0];
  this.movingObjects.forEach((element) => {
    element.avoidObject(ship);
  });
};

Game.prototype.addAsteroids = function() {

  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.movingObjects.push(new Asteroid(this));
  }

};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,900,900);
  this.allObjects().forEach ( (el) => {
    el.draw(ctx);
  });
  this.chomps.forEach( (el) => {
    if(el.show){
      el.draw(ctx);
    } else {
      this.removeText(el);
    }
  });
};

Game.prototype.moveShip = function (impulse) {
  this.movingShip[0].impulse(impulse);
};

Game.prototype.moveObjects = function() {
  let checker = this.allObjects();
  this.allObjects().forEach( el => el.move());
};

Game.prototype.removeObject = function(object) {
  let index = this.movingObjects.findIndex((el)=>{
      return el === object;
  });
  this.movingObjects.splice(index,1);

};

Game.prototype.removeText = function(text) {
  let index = this.chomps.findIndex((el)=> {
    return el === text;
  });
  this.chomps.splice(index,1);
};

Game.prototype.addShip = function() {
  this.movingShip.push(new Ship(this));
};

Game.prototype.allObjects = function() {
  return this.movingObjects.concat(this.movingShip);
};


Game.prototype.checkCollisions = function() {
  let ship = this.movingShip[0];
  this.movingObjects.forEach((el,idx) => {
    if (ship.isCollidedWith(el) && el.radius > ship.radius) {
      console.log("you got eaten!");
    } else if (ship.isCollidedWith(el) && el.radius < ship.radius ){
      console.log("You did some eating!");
      this.removeObject(el);
      ship.radius += 1;

    }
  });
};


module.exports = Game;
