const categories = {
    fruits: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍍", "🥭", "🍒"],
    emojis: ["😀", "😎", "🤩", "😍", "🥳", "😜", "🤠", "😇"],
    animals: ["🐶", "🐱", "🐼", "🐯", "🦁", "🐧", "🐸", "🐵"],
    planets: ["🌍", "🌕", "🪐", "🌞", "🌙", "🌟", "☄️", "🌌"],
    flags: ["🇺🇸", "🇬🇧", "🇨🇦", "🇯🇵", "🇫🇷", "🇩🇪", "🇮🇳", "🇦🇺"]
  };
  
  let selectedCategory = [];
  let cards = [];
  let flippedCards = [];
  let matches = 0;
  let score = 0;
  let timeLeft = 30;
  let timer;
  
  const landingPage = document.getElementById("landing-page");
  const gameContainer = document.getElementById("game-container");
  const cardsGrid = document.getElementById("cards-grid");
  const scoreboard = document.getElementById("scoreboard");
  const timerDisplay = document.getElementById("timer");
  const gameOver = document.getElementById("game-over");
  const finalScore = document.getElementById("final-score");
  const playAgainButton = document.getElementById("play-again");
  
  // Event Listeners for Category Selection
  document.querySelectorAll("#landing-page button").forEach(button => {
    button.addEventListener("click", () => {
      selectedCategory = categories[button.id];
      startGame();
    });
  });
  
  // Start Game Function
  function startGame() {
    landingPage.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    cards = [...selectedCategory, ...selectedCategory];
    shuffleCards(cards);
    renderCards();
    resetGame();
    startTimer();
  }
  
  // Shuffle Cards
  function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Render Cards
  function renderCards() {
    cardsGrid.innerHTML = "";
    cards.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.dataset.index = index;
      cardElement.textContent = card;
      cardElement.addEventListener("click", handleCardClick);
      cardsGrid.appendChild(cardElement);
    });
  }
  
  // Handle Card Click
  function handleCardClick(event) {
    const card = event.target;
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
      card.classList.add("flipped");
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  }
  
  // Check for Match
  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.textContent === card2.textContent) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matches++;
      score += 10;
      scoreboard.textContent = `Score: ${score}`;
      if (matches === selectedCategory.length) {
        endGame(true);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
      }, 1000);
    }
    flippedCards = [];
  }
  
  // Timer Functionality
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Time: ${timeLeft}`;
      if (timeLeft === 0) {
        endGame(false);
      }
    }, 1000);
  }
  
  // End Game
  function endGame(isWin) {
    clearInterval(timer);
    gameContainer.classList.add("hidden");
    gameOver.classList.remove("hidden");
    finalScore.textContent = `Final Score: ${score}`;
  }
  
  // Reset Game
  function resetGame() {
    matches = 0;
    score = 0;
    timeLeft = 30;
    flippedCards = [];
    scoreboard.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}`;
  }
  
  // Play Again
  playAgainButton.addEventListener("click", () => {
    gameOver.classList.add("hidden");
    landingPage.classList.remove("hidden");
  });