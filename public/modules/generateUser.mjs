export async function createUser(username) {
    try {
        const response = await fetch("/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
        });

        if (!response.ok) {
            throw new Error("Kunne ikke opprette bruker");
        }

        return await response.json();
    } catch (error) {
        console.error("Feil ved oppretting av bruker:", error);
    }
}