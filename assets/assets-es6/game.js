import NpcDots from './npc_dots';
import * as Util from './utils';
import UserDot from './user_dot';

class Game {
  constructor(stage) {
    this.stage = stage;
    this.movingObjects = [];
    this.run = this.run.bind(this);
    this.addDots();
    this.handleKeyboard = this.handleKeyboard.bind(this);

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
      color: "rgb(0,255,100)"
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
    let optUsers = {
      pos: [450,250],
      vel:[0,0],
      radius: 10,
      color: "#00FF00"
    };
    let temp1 = new NpcDots(this.stage,this,opt1);
    let temp2 = new NpcDots(this.stage,this,opt2);
    let temp3 = new UserDot(this.stage,this,optUsers);
    // let temp3 = new MovingObjects(this.stage,this,opt3);
    // let temp4 = new MovingObjects(this.stage,this,opt4);
    this.movingObjects.push(temp1);
    this.movingObjects.push(temp2);
    this.userDot = temp3;

    // this.movingObjects.push(temp3);
    // this.movingObjects.push(temp4);
    this.stage.update();
  }

  handleKeyboard(){
    let impulse = [0,0];
    if(key.isPressed("w")) {
      impulse[1] = -.1;
    }
    if (key.isPressed("a"))  {
      impulse[0] = -.1;
    }
    if (key.isPressed("d"))  {
      impulse[0] = .1;
    }
    if (key.isPressed("s"))  {
      impulse[1] = .1;
    }
    // console.log("impulse is ",impulse);
    this.userDot.updateVelocity(impulse)
  }


  run () {
    const handleTick = (e) => {
      this.handleKeyboard();
      this.movingObjects.forEach((el)=>{
        el.updatePos();
      });
      this.userDot.updatePos();



      this.checkCollisions(this.bounceTwoEntities);

      this.stage.update();
    };
    const ticker = createjs.Ticker;
    ticker.framerate = 60;
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
  const stage = new createjs.Stage("game-canvas");
  const game = new Game(stage);
  game.run();

});
