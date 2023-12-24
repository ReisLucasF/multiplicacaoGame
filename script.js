document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const gameArea = document.getElementById("gameArea");
    const num1Element = document.getElementById("num1");
    const num2Element = document.getElementById("num2");
    const questionElement = document.getElementById("question");
    const answerInput = document.getElementById("answerInput");
    const submitAnswerButton = document.getElementById("submitAnswer");
    const resultMessage = document.getElementById("resultMessage");
  
    let currentNum1, currentNum2;
  
    startButton.addEventListener("click", startGame);
    submitAnswerButton.addEventListener("click", checkAnswer);

    answerInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          checkAnswer();
        }
      });
  
    function startGame() {
      currentNum1 = generateRandomNumber();
      currentNum2 = generateRandomNumber();
  
      num1Element.textContent = currentNum1;
      num2Element.textContent = currentNum2;
      questionElement.style.color = "black";
      answerInput.value = "";
      resultMessage.textContent = "";
  
      gameArea.classList.remove("hidden");
    }
  
    function checkAnswer() {
      const userAnswer = parseInt(answerInput.value);
      const correctAnswer = currentNum1 * currentNum2;
  
      if (isNaN(userAnswer)) {
        resultMessage.textContent = "Por favor, insira um número válido.";
        resultMessage.style.color = "red";
      } else {
        if (userAnswer != correctAnswer) {
            resultMessage.textContent = "Ops! Você errou. Tente novamente.";
            resultMessage.style.color = "red";
            answerInput.value = "";
        } else {
            startGame();
        }
      }
    }
  
    function generateRandomNumber() {
      return Math.floor(Math.random() * 8) + 2; // Números de 2 a 9
    }
  });
  