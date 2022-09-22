function setup() {
  canvas = createCanvas(600, 300);
  canvas.parent('canvas');
  newCanvas();
  colorPicker = createColorPicker('orange');
  colorPicker.parent('drawingTools');
  slider = createSlider(1, 20, 10);
  slider.parent('drawingTools');
  slider.addClass('slider');
  downloadBtn = createButton('Download drawing');
  addPaint = createButton('Send me your drawing to be displayed!');
  downloadBtn.parent('buttons');
  downloadBtn.mousePressed(download);
  startBtn = createButton('New canvas');
  startBtn.parent('buttons');
  addPaint.parent('buttons');
  addPaint.mousePressed(sendImage);
  startBtn.mousePressed(newCanvas);
}

function draw() {
  if (mouseIsPressed) {
    stroke(colorPicker.color());
    strokeWeight(slider.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function download() {
  save('drawing.jpg');
}

function sendImage() {
  window.open("https://docs.google.com/forms/d/e/1FAIpQLSfztDjuVan5OHXD1Ous5f81LCC2Bo1tb4t-3fxGHpa2Zw1ozg/viewform?usp=sf_link")
}

function newCanvas() {
  background('#FFFFFF');
  stroke('black');
  strokeWeight(1);
  shape1_x = random(75, 450);
  shape1_y = random(75, 300);
  shape1_width = random(20, 150);
  shape1_height = random(20, 150);
  ellipse(shape1_x, shape1_y, shape1_width, shape1_height);
  shape2_x = random(5, 500);
  shape2_y = random(5, 150);
  shape2_width = random(20, 150);
  shape2_height = random(20, 150);
  rect(shape2_x, shape2_y, shape2_width, shape2_height);
  shape3_x = random(100, 500);
  shape3_y = random(0, 150);
  shape3_width = random(50, 200);
  shape3_height = random(50, 200);
  ellipse(shape3_x, shape3_y, shape3_width, shape3_height);
}