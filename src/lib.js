const svgns = "http://www.w3.org/2000/svg";

//patterns covered

// constructor pattern - create shape
// abstract constructor pattern - inside loadJSON
// facade pattern - loadJSON
// observer - events - click,drag
// builder pattern - index js 
// adapter pattern - set function


class Stage {
    constructor({ container, width, height }) {
        this.props = { container, width, height };
        this.props.children = [];
        this.nodeEventListeners = {};
        this._mount();
        this._eventListeners();
    }

    _eventListeners() {
        document.getElementById(this.props.container).addEventListener("mousedown", this.startDrag);
        document.getElementById(this.props.container).addEventListener("mousemove", this.drag);
        document.getElementById(this.props.container).addEventListener("mouseup", this.endDrag);
        document.getElementById(this.props.container).addEventListener("mouseleave", this.endDrag);
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
            this.selectedElement = evt.target.parentNode;
            this.offset = this.getMousePosition(evt);
            const { x, y, z } = SVGCanvas.getTranslateValues(this.selectedElement)
            this.offset.x -= x
            this.offset.y -= y
            this.broadcastListeners("dragStart", evt);
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
            this.selectedElement.setAttribute(
                "transform",
                `translate(${coord.x - this.offset.x}, ${coord.y - this.offset.y})`
            );
            this.broadcastListeners("dragMove", evt);
        }
    };

    endDrag = (evt) => {
        if (evt.target.classList.contains("draggable")) {
            this.selectedElement = null;
            this.broadcastListeners("dragEnd", evt);
        }
    };

    add(shape) {
        this.props.children.push(shape);
        shape.getStage = () => this;
        shape.render(this.props.container);
    }

    remove(shapeId) {
        this.props.children = this.props.children.filter(() => shape.id !== shapeId);
    }

    _mount() {
        let svg = document.createElementNS(svgns, "svg");
        svg.setAttribute("xmlns", svgns);
        svg.setAttribute(
            "viewBox",
            `0 0 ${this.props.width} ${this.props.height}`
        );
        svg.setAttribute("id", `svg-${this.props.container}`);
        svg.setAttribute("width", this.props.width);
        svg.setAttribute("height", this.props.height);
        this.svg = svg;
        document.getElementById(this.props.container).appendChild(this.svg);
        document.getElementById(`svg-${this.props.container}`).style.background = "#f2f2f2";
    }

    render() {
        this.props.children.map((shape) => shape.render(this.props.container))
    }

    exportJSON() {
        return this.props.children.map((shape) => {
            return shape.props
        })
    }

    loadJSON(json) { // facade
        this.props.children = json.map((shapeProps) => {

            // abstract constructor pattern
            switch (shapeProps.type) {
                case 'Rect':
                    return new Rect({ ...shapeProps })
                case 'Circle':
                    return new Circle({ ...shapeProps })
                case 'Ellipse':
                    return new Ellipse({ ...shapeProps })
                default:
                    break;
            }
        })

        this.render();
    }
}

class Shape {
    constructor(props) {
        this.props = { ...props };
    }

    create() {
        let shape = document.createElementNS(svgns, this.data.shape);

        this.setAttributes(shape);

        if (this.props.draggable) shape.classList.add("draggable");
        return { shape }
    }

    set(...args) { // adapter pattern
        const shape = document.getElementById(this.props.id);

        if (typeof args[0] === "string") {
            shape.setAttribute(args[0], args[1]);
        }
        if (typeof args[0] === "object") {
            Object.keys(args[0]).forEach((key) => {
                self.element.style[key] = args[0][key];
                shape.setAttribute(key, args[0][key]);
            });
        }
    }

    get(propKey) {
        return this.props[propKey];
    }

    setAttributes(shape) {
        Object.keys(this.props).forEach((key) => {
            shape.setAttribute(key, this.props[key]);
        });
    }

    fill(color) {
        document.getElementById(this.props.id).setAttribute('fill', color);
        return this;
    }

    stroke(color) {
        document.getElementById(this.props.id).setAttribute('stroke', color);
        return this;
    }

    getPosition() {
        return { x: this.props.x, y: this.props.y }
    }


    on(event, callback) {
        if (['dragStart', 'dragMove', 'dragEnd'].includes(event)) {
            this.getStage().addEventListener(this.props.id, event, callback);
        } else {
            document.getElementById(this.props.id).addEventListener(event, callback);
        }
    }

}
class Rect extends Shape {
    constructor(props) {
        super(props);
        this.props = { ...props };
        this.data = { shape: 'rect' };
    }

    _wrap(shape) {
        let group = document.createElementNS(svgns, "g");
        group.setAttribute("id", `${this.props.id}-container`);
        group.setAttribute(
            "transform",
            `translate(${this.props.x - this.props.width / 2}, ${this.props.y - this.props.height / 2})`
        );
        group.appendChild(shape);
        return group;
    }

    render(container) {
        const { shape } = this.create();
        shape.setAttribute("x", 0);
        shape.setAttribute("y", 0);
        const group = this._wrap(shape);
        document.getElementById(`svg-${container}`).appendChild(group);
    }
}
class Circle extends Shape {
    constructor(props) {
        super(props);
        this.props = { ...props };
        this.data = { shape: 'circle' };
    }

    _wrap(shape) {
        let group = document.createElementNS(svgns, "g");
        group.setAttribute("id", `${this.props.id}-container`);
        group.setAttribute(
            "transform",
            `translate(${this.props.cx}, ${this.props.cy})`
        );
        group.appendChild(shape);
        return group;
    }

    render(container) {
        const { shape } = this.create();
        shape.setAttribute("cx", 0);
        shape.setAttribute("cy", 0);
        const group = this._wrap(shape);
        document.getElementById(`svg-${container}`).appendChild(group);
    }
}
class Ellipse extends Shape {
    constructor(props) {
        super(props);
        this.props = { ...props };
        this.data = { shape: 'ellipse' };
    }

    _wrap(shape) {
        let group = document.createElementNS(svgns, "g");
        group.setAttribute("id", `${this.props.id}-container`);
        group.setAttribute(
            "transform",
            `translate(${this.props.cx}, ${this.props.cy})`
        );
        group.appendChild(shape);
        return group;
    }

    render(container) {
        const { shape } = this.create();
        shape.setAttribute("cx", 0);
        shape.setAttribute("cy", 0);
        const group = this._wrap(shape);
        document.getElementById(`svg-${container}`).appendChild(group);
    }
}

export const SVGCanvas = (function () {

    return {
        Stage,
        Rect,
        Circle,
        Ellipse,
        getTranslateValues: function (element) {
            const style = window.getComputedStyle(element)
            const matrix = style.transform || style.webkitTransform || style.mozTransform

            // No transform property. Simply return 0 values.
            if (matrix === 'none') {
                return {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }

            // Can either be 2d or 3d transform
            const matrixType = matrix.includes('3d') ? '3d' : '2d'
            const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

            // 2d matrices have 6 values
            // Last 2 values are X and Y.
            // 2d matrices does not have Z value.
            if (matrixType === '2d') {
                return {
                    x: matrixValues[4],
                    y: matrixValues[5],
                    z: 0
                }
            }

            // 3d matrices have 16 values
            // The 13th, 14th, and 15th values are X, Y, and Z
            if (matrixType === '3d') {
                return {
                    x: matrixValues[12],
                    y: matrixValues[13],
                    z: matrixValues[14]
                }
            }
        }
    }
}());
