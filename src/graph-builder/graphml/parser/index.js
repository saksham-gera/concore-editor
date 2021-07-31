import xml2js from 'xml2js';
import PropFromArr from './PropFromArr';
import {
    parseNode, parseEdge, parseDetails, parseActionHistory,
} from './parseProperties';

const parser = (graphMlCnt) => new Promise((resolve) => {
    new xml2js.Parser().parseString(graphMlCnt, (err, grahMLObj) => {
        const grahML = new PropFromArr(grahMLObj);
        const nodes = grahML.parseProps('graphml.graph.node', 1).map(parseNode);
        const edges = grahML.parseProps('graphml.graph.edge', 1).map(parseEdge);
        const { id, projectName } = parseDetails(grahML);
        const projectDetails = { projectName, set: Boolean(projectName) };
        const actionHistory = parseActionHistory(grahML);
        resolve({
            id, projectDetails, edges, nodes, actionHistory,
        });
    });
});
export default parser;
