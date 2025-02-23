
 const GraphNode = (data) => {
    return{data, edges: new Set()}
}
//Set hindrer duplikater

const Graph = () => {
    return {nodes: new Set()}
}

export const connectNodes = (nodeA, nodeB) => {
    nodeA.edges.add(nodeB)
}

export const saveGraph = (graph) => {
    return JSON.stringify([...graph.nodes].map(node => ({
        id: index,
        data: node.data,
        edges: [...node.edges].map(edge => edge.data)
    })),null,3)
}

export function inflateGraph(json) {
    const parsed = JSON.parse(json);
    const nodes = new Map();

    
    parsed.forEach(nodeData => {
        nodes.set(nodeData.data, GraphNode(nodeData.data));
    });

    
    parsed.forEach(nodeData => {
        nodeData.edges.forEach(edgeData => {
            nodes.get(nodeData.data).edges.add(nodes.get(edgeData));
        });
    });

    const graph = Graph();
    nodes.forEach(node => graph.nodes.add(node));
    return graph;
}

export { Graph, GraphNode };