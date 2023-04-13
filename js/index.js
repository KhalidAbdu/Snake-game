
// CANVAS SETUP :
const canvas = document.getElementById('Snake')
const ctx = canvas.getContext('2d')



// DECLARE VARIABLS : 
   // SNAKE VARIABLES :
let snakeXposition = 350
let snakeYposition = 350
let snakeWidth = 25
let sankeHeight = 25
let snakeBody = []
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
// restart button :
const restartBtn = document.getElementById('restart')





// FUNCTIONS AND LOGIC : 
   // SNAKE FUNCTION :
const drawSnake = () => {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(205, 170, 110)'
    ctx.fillRect(snakeXposition, snakeYposition, snakeWidth, sankeHeight)
    for (let i = snakeBody.length - 1; i >= 1; i--){
        snakeBody[i] = snakeBody[i-1]
    }
    
    if (snakeBody.length > 0){
        snakeBody[0] = [snakeXposition, snakeYposition]
    }
    
    for (let i = 1; i < snakeBody.length; i++){
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], snakeWidth, sankeHeight)
        if (snakeXposition === snakeBody[i][0] && snakeYposition === snakeBody[i][1]){
            gameEnd = true
        }
    }
    
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
        console.log('food eaten', myScore, snakeSpeed)
        if (myScore % 2 === 0 && snakeSpeed <= 10 ){
            snakeSpeed += 1;
            console.log(snakeSpeed)
          }
        for (let i = 0; i < 10; i++) { 
            snakeBody.push([snakeXposition, snakeYposition])
          }
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
            restartBtn.style.display = 'block';
          }

    // SCORE FUNCTION : 
    const score = () => {
        ctx.fillStyle = "white"
        ctx.font = "20px Verdana"
        ctx.fillText(`Score:${myScore}`,605, 20) 
    }

    // RESTART GAME FUNCTION :
    const restartGame = () => {
            snakeXposition = 350
            snakeYposition = 350
            snakeWidth = 25
            sankeHeight = 25
            snakeBody = []
            snakeSpeed = 3 
            isMovingRight = false 
            isMovingLeft = false
            isMovingUp = false
            isMovingDown = false 
            foodXposition = 250
            foodYposition = 250
            foodWidth = 25
            foodHeight = 25
            gameEnd = false
            myScore = 0 
            restartBtn.style.display = 'none';
            animateId = requestAnimationFrame(moveSnake);
    }


// EVENTLISTENERS :
document.addEventListener('keydown', event => {
    console.log(event)
    if (event.key === 'ArrowRight'  && !isMovingLeft) {
        isMovingRight = true
        isMovingUp = false;
        isMovingDown = false;
        isMovingLeft = false
    } if (event.key === 'ArrowLeft' && !isMovingRight) {
        isMovingLeft = true
        isMovingUp = false;
        isMovingDown = false;
        isMovingRight = false;
    } if (event.key === 'ArrowUp' && !isMovingDown) {
        isMovingUp = true
        isMovingLeft = false;
        isMovingRight = false;
        isMovingDown = false;
    } if (event.key === 'ArrowDown' && !isMovingUp) {
        isMovingDown = true
        isMovingLeft = false;
        isMovingRight = false; 
        isMovingUp = false;
    }
})

restartBtn.addEventListener('click', () => {
    restartGame ()
})



// START THE GAME :
const startGame = () => {
    moveSnake()
}
startGame()