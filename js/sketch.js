let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  canvas.style("pointer-events", "none"); // important
}

function draw() {
  background(255);
  noFill();
  strokeWeight(1);

  translate(width / 2, height / 2);
  scale(1.5);
  translate(-width / 2, -height / 2);

  let time = millis() / 200.0;

  for (let i = 0; i < height; i += 10) {
    push();
    translate(sin((time + i) / 50) * 20, 0);
    beginShape();
    for (let x = 0; x < width; x += 5) {
      let freq = map(x, 0, width, 6, 24);
      let y = sin(x / freq + time) * 15;
      vertex(x, y + i);
    }
    endShape();
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
