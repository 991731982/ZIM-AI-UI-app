// 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
let img;
let groups = new Array(6);
let words = ["Sports car,", "Sedan,", "SUV,", "Pickup Truck,", "Futuristic,", "Aerodynamic,", "Cyberpunk,", "Retro,", "Speed,", "Tech,", "Utility,", "Aerial,", "Post-apocalyptic world,", "Deep sea city,", "Race track,", "Family,", "Carbon fiber,", "Laser reflective,", "Transparent Electroluminescent panels,", "Crystalized,", "Neon-lit,", "Sunset ambiance,", "Ukiyo-e,", "bioluminescent shimmer,"];
let groupOutputs = new Array(6);
let finalOutput = "";
let clearButton, copyButton;


let images = []; // Array to hold the image objects
let numRows=6; // Number of rows
let numCols=4; // Number of columns
let imageWidth = 100; // Width of each image
let imageHeight = 100; // Height of each image
let paddingx = 130; // Padding between images
let paddingy = 20; // Padding between images


let glow;


function preload() {
  img = loadImage('assets/title.png');
  glow = loadImage('assets/glow.png'); 
  font = loadFont('TCM_____.TTF');
  for (let i = 1; i <= 24; i++) { // Adjust the loop to match the number of your images
    images.push(loadImage(`assets/${i}.png`)); // Adjust the path as needed
  }
}


function setup() {
  // Calculate the number of rows and columns based on the number of images and desired layout

  createCanvas(windowWidth, windowHeight);//1480, 720);
  
  for (let i = 0; i < groups.length; i++) {
    groups[i] = new Array(4);
    groupOutputs[i] = "";
    for (let j = 0; j < groups[i].length; j++) {
      groups[i][j] = new Button(136 + j * 227, 20 + i * 120, 100,100, words[i * 4 + j]);
    }
  }

  clearButton = new TwoButton(1240, 170, 200,80, "Clear");
  copyButton = new TwoButton(1240, 300, 200,80, "Copy");


 

}

function draw() {
  background(30);
  img.resize(windowWidth, windowHeight);
  image(img, 0, -6);
  

  let imgIndex = 0; // Index to track the image from the images array

  // Nested loop to go through rows and columns
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // Calculate x and y position
      let x = col * (imageWidth + paddingx) + paddingx;
      let y = row * (imageHeight + paddingy) + paddingy;

      // Display the image at (x, y)
      if (imgIndex < images.length) {
        image(images[imgIndex], x, y, imageWidth, imageHeight);
        imgIndex++; // Move to the next image
      }
    }
  }



  groups.flat().forEach(btn => btn.display());
  clearButton.display();
  copyButton.display();

  groupOutputs.forEach((output, i) => {
    fill(255);
    text(output, 980, 34 + i * 125,80,50);
  });

  finalOutput = groupOutputs.join(" ");
  fill(255);
  textFont(font);
  textSize(22);
  text(finalOutput, 1210, 460,270,150);
  if (finalOutput.trim().length > 0) {
      glow.resize(windowWidth, windowHeight);
  image(glow, 2, -1); 
  }
  
}

function mousePressed() {
  groups.flat().forEach((btn, i) => {
    if (btn.isOver(mouseX, mouseY)) {
      groupOutputs[Math.floor(i / 4)] = btn.label;
    }
  });

  if (clearButton.isOver(mouseX, mouseY)) {
    groupOutputs.fill("");
  }

  if (copyButton.isOver(mouseX, mouseY)) {
    copyTextToClipboard(finalOutput);
  }
}

function copyTextToClipboard(str) {
  navigator.clipboard.writeText(str);
}

class Button {
  constructor(x, y, width, height, label) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
  }

  display() {
    noStroke();
    noFill();
    rect(this.x, this.y, this.width, this.height);
    fill(255);
    textFont(font);
    noFill();
    text(this.label, this.x + 20, this.y + 30);
  }

  isOver(mouseX, mouseY) {
    return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
  }
}

class TwoButton {
  constructor(x, y, width, height, label) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
  }

  display() {
    // fill("#9776ff");
    noFill();
    noStroke();
    rect(this.x, this.y, this.width, this.height);

    let textW = textWidth(this.label);
    let textH = textAscent() + textDescent();

    let textX = this.x + (this.width - textW) / 2; // Center the text horizontally
    let textY = this.y + (this.height + textH) / 2 - textDescent(); 


    fill(255);
    textFont(font);
    text(this.label, textX, textY); // Use the new text position

    
  }

  isOver(mouseX, mouseY) {
    return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
  }
}