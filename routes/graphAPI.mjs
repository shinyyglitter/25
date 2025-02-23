import express from "express";
import { Graph, GraphNode, connectNodes, saveGraph, inflateGraph } from "../data/graph.mjs";
import HTTP_CODES from "../server/utils/httpCodes.mjs";
const graphRouter = express.Router();

graphRouter.get("/", (req,res)=> {
    res.json(saveGraph(graph));
})

graphRouter.post("/node", (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json({ error: "Data is required" });
    }
    const newNode = GraphNode(data);
    graph.nodes.add(newNode);
    res.status(HTTP_CODES.SUCCESS.CREATED).json({ message: "Node added", node: newNode });
});

graphRouter.post("/connect", (req, res) => {
    const { nodeA, nodeB } = req.body;
    if (!nodeA || !nodeB) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json({ error: "Both nodes are required" });
    }

    const nodeAInstance = [...graph.nodes].find(node => node.data === nodeA);
    const nodeBInstance = [...graph.nodes].find(node => node.data === nodeB);

    if (!nodeAInstance || !nodeBInstance) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ error: "One or both nodes not found" });
    }

    connectNodes(nodeAInstance, nodeBInstance);
    res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Nodes connected" });
});

graphRouter.post("/import", (req, res) => {
    const { json } = req.body;
    if (!json) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ error: "JSON is required" });
    }

    const newGraph = inflateGraph(json);
    graph.nodes = newGraph.nodes;
    res.status(HTTP_CODES.SUCCESS.CREATED).json({ message: "Graph imported", graph: saveGraph(graph) });
});

export default graphRouter;