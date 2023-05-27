import React from "react";
import Sketch from "react-p5";
let circles = (props) => {
  var lins = [];
  var gap = 10;
  var size = 40;
  var t = Math.random() * 10;
  var height = window.screen.height;
  var width = window.screen.width;
  var hu, sat;

  function setup(sketch, canvasParentRef) {
    sketch.createCanvas(window.screen.width, window.screen.height).parent(canvasParentRef);
    sketch.colorMode(sketch.HSB);
    sketch.frameRate(30);
    sketch.noStroke();
  }

  function draw(sketch) {
    sketch.background(0);
    t += 0.01 + Math.random() * 0.05;
    size += sketch.sin(t) * 0.01;
    for (let y = size / 2; y < height; y += size) {
      let lin = [];

      for (let x = size / 2; x < width; x += size) {
        hu = sketch.map(x + y, gap, height + width, 50, 55);
        sat = sketch.map(x + y, gap, height + width, 55, 100 * 100);
        sketch.fill(hu, sat % 100, sat % 100);

        lin.push([x + size, y]);
        sketch.circle(x, y, size);
      }
      lins.push(lin);
    }
  }
  return <Sketch setup={setup} draw={draw} className="sketch-container" />;
};
export default circles;
