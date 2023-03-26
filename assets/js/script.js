// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame("addition");
});

/** 
*Main game "loop" called when the script is first loaded
*and after the users answers has been processed
*/
function runGame(gameType){
    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();

    //Generate two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
    // Loop to create two divisible whole intergers for division game
    let num3 = Math.floor(Math.random() * 50) + 1;
    let num4 = Math.floor(Math.random() * 50) + 1;
    while (num3 % num4 !== 0){
        num4 = Math.floor(Math.random() * 25) + 1;
    }
       

    if (gameType === 'addition'){
        displayAdditionQuestion(num1, num2);
    }
    else if (gameType === 'multiply'){
        displayMultiplyQuestion(num1, num2);
    }
    else if (gameType === 'subtract'){
        displaySubtractQuestion(num1, num2);
    }
    else if (gameType === 'division'){
        displayDivisionQuestion(num3, num4);
    }
    else {
        alert(`unknown game type: ${gameType}`);
        throw(`unknown game type: ${gameType}. Aborting!`);
    }
};

/**
 * Checks answer against the first element in the
 * returned calculateCorrectAnswer array
 */
function checkAnswer(){
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect){
        alert('Hey! well done, you got the correct answer! :D');
        incrementScore();
    }
    else {
        alert(`Awwwww...you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}.`);
        incrementWrongScore();
    }

    runGame(calculatedAnswer[1]);
};
 /**
  * Gets the operands and the operators from the DOM
  * and returns the correct answer
  */
function calculateCorrectAnswer(){
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+'){
        return [operand1 + operand2, "addition"];
    }
    else if (operator === 'x'){
        return [operand1 * operand2, "multiply"];
    }
    else if (operator === '-'){
        return [operand1 - operand2, "subtract"];
    }
    else if (operator === '/'){
        return [operand1 / operand2, "division"];
    }
    else {
        alert(`unknown operator ${operator}`);
        throw (`unknown operator ${operator}. Aborting!`);
    }
};


/**
 * Gets the current score from the DOM and increments by 1
 */
function incrementScore(){
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;
};

/**
 * Gets the current incorrect score from the DOM and increments by 1
 */
function incrementWrongScore(){
    let oldIncorrect = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldIncorrect;
};

function displayAdditionQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
};

function displaySubtractQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand2 < operand1 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
};

function displayMultiplyQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
};

function displayDivisionQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "/";
};