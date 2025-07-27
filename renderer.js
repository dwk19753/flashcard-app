const fs = require('fs');
const path = require('path');

let cards = [];
let currentIndex = 0;
let originalCards = [];

const container = document.getElementById('flashcard-container');
const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');
const beginningButton = document.getElementById('beginning-button');
const endButton = document.getElementById('end-button');
const shuffleButton = document.getElementById('shuffle-button');
const unshuffleButton = document.getElementById('unshuffle-button');

function loadCards() {
  const rawData = fs.readFileSync(path.join(__dirname, 'cards.json'));
  cards = JSON.parse(rawData);
  originalCards = cards.slice(); // Save original order
  showCard(currentIndex);
}

function showCard(index) {
  const card = cards[index];
  container.innerHTML = `
    <h2 id="card-name" style="visibility: hidden; min-height: 1.5em;">${card.name}</h2>
    <div class="image-container">
      <img id="card-image" src="${card.imageUrl}" alt="${card.name}" style="width: 100%; height: 100%; object-fit: contain; cursor: pointer;">
    </div>
    <p>${card.description}</p>
  `;

  const cardName = document.getElementById('card-name');
  const cardImage = document.getElementById('card-image');

  cardImage.addEventListener('click', () => {
    if (cardName.style.visibility === 'hidden') {
      cardName.style.visibility = 'visible';
    } else {
      cardName.style.visibility = 'hidden';
    }
  });
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  showCard(currentIndex);
});

backButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  showCard(currentIndex);
});

beginningButton.addEventListener('click', () => {
  currentIndex = 0;
  showCard(currentIndex);
});

endButton.addEventListener('click', () => {
  currentIndex = cards.length - 1;
  showCard(currentIndex);
});

shuffleButton.addEventListener('click', () => {
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  currentIndex = 0;
  showCard(currentIndex);
});

unshuffleButton.addEventListener('click', () => {
  cards = originalCards.slice(); // Restore original order
  currentIndex = 0;
  showCard(currentIndex);
});

loadCards();
