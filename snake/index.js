/* --------------------------------------------------- Model ------------------------------------------------------------*/

mainTable = document.getElementById('app');

let size = 20;              /* Size of the table model. */
let bodySize = 4;           /* The length of the snake. */
let gameOver = false;       
let currentX = 9;           /* Start values for snake. */
let currentY = 4;           /* Start values for snake. */
let direction = '';         /* Can be Arrow'Up, Down, Left, Right'. */
let latestDirection = '';   /* To keep track of the last direction when changing, this is so you wont move the head into the body. */
let snakeSpeed = 400;       /* Starting value of the snake, it will move every 0.4 seconds. */
let speedIncrease = 0.9;    /* Inceases the speed of the snake with every apple it eats. At 0.9 the speed will increase by 10% for every apple. */

/* When you press a key it will be sent to a 'isValidKeypress' function where it checks if the key is one of the arrow keys, then updates the direction with said key */
document.addEventListener("keydown", (pressedKey) => isValidKeypress(pressedKey.key)); 

createModel();              /* Generates the table the snake will roam inside. */

let snakeCords = [mainTable.rows[9].cells[4]]; /* Starting point for the snake, will also update with the snakes body. */


randomFoodCord();           /* Will generate an apple at a random point in the table. */
updateView();               /* This function creates a loop that will move the snake. */

/* --------------------------------------------------- View -------------------------------------------------------------*/

function updateView() {
    if (!gameOver) {
        for (let i = 0; i < snakeCords.length; i++) {
            if (i + 1 === snakeCords.length) {
                snakeCords[i].classList.add('headBackground');
            } else {
                snakeCords[i].classList.add('bodyBackground');
            }
        }
        if (snakeCords.length > bodySize) {
            snakeCords[0].classList.remove('bodyBackground', 'headBackground');
            snakeCords.splice(0, 1);
        }

        setTimeout(updateSnakeCords, snakeSpeed);
    } else {
        mainTable.innerHTML = "<img class='rickGif' src='https://media.tenor.com/gNv3O0hRDrcAAAAi/rickroll-rick.gif'></img>"
        // alert('');
    }
}

function createModel() {
    mainTable.innerHTML = '';
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        let tr = mainTable.insertRow();
        for (let columnIndex = 0; columnIndex < size; columnIndex++) {
            let td = tr.insertCell();
            td.classList.add('tablewidth');
        }
    }
}

/* --------------------------------------------------- CONTROLLER -------------------------------------------------------*/

function isValidKeypress(pressedKey) {
    let validKeypresses = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
    validKeypresses.includes(pressedKey) ? direction = pressedKey : latestDirection;
}

function updateSnakeCords() {
    let currentPos = mainTable.rows[currentX].cells[currentY];
    

    checkGameOver('wall');

    direction === 'ArrowRight' && latestDirection === 'ArrowLeft' ? direction = 'ArrowLeft' :
        direction === 'ArrowLeft' && latestDirection === 'ArrowRight' ? direction = 'ArrowRight' :
            direction === 'ArrowUp' && latestDirection === 'ArrowDown' ? direction = 'ArrowDown' :
                direction === 'ArrowDown' && latestDirection === 'ArrowUp' ? direction = 'ArrowUp' : '';


    direction === 'ArrowRight' ? (currentY++, checkGameOver(), snakeCords.push(currentPos), latestDirection = direction) :
        direction === 'ArrowLeft' ? (currentY--, checkGameOver(), snakeCords.push(currentPos), latestDirection = direction) :
            direction === 'ArrowUp' ? (currentX--, checkGameOver(), snakeCords.push(currentPos), latestDirection = direction) :
                direction === 'ArrowDown' ? (currentX++, checkGameOver(), snakeCords.push(currentPos), latestDirection = direction) : '';


    if (currentPos.innerHTML === '🍎') {
        bodySize++;
        snakeSpeed = snakeSpeed * speedIncrease;
        currentPos.innerHTML = '';
        randomFoodCord();
    }
    updateView();
}

function randomFoodCord() {
    let xCord = Math.floor(Math.random() * size);
    let yCord = Math.floor(Math.random() * size);
    snakeCords.includes(mainTable.rows[xCord].cells[yCord]) ? randomFoodCord() : '';
    mainTable.rows[xCord].cells[yCord].innerHTML = '🍎';
}

function checkGameOver(isWall) {
    // if (isWall || mainTable.rows[currentX].cells[currentY]) {
        
    // } else {
        let snakeCollitionArray = snakeCords.slice(0, snakeCords.length - 2);

        if (snakeCollitionArray.includes(mainTable.rows[currentX].cells[currentY])) {
            gameOver = true;

            /* Stuck at changing snake color at death */
            for (let i = 0; i < snakeCords.length; i++) {
                if (i === snakeCords.length) {
                    snakeCords[i].classList.add('headDead');
                } else {
                    snakeCords[i].classList.add('bodyDead');
                }
            }
        }
    }
// }


/* Trash code  */

// let xCord = 9; /* Test hvor eple spawner forran slangen på starten */
// let yCord = 7;
