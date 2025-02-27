/*document.addEventListener('DOMContentLoaded', () => {
    const btnMakeDeck = document.getElementById('createDeck');
    const btnShuffleDeck = document.getElementById('shuffleDeck');
    const btnShowDeck = document.getElementById('showDeck');
    const btnDrawCard = document.getElementById('drawCard');
    const outputContainer = document.getElementById('outputContainer');

    const API_BASE = 'http://localhost:8000/tmp';
     let currentDeckId = null; 
    // Create Deck
   btnMakeDeck.addEventListener('click', async () => {
        

        const response = await fetch(`${API_BASE}/deck`, { method: 'POST' });
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Server response:", data); 

        if (data && data.deck_id) {
            currentDeckId = data.deck_id;
            outputContainer.textContent = `Created Deck: ${JSON.stringify(currentDeckId)}`;
        } else {
            outputContainer.textContent = 'Deck creation failed, no deck_id returned.';
        }
    
});

    btnShuffleDeck.addEventListener('click', async () => {
        const response = await fetch(`${API_BASE}/deck/shuffle/${currentDeckId}`, { method: 'PATCH' });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
            }
    
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

        if (!response.ok) {
            outputContainer.textContent = 'Failed to fetch deck!';
            return;
        }
    
        const data = await response.json();
    
        if (data && data.cards) {
            const formattedDeck = data.cards.join("\n");
            outputContainer.textContent = `Deck: \n${formattedDeck}`;
        } else {
            outputContainer.textContent = 'No cards in the deck.';
        }
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
}) */
