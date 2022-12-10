const { GRID_SIZE } = require('./constants');

module.exports = {
  initGame,
  gameLoop,
  getUpdatedVelocity,
}

function initGame() {
  const state = createGameState()
  randomFood(state);
  return state;
}

function createGameState() {
  return {
    players: [{
      pos: {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      },
      vel: 
      {
        x: 0,
        y: 0,
      },
      snake: [
        {x: Math.floor(Math.random() * GRID_SIZE), 
          y: Math.floor(Math.random() * GRID_SIZE)},
          {x: Math.floor(Math.random() * GRID_SIZE), 
            y: Math.floor(Math.random() * GRID_SIZE)},    
      ],
    }, {
      pos: {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      },
      vel: {
        x: 0,
        y: 0,
      },
      snake: [
        {x: Math.floor(Math.random() * GRID_SIZE), 
         y: Math.floor(Math.random() * GRID_SIZE)},
         {x: Math.floor(Math.random() * GRID_SIZE), 
          y: Math.floor(Math.random() * GRID_SIZE)},
      ],
    }],
    food: {x: 50,
           y: 50,},
    poison:  {x: Math.floor(Math.random() * GRID_SIZE), 
      y: Math.floor(Math.random() * GRID_SIZE)},
      poison2:  {x: Math.floor(Math.random() * GRID_SIZE), 
        y: Math.floor(Math.random() * GRID_SIZE)},
    gridsize: GRID_SIZE,
  };
}
let i = 0;
let k=0;

function gameLoop(state) {
  if (!state) {
    return;
  }


  const playerOne = state.players[0];
  const playerTwo = state.players[1];

  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;

  playerTwo.pos.x += playerTwo.vel.x;
  playerTwo.pos.y += playerTwo.vel.y;

  playerTwo.snake.x = playerTwo.pos.x;
  playerTwo.snake.y = playerTwo.pos.y;

  for (i; i < 1; i++) {
    if (playerOne.pos.x > GRID_SIZE/2){  playerOne.vel.x=0}
    else  playerOne.vel.x=0
  }
  for (k; k < 1; k++) {
    if (playerTwo.pos.x > GRID_SIZE/2){  playerTwo.vel.x=-1}
    else  playerTwo.vel.x=1
  }

  if (playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
    i=0;
    k=0;
    return 2;
  }

  if (playerTwo.pos.x < 0 || playerTwo.pos.x > GRID_SIZE || playerTwo.pos.y < 0 || playerTwo.pos.y > GRID_SIZE) {
    i=0;
    k=0;
    return 1;
  }
//Kolission mit dem Kopf
  if (playerTwo.pos.x === playerOne.pos.x && playerTwo.pos.y === playerOne.pos.y ) {
    i=0;
    k=0;
    return 3;
  }

//Kollision von Kopf mit Körper
  if (playerOne.pos.x || playerOne.pos.y) {
    for (let cell of playerTwo.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        i=0;
        k=0;
        return 2;
      }
    }
  }

  if (playerTwo.pos.x || playerTwo.pos.y) {
    for (let cell of playerOne.snake) {
      if (cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y) {
        i=0;
        k=0;
        return 1;
      }
    }
  }

  if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;
    randomFood(state);
  }

  if (state.food.x === playerTwo.pos.x && state.food.y === playerTwo.pos.y) {
    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.pos.x += playerTwo.vel.x;
    playerTwo.pos.y += playerTwo.vel.y;
    randomFood(state);
  }

 

  if (state.poison.x === playerOne.pos.x && state.poison.y === playerOne.pos.y) {
    return 2
  }

  if (state.poison.x === playerTwo.pos.x && state.poison.y === playerTwo.pos.y) {
    return 1
  }

  if (state.poison2.x === playerOne.pos.x && state.poison2.y === playerOne.pos.y) {
    return 2
  }

  if (state.poison2.x === playerTwo.pos.x && state.poison2.y === playerTwo.pos.y) {
    return 1
  }

  if (playerOne.vel.x || playerOne.vel.y) {
    /*for (let cell of playerOne.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        return 2;
      }
    }*/

    playerOne.snake.push({ ...playerOne.pos });
    playerOne.snake.shift();
  }

  if (playerTwo.vel.x || playerTwo.vel.y) {
    /*for (let cell of playerTwo.snake) {
      if (cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y) {
        return 1;
      }
    }*/

    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.snake.shift();
  }

  return false;
}

function randomFood(state) {
  food=state.food

  poison = state.poison
  poison2 = state.poison2

  for (let cell of state.players[0].snake) {
    if (cell.x === food.x && cell.y === food.y) {
      food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
      }
      return randomFood(state);
    }
  }

  for (let cell of state.players[1].snake) {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
      }
    if (cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    
    }
  }

  poison = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
    }
    state.poison=poison

  poison2 = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
      }
      state.poison2 = poison2
    state.food = food;
}


function getUpdatedVelocity(keyCode) {

  switch (keyCode) {
    case (37): { // left
      return { x: -1, y: 0 };
    }
    case (38): { // down
      return { x: 0, y: -1 };
    }
    case (39): { // right
      return { x: 1, y: 0 };
    }
    case (40): { // up
      return { x: 0, y: 1 };
    }
    case (65): { // A
      return { x: -1, y: 0 };
    }
    case (87): { // S
      return { x: 0, y: -1 };
    }
    case (68): { // D
      return { x: 1, y: 0 };
    }
    case (83): { // W
      return { x: 0, y: 1 };
    }
  }
}









