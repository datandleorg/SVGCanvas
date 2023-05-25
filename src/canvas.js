const svgns = "http://www.w3.org/2000/svg";

class DAG {
  constructor() {}
  createStage(id) {
    this.stage = new Stage(id);
    return this.stage;
  }

  getStage() {
    return this.stage;
  }

  runDag() {}
}

export const DAGBuilder = new DAG();

class Stage {
  static that = this;
  constructor(id) {
    this.id = id;
    this.children = [];
    this._mount(id);
    this.drag = this.drag.bind(this);
    this.nodeEventListeners = {};
  }

  _mount(id) {
    let svg = document.createElementNS(svgns, "svg");
    svg.setAttribute("xmlns", svgns);
    svg.setAttribute(
      "viewBox",
      `0 0 ${window.innerWidth} ${window.innerHeight}`
    );
    svg.setAttribute("id", `svg-${id}`);
    this.svg = svg;
    document.getElementById(id).style.background = "#f2f2f2";
    document.getElementById(id).appendChild(this.svg);
    this._eventListeners();
  }

  _eventListeners() {
    this.svg.addEventListener("mousedown", this.startDrag);
    this.svg.addEventListener("mousemove", this.drag);
    this.svg.addEventListener("mouseup", this.endDrag);
    this.svg.addEventListener("mouseleave", this.endDrag);
  }

  addEventListener(id, event, callback) {
    this.nodeEventListeners[id] = {
      ...(this.nodeEventListeners[id] || {}),
      [event]: callback
    };
  }

  broadcastListeners(eventType, evtObj) {
    const nodeListener = this.nodeEventListeners[
      evtObj.target.getAttribute("id")
    ];
    nodeListener?.[eventType] && nodeListener?.[eventType](evtObj);
  }

  startDrag = (evt) => {
    if (evt.target.classList.contains("draggable")) {
      switch (evt.target.getAttribute("type")) {
        case "node":
          this.selectedElement = evt.target.parentNode;
          this.broadcastListeners("dragStart", evt);
          break;
        case "edge":
          this.selectedElement = evt.target;
          break;
        default:
          break;
      }
    }
  };

  getMousePosition(evt) {
    var CTM = this.svg.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  drag = (evt) => {
    if (this.selectedElement) {
      evt.preventDefault();
      var coord = this.getMousePosition(evt);

      switch (this.selectedElement.getAttribute("type")) {
        case "node":
          this.selectedElement.setAttribute(
            "transform",
            `translate(${coord.x - 50}, ${coord.y - 25})`
          );
          this.broadcastListeners("dragMove", evt);
          break;
        case "edge":
          const currNode = this.nodes.find(
            (node) =>
              node.id === this.selectedElement.parentNode.getAttribute("nodeId")
          );
          const currEdgePos = {
            x: currNode.position.x + 100,
            y: currNode.position.y + 25
          };
          let cPatch = document.getElementById("cPath");
          let newPathD = `M ${currEdgePos.x} ${currEdgePos.y} T ${coord.x} ${coord.y}`;
          cPatch.setAttribute("d", newPathD);
          break;
        default:
          break;
      }
    }
  };

  endDrag = (evt) => {
    if (evt.target.classList.contains("draggable")) {
      switch (evt.target.getAttribute("type")) {
        case "node":
          this.selectedElement = null;
          this.broadcastListeners("dragEnd", evt);
          break;
        default:
          break;
      }
    }
  };

  createNode({ id, position }) {
    let newNode = new Node({ id, position });
    this.children.push(newNode);
    return newNode;
  }

  _render() {
    this.children.map((child) => child._render());
  }
}

class Node {
  constructor({ id, position }) {
    this.id = id;
    this.position = position;
    this.type = "node";
    this._mount({ id, position });
  }

  _mount({ id, position }) {
    let node = document.createElementNS(svgns, "rect");
    let nodeGroup = document.createElementNS(svgns, "g");
    node.setAttribute("x", 0);
    node.setAttribute("y", 0);
    node.setAttribute("width", "100");
    node.setAttribute("height", "50");
    node.setAttribute("fill", "red");
    node.setAttribute("stroke", "red");
    node.setAttribute("id", id);
    node.setAttribute("type", "node");
    node.classList.add("draggable");
    nodeGroup.setAttribute("type", "node");
    nodeGroup.setAttribute("id", `${this.id}-container`);
    nodeGroup.setAttribute(
      "transform",
      `translate(${position.x}, ${position.y})`
    );
    nodeGroup.appendChild(node);
    document.getElementById("svg-canvas").appendChild(nodeGroup);
  }

  _render() {
    const nodeGroup = document.getElementById(`#${this.id}-container`);
    const node = document.getElementById(`#${this.id}`);
    nodeGroup.setAttribute(
      "transform",
      `translate(${this.position.x}, ${this.position.y})`
    );

    node.setAttribute("fill", "blue");
    node.setAttribute("stroke", "red");
  }

  on(event, callback) {
    DAGBuilder.stage.addEventListener(this.id, event, callback);
    return this;
  }
}


class Circle extends Node {

}

class Rect extends Node {
  
}

class Ellipse extends Node {
  
}