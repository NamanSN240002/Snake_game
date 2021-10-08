document.addEventListener('DOMContentLoaded',() => {

    

    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width =40;
    let currentindex = 0;
    let appleindex = 0;
    let currentSnake = [2,1,0]//2 will be head and 0 will be tail

    let direction = 1;
    let score =0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //start/restart the game

    function startGame(){
        currentSnake.forEach(index => {
            squares[index].classList.remove('snake');
            squares[index].classList.remove('head')
        });
        squares[appleindex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1; 
        scoreDisplay.innerText = score;
        intervalTime = 500;
        currentSnake = [2,1,0];
        currentindex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        squares[currentSnake[0]].classList.add('head');
        interval = setInterval(moveOutcomes, intervalTime);
    }

    //function that deals with all the outcomes of snake
    function moveOutcomes(){


        //snake hitting itself
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) ||//if snake hits bottom
            (currentSnake[0] % width === width-1 && direction === 1)|| //if snake hits the right wall
            (currentSnake[0] % width === 0 && direction === -1)||//if snake hits the left wall
            (currentSnake[0] - width < 0 && direction === -width)||//if snake hits the top
            squares[currentSnake[0]+direction].classList.contains('snake')//if snake hits itself
       ) {
      return clearInterval(interval);
     }

        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake')//removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction)//gives direction to the head


        //snake getting apple 
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime*speed;
            interval = setInterval(moveOutcomes,intervalTime);
            }
            squares[currentSnake[0]].classList.add('head');
            squares[currentSnake[1]].classList.remove('head');
            squares[currentSnake[1]].classList.add('snake');
     }



 //generate new apple
 function randomApple(){
    do{
        appleindex = Math.floor(Math.random() * squares.length);
    }while(squares[appleindex].classList.contains('snake') || squares[appleindex].classList.contains('head'));
    squares[appleindex].classList.add('apple');
 }




    function control(e){
        squares[currentindex].classList.remove('head');

        if(e.keyCode ===39){
            direction =1 ;
        }else if(e.keyCode ===38){
            direction= -width;
        }else if(e.keyCode === 37){
            direction = -1;
        }else if (e.keyCode ===40){
            direction = +width;
        }
    }

    document.addEventListener('keyup',control);
    startBtn.addEventListener('click',startGame);
})