import loadUserTemplate from "../controller/userView.mjs";
export async function createUser() {
    const generatedUsername = `user_${Math.floor(Math.random() * 10000)}`;
    try {
        const response = await fetch("/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: generatedUsername }),
        });

        const newUser = await response.json();

        return await newUser;
    } catch (error) {
        console.error("Feil ved oppretting av bruker:", error);
    }
}

export async function generateUserButtonSetup(){
    const generateUserButton = document.querySelector("#button");
    const userView = await loadUserTemplate();

    if (!generateUserButton) {
        console.error("Kunne ikke finne knappen");
        return;
    }

    generateUserButton.addEventListener("click", async () => {
        const newUser = await createUser("random_username");
        console.log("Ny bruker:", newUser);
        document.body.append(userView.view);
    });
}