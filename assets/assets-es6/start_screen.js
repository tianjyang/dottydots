class StartScreen {
  constructor(stage) {
    this.stage = stage;
    this.Title = new createjs.Text("Welcome to Dotty Dots!","20px arial","#0000FF");
    this.Title.x = 450;
    this.Title.y = 100;
    stage.addChild(this.Title);
  }
}

export default StartScreen;
