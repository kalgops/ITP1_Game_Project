//Game Project 8 - Complete Game

var Hubie_x; // X-coordinate of the game character
var Hubie_y; // Y-coordinate of the game character
var floorPos_y; // Y-coordinate of the floor
var trees_x; // Array to store X-coordinates of trees
var trees_y; // Y-coordinate of trees
var canyons; // Array to store canyon objects
var collectables; // Array to store collectable objects
var mountain; // Object to represent a mountain
var clouds; // Array to store cloud objects
var cameraPositionX; // Camera position for scrolling
var game_score;
var flagpole;
var lives;
var stars = []; // Array to store star objects
var moon; // Object to represent the moon
var collectSound;
var fallSound;
var jumpSound;
var gameSong;
var MoveSound;
var enemy;
var jumpForce = 30;
var platforms;
let audioContextStarted = true;

function preload() {
    soundFormats('mp3', 'wav');
    collectSound = loadSound('assets/Collectable_Sound.mp3');
    fallSound = loadSound('assets/fall.mp3');
    jumpSound = loadSound('assets/Jump.mp3');
    gameSong = loadSound('assets/Game_Song1.mp3');
    MoveSound = loadSound('assets/Move_Sound.mp3');
}

// Setup function - initializes canvas and game elements
function setup() {
  createCanvas(1024, 576);
  // Loop the game song
  gameSong.play();
  gameSong.setVolume(0.1);
  floorPos_y = height * 3 / 4;
    
  Hubie_x = 400;
  Hubie_y = floorPos_y;
  trees_x = [100, 300, 500, 700, 900];
  // Extend the game landscape
  // Note: For camera and scrolling logic
  var gameWorldWidth = 5000;
  isLeft = false;
  isRight = false;
  isPlummeting = false;
  isFalling = false;

  // Initialize stars
  for (var i = 0; i < 100; i++) {
    stars.push({ x: random(width), y: random(height), size: random(4, 5) });
  }

  // Initialising yellow_ball
  collectables = [
    { x_pos: 400, y_pos: 350, size: 30, isFound: false },
    { x_pos: 700, y_pos: 400, size: 25, isFound: false },
    { x_pos: 300, y_pos: 400, size: 35, isFound: false },
    { x_pos: 900, y_pos: 350, size: 20, isFound: false },
    { x_pos: 1600, y_pos: 300, size: 30, isFound: false },
    { x_pos: 2200, y_pos: 350, size: 25, isFound: false },
    { x_pos: 2800, y_pos: 300, size: 30, isFound: false },
    { x_pos: 3400, y_pos: 350, size: 25, isFound: false },
    { x_pos: 4000, y_pos: 300, size: 30, isFound: false },
    { x_pos: 4600, y_pos: 350, size: 25, isFound: false }
  ];
    
  // Initialising canyon
  canyons = [
    { x_pos: 500, y_pos: floorPos_y, width: 150 },
    { x_pos: 800, y_pos: floorPos_y, width: 120 },
    { x_pos: 200, y_pos: floorPos_y, width: 100 },
    { x_pos: 1200, y_pos: floorPos_y, width: 100 },
    { x_pos: 1500, y_pos: floorPos_y, width: 100 },
    { x_pos: 2300, y_pos: floorPos_y, width: 150 },
    { x_pos: 3000, y_pos: floorPos_y, width: 100 },
    { x_pos: 3700, y_pos: floorPos_y, width: 120 },
    { x_pos: 4400, y_pos: floorPos_y, width: 150 }
  ];

    //Initialising Platforms
  platforms = [];
  platforms.push(createplatforms(100, floorPos_y - 100, 100)); //Push Platforms
  platforms.push(createplatforms(500, floorPos_y - 75, 200)); //Push Platforms
  platforms.push(createplatforms(1200, floorPos_y - 75, 150)); //Push Platforms
  platforms.push(createplatforms(1000, floorPos_y - 100, 120)); //Push Platforms
  platforms.push(createplatforms(1800, floorPos_y - 50, 150)); //Push Platforms
  platforms.push(createplatforms(2600, floorPos_y - 100, 120)); //Push Platforms
  platforms.push(createplatforms(3400, floorPos_y - 50, 150)); //Push Platforms
  platforms.push(createplatforms(4200, floorPos_y - 100, 120)); //Push Platforms
  
    


  //Initialising Clouds
  clouds = [
    { x: 200, y: 150, size: 80 }, { x: 400, y: 100, size: 60 },
  { x: 600, y: 120, size: 70 }, { x: 800, y: 180, size: 90 },
  { x: 1100, y: 160, size: 75 }, { x: 1400, y: 100, size: 65 },
  { x: 1700, y: 150, size: 85 }, { x: 2000, y: 125, size: 70 },
  { x: 2300, y: 175, size: 80 }, { x: 2600, y: 100, size: 60 },
  { x: 2900, y: 150, size: 85 }, { x: 3200, y: 120, size: 75 },
  { x: 3500, y: 170, size: 90 }, { x: 3800, y: 140, size: 65 },
  { x: 4100, y: 110, size: 70 }, { x: 4400, y: 150, size: 85 },
  { x: 4700, y: 130, size: 75 }
  ];

  //Initialising Trees
  // Define extended trees array
  trees_x = [1, 400, 700, 1200, 1700, 2600, 2900, 3500, 4100, 4700];
  trees_y = height / 2;

  // Initialize moon
  moon = { x: width - 100, y: 100, size: 100 };

  cameraPositionX = 0;

  game_score = 0;
  flagpole = { x_pos: 4950, isReached: false };
  lives = 3;

  enemy = [];
     // Initialize enemies
    enemy.push(new Enemies(50, floorPos_y - 10, 100));
    enemy.push(new Enemies(700, floorPos_y - 10, 120));
    enemy.push(new Enemies(1000, floorPos_y - 10, 100)),
    enemy.push(new Enemies(2000, floorPos_y - 10, 150)),
    enemy.push(new Enemies(2800, floorPos_y - 10, 100)),
    enemy.push(new Enemies(4000, floorPos_y - 10, 150)),
    enemy.push(new Enemies(4700, floorPos_y - 10, 100))
}


