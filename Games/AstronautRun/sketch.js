function setup() {
  createCanvas(620, 420);
  player = new Player();
  obstacle = new Obstacle();
  obstacles = [];
  asteroid = new Asteroid();
  asteroids = [];
  randomDistance = int(random(65, 150));
  frames = 0;
  score = 0;
  astroImgStand = createImg('astroStand.png');
  astroImgStand.hide();
  astroImgDuck = createImg('astroDuck.png');
  astroImgDuck.hide();
  alienImg = createImg('alien2.png');
  alienImg.hide();
  asteroidImg = createImg('asteroid.png');
  asteroidImg.hide();
  astroImg = astroImgStand;
  lost = false;
  highScore = 0;
}

function keyPressed() {
  if (key === ' ' || keyCode === UP_ARROW) {
    player.jump();
    if (lost === true) {
      restartGame();
    }
  }
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
  }
}

function restartGame() {
  score = 0;
  lost = false;
  obstacles = [];
  asteroids = [];
  frames = 0;
  player = new Player();
  new Obstacle();
  randomDistance = int(random(65, 150));
  loop();
}

function draw() {
  background('teal');
  textSize(24);
  fill('white');
  text(score, 5, 24);
  score++;
  frames++;
  if (frames === randomDistance) {
    obstacles.push(new Obstacle());
    frames = 0;
    randomDistance = int(random(65, 150));
  }
  for (let obstacle of obstacles) {
    if (player.hits(obstacle)) {
      background('red');
      text(score, 5, 24);
      lost = true;
      updateHighScore();
      noLoop();
    }
    obstacle.move();
    obstacle.display();
  }
  if (frames === randomDistance - 50 && randomDistance > 100) {
    asteroids.push(new Asteroid());
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.duck();
  } else {
    player.stand();
  }
  for (let asteroid of asteroids) {
    if (player.hits(asteroid)) {
      background('red');
      text(score, 5, 24);
      lost = true;
      updateHighScore();
      noLoop();
    }
    asteroid.fly();
    asteroid.display();
  }
  text('High score: ' + highScore, 400, 24);
  player.display();
  player.move();
}

class Player {
  constructor() {
    this.height = 150;
    this.width = 50;
    this.x = 0;
    this.y = height - this.height;
    this.color = 'lime';
    this.velocity = 0;
    this.gravity = 0.6;
  }
  display() {
    image(astroImg, this.x, this.y, this.width, this.height);
  }
  jump() {
    if (this.y == height - this.height) {
      this.velocity = 17;
    }
  }
  move() {
    this.y = this.y - this.velocity;
    this.velocity = this.velocity - this.gravity;
    this.y = constrain(this.y, 0, height - this.height);
  }
  hits(item) {
    return collideRectRect(this.x, this.y, this.width, this.height, item.x, item.y, item.width, item.height);
  }
  duck() {
    this.height = 50;
    astroImg = astroImgDuck;
  }
  stand() {
    this.height = 150;
    astroImg = astroImgStand;
  }
}

class Obstacle {
  constructor() {
    this.width = random(20, 40);
    this.height = random(50, 80);
    this.x = width;
    this.y = height - this.height;
  }
  display() {
    image(alienImg, this.x, this.y, this.width, this.height);
  }
  move() {
    this.x = this.x - 6;
  }
}

class Asteroid {
  constructor() {
    this.width = random(120, 150);
    this.height = random(120, 150);
    this.x = width - 20;
    this.y = 200;
  }
  display() {
    image(asteroidImg, this.x, this.y, this.width, this.height);
  }
  fly() {
    this.x = this.x - 6;
  }
}
