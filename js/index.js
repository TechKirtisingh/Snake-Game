// Game Constants and Variables

let inputDir = { x: 0, y: 0 }; // direction of the snake (0,0 because it is not moving)
const foodSound = new Audio("../foodsound.mp3");
const gameOverSound = new Audio("../gameover.mp3");
const movesound = new Audio("../movesound.mp3");
const musicSound = new Audio("../musicsound.mp3");

let speed = 6;  // is used to measure the speed of the snake (2 means 2 boxes per second) 
let lastPaintTime = 0; // it is used to control the speed of the game
let score = 0; // it is used to keep track of the score


let snakeArr = [
  { x: 13, y: 15 }, // x is box length and y is box height
];
food = { x: 6, y: 7 }; // food is placed at random position


// ctime is used to measure the time taken by the game to render the next frame

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main); // it is used called the main function repeatedly to create a game loop
  console.log(ctime);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) // it is used to control the speed of the game
  {
    return;
  }
  lastPaintTime = ctime; // lastpainttime is equal to current time
  gameEngine();
}

function isCollide(sarr) {
  // if you bump into yourself
  for (let i = 1; i < sarr.length; i++) 
    {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) // x and y are equal to the head of the snake then it is a collision
    {
      return true;
    }
  }
  if(sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) // agar snake ki head wall se takra jaaye to game over ho jaega
  {
    return true;
  }
}


  


function gameEngine() {
  // Part 1: Updating the snake array and food
  if(isCollide(snakeArr)) // agar snake ki head apni body se takra jaye to game over ho jaega
  {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 }; // snake ki direction ko reset kar do
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }


 // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 5;
    if(score > highScoreval) // agar score highscore se bada hai to highscore ko update kar do
    {
      highScoreval = score;
      localStorage.setItem("highScore", JSON.stringify(highScoreval));
      highScoreBox.innerHTML = "High Score: " + highScoreval; // it is used to display the high score
    }
    scoreBox.innerHTML = "Score: " + score; // it is used to display the score
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y }); // it is used to add a new element to the snake array
    let a= 2;
    let b= 16;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }; // it is used to generate a new food position
  }

 // moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) //move the snake ultachalega last ke second last element ke position pe le jaega 0 element tk
  {
    const element = snakeArr[i];
    snakeArr[i + 1] = {...snakeArr[i] }; // it is used to move the snake brcket me likhna imp hai
  }

  snakeArr[0].x += inputDir.x; // it is used to move the snake in the direction of the input
  snakeArr[0].y += inputDir.y;


  // Part 2: Display the snake
  board.innerHTML = ""; // it is used to clear the board before drawing the snake and food
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div"); // document.createElement is used to create a new div element
    snakeElement.style.gridRowStart = e.y; // it is used to set the row of the snake
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add("snake");
    if (index === 0) {
      snakeElement.classList.add("head"); // agr snake wali body ka pahala element hai to usko head class add kar do
    }
    else
    {
      snakeElement.classList.add("snake");
    } // snake wali body ka har element ko snake class add kar do
    board.appendChild(snakeElement);
  });
  // Part 3: Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

let board = document.getElementById("board");

let scoreBox = document.getElementById("score");
let highScoreBox = document.getElementById("highScore");




 


// Main logic starts here
musicSound.play();
let highScore = localStorage.getItem("highScore"); // it is used to get the high score from the local storage
if(highScore === null) // agar high score null hai to usko 0 set kar do
{
  highScoreval = 0;
  localStorage.setItem("highScore", JSON.stringify(0));
}
else
{
  highScoreval = JSON.parse(highScore);
  highScoreBox.innerHTML = "High Score: " + highScoreval; // it is used to display the high score
}
window.requestAnimationFrame(main); // it is used called the main function repeatedly to create a game loop
window.addEventListener("keydown", e => {
  inputDir = { x: 0, y: 1 }; // Start the game
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});