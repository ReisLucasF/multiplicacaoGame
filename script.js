document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const gameArea = document.getElementById("gameArea");
  const num1Element = document.getElementById("num1");
  const num2Element = document.getElementById("num2");
  const questionElement = document.getElementById("question");
  const answerInput = document.getElementById("answerInput");
  const submitAnswerButton = document.getElementById("submitAnswer");
  const resultMessage = document.getElementById("resultMessage");

  const heartsContainer = document.getElementById("hearts");
  const hearts = document.querySelectorAll(".heart");
  let score = 0;
  let lives = 5;

  let currentNum1, currentNum2;

  answerInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });

  startButton.addEventListener("click", startGame);
  submitAnswerButton.addEventListener("click", checkAnswer);

  function startGame() {
    if (lives === 0) {
      const tryAgain = confirm("Suas tentativas acabaram :( Deseja realizar uma nova tentativa?");
      if (!tryAgain) {
        // O usuário optou por não tentar novamente
        return;
      }
    }

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
      if (userAnswer === correctAnswer) {
        resultMessage.textContent = "Parabéns! Vamos para a próxima conta.";
        resultMessage.style.color = "green";

        // Incrementa o score
        score++;
        updateScore();

        startGame();
      } else {
        resultMessage.textContent = "Ops! Você errou. Tente novamente.";
        resultMessage.style.color = "red";
        answerInput.value = "";

        // Decrementa as vidas
        lives--;
        updateHearts();

        // Se todas as vidas foram perdidas, apresenta a mensagem e pergunta se deseja tentar novamente
        if (lives === 0) {
          const tryAgain = confirm("Suas tentativas acabaram :( Deseja realizar uma nova tentativa?");
          if (tryAgain) {
            // Reinicia as vidas e o score
            lives = 5;
            updateHearts();
            score = 0;
            updateScore();
            startGame();
          } else {
            // O usuário optou por não tentar novamente
            gameArea.classList.add("hidden");
          }
        }
      }
    }
  }

  function updateScore() {
    // Atualiza o elemento HTML que exibe o score
    document.getElementById("score").textContent = `Score: ${score}`;
  }

  function updateHearts() {
    // Atualiza os corações com base no número de vidas restantes
    hearts.forEach((heart, index) => {
      if (index < lives) {
        heart.style.backgroundColor = "#e44d4d"; // Coração cheio
      } else {
        heart.style.backgroundColor = "#ccc"; // Coração vazio
      }
    });
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 8) + 2; // Números de 2 a 9
  }
});
