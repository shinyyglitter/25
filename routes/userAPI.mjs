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
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

userRouter.post("/user", async (req, res) => {
    console.log("Incoming POST request to /user with body:", req.body);  

    try {
        const createdUser = await user.create(req.body);  
        console.log("User successfully created:", createdUser);
        HTTP_CODES.SUCCESS.CREATED
    } catch (error) {
        console.error("Error creating user:", error);
        HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR
    }
});

export default userRouter;
