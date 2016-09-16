import NpcDots from './npc_dots';
import * as Util from './utils';
import UserDot from './user_dot';
import BlasterDot from './blaster_dot';
import { showStartScreen } from './start_screen';
import Bullets from './bullet.js';

class Game {
  constructor(stage) {
    this.stage = stage;
    window.stage = stage;
    this.movingObjects = [];
    this.run = this.run.bind(this);
    // this.addDots.bind(this)();
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.checkUserCollision = this.checkUserCollision.bind(this);
    this.gameStatus = "StartScreen";
    this.startScreenShowing = false;
    this.endScreenShowing = false;
    this.addBlasterDots = false;
    createjs.Sound.registerSound("computerbeep_15.mp3", "beep");
    createjs.Sound.registerSound("ent_doorchime.mp3", "death");
    createjs.Sound.registerSound("force_field_hit.mp3", "bounce");
    createjs.Sound.registerSound("tng_torpedo_clean.mp3", "blaster");
    this.bullets = []
    this.playSounds = true

    this.Mute = new createjs.Text("mute", "20px Material+Icons", "#00AAAA");
    this.Mute.x = 50;
    this.Mute.y = 50;
    this.Mute.textBaseline = "alphabetic";
    this.stage.addChild(this.Mute);
    this.Mute.addEventListener("click",(event)=>{
      if (this.playSounds) {
        this.playSounds = false;
      } else {
        this.playSounds = true;
      }
    });

  }

  addDots(difficulty) {
    const difficultyObject = {
      Sample: [5,5,5,5,true],
      Easy: [6,3,0,0,true],
      Medium: [10,12,1,0,true],
      Hard: [15,12,9,2,true]
    }

    let settings = difficultyObject[difficulty];
    let temp;
    let tempPos;

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
      vMax: 0.25
    };

    let microDotOpts = {
      radius:5,
      vMax: 10
    };

    let userDotOpts = {
      radius:10,
      vMax:6
    };

    let blasterDotOpts = {
      radius:10,
      vMax:0.25
    };

    for (let i = 0; i < settings[3]; i++) {
      temp = new NpcDots(this.stage,this,mediumDotOpts);
      this.movingObjects.push(temp);
    }

    for (let i = 0; i < settings[2]; i++) {
      temp = new NpcDots(this.stage,this,smallMedDotOpts);
      this.movingObjects.push(temp);
    }
    for (let i = 0; i < settings[1]; i++) {
      temp = new NpcDots(this.stage,this,smallDotOpts);
      this.movingObjects.push(temp);
    }

    for (let i = 0; i < settings[0]; i++) {
      temp = new NpcDots(this.stage,this,microDotOpts);
      this.movingObjects.push(temp);
    }
    if (this.addBlasterDots) {
      temp = new BlasterDot(this.stage,this,blasterDotOpts);
      this.movingObjects.push(temp)
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
            this.startScreenShowing = true;
            this.addDots("Sample")
            this.userDot.x = 1000000
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
            this.Confirm = new createjs.Text("Choose Your Difficulty!", "20px Arial", "#00AAAA");
            this.Confirm.x = 100;
            this.Confirm.y = 310;
            this.Confirm.textBaseline = "alphabetic";
            this.stage.addChild(this.Confirm);
            this.Easy = new createjs.Shape();
            this.Easy.graphics.beginFill("red").drawRect(0,0,75,50);
            this.Easy.x = 100;
            this.Easy.y = 350;
            this.stage.addChild(this.Easy);
            this.EasyText = new createjs.Text("Easy", "20px Arial", "white");
            this.EasyText.textAlign = "center"
            this.EasyText.textBaseline = "middle"
            this.EasyText.x = 137.5;
            this.EasyText.y = 375;
            this.stage.addChild(this.EasyText);
            this.Medium = new createjs.Shape();
            this.Medium.graphics.beginFill("red").drawRect(0,0,75,50);
            this.Medium.x = 200;
            this.Medium.y = 350;
            this.stage.addChild(this.Medium);
            this.MediumText = new createjs.Text("Medium", "20px Arial", "white");
            this.MediumText.textAlign = "center"
            this.MediumText.textBaseline = "middle"
            this.MediumText.x = 237.5;
            this.MediumText.y = 375;
            this.stage.addChild(this.MediumText);
            this.Hard = new createjs.Shape();
            this.Hard.graphics.beginFill("red").drawRect(0,0,75,50);
            this.Hard.x = 300;
            this.Hard.y = 350;
            this.stage.addChild(this.Hard);
            this.HardText = new createjs.Text("Hard", "20px Arial", "white");
            this.HardText.textAlign = "center"
            this.HardText.textBaseline = "middle"
            this.HardText.x = 337.5;
            this.HardText.y = 375;
            this.stage.addChild(this.HardText);

            this.BlasterOption = new createjs.Shape();
            this.BlasterOption.graphics.beginFill("red").drawRect(0,0,175,50);
            this.BlasterOption.x = 400;
            this.BlasterOption.y = 350;
            this.stage.addChild(this.BlasterOption);
            this.BlasterOptionText = new createjs.Text("Bonus Challenge?", "20px Arial", "white");
            this.BlasterOptionText.textAlign = "center"
            this.BlasterOptionText.textBaseline = "middle"
            this.BlasterOptionText.x = 487.5;
            this.BlasterOptionText.y = 375;
            this.stage.addChild(this.BlasterOptionText);

            this.Easy.addEventListener("click",(event)=>{
              this.stage.removeAllChildren();
              this.movingObjects = []
              this.addDots("Easy")
              this.gameStatus = "Playing"
              this.startScreenShowing = false
              this.stage.addChild(this.Mute);
            });

            this.Medium.addEventListener("click",(event)=>{
              this.stage.removeAllChildren();
              this.movingObjects = []
              this.addDots("Medium")
              this.gameStatus = "Playing"
              this.startScreenShowing = false
              this.stage.addChild(this.Mute);
            });

            this.Hard.addEventListener("click",(event)=>{
              this.stage.removeAllChildren();
              this.movingObjects = []
              this.addDots("Hard")
              this.gameStatus = "Playing"
              this.startScreenShowing = false
              this.stage.addChild(this.Mute);
            });

            this.BlasterOption.addEventListener("click",(event)=>{
              let thisContext = this;
              if ( this.addBlasterDots ) {
                thisContext.addBlasterDots = false;
                thisContext.BlasterOption.graphics._fill.style="red"
                thisContext.BlasterOptionText.color = "white"
              } else {
                thisContext.addBlasterDots = true;
                thisContext.BlasterOption.graphics._fill.style="yellow"
                thisContext.BlasterOptionText.color = "black"
              }
            });
          }
          this.stage.update();
          this.movingObjects.forEach((el)=>{
            el.updateState(this.userDot);
          });

