var windowScreen = document.getElementById("container");
windowScreen.style.width = convertPX(WINDOW_WIDTH);
windowScreen.style.height = convertPX(WINDOW_HEIGHT);

let ballArray = [];

class Ball {
  constructor(x, y, r, sX, sY, color, mass) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color || "#49c";
    this.velocity = {
      x: sX,
      y: sY,
    };
    this.mass = mass;

    this.create();
  }

  //creating balls
  create() {
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.left = convertPX(this.x);
    this.element.style.top = convertPX(this.y);
    this.element.style.height = convertPX(this.r * 2);
    this.element.style.width = convertPX(this.r * 2);

    this.element.style.backgroundColor = this.color;

    windowScreen.appendChild(this.element);
  }

  //moving balls
  move() {
    this.x += this.velocity.x;
    this.element.style.left = convertPX(this.x);
    this.y += this.velocity.y;
    this.element.style.top = convertPX(this.y);
  }

  //box collider for walls collision
  checkBorderCollision() {
    if (this.x > WINDOW_WIDTH - this.r * 2 || this.x < 0) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y > WINDOW_HEIGHT - this.r * 2 || this.y < 0) {
      this.velocity.y = -this.velocity.y;
    }
  }

  //circle collision for balls collision
  ballCollision() {
    ballArray.forEach((ball) => {
      if (this === ball) {
      } else {
        let radius = calcRadius(this.r, ball.r);
        let distance = calcDistance(this.x, this.y, ball.x, ball.y);
        if (distance < radius) {
          elasticCollision(this, ball);
        }
      }
    });
  }
}

//initialize ball objects
for (let i = 0; i < NO_OF_BALLS; i++) {
  initBallParameters();

  if (i > 0) {
    for (let j = 0; j < ballArray.length; j++) {
      let distance = calcDistance(LEFT, TOP, ballArray[j].x, ballArray[j].y);
      let radius = calcRadius(RADIUS, ballArray[j].r);
      if (distance <= radius) {
        TOP = randomInteger(RADIUS, WINDOW_HEIGHT - RADIUS * 2);
        LEFT = randomInteger(RADIUS, WINDOW_WIDTH - RADIUS * 2);
        j = -1;
      }
    }
  }

  const ball = new Ball(LEFT, TOP, RADIUS, SPEEDX, SPEEDY, COLOR, MASS);

  ballArray.push(ball);
}

//animation loop
function play() {
  ballArray.forEach((ball) => {
    ball.move();
    ball.ballCollision();
    ball.checkBorderCollision();
  });

  // setInterval(() => {
  //   ballArray.forEach((balls) => {
  //     balls.element.style.backgroundColor = COLOR;
  //   });
  // }, 4000);

  window.requestAnimationFrame(() => {
    play();
  });
}

play();
