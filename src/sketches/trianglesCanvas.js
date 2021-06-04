import React from "react"
import Sketch from "react-p5";
let triangle = (props) => {
	let lins=[];
	let size=10
	let even = true
	let t = 0;
	let s1, s2, s3;

	const setup = (sketch, canvasParentRef) => {
	  sketch.createCanvas(window.screen.width, window.screen.height).parent(canvasParentRef);
	  sketch.colorMode(sketch.HSL)
	  sketch.frameRate(30)
	  size = props.density || 125;
	  lins = [];
	  even = true;
	  for(let y=-size; y<sketch.height*1.2; y+=size){
	    let lin=[];
	    even=!even
	    for(let x=-size; x<sketch.width*1.1; x+=size){  
	    lin.push(sketch.createVector(x + sketch.random(0, size),
	                          y + sketch.random(size/5, size/2)))
	    }
	    lins.push(lin)
	  }
	  
	  let pos = 50
	  s1 = sketch.createSlider(0, 360, 219, 1);
	  s1.position(10, pos);
	  s2 = sketch.createSlider(0, 100, 36, 1);
	  s2.position(10, pos+20);
	  s3 = sketch.createSlider(0, 100, 56, 1);
	  s3.position(10, pos+40);
	}

	const draw = (sketch) => {
	  
	  t += 0.007;
	  //Spaghetti Code
	  for(let i=0;i<lins.length-1;i+=1){
	    for(let j=0; j<lins[0].length-1;j+=1){
	      
		  
	    //   let perlin = sketch.map(sketch.noise(t, i, j)*sketch.sin(t), 0, 1, 0, 100);
	      let hu = sketch.map(sketch.noise(t, j, i), 0, 1, 0, 30);
		  let sliderColor = sketch.color(s1.value() + hu, s2.value() - hu, s3.value() + hu)
	    //   let c = sketch.color(hu, perlin, perlin);
	    //   let c2 = sketch.color(0, perlin*10, 10);
	      sketch.fill(sliderColor); sketch.stroke(0);

	      try{
	      if(i % 2 === 0)
	      sketch.triangle(lins[i][j].x, lins[i][j].y, lins[i+1][j].x, lins[i+1][j].y, 
	               lins[i][j+1].x, lins[i][j+1].y);
	      sketch.triangle(lins[i+1][j+1].x, lins[i+1][j+1].y, lins[i+2][j+1].x, lins[i+2][j+1].y, 
	               lins[i+1][j].x, lins[i+1][j].y);
	      if(j<lins[1].length-1 && i % 2 === 1)
	      sketch.triangle(lins[i][j].x, lins[i][j].y, lins[i][j+1].x, lins[i][j+1].y,
	               lins[i-1][j+1].x, lins[i-1][j+1].y);
	      sketch.triangle(lins[i+1][j].x, lins[i+1][j].y, lins[i+1][j+1].x, lins[i+1][j+1].y, 
	               lins[i][j].x, lins[i][j].y);
	      }catch(TypeError){}
	    }
	  }
	}
	return <Sketch setup={setup} draw={draw}/>;
}
export default triangle;