// Draw function - renders game elements on the canvas
function draw() {
  push();
  cameraPositionX = Hubie_x - width / 2;

  ///////////DRAWING CODE//////////

  // Draw background
  drawBackground();

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y); // Drawing of the floor

  push();
  translate(-cameraPositionX, 0);

  // Drawing of canyon
  for (var i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
    checkIfCharOverCanyon(canyons[i]);
  }

  // Drawing of cloud
  drawClouds();

  //Drawing of mountain
  drawMountain(mountain);

  //Drawing of trees
  drawTrees();

   //Drawing of Platforms
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }
  //Drawing of collectables
  for (var i = 0; i < collectables.length; i++) {
    drawCollectable(collectables[i]);
    checkCollectable(collectables[i]);
  }

  // Drawing of game character
  drawCharacter();

  // Drawing of flagpole
  renderFlagpole();
    
    //Drawing of enemies
    for (var i = 0; i < enemy.length; i++) {
        enemy[i].draw();
        // Check collision with enemies
        if (dist(Hubie_x, Hubie_y, enemy[i].currentX, enemy[i].y) < 20) {
            // If collision detected, reduce lives and respawn the character
            lives = 0;
            startGame();
        }
    }
  pop();

///////////INTERACTION CODE//////////

  //Conditional statements to move the game character
  if (isLeft == true) {
    Hubie_x -= 5;
  }

  if (isRight == true) {
    Hubie_x += 5;
  }

  if (isPlummeting) {
    Hubie_y += 20;
  }

  var isContact = false; // Define isContact variable
  if (Hubie_y < floorPos_y && !isPlummeting) {
    for (var i = 0; i < platforms.length; i++) {
      if (platforms[i].checkContact(Hubie_x, Hubie_y) == true) {
        isContact = true;
        break;
      }
    }
    if (isContact == false) {
      Hubie_y += 1;
    }
  }
  if (Hubie_y == floorPos_y) {
    isFalling = false;
  }

  // Falling down canyon
  if (isPlummeting) {
    Hubie_y += 10;
  }

  if (isLeft == true) {
    Hubie_x -= 5;
  } else if (isRight == true) {
    Hubie_x += 5;
  }

  // Check if flagpole is reached
  if (!flagpole.isReached) {
    checkFlagpole();
  }

  // Check if player died
  checkPlayerDie();

  if (lives < 1) {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("YOUR LIFE GONE BRUV, CTRL+R to Reload.", width / 2, height / 2);
    return;
  }
    
  //Display winning prompt
  if (flagpole.isReached) {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("You WIN BROTHA. CTRL+R to Reload.", width / 2, height / 2);
    return;
  }

  // Display game score
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Score: " + game_score, 20, 20);

  // Display remaining lives
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Lives: ", 20, 40);
  for (var i = 0; i < lives; i++) {
    fill("red");
    ellipse(80 + i * 30, 45, 15, 15);
  }

  pop();
}

