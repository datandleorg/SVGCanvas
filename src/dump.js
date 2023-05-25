const svgns = "http://www.w3.org/2000/svg";

var DAG = (function () {
  var instance;

  function DAGClass() {
    this.nodes = [];
    this.connectors = [];

    this.setNodes = function () {
      this.nodes.push("sara");
      return this;
    };

    this.createStage = function (id) {
      this.stage = new Stage(id);
      return this;
    };

    this.createNode = function ({ id, position, type = "data" }) {
      let node = {};
      switch (type) {
        case "data":
          node = new DataNode({ id, position, parent: this.stage });
          break;
        case "select":
          node = new SelectNode({ id, position, parent: this.stage });
          break;
        default:
          break;
      }
      this.nodes.push(node);
      return this;
    };

    this.addLayer = function () {
      this.stage.layer.push(new Layer());
      return this;
    };

    this.createConnector = function () {
      this.connectors.push(new Connector());
      return this;
    };

    return this;
  }

  return {
    init: function () {
      if (!instance) {
        instance = new DAGClass();
        delete instance.constructor;
      }
      return instance;
    }
  };
})();

export default DAG;

class Stage {
  constructor(id) {
    let svg = document.createElementNS(svgns, "svg");
    svg.setAttribute("xmlns", svgns);
    svg.setAttribute(
      "viewBox",
      `0 0 ${window.innerWidth} ${window.innerHeight}`
    );
    this.id = id;
    this.svg = svg;
    this.children = [];

    svg.setAttribute("id", `svg-${id}`);
    svg.addEventListener("mousedown", this.startDrag);
    svg.addEventListener("mousemove", this.drag);
    svg.addEventListener("mouseup", this.endDrag);
    svg.addEventListener("mouseleave", this.endDrag);

    // let node = document.createElementNS(this.svgns, "rect");
    // let nodeGroup = document.createElementNS(this.svgns, "g");
    // node.setAttribute("x", 0);
    // node.setAttribute("y", 0);
    // node.setAttribute("width", "100");
    // node.setAttribute("height", "50");
    // node.setAttribute("fill", "red");
    // node.setAttribute("stroke", "red");
    // node.setAttribute("id", id);
    // node.classList.add("draggable");
    // nodeGroup.appendChild(node);
    // nodeGroup.setAttribute("transform", `translate(${0}, ${0})`);

    // this.svg.appendChild(nodeGroup);
    document.getElementById(id).style.background = "#f2f2f2";
    document.getElementById(id).appendChild(this.svg);
  }
}

class Layer {
  constructor() {}
}

class Connector {
  constructor() {}
}
class Node {
  constructor() {}

  renderNode({ id, position }) {
    let node = document.createElementNS(svgns, "rect");
    let nodeGroup = document.createElementNS(svgns, "g");
    node.setAttribute("x", position.x);
    node.setAttribute("y", position.y);
    node.setAttribute("width", "100");
    node.setAttribute("height", "50");
    node.setAttribute("fill", "red");
    node.setAttribute("stroke", "red");
    node.setAttribute("id", id);
    node.classList.add("draggable");
    // nodeGroup.appendChild(node);
    // nodeGroup.setAttribute(
    //   "transform",
    //   `translate(${position.x}, ${position.y})`
    // );
    document.getElementById("svg-canvas").appendChild(node);
  }
}

class DataNode extends Node {
  constructor({ id, position, parent }) {
    super();
    this.id = id;
    this.position = position;
    this.parent = parent;
    this.renderNode({ id, position });
  }
}

class SelectNode extends Node {
  constructor({ id, position, parent }) {
    super();
    this.id = id;
    this.position = position;
    this.parent = parent;
    this.renderNode({ id, position });
  }
}


// class Edge {
//   constructor(type, id) {
//     this.type = type;
//     this.nodeId = id;
//     this.svgns = "http://www.w3.org/2000/svg";
//     let edge = document.createElementNS(this.svgns, "rect");
//     edge.setAttribute("width", "10");
//     edge.setAttribute("height", "10");
//     edge.setAttribute("fill", "black");
//     edge.classList.add("edge");
//     this.svg = edge;
//   }
// }

// class LeadingEdge extends Edge {
//   constructor(id) {
//     super("LeadingEdge", id);
//     this.svg.setAttribute("x", -10);
//     this.svg.setAttribute("y", 20);
//   }
// }
// class TrailingEdge extends Edge {
//   constructor(id) {
//     super("TrailingEdge", id);
//     this.svg.setAttribute("x", 100);
//     this.svg.setAttribute("y", 20);
//   }
// }

// class Node {
//   constructor(type) {
//     this.type = type;
//     this.svgns = "http://www.w3.org/2000/svg";
//   }

//   createNodeSvg(id) {
//     let node = document.createElementNS(this.svgns, "rect");
//     node.setAttribute("x", 0);
//     node.setAttribute("y", 0);
//     node.setAttribute("width", "100");
//     node.setAttribute("height", "50");
//     node.setAttribute("fill", "red");
//     node.setAttribute("stroke", "red");
//     node.setAttribute("id", id);
//     node.classList.add("draggable");
//     return node;
//   }

//   renderNode({ id, position }) {
//     const stage = document.getElementById("stage");
//     let node = this.createNodeSvg(id);
//     let leadingEdge = new LeadingEdge(id);
//     let trailingEdge = new TrailingEdge(id);
//     let nodeGroup = document.createElementNS(this.svgns, "g");
//     nodeGroup.appendChild(node);
//     nodeGroup.appendChild(leadingEdge.svg);
//     nodeGroup.appendChild(trailingEdge.svg);

//     nodeGroup.setAttribute(
//       "transform",
//       `translate(${position.x}, ${position.y})`
//     );
//     stage.appendChild(nodeGroup);
//   }

//   refreshNode() {
//     const node = document.getElementById(this.id);
//     node.style.left = `${this.position.x}px`;
//     node.style.top = `${this.position.y}px`;
//   }

//   setPosition(newPosition) {
//     this.position = newPosition;
//   }
// }

// class Select extends Node {
//   constructor({ id, type, position }) {
//     super(type);
//     this.id = id;
//     this.position = position;
//     this.renderNode({ id, type, position });
//   }

//   getter() {
//     return this;
//   }
// }

// class Filter extends Node {
//   constructor({ id, type, position }) {
//     super(type);
//     this.id = id;
//     this.position = position;
//   }
// }

// export const NodeFactory = {
//   createNode: function ({ id, type, position }) {
//     switch (type) {
//       case "select":
//         return new Select({ id, type, position });
//       case "filter":
//         return new Filter({ id, type, position });
//       default:
//         break;
//     }
//   }
// };

