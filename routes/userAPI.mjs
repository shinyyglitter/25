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
        HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR
    }
});

userRouter.post("/user", async (req, res) => {
    const userData = req.body; 
    try {
        const createdUser = await user.create(userData);  
        HTTP_CODES.SUCCESS.CREATED
        res.json(createdUser);
    } catch (error) {
        HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR
    }
});
export default userRouter