// Function to draw clouds
function drawClouds() {
  for (var i = 0; i < clouds.length; i++) {
    fill(255);
    ellipse(clouds[i].x, clouds[i].y, clouds[i].size);
    ellipse(clouds[i].x + 50, clouds[i].y, clouds[i].size + 10);
    ellipse(clouds[i].x + 40, clouds[i].y, clouds[i].size + 20);
  }
}

function drawMountain() {
  // Array of mountains with their base positions and heights
  var mountains = [
    { x_pos: 300, height: 400 },
    { x_pos: 1500, height: 500 }, // mountain at 1500px
    { x_pos: 3500, height: 450 }  // mountain at 3500px
  ];

  mountains.forEach(function(mountain) {
    var peakX = mountain.x_pos + mountain.height / 2;
    var peakY = floorPos_y - mountain.height;
    var baseLeftX = mountain.x_pos;
    var baseRightX = mountain.x_pos + mountain.height;

    // Draw gradient from grey at the top to darker grey at the bottom
    var gradient = drawingContext.createLinearGradient(peakX, peakY, peakX, floorPos_y);
    gradient.addColorStop(0, 'white'); // White at the top
    gradient.addColorStop(1, 'dimgrey'); // Darker grey at the bottom

    drawingContext.fillStyle = gradient;
    
    noStroke(); // Remove this line if you want to keep the outlines
    beginShape(); // Start drawing the mountain shape
    vertex(baseLeftX, floorPos_y);
    vertex(peakX, peakY);
    vertex(baseRightX, floorPos_y);
    endShape(CLOSE); // Close the shape

    // Add outline to the mountain
    stroke(0); // Black color for the outline
    strokeWeight(2); // Outline weight
    noFill(); // No fill for the outline
    beginShape(); // Start drawing the outline
    vertex(baseLeftX, floorPos_y);
    vertex(peakX, peakY);
    vertex(baseRightX, floorPos_y);
    endShape(CLOSE); // Close the outline shape
  });
}



// Function to draw trees
function drawTrees() {
    trees_x.forEach(x => {
        fill(139, 69, 19); // Darker brown for the trunk
        rect(x, floorPos_y - 100, 20, 100); // Trunk

        // Multiple layers of leaves for depth
        fill(34, 139, 34); // Forest green
        ellipse(x + 10, floorPos_y - 120, 80, 80); // Lower leaves
        fill(50, 205, 50); // Lime green
        ellipse(x + 10, floorPos_y - 150, 60, 60); // Upper leaves
    });
}


// Function to draw a collectable
function drawCollectable(t_collectable) {
    if (!t_collectable.isFound) {
        push();
        fill(255, 215, 0); // Gold color
        stroke(255, 223, 0);
        strokeWeight(2);
        ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size); // Gold coin

        // Add sparkle effect
        stroke(255, 223, 0);
        strokeWeight(4);
        point(t_collectable.x_pos + random(-5, 5), t_collectable.y_pos + random(-5, 5));
        pop();
    }
}


