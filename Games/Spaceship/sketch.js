function setup() {
  createCanvas(500, 350);
  spaceship = new Player();
  spaceshipImg = createImg('alien3.png');
  spaceshipImg.hide();
  columns = [];
  score = 0;
  highScore = 0;
}

function draw() {
  background('navy');
  if (frameCount % 90 === 0) {
    columns.push(new Column());
  }
  for (let column of columns) {
    if (column.hits(spaceship)) {
      updateHighScore();
      column.highlight = true;
      score = 0;
    }
    column.passedBySpaceship(spaceship);
    column.display();
    column.move();
  }
  textSize(32);
  fill('red')
  text('High Score: ' + highScore, 300, 24);
  spaceship.display();
  spaceship.update();
  fill('red');
  textSize(32);
  text(score, 7, 27);
}

function updateHighScore() {
  if (score > highScore) {
    score = score - 1;
    highScore = score;
  }
}

function keyPressed() {
  if (key == ' ' || keyCode === UP_ARROW) {
    spaceship.flyUp();
  }
}

class Player {
  constructor() {
    this.x = 100;
    this.y = 0;
    this.gravity = 0.6;
    this.upForce = -15;
    this.velocity = 0;
  }
  display() {
    image(spaceshipImg, this.x, this.y, 40, 40);
  }
  flyUp() {
    this.velocity = this.velocity + this.upForce;
  }
  update() {
    this.velocity = this.velocity + this.gravity;
    this.y = this.y + this.velocity;
    this.velocity *= 0.9;
    this.y = constrain(this.y, 0, height - 40);
  }
}

class Column {
  constructor() {
    this.spacing = random(80, 180);
    this.top = random(height / 2);
    this.bottom = height - (this.top + this.spacing);
    this.x = width - 80;
    this.width = 30;
    this.speed = 2;
    this.color = 'white';
    this.highlight = false;
  }
  hits(spaceship) {
    if (spaceship.y < this.top || spaceship.y > height - this.bottom) {
      if (spaceship.x > this.x && spaceship.x < this.x + this.width) {
        return true;
      }
    }
    this.highlight = false;
    return false;
  }
  display() {
    fill(this.color);
    if (this.highlight) {
      fill('red');
      background('orange');
    }
    rect(this.x, 0, this.width, this.top);
    rect(this.x, height - this.bottom, this.width, this.bottom);
  }
  move() {
    this.x = this.x - this.speed;
  }
  passedBySpaceship(spaceship) {
    if (this.x === spaceship.x) {
      score++;
    }
  }
}