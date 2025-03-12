import UserRecordStore from "../data/userRecordStore.mjs";

const userStore = new UserRecordStore();

async function generateNewUser(){
    try {
        const randomUsername = `user_${Math.floor(1000 + Math.random() * 9000)}`
        const newUser = {username: randomUsername};
        const storeUser = await userStore.create(newUser);

        console.log("Ny bruker opprettet: ", storeUser)
        return storeUser
    } catch (error) {
        console.error("Feil ved opprettelse av bruker: ", error);
        throw error
    }
}

export async function createUser(){
    const user = await generateNewUser();
    console.log("Bruker opprettet: ", user);
}