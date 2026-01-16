let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  canvas.style("pointer-events", "none"); // important
  noSmooth();
}

function draw() {
  background(255);
  noFill();
  strokeWeight(1);
  scale(1.2);
  translate(-width/2, -height/2);

  let time = millis() / 200.0;
  let space = 100

  for (let i = 0; i < height; i += 20) {
    push();
    translate(sin((time + i) / 50) * 20, 0);
    beginShape();
    for (let x = 0; x < width + space; x += space) {
      let freq = map(x, 0, width, 6, 24);
      let y = sin(x / freq + time) * map(mouseX,0,width,15,75);
      vertex(x, y + i);
    }
    endShape();
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
