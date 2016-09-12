import * as Util from './utils.js';

class MovingObjects extends createjs.Shape {
  constructor (stage,game,options) {
    super();
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = game;
    stage.addChild(this);
    this.updatePos = this.updatePos.bind(this);
    this.graphics.beginFill("#0000FF").drawCircle(0,0,this.radius);
    this.x = options.pos[0];
    this.y = options.pos[1];
    return this;
  }

  updatePos() {
    this.x += this.vel[0];
    this.y += this.vel[1];
    // this.shape.x += this.vel[0];
    // this.shape.y += this.vel[1];
  }
}

export default MovingObjects;
