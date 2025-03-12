import express from "express";
import UserRecordStore from "../data/userRecordStore.mjs";
import HTTP_CODES from "../utils/httpCodes.mjs";
const userRouter = express.Router();


const user = new UserRecordStore();
userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
    try {
        const users = await user.readAll();  // OBS: Trenger en `readAll`-metode i `UserRecordStore`
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post("/", async (req, res) => {
    const userData = req.body;  // Hent dataen fra forespørselen
    try {
        const createdUser = await user.create(userData);  // Bruk create-metoden til UserRecordStore
        res.status(201).json(createdUser);  // Send tilbake den nyopprettede brukeren
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default userRouter