
// CANVAS SETUP :
const canvas = document.getElementById('Snake')
const ctx = canvas.getContext('2d')



// DECLARE VARIABLS : 
   // SNAKE VARIABLES :
let snakeXposition = 350
let snakeYposition = 350
let snakeWidth = 25
let sankeHeight = 25
let snakeSpeed = 3 
   // MOVING VARIABLES :
let isMovingRight = false 
let isMovingLeft = false
let isMovingUp = false
let isMovingDown = false
   // FOOD VARIABLES : 
let foodXposition = 250
let foodYposition = 250
let foodWidth = 25
let foodHeight = 25
   // GAME END : 
let gameEnd = false
   // SCORE :
let myScore = 0 





// FUNCTIONS AND LOGIC : 
   // SNAKE FUNCTION :
const drawSnake = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(205, 170, 110)'
    ctx.fillRect(snakeXposition, snakeYposition, snakeWidth, sankeHeight)
}

   // MOVING SNAKE FUNCTION :
   const moveSnake = () => {
    drawSnake()
    drawFood()
    collision()
    score()
    if (isMovingLeft && snakeXposition > 0) {
        snakeXposition -= snakeSpeed
        isMovingUp = false;
        isMovingDown = false;
      } else if (isMovingRight && snakeXposition < canvas.width - snakeWidth) {
        snakeXposition += snakeSpeed
      }
      if (isMovingUp && snakeYposition > 0) {
        snakeYposition -= snakeSpeed
      } else if (isMovingDown && snakeYposition < canvas.height - sankeHeight) {
        snakeYposition += snakeSpeed
      }
      if (gameEnd){
        cancelAnimationFrame(animateId)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGameOver()
      } else { 
      animateId = requestAnimationFrame(moveSnake)
}}

   // FOOD FUNCTION :
const drawFood = () => {
    ctx.fillStyle = 'rgb(114, 160, 193)'
    ctx.fillRect(foodXposition, foodYposition, foodWidth, foodHeight)
}
 
   // COLLISION :
   const collision = () => {
     if (
        snakeXposition < foodXposition + foodWidth &&
        snakeXposition + snakeWidth > foodXposition &&
        snakeYposition < foodYposition + foodHeight &&
        sankeHeight + snakeYposition > foodYposition
      ) {
        console.log('food eaten')
        foodXposition = Math.floor(Math.random() * (canvas.width - foodWidth))
        foodYposition = Math.floor(Math.random() * (canvas.height - foodHeight))
        drawFood()
        myScore ++ 
        

      }
      if (
        snakeXposition < 0 ||
        snakeXposition + snakeWidth > canvas.width ||
        snakeYposition < 0 ||
        snakeYposition + sankeHeight > canvas.height
      ){
        gameEnd = true
    }}

    // GAMEOVER FUNCTION :
    const drawGameOver = () => {
            ctx.font = "50px Arial"
            ctx.fillStyle = 'red'
            ctx.fillText(`GAME OVER`, canvas.width / 2 - 150, canvas.height / 2)
            ctx.fillStyle = "yellow";
            ctx.font = "50px Verdana"
            ctx.fillText(`Total Score : ${myScore}`, 170, 420);
          }

    // SCORE FUNCTION : 
    const score = () => {
        ctx.fillStyle = "white"
        ctx.font = "20px Verdana"
        ctx.fillText(`Score:${myScore}`,605, 20) 
    }



// EVENTLISTENERS :
document.addEventListener('keydown', event => {
    console.log(event)
    if (event.key === 'ArrowRight') {
        isMovingRight = true
        isMovingUp = false;
        isMovingDown = false;
        isMovingLeft = false
    } if (event.key === 'ArrowLeft') {
        isMovingLeft = true
        isMovingUp = false;
        isMovingDown = false;
        isMovingRight = false;
    } if (event.key === 'ArrowUp') {
        isMovingUp = true
        isMovingLeft = false;
        isMovingRight = false;
        isMovingDown = false;
    } if (event.key === 'ArrowDown') {
        isMovingDown = true
        isMovingLeft = false;
        isMovingRight = false; 
        isMovingUp = false;
    }
})



// START THE GAME :
const startGame = () => {
    moveSnake()
}
startGame()