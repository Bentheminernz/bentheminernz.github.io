function start() {
  textSize(30);
  textAlign(CENTER, CENTER);
  textFont('georgia');
  imageMode(CENTER);
  backgroundCreatures = [];
  creatures = [creature1, creature2, creature3, creature4, creature5, creature6];
  setTimeout(() => display(), 150);
  noLoop();
}

function setup() {
  createCanvas(600, 580);
  start();
  // reloadGame();
}

function preload() {
  creature1 = loadImage('monster1.png');
  creature2 = loadImage('monster2.png');
  creature3 = loadImage('monster3.png');
  creature4 = loadImage('monster4.png');
  creature5 = loadImage('monster5.png');
  creature6 = loadImage('monster6.png');
}

function draw() {
  if (creatures.length != 0) {
    munchEffect();
  } else {
    creaturesCheer();
  }
}

function keyPressed() {
  if (keyCode == 32) {
      start();
  }
}

var munchCount = 0;
function munchEffect() {
  var munchMax = 30;
  if (munchCount >= munchMax) {
    munchCount = 0;
    noLoop();
    display();
  } else {
    noStroke();
    fill('#40E0D0');
    ellipse(random(600), random(580), random(50, 300));
  }
  munchCount++;
}

var cheeringCreatures = 0;
function creaturesCheer() {
  for (let i = 0; i < 2; i++) {
    image(random(backgroundCreatures), random(600), random(580), 30, 30);
  }
  cheeringCreatures = cheeringCreatures + 2;
  if (cheeringCreatures > 500) {
    noLoop();
  }
  noStroke();
  rectMode(CENTER);
  fill('#800080');
  rect(310, 300, 400, 300, 0);
  strokeWeight(2);
  stroke('#800080');
  fill('#FFD700');
  rect(300, 290, 400, 300, 0);
  textSize(60);
  displayText('You found\nthem all!', 300, 230, 3);
  displayText('Press Space\nto restart!', 300, 370, 3);
}

function displayText(message, x, y, size) {
  noStroke();
  fill('#800080');
  text(message, x + size, y + size);
  stroke('#800080');
  strokeWeight(2);
  fill('#FFFFFF');
  text(message, x, y);
}

function display() {
  background('#40E0D0');
  if (backgroundCreatures.length === 0) {
    backgroundCreatures.push(creatures.pop());
  }
  for (let i = 0; i < 10000; i++) {
    image(random(backgroundCreatures), random(300) + 150, random(290) + 145, 30, 30);
  }
  displayText(backgroundCreatures.length + '. Where is', 280, 72, 2);
  creature = new Creature(random(300) + 150, random(290) + 145, creatures.pop());
  creature.show();
  image(creature.image, 380, 72, 40, 40);
  backgroundCreatures.push(creature.image);
}

function mousePressed() {
  if (creature.clicked()) {
    loop();
  }
}

class Creature {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
  }
  show() {
    image(this.image, this.x, this.y, 30, 30);
  }
  clicked() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < 15) {
      return true;
    }
  }
}