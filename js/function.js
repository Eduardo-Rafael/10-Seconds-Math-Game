//Author: Eduardo Carranza

function GameController(){
  
  //private properties

  var firstOperand = 0;
  var secondOperand = 0;
  var correctAnswer = 0;
  var timer = 10;
  var operators = ['+'];
  var currentOperator = null;
  var numberLimit = 10;
  var score = 0;
  var highScore = 0;
  var interval = null;

  //private methods
  function generateRandomNumber(){
    return Math.floor(Math.random() * (numberLimit + 1));
  }
  
  function generateRandomOperator(){
    if(operators.length == 1)
      currentOperator = operators[0];
    else
      currentOperator = Math.floor(Math.random() * operators.length);
  }

  function generateCorrectAnswer(){
    switch(currentOperator)
    {
      case '+' :
        correctAnswer = firstOperand + secondOperand;
        break;
      case '-' :
        correctAnswer = firstOperand - secondOperand;
        break;
      case '*' :
         correctAnswer = firstOperand * secondOperand;
         break;
      case '/' :
        correctAnswer = firstOperand / secondOperand;
        break;
    }
  }

  function updateScore(){

    //here we put the code to inject the score into the html.

  }

  function updateHighScore(){

    //here we put the code to inject the highscore into the html.

  }

  function updateTimer(){

    //here we put the code to inject the timer into the html.

  }

  //public methods
  this.generateEquation = function(){
    firstOperand = generateRandomNumber();
    secondOperand = generateRandomNumber();
    generateRandomOperator();
    generateCorrectAnswer();

    //Here we put the code to inject the equation into the html

  }

  this.addOperator = function(operator){
    operators.push(operator);
  }

  this.removeOperator = function(operator){
    var indexOfOperator = operators.indexOf(operator);

    switch(indexOfOperator)
    {
      case 0:
        operators = operators.slice(indexOfOperator + 1);
        break;
      case operators.length - 1:
        operators = operators.slice(0 , indexOfOperator);
        break;
      default :
        var firstPart = operators.slice(0, indexOfOperator);
        var secondPart = operators.slice(indexOfOperator + 1);
        operators = firstPart.concat(secondPart);
        break;
    }
  }

  this.checkAnswers = function(userAnswer){
    if(userAnswer == correctAnswer)
    {
      timer ++;
      updateTimer();
      score ++;
      updateScore();
    }
  }

  this.startGame = function(){

  }

  this.resetGame = function(){

    if(score > highScore)
      highScore = score;
    score = 0;
    timer = 10;
    updateTimer();
    updateScore();
    updateHighScore();

  }


}

$(document).ready(function(){
  $('#input-range').val(10);
});