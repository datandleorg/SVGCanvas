import { DAGBuilder } from "./canvas";
import "./index.css";
import { SVGCanvas } from "./lib";

document.getElementById("app").innerHTML = `
   <div id="canvas"></div>`;

// const stage = DAGBuilder.createStage("canvas");
// stage
//   .createNode({ id: 1, position: { x: 100, y: 100 } })
//   .on("dragStart", (event) => {
//     console.log("Start");
//   })
//   .on("dragMove", (event) => {
//     console.log("Move");
//   })
//   .on("dragEnd", (event) => {
//     console.log(stage);
//   });

// stage
//   .createNode({ id: 2, position: { x: 200, y: 200 } })
//   .on("dragStart", (event) => {
//     console.log("Start");
//   })
//   .on("dragMove", (event) => {
//     console.log("Move");
//   })
//   .on("dragEnd", (event) => {
//     console.log("End");
//   });

// dagster.createStage("canvas");
// dagster.createNode({ id: 123, position: { x: 0, y: 0 } });

// console.log(dagster);s
// object literal like jquery
// const DAGManager = function () {
//   return {
//     nodes: [],
//     edges: [],
//     nodeTypes: ["data", "select", "filter", "ML"],
//     createNode: function (nodeData) {
//       const newNode = NodeFactory.createNode(nodeData); // fatcory pattern
//       this.nodes.push(newNode);
//       return newNode;
//     },
//     initStage: function (stageId) {
//       return new Stage(stageId);
//     }
//   };
// };

// const DAG = new DAGManager();

// const StageInstance = DAG.initStage("stage");

// DAG.createNode({
//   id: "123",
//   position: { x: 100, y: 100 },
//   type: "select"
// });

// DAG.createNode({
//   id: "2",
//   position: { x: 200, y: 200 },
//   type: "select"
// });

// console.log(DAG);


// const stage = new Stage(canvasId); // constructor creational pattern
// const node_1 = new Rect({ id, position , draggable});
// const node_2 = new Circle();

// node_1.prototype.common = ()=> console.log("common fn");

// console.log(node_2.common());

// stage.add(node_1);

// node_1.on('click',(evt)=>{
//    console.log("clicked");
// });

// stage._render();



// patterns for demo 

// singleton pattern - new Stage must be a singleton - atleast for the example 
// oberserver pattern 
// adapter pattern 
// builder pattern 
// factory pattern - shape factory for nodes 
// proxy - pattern for setting and getting values
// facade pattern - _render, loadJSON to stage method - since it has a complex logic to it 


// part 1
// lib plan
// stage containr 
// layer
// nodes - rect Circle Ellipse
// styling 
// events .on() - observer pattern
// dragNdrop - shape.draggable('true'); setting prop
// Selectors - find method 
// export and import - createStage({}) using json - load json can be **facade**
// hover effect on a node 
// set, get node props - **proxy pattern**
// render method is **facade**


// part - 2
// JSX parser


// constructor pattern
const stage = new SVGCanvas.Stage({
     container: "canvas",
     width: window.innerWidth,
     height: window.innerHeight
});

const rect1 = new SVGCanvas.Rect({
     id:1,
     x: 300,
     y: 100,
     fill: 'red',
     width: 100,
     height: 50,
     draggable: true
});

const circle1 = new SVGCanvas.Circle({
     id:2,
     cx: 100,
     cy: 100,
     fill: 'blue',
     r: 40,
     stroke: 'black',
});

const ellipse = new SVGCanvas.Ellipse({
     id:3,
     cx: 100,
     cy: 100,
     fill: 'white',
     rx: 100,
     ry: 60,
     stroke: 'black',
});

stage.add(ellipse);
stage.add(rect1);
stage.add(circle1);

// builder pattern
rect1.fill('black').stroke('red');
rect1.getPosition();

var colorToggle = false;
rect1.on('click',(e)=>{
   e.target.setAttribute('fill',colorToggle ? 'red' : 'blue');
   colorToggle = !colorToggle;
});
// observer pattern
rect1.on('dragMove',(e)=>{
     const pos = SVGCanvas.getTranslateValues(e.target.parentNode);
     document.getElementById("data").innerHTML = `X: ${pos.x}, Y: ${pos.y} `;
});

console.log(stage.exportJSON());
