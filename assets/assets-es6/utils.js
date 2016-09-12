export const randomVec = (length) => {
  let direction = Math.random() * Math.PI * 2;
  let xComponent = (Math.cos(direction) * length);
  let yComponent = (Math.sin(direction) * length);
  return [xComponent,yComponent];
};

export const distanceBetweenPoints = (pos1, pos2) => {
  let a = Math.pow((pos1[0] - pos2[0]), 2);
  let b = Math.pow((pos1[1] - pos2[1]), 2);
  return (Math.sqrt(a + b));
};

export const vectorBetweenCenters = (pos1,pos2) => {
  let x1,x2,y1,y2;
  x1 = pos1[0];
  y1 = pos1[1];
  x2 = pos2[0];
  y2 = pos2[1];
  return [x2-x1,y2-y1];
};

export const rotateVector = (vector,degrees) => {
  let radians = (degrees/180)*Math.pi;
  let xNew = vector[0]*Math.cos(radians) - vector[1]*Math.sin(radians);
  let yNew = vector[0]*Math.sin(radians) + vector[1]*Math.cos(radians);
  return [xNew,yNew];
};

export const normalizedVector = (vector) => {
  let x = vector[0];
  let y = vector[1];
  let magnitude = Math.sqrt(x*x + y*y);
  return [x/magnitude, y/magnitude];
};

export const vectorMagnitude = (vector) => {
  let x = vector[0];
  let y = vector[1];
  return Math.sqrt(x*x + y*y);
};

export const dotProduct = (vector1,vector2) => {
  return (vector1[0]*vector2[0] + vector1[1]*vector2[1]);
};

export const coordFromObj = (obj) => {
  return [obj.x,obj.y];
};

export const vectorScale = (vector,scale) => {
  let x = vector[0];
  let y = vector[1];
  return ([x*scale,y*scale]);
};

export const setVectorMagnitude = (vector,magnitude) => {
  return vectorScale(vector,magnitude/vectorMagnitude(vector));
};
