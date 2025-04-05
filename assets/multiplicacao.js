document.addEventListener("DOMContentLoaded", () => {
  const els = {
    playText: document.getElementById("playText"),
    gameContainer: document.getElementById("gameContainer"),
    credits: document.getElementById("credits"),
    num1: document.getElementById("num1"),
    num2: document.getElementById("num2"),
    answer: document.getElementById("answerInput"),
    submitBtn: document.getElementById("submitAnswer"),
    result: document.getElementById("resultMessage"),
    score: document.getElementById("score"),
    hearts: document.querySelectorAll(".pixel-heart"),
  };

  let score = 0,
    lives = 5,
    streak = 0;
  let num1, num2, correctAnswer;

  els.playText.addEventListener("click", () => {
    els.playText.classList.add("hidden");
    els.credits.classList.add("hidden");
    els.gameContainer.classList.remove("hidden");

    lives = 5;
    score = 0;
    updateHearts();
    updateScore();
    newQuestion();
  });

  els.answer.addEventListener(
    "keypress",
    (e) => e.key === "Enter" && checkAnswer()
  );
  els.submitBtn.addEventListener("click", checkAnswer);

  function newQuestion() {
    num1 = Math.floor(Math.random() * 8) + 2;
    num2 = Math.floor(Math.random() * 8) + 2;
    correctAnswer = num1 * num2;

    els.num1.textContent = num1;
    els.num2.textContent = num2;
    els.answer.value = "";
    els.result.textContent = "";
    els.result.className = "text-center my-6 text-xl";
    els.answer.focus();
  }

  function checkAnswer() {
    const userAnswer = parseInt(els.answer.value);

    if (isNaN(userAnswer)) {
      els.result.textContent = "DIGITE UM NÚMERO!";
      els.result.className = "text-center my-6 text-xl text-red-500";
      els.answer.focus();
      return;
    }

    if (userAnswer === correctAnswer) {
      new Audio("./sounds/acertou.mp3").play();

      els.result.textContent = "CORRETO! +1 PONTO";
      els.result.className = "text-center my-6 text-xl text-green-400";

      score++;
      streak++;
      updateScore();

      if (streak % 5 === 0) {
        els.result.textContent = "INCRÍVEL! BÔNUS DE +2 PONTOS!";
        score += 2;
        updateScore();
        setTimeout(() => (els.result.className += " glitch"), 300);
      }

      setTimeout(newQuestion, 1200);
    } else {
      new Audio("./sounds/errou.mp3").play();

      els.result.textContent = "ERRADO! -1 VIDA";
      els.result.className = "text-center my-6 text-xl text-red-500";

      streak = 0;
      lives--;
      updateHearts();

      setTimeout(() => {
        els.result.textContent = `RESPOSTA CORRETA: ${correctAnswer}`;
      }, 1000);

      // se game over
      if (lives === 0) {
        new Audio("./sounds/game-over.mp3").play();
        els.gameContainer.classList.add("shake");

        setTimeout(() => {
          els.gameContainer.classList.remove("shake");
          els.result.textContent = "GAME OVER!";
          els.result.className = "text-center my-6 text-xl text-red-500 glitch";

          setTimeout(() => {
            if (
              confirm(
                `GAME OVER!\n\nSua pontuação: ${score}\n\nTENTAR NOVAMENTE?`
              )
            ) {
              lives = 5;
              score = 0;
              updateHearts();
              updateScore();
              newQuestion();
            } else {
              els.gameContainer.classList.add("hidden");
              els.playText.classList.remove("hidden");
              els.credits.classList.remove("hidden");
            }
          }, 1500);
        }, 600);
      } else {
        els.answer.value = "";
        els.answer.focus();
        setTimeout(newQuestion, 2500);
      }
    }
  }

  // att o placar
  function updateScore() {
    els.score.textContent = `PONTOS-${String(score).padStart(3, "0")}`;
  }

  // att vidas
  function updateHearts() {
    els.hearts.forEach((heart, i) => {
      if (i < lives) heart.classList.remove("empty");
      else heart.classList.add("empty");
    });
  }
});
