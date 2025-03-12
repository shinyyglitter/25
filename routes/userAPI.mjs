import express from "express";
import UserRecordStore from "../data/userRecordStore.mjs";
import HTTP_CODES from "../utils/httpCodes.mjs";
const userRouter = express.Router();


const user = new UserRecordStore();
userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
    try {
        const users = await user.readAll();  
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post("/user", async (req, res) => {
    console.log("📩 Mottatt forespørsel med data:", req.body);
    const userData = req.body; 
    try {
        const createdUser = await user.create(userData);  
        res.status(201).json(createdUser);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default userRouter