// Function to draw a canyon
function drawCanyon(t_canyon) {
    var canyonDepth = 100; // Assuming a fixed depth for simplicity
    var gradientSteps = canyonDepth / 10; // Number of steps in the gradient
    
    // Draw the top part of the canyon with a darker color
    fill(139, 69, 19); // Darker brown color
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, canyonDepth * 0.3);

    // Gradient effect
    for (var i = 0; i < gradientSteps; i++) {
        var inter = map(i, 0, gradientSteps, 0, 1);
        var c = lerpColor(color(139, 69, 19), color(205, 133, 63), inter); // Lerp from dark brown to lighter brown
        fill(c);
        rect(t_canyon.x_pos, floorPos_y + (i * 10), t_canyon.width, 10);
    }

    // Optionally, add some details like rocks or water at the bottom for more realism
    fill(50, 50, 255); // Blue color for water
    rect(t_canyon.x_pos, floorPos_y + canyonDepth * 0.7, t_canyon.width, canyonDepth * 0.3);
}

//Function to check if the character is over a canyon
function checkIfCharOverCanyon(t_canyon) {
    if (Hubie_x > t_canyon.x_pos && Hubie_x < t_canyon.x_pos + t_canyon.width) {
        if (Hubie_y >= floorPos_y) {
            isPlummeting = true;
            fallSound.play();
            fallSound.setVolume(0.1);
        }
    }
}


// Function to check if the character is over a collectable
function checkCollectable(t_collectable) {
    // Define the hitbox for the game character and collectable
    var charLeft = Hubie_x - 15; // Assuming the character width is around 30px
    var charRight = Hubie_x + 15;
    var charTop = Hubie_y - 60; // Assuming the character height is around 60px
    var charBottom = Hubie_y;
    
    var collectableLeft = t_collectable.x_pos - t_collectable.size / 2;
    var collectableRight = t_collectable.x_pos + t_collectable.size / 2;
    var collectableTop = t_collectable.y_pos - t_collectable.size / 2;
    var collectableBottom = t_collectable.y_pos + t_collectable.size / 2;

    // Check if any part of the game character touches the collectable
    if (charRight >= collectableLeft && charLeft <= collectableRight &&
        charBottom >= collectableTop && charTop <= collectableBottom) {
        if (!t_collectable.isFound) {
            t_collectable.isFound = true;
            collectSound.play(); // Play collect sound
            collectSound.setVolume(0.1);
            game_score++; // Increment the score
        }
    }
}



