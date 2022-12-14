const BG_COLOUR = 'white';
const BG_BORDER = 'black';
const SNAKE_COLOUR = '#add8e6';
const SNAKE_BORDER = 'darkblue';
const FOOD_COLOUR = '#e61919';

//Volume-----------------------
let Tod = new Audio('https://fom-hll.coletta.de/Sounds/roblox-death-sound-effect.mp3');
let Hintergrundmusik = new Audio('https://fom-hll.coletta.de/Sounds/The-entertainer-piano.mp3');

Hintergrundmusik.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);

var posSlider =document.getElementById("myRange");
var volSlider = document.getElementById("myVol");
var startBut = document.getElementById("startButton");
var pauseBut = document.getElementById("pauseButton");


startBut.addEventListener("click", audioPlay);

function audioPlay(){
Hintergrundmusik.play();
Hintergrundmusik.addEventListener("timeupdate", setSliderVal);
}

function setSliderVal(){
posSlider.value = Hintergrundmusik.currentTime;
}

pauseBut.addEventListener("click", audioPause);

function audioPause(){
Hintergrundmusik.pause();
}

function setPos() {
Hintergrundmusik.currentTime = posSlider.value;
}

volSlider.addEventListener("input", setVol);

function setVol() {
Hintergrundmusik.volume = volSlider.value / 100;
}
//Volume---------------

const socket = io('https://snakewebtechnologie.herokuapp.com/');




socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const Textoben = document.getElementById('Textoben');
const fruit = document.getElementById('fruit');
const poison = document.getElementById('poison');
const Schlangenkopf = document.getElementById('Kopf');
newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);



function newGame() {
  socket.emit('newGame');
  init();
}

function joinGame() {
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
  init();
}

let canvas, ctx;
let playerNumber;
let gameActive = false;


function init() {
  Hintergrundmusik.play();
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

if (window.innerHeight < window.innerWidth){
    canvas.width = canvas.height = window.innerHeight-100;
}    
else {
    canvas.width = canvas.height = window.innerWidth-100;
}

  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.addEventListener('keydown', keydown);
  gameActive = true;
}




function keydown(e) {
  socket.emit('keydown', e.keyCode);
}

function paintGame(state) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  const food = state.food;
  const poisonfruit = state.poison
  const poisonfruit2 = state.poison2
  const gridsize = state.gridsize;
  const size = canvas.width / gridsize;

  ctx.fillStyle = 'red';
  ctx.drawImage(fruit, food.x * size, food.y * size, size, size);
  ctx.drawImage(poison, poisonfruit.x * size, poisonfruit.y * size, size, size);
  ctx.drawImage(poison, poisonfruit2.x * size, poisonfruit2.y * size, size, size);

  paintPlayer(state.players[0], size, SNAKE_COLOUR);
  paintPlayer(state.players[1], size, 'orange');
}

function paintPlayer(playerState, size, colour) {
  const snake = playerState.snake;
  const pos = playerState.pos;
  ctx.fillStyle = colour;
  for (let cell of snake) {
    ctx.fillRect(cell.x * size, cell.y * size, size, size);
  }
    ctx.drawImage(Schlangenkopf, pos.x*size, pos.y*size, size, size);

}

function handleInit(number) {
  playerNumber = number;
}

function handleGameState(gameState) {
  if (!gameActive) {
    return;
  }
  gameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(gameState));
}

function handleGameOver(data) {
  if (!gameActive) {
    return;
  }
  data = JSON.parse(data);

  gameActive = false;

  if (data.winner === playerNumber) {
    alert('Du bist der Gewinner');
    reset();
  } else if (data.winner === 3)
  {
    alert('Frontaler Crash. Versuche es nochmal');
    reset()
  }
  else {
    alert('Du hast verloren');
    reset();
  }
  Tod.play()
}

function handleGameCode(gameCode) {
  gameCodeDisplay.innerText = gameCode;
}


function handleUnknownCode() {
  reset();
  alert('Unbekannter Spielcode')
}

function handleTooManyPlayers() {
  reset();
  alert('Das Spiel l??uft schon. Du kannst nicht mehr joinen');
}

function reset() {
  playerNumber = null;
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}

//verhindert Runterscollen wenn Tasten gedr??ckt werden
window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false)