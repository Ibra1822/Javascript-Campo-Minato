const game = document.querySelector('.game');
let level = document.getElementById('level');
const title = document.querySelector('h1');
let dif = [100,81,49];
const btn = document.querySelector('.btn');
const numBombs = 16;
let arrayBombs = [];
const output = document.querySelector('.output');
let c = 0;

btn.addEventListener('click',function(){
  reset();
  arrayBombs = generateBombs();  
  for(let i = 1; i <= dif[level.value]; i++){
    createBox(i);
  }
})


function createBox(repeat){
  const box = document.createElement('div');
  box.classList.add('box');
  box.classList.add('calc'+ dif[level.value]);
  box.innerText = repeat;
  box.idBox = repeat;
  box.addEventListener('click',touchBox);
  game.append(box);
}

function generateBombs(){
let uniqueBombs = []
let bomb;
while(uniqueBombs.length < numBombs){
  bomb = getRandomNumber(1,dif[level.value])
  if (!uniqueBombs.includes(bomb)) {
    uniqueBombs.push(bomb);
  }
}
return uniqueBombs;
}


function touchBox(){
  let boxes = document.querySelectorAll('.box')
  if (!arrayBombs.includes(this.idBox)) {
    this.classList.add('notBomb');
    c++
    this.classList.add('disabled');
    let total = boxes.length - numBombs;
    if (c === total) {
      endGame(true);
    }
    }else{   
      this.classList.add('bomb');
      endGame(false);
    };
};

function endGame(isWin){
  let boxes = document.querySelectorAll('.box');
  let total = boxes.length - numBombs;
  if (isWin) {
    output.classList.add('win');
    output.innerHTML = `Hai vinto hai cliccato tutto giusto `;
    showBombs();
  }else{
    output.classList.add('lose');
    output.innerHTML = `Hai perso e hai  fatto ${(c == 1) ? ' 1 punto': c + ' punti' }  su ${total} `;
    showBombs();
  }
};

function showBombs() {
  let boxes = document.querySelectorAll('.box');
  for(let i = 0; i < boxes.length ; i++){
    if (arrayBombs.includes(boxes[i].idBox)) {
      boxes[i].classList.add('bomb');
    };
    boxes[i].classList.add('disabled');
  };
};

function getRandomNumber(min,max){
  return  Math.floor(Math.random() * (max - min + 1)) + min;
};

function reset(){
  game.innerHTML = '';
  c = 0;
  output.innerHTML = '';
  title.innerHTML = '';
};