import NpcDots from './npc_dots';
import * as Util from './utils';
import UserDot from './user_dot';
import { showStartScreen } from './start_screen';

class Game {
  constructor(stage) {
    this.stage = stage;
    this.movingObjects = [];
    this.run = this.run.bind(this);
    this.addDots.bind(this)();
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.checkUserCollision = this.checkUserCollision.bind(this);
    this.gameStatus = "StartScreen";
    this.startScreenShowing = false;
    createjs.Sound.registerSound("computerbeep_15.mp3", "beep");
    createjs.Sound.registerSound("hypospray3_clean.mp3", "death");
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
      radius:45,
      vMax: .25
    };

    let smallMedDotOpts = {
      radius:30,
      vMax:0.75
    };

    let smallDotOpts = {
      radius:15,
      vMax: 1
    };

    let microDotOpts = {
      radius:5,
      vMax: 10
    };

    let userDotOpts = {
      radius:10,
      vMax:6
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
    for (let i = 0; i < 2; i++) {
      temp = new NpcDots(this.stage,this,mediumDotOpts);
      this.movingObjects.push(temp);
    }

    for (let i = 0; i < 5; i++) {
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
    this.userDot.updateVelocity(impulse)
  }


  run () {
    const handleTick = (e) => {
      switch (this.gameStatus) {
        case "StartScreen":
          if (!this.startScreenShowing) {
            this.Title = new createjs.Text("Dotty Dots", "50px Arial", "#00AAAA");
            this.Title.x = 100;
            this.Title.y = 200;
            this.Title.textBaseline = "alphabetic";
            this.stage.addChild(this.Title);
            this.Instructions = new createjs.Text("Eat smaller dots to grow but don't get eaten!", "20px Arial", "#00AAAA");
            this.Instructions.x = 100;
            this.Instructions.y = 250;
            this.Instructions.textBaseline = "alphabetic";
            this.stage.addChild(this.Instructions)
            this.Controls = new createjs.Text("Use WASD to move", "20px Arial", "#00AAAA");
            this.Controls.x = 100;
            this.Controls.y = 280;
            this.Controls.textBaseline = "alphabetic";
            this.stage.addChild(this.Controls)
            this.Confirm = new createjs.Text("Press SpaceBar to Start!", "20px Arial", "#00AAAA");
            this.Confirm.x = 100;
            this.Confirm.y = 310;
            this.Confirm.textBaseline = "alphabetic";
            this.stage.addChild(this.Confirm)
            this.startScreenShowing = true;
          }
          this.stage.update();
          if (key.isPressed("space")) {
            this.gameStatus = "Playing"
            this.stage.removeChild(this.Title);
            this.stage.removeChild(this.Instructions);
            this.stage.removeChild(this.Controls);
            this.stage.removeChild(this.Confirm)
          }
          break;
        case "Playing":
          this.handleKeyboard();
          this.movingObjects.forEach((el)=>{
            el.updatePos();
            el.updateVelocity(this.userDot);
          });
          this.userDot.updatePos();
          this.checkCollisions(this.bounceTwoEntities);
          this.checkUserCollision();
          this.checkIfWon()
          this.stage.update();
        break;
        case "Lost":
          this.Title = new createjs.Text("You Lost!", "50px Arial", "#00AAAA");
          this.Title.x = 100;
          this.Title.y = 200;
          this.Title.textBaseline = "alphabetic";
          this.stage.addChild(this.Title);
          this.stage.update();
        break;
        case "Won":
          this.Title = new createjs.Text("You Won!", "50px Arial", "#00AAAA");
          this.Title.x = 100;
          this.Title.y = 200;
          this.Title.textBaseline = "alphabetic";
          this.stage.addChild(this.Title);
          this.stage.update();
        break;
        default:
      }

    };
    const ticker = createjs.Ticker;
    ticker.framerate = 60;
    ticker.addEventListener("tick",handleTick.bind(this));

  }

  checkIfWon(){
    if ( this.stage.children.length === 1 ) {
      this.gameStatus = "Won"
    }
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
    this.movingObjects.forEach((el,idx)=>{
      radius2 = el.radius;
      pos2 = Util.coordFromObj(el);
      distance = Util.distanceBetweenPoints(pos1,pos2);
      const thisScope = this
      if ((radius1 + radius2) > distance) {
        createjs.Sound.play("death")
        if ( radius1 > radius2 ) {
          thisScope.userDot.incrementRadius();
          thisScope.stage.removeChild(el);
          thisScope.movingObjects.splice(idx,1);
        } else {
          thisScope.stage.removeChild(thisScope.userDot)
          thisScope.gameStatus = "Lost";
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
