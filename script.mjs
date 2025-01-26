document.addEventListener('DOMContentLoaded', () => {
    const btnMakeDeck = document.getElementById('createDeck');
    const btnShuffleDeck = document.getElementById('shuffleDeck');
    const btnShowDeck = document.getElementById('showDeck');
    const btnDrawCard = document.getElementById('drawCard');
    const outputContainer = document.getElementById('outputContainer');

    const API_BASE = 'http://localhost:8000/tmp';

    // Create Deck
    btnMakeDeck.addEventListener('click', async () => {
        const response = await fetch(`${API_BASE}/deck`, { method: 'POST' });
        const data = await response.json();
        outputContainer.textContent = `Created Deck: ${JSON.stringify(data)}`;
    });

    // Shuffle Deck
    btnShuffleDeck.addEventListener('click', async () => {
        const deckId = "your-deck-id"; // Update to pass your dynamic deck ID
        const response = await fetch(`${API_BASE}/deck/shuffle/${deckId}`, { method: 'PATCH' });
        const data = await response.json();
        outputContainer.textContent = `Shuffled Deck: ${JSON.stringify(data)}`;
    });

    // Show Deck
    btnShowDeck.addEventListener('click', async () => {
        const deckId = "your-deck-id";
        const response = await fetch(`${API_BASE}/deck/${deckId}`);
        const data = await response.json();
        outputContainer.textContent = `Deck: ${JSON.stringify(data)}`;
    });

    // Draw Card
    btnDrawCard.addEventListener('click', async () => {
        const deckId = "your-deck-id";
        const response = await fetch(`${API_BASE}/deck/${deckId}/card`);
        const data = await response.json();
        outputContainer.textContent = `Drew Card: ${JSON.stringify(data)}`;
    });
});