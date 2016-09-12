import MovingObjects from './moving_objects';
import * as Util from './utils';

class Game {
  constructor(stage) {
    this.stage = stage;
    this.movingObjects = [];
    this.run = this.run.bind(this);
    this.addDots();
  }

  addDots(){
    let opt1 = {
      pos: [400,250],
      vel:[1,1],
      radius: 50,
      color: "#0000FF"
    };
    let opt2 = {
      pos: [600,250],
      vel:[0.5,1],
      radius: 50,
      color: "#0000FF"
    };
    let opt3 = {
      pos: [100,400],
      vel:[-1,1],
      radius: 50,
      color: "#0000FF"
    };
    let opt4 = {
      pos: [800,400],
      vel:[1,1],
      radius: 50,
      color: "#0000FF"
    };
    let temp1 = new MovingObjects(this.stage,this,opt1);
    let temp2 = new MovingObjects(this.stage,this,opt2);
    // let temp3 = new MovingObjects(this.stage,this,opt3);
    // let temp4 = new MovingObjects(this.stage,this,opt4);
    this.movingObjects.push(temp1);
    this.movingObjects.push(temp2);
    // this.movingObjects.push(temp3);
    // this.movingObjects.push(temp4);
    this.stage.update();


  }


  run () {
    const handleTick = (e) => {
      this.movingObjects.forEach((el)=>{
        el.updatePos();
        // el.bounceOffWalls();
      });

      this.checkCollisions(this.bounceTwoEntities);

      this.stage.update();
    };
    const ticker = createjs.Ticker;
    ticker.framerate = 60;
    console.log(ticker.framerate);
    ticker.addEventListener("tick",handleTick.bind(this));

  }

  bounceTwoEntities(object1,object2) {
    let pos1 = Util.coordFromObj(object1);
    let pos2 = Util.coordFromObj(object2);
    let normalVector1 = Util.normalizedVector(Util.vectorBetweenCenters(pos2,pos1));
    object1.reflectVelocity(normalVector1);
    let normalVector2 = Util.normalizedVector(Util.vectorBetweenCenters(pos1,pos2));
    object2.reflectVelocity(normalVector2);
  }

  checkCollisions(callback) {
    console.log("checkingcollision");
    let pos1 = [];
    let pos2 = [];
    let radius1,radius2;
    let distance = null;
    let numEntities = this.movingObjects.length;
    for (let i = 0; i < numEntities-1; i++) {
      for (let j = i+1; j < numEntities; j++) {
        pos1 = Util.coordFromObj(this.movingObjects[i]);
        radius1 = this.movingObjects[i].radius;
        pos2 = Util.coordFromObj(this.movingObjects[j]);
        radius2 = this.movingObjects[j].radius;
        distance = Util.distanceBetweenPoints(pos1,pos2);
        if (distance <= (radius1 + radius2)) {
          callback(this.movingObjects[i],this.movingObjects[j]);
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  console.log("document ready");
  const stage = new createjs.Stage("game-canvas");
  const game = new Game(stage);
  game.run();

});
