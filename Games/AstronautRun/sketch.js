function setup() {
  createCanvas(665, 480);
  bgColor = 'black';
  alienPic = createImg('alien1.jpg');
  alienPic.hide();
  alienX = 0;
  alienY = 430;
  alienWidth = 50;
  alienHeight = 50;
  alienSpeed = 0.03;
  points = 0;
  frameRate(60);
  noLoop();
  // create button
  button = createButton('Start');
  button.position(-300, -480, 'relative');
  button.style('background', 'lime');
  button.style('color', 'white');
  button.mouseClicked(startGame);
  // create text
  gameMessage = createElement('h1');
  gameMessage.position(400, 300);
  gameMessage.style('font-style', 'italic');
  gameMessage.style('color', 'gold');
  newSession = true;
}

function draw() {
  background(bgColor);
  // draws alien image
  image(alienPic, alienX, alienY, alienWidth, alienHeight);
  textSize(30);
  fill('white');
  text(points, 600, 25);
  textSize(30);
  fill('white');
  text('Level: ' + stage, 300, 50);
  // makes the alien follow the mouse
  distanceX = mouseX - alienX;
  alienX = distanceX * alienSpeed + alienX;
  distanceY = mouseY - alienY;
  alienY = distanceY * alienSpeed + alienY;
  // keeps alien inside the canvas
  alienX = constrain(alienX, 0, width - alienWidth);
  alienY = constrain(alienY, 0, height - alienHeight);
  // if alien touches mouse, stop game
  if (mouseX >= alienX - 1 && mouseX <= alienX + alienWidth && mouseY >= alienY - 1 && mouseY <= alienY + alienHeight) {
    gameMessage.html('Game Over');
    stopGame();
  }
  if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0) {
    gameMessage.html('Out of Bounds');
    stopGame();
  }
  if (newSession === true) {
    gameMessage.html('Click start to begin');
  }
  if (frameCount % 60 === 0) {
    points++;
    if (points % 10 === 0) {
      alienSpeed = alienSpeed + 0.03;
      changeBgColor(points);
    }
  }
}

function stopGame() {
  background('navy');
  textSize(30);
  fill('white');
  text(points, 600, 25);
  noLoop();
  alienX = 50;
  alienY = 550;
}

function startGame() {
  stage = 'Easy';
  points = 0;
  gameMessage.html('');
  bgColor = 'black';
  newSession = false;
  alienSpeed = 0.03;
  loop();
}

function changeBgColor(points) {
  switch (points) {
    case 10:
      bgColor = 'green';
      stage = 'Intermediate';
      break;
    case 20:
      bgColor = 'blue';
      stage = 'Hard';
      break;
    case 30:
      bgColor = 'yellow';
      stage = 'Advanced';
      break;
    case 40:
      bgColor = 'red';
      stage = 'Expert';
      break;
    case 50:
      bgColor = 'black';
      stage = 'Boss';
      break;
  }
}