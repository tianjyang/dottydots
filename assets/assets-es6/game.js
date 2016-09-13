import NpcDots from './npc_dots';
import * as Util from './utils';
import UserDot from './user_dot';

class Game {
  constructor(stage) {
    this.stage = stage;
    this.movingObjects = [];
    this.run = this.run.bind(this);
    this.addDots.bind(this)();
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.gameStatus = 0;


  }

  addDots() {
    let temp;
    let tempPos;

    const collisionBoolean = () => {
      return true;
    };

    let largeDotOpts = {
      radius:75
    };

    let mediumLargeDotOpts = {
      radius:60
    };

    let mediumDotOpts = {
      radius:45
    };

    let smallMedDotOpts = {
      radius:30
    };

    let smallDotOpts = {
      radius:15
    };

    let microDotOpts = {
      radius:5
    };

    let userDotOpts = {
      radius:10
    };
    // for (let i = 0; i < 2; i++) {
    //   temp = new NpcDots(this.stage,this,largeDotOpts);
    //   this.movingObjects.push(temp);
    // }
    //
    // for (let i = 0; i < 5; i++) {
    //   temp = new NpcDots(this.stage,this,mediumLargeDotOpts);
    //   this.movingObjects.push(temp);
    // }
    //
    // for (let i = 0; i < 10; i++) {
    //   temp = new NpcDots(this.stage,this,mediumDotOpts);
    //   this.movingObjects.push(temp);
    // }

    for (let i = 0; i < 10; i++) {
      temp = new NpcDots(this.stage,this,smallMedDotOpts);
      this.movingObjects.push(temp);
    }
    for (let i = 0; i < 10; i++) {
      temp = new NpcDots(this.stage,this,smallDotOpts);
      this.movingObjects.push(temp);
    }

    for (let i = 0; i < 15; i++) {
      temp = new NpcDots(this.stage,this,microDotOpts);
      this.movingObjects.push(temp);
    }


    temp = new UserDot(this.stage, this, userDotOpts);
    this.userDot = temp;
    this.stage.update();
  }

  // addDots(){
  //   let opt1 = {
  //     pos: [100,250],
  //     vel:[0.5,0.5],
  //     radius: 50,
  //     color: "rgb(0,255,0)"
  //   };
  //   let opt2 = {
  //     pos: [800,250],
  //     vel:[0.5,-0.5],
  //     radius: 50,
  //     color: "rgb(0,255,0)"
  //   };
  //   let optUsers = {
  //     pos: [450,250],
  //     vel:[0,0],
  //     radius: 10,
  //     color: "rgb(0,0,255)"
  //   };
  //   let temp1 = new NpcDots(this.stage,this,opt1);
  //   let temp2 = new NpcDots(this.stage,this,opt2);
  //   let temp3 = new UserDot(this.stage,this,optUsers);
  //   this.movingObjects.push(temp1);
  //   this.movingObjects.push(temp2);
  //   this.userDot = temp3;
  //   this.stage.update();
  // }

  handleKeyboard(){
    let impulse = [0,0];
    if(key.isPressed("w")) {
      impulse[1] = -.05;
    }
    if (key.isPressed("a"))  {
      impulse[0] = -.05;
    }
    if (key.isPressed("d"))  {
      impulse[0] = .05;
    }
    if (key.isPressed("s"))  {
      impulse[1] = .05;
    }
    // console.log("impulse is ",impulse);
    this.userDot.updateVelocity(impulse)
  }


  run () {
    const handleTick = (e) => {
      this.handleKeyboard();
      this.movingObjects.forEach((el)=>{
        el.updatePos();
        el.updateVelocity(this.userDot);
      });

      switch (this.gameStatus) {
        case -1:
          console.log("you lose!");
          break;
        default:
          this.userDot.updatePos();
      }





      this.checkCollisions(this.bounceTwoEntities);
      this.checkUserCollision();
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

  checkUserCollision(){
    let radius2, pos2, distance;
    let radius1 = this.userDot.radius;
    let pos1 = Util.coordFromObj(this.userDot);
    this.movingObjects.forEach((el)=>{
      radius2 = el.radius;
      pos2 = Util.coordFromObj(el);
      distance = Util.distanceBetweenPoints(pos1,pos2);
      if ((radius1 + radius2) > distance) {
        if ( radius1 > radius2 ) {
          this.userDot.radius += 1;
          this.stage.removeChild(el);
        } else {
          this.stage.removeChild(this.userDot)
          this.gameStatus = -1;
        }
      }
    })
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  const stage = new createjs.Stage("game-canvas");
  const game = new Game(stage);
  game.run();

});
