function selectGame(gameId) {
  const gameItems = document.querySelectorAll(".game-item");
  gameItems.forEach((item) => {
    item.classList.remove("active");
  });

  const selectedGame = document.querySelector(
    `.game-item[onclick*="${gameId}"]`
  );
  if (!selectedGame.classList.contains("locked")) {
    selectedGame.classList.add("active");
  }
}

function showLockedGameModal(gameId) {
  const modal = document.getElementById("lockedGameModal");
  modal.classList.add("active");

  const lockIcon = document.querySelector(
    `.game-item[onclick*="${gameId}"] .lock-icon`
  );
  lockIcon.classList.add("shake-lock");

  playSound("lock");

  setTimeout(() => {
    lockIcon.classList.remove("shake-lock");
  }, 500);
}

function playSound(type) {
  if (!window.audioContext) {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      window.audioContext = new AudioContext();
    } catch (e) {
      console.warn("Web Audio API não suportada pelo navegador");
      return;
    }
  }

  let oscillator = window.audioContext.createOscillator();
  let gainNode = window.audioContext.createGain();

  const volumeLevel = 0.01;

  switch (type) {
    case "switch":
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(440, window.audioContext.currentTime);
      gainNode.gain.setValueAtTime(
        volumeLevel,
        window.audioContext.currentTime
      );
      oscillator.connect(gainNode);
      gainNode.connect(window.audioContext.destination);
      oscillator.start();
      oscillator.stop(window.audioContext.currentTime + 0.1);
      break;
    case "lock":
      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(120, window.audioContext.currentTime);
      gainNode.gain.setValueAtTime(
        volumeLevel,
        window.audioContext.currentTime
      );
      oscillator.connect(gainNode);
      gainNode.connect(window.audioContext.destination);
      oscillator.start();
      oscillator.stop(window.audioContext.currentTime + 0.3);
      break;
    case "select":
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(520, window.audioContext.currentTime);
      gainNode.gain.setValueAtTime(
        volumeLevel,
        window.audioContext.currentTime
      );
      oscillator.connect(gainNode);
      gainNode.connect(window.audioContext.destination);
      oscillator.start();
      setTimeout(() => {
        oscillator.frequency.setValueAtTime(
          700,
          window.audioContext.currentTime
        );
      }, 50);
      oscillator.stop(window.audioContext.currentTime + 0.2);
      break;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const closeModalButton = document.getElementById("closeModalButton");
  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      const modal = document.getElementById("lockedGameModal");
      if (modal) {
        modal.classList.remove("active");
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    const gameItems = Array.from(document.querySelectorAll(".game-item"));
    const activeIndex = gameItems.findIndex((item) =>
      item.classList.contains("active")
    );
    let newIndex;

    switch (event.key) {
      case "ArrowRight":
        playSound("switch");
        newIndex = activeIndex < gameItems.length - 1 ? activeIndex + 1 : 0;
        break;
      case "ArrowLeft":
        playSound("switch");
        newIndex = activeIndex > 0 ? activeIndex - 1 : gameItems.length - 1;
        break;
      case "ArrowUp":
        playSound("switch");
        newIndex = activeIndex - 3 >= 0 ? activeIndex - 3 : activeIndex;
        break;
      case "ArrowDown":
        playSound("switch");
        newIndex =
          activeIndex + 3 < gameItems.length ? activeIndex + 3 : activeIndex;
        break;
      case "Enter":
        if (activeIndex !== -1) {
          if (gameItems[activeIndex].classList.contains("locked")) {
            const onclickAttr = gameItems[activeIndex].getAttribute("onclick");
            const gameId = onclickAttr.match(/'([^']+)'/)[1];
            showLockedGameModal(gameId);
          } else {
            playSound("select");
            setTimeout(() => {
              window.location.href = "./multiplicacao.html";
            }, 300);
          }
        }
        return;
      default:
        return;
    }

    gameItems.forEach((item) => item.classList.remove("active"));
    gameItems[newIndex].classList.add("active");

    gameItems[newIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  });
});
