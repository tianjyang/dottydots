class Text {
  constructor(text, duration = 50, pos = [250,250]) {
    this.duration = duration;
    this.pos = pos;
    this.textToDraw = text;
    this.show = true;
    this.frameCount = 0;
  }

  draw(ctx) {
    this.frameCount += 1;
    if (this.frameCount > this.duration) {
      this.show = false;
    }
    // debugger
    let xCoord = this.pos[0];
    let yCoord = this.pos[1];

    ctx.save();
    // ctx.rotate(Math.PI/4);
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(this.textToDraw,xCoord,yCoord);
    ctx.restore();
  }
}

module.exports = Text;
