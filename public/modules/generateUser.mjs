import loadUserTemplate from "../controller/userView.mjs";

export async function createUser() {
    const generatedUsername = `user_${Math.floor(Math.random() * 10000)}`;
    
    try {
        const response = await fetch("/api/users/user", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: generatedUsername }),
        });

        if (!response.ok) {  
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const newUser = await response.json();
        return newUser;  
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

export async function generateUserButtonSetup() {
    const generateUserButton = document.querySelector("#button");
    const userView = await loadUserTemplate();

    

    generateUserButton.addEventListener("click", async () => {
        const newUser = await createUser();

        if (newUser) { 
            console.log("New user:", newUser);
            document.body.append(userView.view);
        } else {
            console.error("Failed to create user.");
        }
    });
}
