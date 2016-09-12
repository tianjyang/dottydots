import MovingObjects from './moving_objects';

class Game {
  constructor(stage) {
    this.stage = stage;
    this.movingObjects = [];
    this.run = this.run.bind(this);
    this.addDots();
  }

  addDots(){
    let opt1 = {
      pos: [100,100],
      vel:[-1,-1],
      radius: 200,
      color: "#0000FF"
    };
    let opt2 = {
      pos: [800,100],
      vel:[1,-1],
      radius: 200,
      color: "#0000FF"
    };
    let opt3 = {
      pos: [100,400],
      vel:[-1,1],
      radius: 200,
      color: "#0000FF"
    };
    let opt4 = {
      pos: [800,400],
      vel:[1,1],
      radius: 200,
      color: "#0000FF"
    };
    debugger
    let temp1 = new MovingObjects(this.stage,this,opt1);
    let temp2 = new MovingObjects(this.stage,this,opt2);
    let temp3 = new MovingObjects(this.stage,this,opt3);
    let temp4 = new MovingObjects(this.stage,this,opt4);
    this.movingObjects.push(temp1);
    this.movingObjects.push(temp2);
    this.movingObjects.push(temp3);
    this.movingObjects.push(temp4);

  }


  run () {
    const handleTick = () => {
      this.movingObjects.forEach((el,idx)=>{
        if (idx===0){

          console.log("x is ", el.x, "y is ",el.y);
        }

        el.updatePos();
      });
      this.stage.update();
    };
    createjs.Ticker.addEventListener("tick",handleTick.bind(this));
  }


}

document.addEventListener("DOMContentLoaded",()=>{
  console.log("document ready");
  const stage = new createjs.Stage("game-canvas");
  const game = new Game(stage);
  game.run();

});
