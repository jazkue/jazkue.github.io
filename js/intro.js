let lines = [];
let currentLine = null;
let mouse_is_being_pressed = false;
let mouse_is_being_dragged = false;
let mouse_has_been_released = false;

document.addEventListener(
  "touchmove",
  e => e.preventDefault(),
  { passive: false }
);

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  canvas.style("pointer-events", "none");

  noSmooth();
}

function draw() {
  background(255);
  noFill();
  stroke(0);
  strokeWeight(1);

  translate(-width / 2, -height / 2);

  let time = millis() / 200.0;
  let mouse_freq = map(mouseX,0,width,15,75)

  // start new line
  if (mouse_is_being_pressed) {
    currentLine = {
      points: [],
      t: 0,
      released: false
    };
    lines.push(currentLine);
    mouse_is_being_pressed = false;
  }

  // record raw points
  if (mouse_is_being_dragged && currentLine) {
    if (frameCount % 2 === 0) {
      currentLine.points.push([mouseX, mouseY]);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // ease transition AFTER release
    if (line.released && line.t < 1) {
      line.t = min(1, line.t + 0.03); // transition speed
    }

    beginShape();
    for (let j = 0; j < line.points.length; j++) {
      let x = line.points[j][0];
      let y = line.points[j][1];

      // deformation blended by t
      let deform = sin(x * 0.02 + time) * mouse_freq * line.t;

      vertex(x, y + deform);
    }
    endShape();
  }

  if (mouse_has_been_released && currentLine) {
    currentLine.released = true;
    currentLine = null;
    mouse_has_been_released = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  mouse_is_being_pressed = true;
}

function mouseDragged() {
  mouse_is_being_dragged = true;
}

function mouseReleased() {
  mouse_is_being_pressed = false;
  mouse_is_being_dragged = false;
  mouse_has_been_released = true
}
