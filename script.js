const yoshi = document.getElementById('yoshi');
const background = document.getElementById('background');
const tryAgain = document.querySelector('.tryAgain');
let isJumping = false; 
let position = 0;

const handleKeyPress = e => {
  if (e.keyCode === 87){
    if(!isJumping){
      isJumping = true;
      jump();
    }
  } 
}

const jump = () => {


  let jumpInterval = setInterval(() => {
    if(position >= 150) {
      clearInterval(jumpInterval);

      let dropInterval = setInterval(() => {
        if(position <= 0) {
          clearInterval(dropInterval);
          isJumping = false;
        } else {
          position -= 20;
          yoshi.style.bottom = `${position}px`;
        }
      }, 18);
      
    }else{
      position += 20;
      yoshi.style.bottom = `${position}px`;
    }
  }, 18);
      
}

const createPipe = () => {
  let pipe = document.createElement('div');
  let pipePosition = 1000;
  let spawnTime = Math.floor(Math.random() * 6000);

  pipe.classList.add('pipe');
  pipe.style.left = `${pipePosition}px`;
  background.appendChild(pipe);

  let runInterval = setInterval(() => {

    if(pipePosition <= -60){
      clearInterval(runInterval);
      background.removeChild(pipe);

    } else if (pipePosition > 0 && pipePosition < 55 && position < 60){
      clearInterval(runInterval);
      document.body.innerHTML = '<div class="game-over"><button class="tryAgain" onclick="reloadPage()"> Try Again ?</button></div>';
    }
    
    else{
      pipePosition -= 10;
      pipe.style.left = `${pipePosition}px`;
    }
  }, 20);

  setTimeout(() => {
    createPipe();
  }, spawnTime);
}

function reloadPage(){
  window.location.reload();
}

createPipe();
document.addEventListener('keydown', handleKeyPress);