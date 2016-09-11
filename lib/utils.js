const Util = {
  inherits (childClass, parentClass) {
    function Surrogate(){}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  }

};

Util.randomVec = function(length){
  let direction = Math.random() * Math.PI * 2;
  let xComponent = (Math.cos(direction) * length);
  let yComponent = (Math.sin(direction) * length);
  return [xComponent,yComponent];
};

Util.distanceBetweenPoints = function(pos1, pos2) {
  let a = Math.pow((pos1[0] - pos2[0]), 2);
  let b = Math.pow((pos1[1] - pos2[1]), 2);
  return (Math.sqrt(a + b));
};

Util.wrapPos = function(pos) {
  if (pos[0] > 900) {
    pos[0] -= 900;
  } else if (pos[0] < 0) {
    pos[0] += 900;
  }

  if (pos[1] > 900) {
    pos[1] -= 900;
  } else if (pos[1] < 0) {
    pos[1] += 900;
  }

  return pos;
};

Util.vectorBetweenCenters = function(pos1,pos2) {
  let x1,x2,y1,y2;
  x1 = pos1[0];
  y1 = pos1[1];
  x2 = pos2[0];
  y2 = pos2[1];
  return [x2-x1,y2-y1];
};

Util.rotateVector = function(vector,degrees) {
  let radians = (degrees/180)*Math.pi;
  let xNew = vector[0]*Math.cos(radians) - vector[1]*Math.sin(radians);
  let yNew = vector[0]*Math.sin(radians) + vector[1]*Math.cos(radians);
  return [xNew,yNew];
};

Util.normalizedVector = function(vector) {
  let x = vector[0];
  let y = vector[1];
  let magnitude = Math.sqrt(x*x + y*y);
  return [x/magnitude, y/magnitude];
};

Util.vectorMagnitude = function(vector) {
  let x = vector[0];
  let y = vector[1];
  return Math.sqrt(x*x + y*y);
};

module.exports = Util;
