

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  let that = this;
  window.setInterval(() => {
    that.bindKeyHandlers();
    that.game.moveObjects();
    that.game.updateVelocity();
    that.game.checkCollisions();
    that.game.draw(that.ctx);

  }, 20);

  key("space",function(e) {
    e.preventDefault()
    console.log("chomp sent!");
    // that.game.checkVictims();
    that.game.makeChomp(that.ctx);
  });
};

GameView.prototype.bindKeyHandlers = function() {
  let that = this;
  let impulse = [0,0];
  if(key.isPressed("w")) {
    impulse[1] -= 0.1;
  }
  if (key.isPressed("a"))  {
    impulse[0] -= 0.1;
  }
  if (key.isPressed("d"))  {
    impulse[0] += 0.1;
  }
  if (key.isPressed("s"))  {
    impulse[1] += 0.1;
  }
    that.game.moveShip(impulse);

};

module.exports = GameView;
