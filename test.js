import UserRecordStore from "./data/userRecordStore.mjs";

async function runTests() {
  try {
    console.log("Tester opprettelse av bruker...");
    
    const store = new UserRecordStore();
    const user = await store.create(1, "testuser");
    console.log("Opprettet bruker:", user);

    console.log("Henter alle brukere...");
    const users = await store.readAll();
    console.log("Alle brukere:", users);

    console.log("Sletter testbruker...");
    const deletedUser = await store.remove(1);
    console.log("Slettet bruker:", deletedUser);
  } catch (error) {
    console.error("Feil under testing:", error);
  }
}


runTests()