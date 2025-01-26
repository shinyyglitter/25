document.addEventListener('DOMContentLoaded', () => {
    const btnMakeDeck = document.getElementById('createDeck');
    const btnShuffleDeck = document.getElementById('shuffleDeck');
    const btnShowDeck = document.getElementById('showDeck');
    const btnDrawCard = document.getElementById('drawCard');
    const outputContainer = document.getElementById('outputContainer');

    const API_BASE = 'http://localhost:8000/tmp';
    let currentDeckId = null; 
    // Create Deck
    btnMakeDeck.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_BASE}/deck`, { method: 'POST' });
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();
            outputContainer.textContent = `Created Deck: ${JSON.stringify(data)}`;
        } catch (error) {
            outputContainer.textContent = `Failed to create deck: ${error.message}`;
        }
    });

    // Shuffle Deck
    btnShuffleDeck.addEventListener('click', async () => {
        if (!currentDeckId) {
            outputContainer.textContent = 'Create a deck first!';
            return;
        }
        const response = await fetch(`${API_BASE}/deck/shuffle/${currentDeckId}`, { method: 'PATCH' });
        const data = await response.json();
        outputContainer.textContent = `Shuffled Deck: ${JSON.stringify(data)}`;
    });

    // Show Deck
    btnShowDeck.addEventListener('click', async () => {
        if (!currentDeckId) {
            outputContainer.textContent = 'Create a deck first!';
            return;
        }
        const response = await fetch(`${API_BASE}/deck/${currentDeckId}`);
        const data = await response.json();
        outputContainer.textContent = `Deck: ${JSON.stringify(data)}`;
    });

    // Draw Card
    btnDrawCard.addEventListener('click', async () => {
        if (!currentDeckId) {
            outputContainer.textContent = 'Create a deck first!';
            return;
        }
        const response = await fetch(`${API_BASE}/deck/${currentDeckId}/card`);
        const data = await response.json();
        outputContainer.textContent = `Drew Card: ${JSON.stringify(data)}`;
    });
});
