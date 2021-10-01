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
  disableUserAnswer();
  generateEquation();

  //private methods

  function generateEquation(){
    firstOperand = generateRandomNumber();
    secondOperand = generateRandomNumber();
    swapOperands();
    generateRandomOperator();
    console.log('The choosen operator is: ' + currentOperator);
    generateCorrectAnswer();

    //Here we put the code to inject the equation into the html
    $('#equation').text(firstOperand + ' ' + currentOperator + ' ' + secondOperand);
  }

  function swapOperands(){
    var temp = 0;
    if(secondOperand > firstOperand)
    {
      temp = firstOperand;
      firstOperand = secondOperand;
      secondOperand = temp;
    }
  }

  function generateRandomNumber(){
    return Math.floor(Math.random() * numberLimit + 1);
  }
  
  function generateRandomOperator(){
    if(operators.length == 1)
      currentOperator = operators[0];
    else
      currentOperator = operators[Math.floor(Math.random() * operators.length)];
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
        correctAnswer = Math.trunc(firstOperand / secondOperand);
        break;
    }
  }

  function updateScore(){

    //here we put the code to inject the score into the html.
    $('#score').text(score);
  }

  function updateHighScore(){

    //here we put the code to inject the highscore into the html.
    $('#high-scrore').text(highScore);
  }

  function updateTimer(){

    //here we put the code to inject the timer into the html.
    $('#timer').text(timer);
  }

  function disableOperators(){
    $('#minus-operator').attr('disabled' , 'true');
    $('#times-operator').attr('disabled' , 'true');
    $('#divide-operator').attr('disabled' , 'true');
    
  }

  function disableInputRange(){
    $('#input-range').attr('disabled' , 'true');
  }

  function disableUserAnswer(){
    $('#user-answer').attr('disabled' , 'true');
  }

  function disableStartButton(){
    $('#start-button').attr('disabled' , 'true');
  }

  function enableOperators(){
    $('#minus-operator').removeAttr('disabled');
    $('#times-operator').removeAttr('disabled');
    $('#divide-operator').removeAttr('disabled');
  }

  function enableInputRange(){
    $('#input-range').removeAttr('disabled');
  }

  function enableUserAnswer(){
    $('#user-answer').removeAttr('disabled');
  }

  function enableStartButton(){
    $('#start-button').removeAttr('disabled');
  }

  function resetGame(){

    if(score > highScore)
      highScore = score;
    score = 0;
    timer = 10;
    updateTimer();
    updateScore();
    updateHighScore();
    disableUserAnswer();
    generateEquation();
    $('#user-answer').val('');

  }

  //public methods
  this.addOperator = function(operator){
    operators.push(operator);
    console.log(operators);
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
    if(currentOperator == operator)
      generateEquation();
    console.log(operators);
  }

  this.checkAnswers = function(userAnswer){
    if(userAnswer == correctAnswer)
    {
      timer ++;
      updateTimer();
      score ++;
      updateScore();
      generateEquation();
      $('#user-answer').val('');
    }
  }

  this.startGame = function(){
    interval = setInterval(function(){
      timer --;
      updateTimer();
      if(timer == 0)
      {
        clearInterval(interval);
        enableOperators();
        enableInputRange();
        resetGame();
        $('#game-over-message').text('Game Over');
        enableStartButton();
      }
    }, 1000);
    disableOperators();
    disableInputRange();
    disableStartButton();
    if($('#game-over-message').text() != null)
    $('#game-over-message').text('');
    enableUserAnswer();
  }

  this.updateNumberLimit = function(number){
    numberLimit = number;
    if(firstOperand > numberLimit || secondOperand > numberLimit)
      generateEquation();
  }

}

$(document).ready(function(){
  var game = new GameController();

  $('#input-range').val(10);

  $('#input-range').change(function(){
    $('#number-limit').text($(this).val());
    game.updateNumberLimit(Number($(this).val()));
    console.log('The number limit has been changed to ' + $(this).val());
  });

  $('#minus-operator').click(function(){
    if($(this).attr('checked') != undefined)
    {
      game.removeOperator('-');
      $(this).removeAttr('checked');
      console.log('Removes the minus operator');
    } 
    else
    {
      game.addOperator('-');
      $(this).attr('checked' , 'true');
      console.log('Adds the minus operator');
    }
  });

  $('#times-operator').click(function(){
    if($(this).attr('checked') != undefined)
    {
      game.removeOperator('*');
      $(this).removeAttr('checked');
      console.log('Removes the times operator');
    }
    else
    {
      $(this).attr('checked', 'true');
      game.addOperator('*');
      console.log('Adds the times operator');
    }
  });

  $('#divide-operator').click(function(){
    if($(this).attr('checked') != undefined)
    {
      game.removeOperator('/');
      $(this).removeAttr('checked');
      console.log('Removes the divide operator');
    }   
    else
    {
      game.addOperator('/');
      $(this).attr('checked' , 'true');
      console.log('Adds the divide operator');
    }
  });

  $('#start-button').click(function(){
    game.startGame();
  });

  $('#user-answer').keyup(function(){
    game.checkAnswers(Number($(this).val()));
  });

});