// Function to draw the game character
function drawCharacter() {

    if (isLeft && isFalling) {
    // jumping-left code
    // Head of the character
    fill(255, 204, 153);
    ellipse(Hubie_x, Hubie_y - 60, 30, 30);

    // Body of the character
    fill(255, 0, 0);
    rect(Hubie_x - 10, Hubie_y - 44, 21, 21);

    // Arms of the character
    fill(137, 0, 128);
    rect(Hubie_x - 21, Hubie_y - 40, 14, 1);
    rect(Hubie_x - -10, Hubie_y - 40, 14, 1);

    // Legs of the character
    rect(Hubie_x - 25, Hubie_y - 30, 14, 3);
    rect(Hubie_x - -10, Hubie_y - 30, 14, 3);
  } else if (isRight && isFalling) {
    // jumping-right code
    fill(255, 204, 153);
    ellipse(Hubie_x, Hubie_y - 60, 30, 30);

    // Body of the character
    fill(255, 0, 0);
    rect(Hubie_x - 10, Hubie_y - 44, 21, 21);

    // Arms of the character
    fill(137, 0, 128);
    rect(Hubie_x - 21, Hubie_y - 40, 14, 1);
    rect(Hubie_x - -10, Hubie_y - 40, 14, 1);

    // Legs of the character
    rect(Hubie_x - 25, Hubie_y - 30, 14, 3);
    rect(Hubie_x - -10, Hubie_y - 30, 14, 3);
  } 
    else if (isLeft) {
    // walking left code

    // Head of the character
    fill(255, 204, 153);
    ellipse(Hubie_x, Hubie_y - 60, 20, 20);

    // Body of the character
    fill(255, 0, 0);
    rect(Hubie_x - 10, Hubie_y - 51, 20, 30);

    // Arms of the character
    fill(137, 0, 128);
    rect(Hubie_x - 30, Hubie_y - 50, 20, 1);
    rect(Hubie_x - -10, Hubie_y - 50, 20, 1);

    // Legs of the character
    rect(Hubie_x - 30, Hubie_y - 30, 30, 3);
    rect(Hubie_x - -5, Hubie_y - 30, 3, 30);
  } 
    else if (isRight && Hubie_x < 4995) {
    // walking right code

    // Head of the character
    fill(255, 204, 153);
    ellipse(Hubie_x, Hubie_y - 60, 30, 30);

    // Body of the character
    fill(255, 0, 0);
    rect(Hubie_x - 10, Hubie_y - 44, 21, 21);

    // Arms of the character
    fill(137, 0, 128);
    rect(Hubie_x - 30, Hubie_y - 40, 20, 1);
    rect(Hubie_x - -10, Hubie_y - 40, 20, 1);

    // Legs of the character
    rect(Hubie_x - 10, Hubie_y - 30, 3, 28);
    rect(Hubie_x - -5, Hubie_y - 30, 21, 3);}
    
    else if (isFalling || isPlummeting) {
    // jumping facing forwards code
    fill(255, 204, 153);
    ellipse(Hubie_x, Hubie_y - 60, 30, 30);

    // Body of the character
    fill(255, 0, 0);
    rect(Hubie_x - 10, Hubie_y - 44, 21, 21);

    // Arms of the character
    fill(137, 0, 128);
    rect(Hubie_x - 21, Hubie_y - 40, 14, 1);
    rect(Hubie_x - -10, Hubie_y - 40, 14, 1);

    // Legs of the character
    rect(Hubie_x - 25, Hubie_y - 30, 14, 3);
    rect(Hubie_x - -10, Hubie_y - 30, 14, 3);
     
        // Check if the character is on a platform
  var onPlatform = false;
  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i].checkContact(Hubie_x, Hubie_y)) {
      onPlatform = true;
      break;
    }
  }
  } 
    else {
    // standing front facing code

    fill(255, 204, 153);
    ellipse(Hubie_x, Hubie_y - 60, 30, 30);

    // Body of the character
    fill(255, 0, 0);
    rect(Hubie_x - 10, Hubie_y - 44, 21, 21);

    // Arms of the character
    fill(137, 0, 128);
    rect(Hubie_x - 21, Hubie_y - 40, 14, 1);
    rect(Hubie_x - -10, Hubie_y - 40, 14, 1);

    // Legs of the character
    rect(Hubie_x - 10, Hubie_y - 30, 5, 30);
    rect(Hubie_x - -5, Hubie_y - 30, 5, 30);
  }

  fill("red");
  ellipse(Hubie_x, Hubie_y, 20, 20);
}


// Function to restart the game
function restartGame() {
  // Reset all game variables to their initial state
  lives = 3;
  game_score = 0;
  flagpole.isReached = false;
  startGame();
}

// Function to check if the player has fallen
function checkPlayerDie() {
  if (Hubie_y > height) {
    lives--;
    if (lives > 0) {
      // Respawn the character if lives are remaining
      startGame();
    } else if (lives < 1) {
      // If no lives remaining, restart the game
      restartGame();
    }
  }
}

// Function to start the game
function startGame() {
  Hubie_x = 400;
  Hubie_y = floorPos_y;
  isLeft = false;
  isRight = false;
  isPlummeting = false;
  isFalling = false;
  for (var i = 0; i < collectables.length; i++) {
    collectables[i].isFound = false;
  }
}

// Function to render flagpole
function renderFlagpole() {
  // Flagpole
  fill(139, 69, 19); // Brown color for flagpole
  rect(flagpole.x_pos + 8, floorPos_y - 200, 4, 200); // Pole

  // Flag
  fill(255, 0, 0); // Red color for flag
  // Triangle shape for flag
  triangle(
    flagpole.x_pos - 20,
    floorPos_y - 200,
    flagpole.x_pos + 8,
    floorPos_y - 240,
    flagpole.x_pos + 36,
    floorPos_y - 200
  );
  // Flagpole base
  fill(105, 105, 105); // Dark gray color for base
  rect(flagpole.x_pos - 22, floorPos_y - 10, 40, 10); // Base rectangle
}


// Function to check if the flagpole is reached
function checkFlagpole() {
  // Check if all collectables have been collected
  var allCollected = true;
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      allCollected = false;
      break;
    }
  }
  
  // If all collectables are collected and the flagpole is reached, declare the player as the winner
  if (Hubie_x >= flagpole.x_pos && allCollected) {
    flagpole.isReached = true;
  } else if (Hubie_x >= flagpole.x_pos) {
    // If flagpole is reached but not all collectables are collected, display message in the game's GUI
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Collect all collectables to win!", width / 2, height / 2);
  }
}