          break;
        case "Playing":
          this.handleKeyboard();
          this.movingObjects.forEach((el)=>{
            el.updateState(this.userDot);
          });
          this.bullets.forEach((el,idx)=>{
            el.updateState(this.userDot);
            if (el.timeCount >= 100) {
              this.bullets.splice(idx,1);
              this.stage.removeChild(el);
            }
          });
          this.userDot.updateState();
          this.checkCollisions(this.bounceTwoEntities);
          this.checkUserCollision();
          this.checkIfWon()
          this.stage.update();
        break;
        case "Lost":
        if ( !this.endScreenShowing ) {
          this.Title = new createjs.Text("You Lost!", "50px Arial", "#00AAAA");
          this.Title.x = 100;
          this.Title.y = 200;
          this.Title.textBaseline = "alphabetic";
          this.subTitle = new createjs.Text("Press Space to Try Again!", "20px Arial", "#00AAAA");
          this.subTitle.x = 100;
          this.subTitle.y = 250;
          this.subTitle.textBaseline = "alphabetic";
          this.stage.addChild(this.Title);
          this.stage.addChild(this.subTitle);
          this.stage.update();
          this.endScreenShowing = true;
          this.addBlasterDots = false;
        }
          if (key.isPressed("space")) {
            this.stage.children = [];
            this.gameStatus = "StartScreen";
            this.endScreenShowing = false;
            this.movingObjects = []
            this.bullets=[];
          }
        break;
        case "Won":
        if ( !this.endScreenShowing ) {
          this.endScreenShowing = true
          this.Title = new createjs.Text("You Won!", "50px Arial", "#00AAAA");
          this.Title.x = 100;
          this.Title.y = 200;
          this.Title.textBaseline = "alphabetic";
          this.subTitle = new createjs.Text("Press Space to Play Again!", "20px Arial", "#00AAAA");
          this.subTitle.x = 100;
          this.subTitle.y = 250;
          this.subTitle.textBaseline = "alphabetic";
          this.stage.addChild(this.Title);
          this.stage.addChild(this.subTitle);
          this.stage.update();
          this.addBlasterDots = false;
        }

        if (key.isPressed("space")) {
          this.stage.children = [];
          this.gameStatus = "StartScreen";
          this.endScreenShowing = false;
          this.movingObjects = []
        }
        break;
        default:
      }

    };
    this.ticker = createjs.Ticker;
    this.ticker.framerate = 60;
    this.ticker.addEventListener("tick",handleTick.bind(this));

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
    const thisScope = this

    this.bullets.forEach((el)=>{
      radius2 = el.radius;
      pos2 = Util.coordFromObj(el);
      distance = Util.distanceBetweenPoints(pos1,pos2);
      if ((radius1 + radius2) > distance) {
        thisScope.stage.removeChild(thisScope.userDot)
        thisScope.gameStatus = "Lost";
      }
    })
    this.movingObjects.forEach((el,idx)=>{
      radius2 = el.radius;
      pos2 = Util.coordFromObj(el);
      distance = Util.distanceBetweenPoints(pos1,pos2);
      if ((radius1 + radius2) > distance) {

        if (this.playSounds) {
          createjs.Sound.play("death")
        }



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

  addBullet(sourceDot) {
    let pos1 = Util.coordFromObj(sourceDot);
    let pos2 = Util.coordFromObj(this.userDot);
    let vector = [pos2[0]-pos1[0],pos2[1]-pos1[1]];
    let bulletDotOpts = {
      radius:5,
      vel: Util.setVectorMagnitude(vector,10),
      pos: pos1
    };


    let temp = new Bullets(this.stage, this, bulletDotOpts)
    this.bullets.push(temp)

  }
}

document.addEventListener("DOMContentLoaded",()=>{
  const stage = new createjs.Stage("game-canvas");
  const game = new Game(stage);
  game.run();

});
