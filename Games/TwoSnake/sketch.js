function setup() {
  tile = 20;
  createCanvas(500, 360);
  player1 = new Snake(0, 8, 'yellow');
  player2 = new Snake(width / 20 - 1, 8, 'lime');
  frameRate(5);
  food = new Food();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player1.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    player1.direction(0, 1);
  } else if (keyCode === 39) {
    player1.direction(1, 0);
  } else if (keyCode === 37) {
    player1.direction(-1, 0);
  } else if (keyCode === 87) {
    player2.direction(0, -1);
  } else if (keyCode === 83) {
    player2.direction(0, 1);
  } else if (keyCode === 65) {
    player2.direction(-1, 0);
  } else if (keyCode === 68) {
    player2.direction(1, 0);
  } else if (keyCode === 32 && (player1.lost() || player2.lost())) {
    setup();
    loop();
  }
}

function draw() {
  scale(tile);
  background('black');
  if (player1.gobble(food) || player2.gobble(food)) {
    food = new Food();
  }
  player1.move();
  player2.move();
  player1.display();
  player2.display();
  food.display();
  if (player1.lost() || player2.lost()) {
    noLoop();
  }
}

class Snake {
  constructor(x, y, color) {
    this.body = [];
    this.body[0] = createVector(x, y);
    this.xspeed = 0;
    this.yspeed = 0;
    this.color = color;
    this.size = 0;
    this.width = floor(width / tile);
    this.height = floor(height / tile);
  }
  direction(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  move() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xspeed;
    head.y += this.yspeed;
    this.body.push(head);
  }
  lengthen() {
    let head = this.body[this.body.length - 1].copy();
    this.size++;
    this.body.push(head);
  }
  gameOver() {
    fill('lime');
    textFont('georgia');
    textSize(2);
    textStyle(BOLD);
    textAlign(CENTER);
    text('GAME OVER', this.width / 2, this.height / 2);
  }
  lost() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > this.width - 1 || x < 0 || y > this.height - 1 || y < 0) {
      this.gameOver();
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let square = this.body[i];
      if (square.x == x && square.y == y) {
        this.gameOver();
        return true;
      }
    }
    return false;
  }
  gobble(food) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x == food.x && y == food.y) {
      this.lengthen();
      return true;
    }
  }
  display() {
    for (let i = 0; i < this.body.length; i++) {
      stroke('yellow');
      strokeWeight(0.05);
      fill(this.color);
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
}

class Food {
  constructor() {
    this.width = width / tile - 1;
    this.x = floor(random(this.width));
    this.height = height / tile - 1;
    this.y = floor(random(this.height));
    this.color = 'red';
  }
  display() {
    stroke('brown');
    strokeWeight(0.05);
    fill(this.color);
    rect(this.x, this.y, 1, 1);
  }
}