import express from "express";
import UserRecordStore from "../data/userRecordStore.mjs";


const graphRouter = express.Router();
const graph =  new UserRecordStore;

graphRouter.get("/", (req,res)=> {
    res.json(saveGraph(graph));
})
