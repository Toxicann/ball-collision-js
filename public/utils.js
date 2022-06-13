var TOP;
var LEFT;
var RADIUS;
var COLOR;
var SPEEDX;
var SPEEDY;
var MASS;

function convertPX(value) {
  return `${value}px`;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function calcRadius(r1, r2) {
  return r1 + r2;
}

function initBallParameters() {
  let R = randomInteger(0, 256);
  let G = randomInteger(0, 256);
  let B = randomInteger(0, 256);

  RADIUS = randomInteger(5, 15);
  COLOR = `rgb(${R},${G},${B})`;

  SPEEDX = Math.random() > 0.5 ? 1 : -1;
  SPEEDY = Math.random() > 0.5 ? 1 : -1;

  MASS = randomInteger(1, 100);

  TOP = randomInteger(RADIUS, WINDOW_HEIGHT - RADIUS * 2);
  LEFT = randomInteger(RADIUS, WINDOW_WIDTH - RADIUS * 2);
}

function rotate(velocity, angle) {
  const velocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return velocities;
}

function elasticCollision(current, neighbor) {
  const xDiff = current.velocity.x - neighbor.velocity.x;
  const yDiff = current.velocity.y - neighbor.velocity.y;

  const xDist = neighbor.x - current.x;
  const yDist = neighbor.y - current.y;

  //overlap condition
  if (xDiff * xDist + yDiff * yDist >= 0) {
    //angle between the two colliding particles
    const angle = -Math.atan2(neighbor.y - current.y, neighbor.x - current.x);

    const m1 = current.mass;
    const m2 = neighbor.mass;

    // need to change angle since the equation is in one dimension
    const u1 = rotate(current.velocity, angle);
    const u2 = rotate(neighbor.velocity, angle);

    // elactic collision one-dimensional newtonian equation
    const v1 = {
      x: ((m1 - m2) * u1.x + 2 * m2 * u2.x) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (2 * m1 * u1.x + (m2 - m1) * u2.x) / (m1 + m2),
      y: u2.y,
    };

    // reverting to original angle
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap current velocities for bounce effect
    current.velocity.x = vFinal1.x;
    current.velocity.y = vFinal1.y;

    neighbor.velocity.x = vFinal2.x;
    neighbor.velocity.y = vFinal2.y;
  }
}