function createplatforms(x, y, length) {
  var p = {
    x: x,
    y: y,
    length: length,
    draw: function() {
      // Wooden texture color
      fill('#8B4513'); // SaddleBrown: Looks like wood
      rect(this.x, this.y, this.length, 20);
      
      // Adding texture lines to simulate wood
      stroke('#A0522D'); // Sienna: Darker line for wood texture
      strokeWeight(1);
      var lineSpacing = 5; // Space between each line
      for (var i = 0; i < this.length; i += lineSpacing) {
        line(this.x + i, this.y, this.x + i, this.y + 20);
      }
      
      // Border for the platform
      noFill();
      stroke(0); // Black border
      strokeWeight(2);
      rect(this.x, this.y, this.length, 20);
    },
    checkContact: function(gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        var d = this.y - gc_y;
        if (d >= 0 && d < 5) {
          return true;
        }
      }
      return false;
    },
  };
  return p;
}

// Function to create enemies
function Enemies(x, y, range) {
  this.x = x;
  this.y = y;
  this.range = range;
  this.currentX = x;
  this.inc = 1;

  this.update = function () {
    this.currentX += this.inc;

    if (this.currentX >= this.x + this.range) {
      this.inc = -1;
    } else if (this.currentX < this.x) {
      this.inc = 1;
    }
  };

  this.draw = function () {
    this.update();
    // Head
    fill(255, 204, 153); // Skin color
    ellipse(this.currentX, this.y - 40, 30, 30);
    // Body
    fill(255, 0, 0); // Red color
    rect(this.currentX - 10, this.y - 20, 20, 40);
    // Left arm
    rect(this.currentX - 15, this.y - 20, 5, 40);
    // Right arm
    rect(this.currentX + 10, this.y - 20, 5, 40);
    // Left leg
    rect(this.currentX - 10, this.y + 20, 7, 20);
    // Right leg
    rect(this.currentX + 3, this.y + 20, 7, 20);
  };

  this.checkContact = function () {};
}

// Function to draw the background with stars and a glimmering moon
function drawBackground() {
  background(0); // Fill the background with black
  
  // Draw each star with a random brightness to create a twinkling effect
  for (var i = 0; i < stars.length; i++) {
    var brightness = random(150, 255); // Random brightness between 150 and 255
    fill(brightness);
    ellipse(stars[i].x, stars[i].y, stars[i].size);
  }

  // Draw the moon
  fill(255, 255, 0); // Yellow for the moon
  ellipse(moon.x, moon.y, moon.size);
}

// KeyPressed function - handles key press events
function keyPressed() {
  // if statements to control the animation of the character when keys are pressed.

  //open up the console to see how these work
  console.log("keyPressed: " + key);
  console.log("keyPressed: " + keyCode);
  
  //'a' to move left
  if (keyCode == 65) {
    console.log("left arrow");
      MoveSound.play();
      MoveSound.setVolume(0.1);
    isLeft = true;
  }
    //'d to move right
    else if (keyCode == 68) {
    console.log("right arrow");
      MoveSound.play();
      MoveSound.setVolume(0.1);
    isRight = true;
  } else if (keyCode == 87 && !isFalling && !isPlummeting) {
    // 'w' key for jumping only if not already falling
    Hubie_y -= 100;
      //Play Jump sound
    jumpSound.play();
    jumpSound.setVolume(0.1);
    Hubie_y -= jumpForce;
       velocity = -jumpForce; // Apply an upward force
    isFalling = true;
  } 
    else if (keyCode == 32 && lives < 0) {
    restartGame();
  }
}

// KeyReleased function - handles key release events
function keyReleased() {
  // if statements to control the animation of the character when keys are released.

  console.log("keyReleased: " + key);
  console.log("keyReleased: " + keyCode);

  if (keyCode == 65) {
    console.log("left arrow");
    isLeft = false;
  } else if (keyCode == 68) {
    console.log("right arrow");
    isRight = false;
  }
}