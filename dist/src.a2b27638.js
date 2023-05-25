// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DAGBuilder = void 0;
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var svgns = "http://www.w3.org/2000/svg";
var DAG = /*#__PURE__*/function () {
  function DAG() {
    _classCallCheck(this, DAG);
  }
  _createClass(DAG, [{
    key: "createStage",
    value: function createStage(id) {
      this.stage = new Stage(id);
      return this.stage;
    }
  }, {
    key: "getStage",
    value: function getStage() {
      return this.stage;
    }
  }, {
    key: "runDag",
    value: function runDag() {}
  }]);
  return DAG;
}();
var DAGBuilder = new DAG();
exports.DAGBuilder = DAGBuilder;
var Stage = /*#__PURE__*/function () {
  function Stage(id) {
    var _this = this;
    _classCallCheck(this, Stage);
    _defineProperty(this, "startDrag", function (evt) {
      if (evt.target.classList.contains("draggable")) {
        switch (evt.target.getAttribute("type")) {
          case "node":
            _this.selectedElement = evt.target.parentNode;
            _this.broadcastListeners("dragStart", evt);
            break;
          case "edge":
            _this.selectedElement = evt.target;
            break;
          default:
            break;
        }
      }
    });
    _defineProperty(this, "drag", function (evt) {
      if (_this.selectedElement) {
        evt.preventDefault();
        var coord = _this.getMousePosition(evt);
        switch (_this.selectedElement.getAttribute("type")) {
          case "node":
            _this.selectedElement.setAttribute("transform", "translate(".concat(coord.x - 50, ", ").concat(coord.y - 25, ")"));
            _this.broadcastListeners("dragMove", evt);
            break;
          case "edge":
            var currNode = _this.nodes.find(function (node) {
              return node.id === _this.selectedElement.parentNode.getAttribute("nodeId");
            });
            var currEdgePos = {
              x: currNode.position.x + 100,
              y: currNode.position.y + 25
            };
            var cPatch = document.getElementById("cPath");
            var newPathD = "M ".concat(currEdgePos.x, " ").concat(currEdgePos.y, " T ").concat(coord.x, " ").concat(coord.y);
            cPatch.setAttribute("d", newPathD);
            break;
          default:
            break;
        }
      }
    });
    _defineProperty(this, "endDrag", function (evt) {
      if (evt.target.classList.contains("draggable")) {
        switch (evt.target.getAttribute("type")) {
          case "node":
            _this.selectedElement = null;
            _this.broadcastListeners("dragEnd", evt);
            break;
          default:
            break;
        }
      }
    });
    this.id = id;
    this.children = [];
    this._mount(id);
    this.drag = this.drag.bind(this);
    this.nodeEventListeners = {};
  }
  _createClass(Stage, [{
    key: "_mount",
    value: function _mount(id) {
      var svg = document.createElementNS(svgns, "svg");
      svg.setAttribute("xmlns", svgns);
      svg.setAttribute("viewBox", "0 0 ".concat(window.innerWidth, " ").concat(window.innerHeight));
      svg.setAttribute("id", "svg-".concat(id));
      this.svg = svg;
      document.getElementById(id).style.background = "#f2f2f2";
      document.getElementById(id).appendChild(this.svg);
      this._eventListeners();
    }
  }, {
    key: "_eventListeners",
    value: function _eventListeners() {
      this.svg.addEventListener("mousedown", this.startDrag);
      this.svg.addEventListener("mousemove", this.drag);
      this.svg.addEventListener("mouseup", this.endDrag);
      this.svg.addEventListener("mouseleave", this.endDrag);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(id, event, callback) {
      this.nodeEventListeners[id] = _objectSpread(_objectSpread({}, this.nodeEventListeners[id] || {}), {}, _defineProperty({}, event, callback));
    }
  }, {
    key: "broadcastListeners",
    value: function broadcastListeners(eventType, evtObj) {
      var nodeListener = this.nodeEventListeners[evtObj.target.getAttribute("id")];
      (nodeListener === null || nodeListener === void 0 ? void 0 : nodeListener[eventType]) && (nodeListener === null || nodeListener === void 0 ? void 0 : nodeListener[eventType](evtObj));
    }
  }, {
    key: "getMousePosition",
    value: function getMousePosition(evt) {
      var CTM = this.svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }
  }, {
    key: "createNode",
    value: function createNode(_ref) {
      var id = _ref.id,
        position = _ref.position;
      var newNode = new Node({
        id: id,
        position: position
      });
      this.children.push(newNode);
      return newNode;
    }
  }, {
    key: "_render",
    value: function _render() {
      this.children.map(function (child) {
        return child._render();
      });
    }
  }]);
  return Stage;
}();
_defineProperty(Stage, "that", Stage);
var Node = /*#__PURE__*/function () {
  function Node(_ref2) {
    var id = _ref2.id,
      position = _ref2.position;
    _classCallCheck(this, Node);
    this.id = id;
    this.position = position;
    this.type = "node";
    this._mount({
      id: id,
      position: position
    });
  }
  _createClass(Node, [{
    key: "_mount",
    value: function _mount(_ref3) {
      var id = _ref3.id,
        position = _ref3.position;
      var node = document.createElementNS(svgns, "rect");
      var nodeGroup = document.createElementNS(svgns, "g");
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
      nodeGroup.setAttribute("id", "".concat(this.id, "-container"));
      nodeGroup.setAttribute("transform", "translate(".concat(position.x, ", ").concat(position.y, ")"));
      nodeGroup.appendChild(node);
      document.getElementById("svg-canvas").appendChild(nodeGroup);
    }
  }, {
    key: "_render",
    value: function _render() {
      var nodeGroup = document.getElementById("#".concat(this.id, "-container"));
      var node = document.getElementById("#".concat(this.id));
      nodeGroup.setAttribute("transform", "translate(".concat(this.position.x, ", ").concat(this.position.y, ")"));
      node.setAttribute("fill", "blue");
      node.setAttribute("stroke", "red");
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      DAGBuilder.stage.addEventListener(this.id, event, callback);
      return this;
    }
  }]);
  return Node;
}();
var Circle = /*#__PURE__*/function (_Node) {
  _inherits(Circle, _Node);
  var _super = _createSuper(Circle);
  function Circle() {
    _classCallCheck(this, Circle);
    return _super.apply(this, arguments);
  }
  return _createClass(Circle);
}(Node);
var Rect = /*#__PURE__*/function (_Node2) {
  _inherits(Rect, _Node2);
  var _super2 = _createSuper(Rect);
  function Rect() {
    _classCallCheck(this, Rect);
    return _super2.apply(this, arguments);
  }
  return _createClass(Rect);
}(Node);
var Ellipse = /*#__PURE__*/function (_Node3) {
  _inherits(Ellipse, _Node3);
  var _super3 = _createSuper(Ellipse);
  function Ellipse() {
    _classCallCheck(this, Ellipse);
    return _super3.apply(this, arguments);
  }
  return _createClass(Ellipse);
}(Node);
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/index.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/lib.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGCanvas = void 0;
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var svgns = "http://www.w3.org/2000/svg";

//patterns covered

// constructor pattern - create shape
// abstract constructor pattern - inside loadJSON
// facade pattern - loadJSON
// observer - events - click,drag
// builder pattern - index js 
// adapter pattern - set function
var Stage = /*#__PURE__*/function () {
  function Stage(_ref) {
    var _this = this;
    var container = _ref.container,
      width = _ref.width,
      height = _ref.height;
    _classCallCheck(this, Stage);
    _defineProperty(this, "startDrag", function (evt) {
      if (evt.target.classList.contains("draggable")) {
        _this.selectedElement = evt.target.parentNode;
        _this.offset = _this.getMousePosition(evt);
        var _SVGCanvas$getTransla = SVGCanvas.getTranslateValues(_this.selectedElement),
          x = _SVGCanvas$getTransla.x,
          y = _SVGCanvas$getTransla.y,
          z = _SVGCanvas$getTransla.z;
        _this.offset.x -= x;
        _this.offset.y -= y;
        _this.broadcastListeners("dragStart", evt);
      }
    });
    _defineProperty(this, "drag", function (evt) {
      if (_this.selectedElement) {
        evt.preventDefault();
        var coord = _this.getMousePosition(evt);
        _this.selectedElement.setAttribute("transform", "translate(".concat(coord.x - _this.offset.x, ", ").concat(coord.y - _this.offset.y, ")"));
        _this.broadcastListeners("dragMove", evt);
      }
    });
    _defineProperty(this, "endDrag", function (evt) {
      if (evt.target.classList.contains("draggable")) {
        _this.selectedElement = null;
        _this.broadcastListeners("dragEnd", evt);
      }
    });
    this.props = {
      container: container,
      width: width,
      height: height
    };
    this.props.children = [];
    this.nodeEventListeners = {};
    this._mount();
    this._eventListeners();
  }
  _createClass(Stage, [{
    key: "_eventListeners",
    value: function _eventListeners() {
      document.getElementById(this.props.container).addEventListener("mousedown", this.startDrag);
      document.getElementById(this.props.container).addEventListener("mousemove", this.drag);
      document.getElementById(this.props.container).addEventListener("mouseup", this.endDrag);
      document.getElementById(this.props.container).addEventListener("mouseleave", this.endDrag);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(id, event, callback) {
      this.nodeEventListeners[id] = _objectSpread(_objectSpread({}, this.nodeEventListeners[id] || {}), {}, _defineProperty({}, event, callback));
    }
  }, {
    key: "broadcastListeners",
    value: function broadcastListeners(eventType, evtObj) {
      var nodeListener = this.nodeEventListeners[evtObj.target.getAttribute("id")];
      (nodeListener === null || nodeListener === void 0 ? void 0 : nodeListener[eventType]) && (nodeListener === null || nodeListener === void 0 ? void 0 : nodeListener[eventType](evtObj));
    }
  }, {
    key: "getMousePosition",
    value: function getMousePosition(evt) {
      var CTM = this.svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }
  }, {
    key: "add",
    value: function add(shape) {
      var _this2 = this;
      this.props.children.push(shape);
      shape.getStage = function () {
        return _this2;
      };
      shape.render(this.props.container);
    }
  }, {
    key: "remove",
    value: function remove(shapeId) {
      this.props.children = this.props.children.filter(function () {
        return shape.id !== shapeId;
      });
    }
  }, {
    key: "_mount",
    value: function _mount() {
      var svg = document.createElementNS(svgns, "svg");
      svg.setAttribute("xmlns", svgns);
      svg.setAttribute("viewBox", "0 0 ".concat(this.props.width, " ").concat(this.props.height));
      svg.setAttribute("id", "svg-".concat(this.props.container));
      svg.setAttribute("width", this.props.width);
      svg.setAttribute("height", this.props.height);
      this.svg = svg;
      document.getElementById(this.props.container).appendChild(this.svg);
      document.getElementById("svg-".concat(this.props.container)).style.background = "#f2f2f2";
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      this.props.children.map(function (shape) {
        return shape.render(_this3.props.container);
      });
    }
  }, {
    key: "exportJSON",
    value: function exportJSON() {
      return this.props.children.map(function (shape) {
        return shape.props;
      });
    }
  }, {
    key: "loadJSON",
    value: function loadJSON(json) {
      // facade
      this.props.children = json.map(function (shapeProps) {
        // abstract constructor pattern
        switch (shapeProps.type) {
          case 'Rect':
            return new Rect(_objectSpread({}, shapeProps));
          case 'Circle':
            return new Circle(_objectSpread({}, shapeProps));
          case 'Ellipse':
            return new Ellipse(_objectSpread({}, shapeProps));
          default:
            break;
        }
      });
      this.render();
    }
  }]);
  return Stage;
}();
var Shape = /*#__PURE__*/function () {
  function Shape(props) {
    _classCallCheck(this, Shape);
    this.props = _objectSpread({}, props);
  }
  _createClass(Shape, [{
    key: "create",
    value: function create() {
      var shape = document.createElementNS(svgns, this.data.shape);
      this.setAttributes(shape);
      if (this.props.draggable) shape.classList.add("draggable");
      return {
        shape: shape
      };
    }
  }, {
    key: "set",
    value: function set() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      // adapter pattern
      var shape = document.getElementById(this.props.id);
      if (typeof args[0] === "string") {
        shape.setAttribute(args[0], args[1]);
      }
      if (_typeof(args[0]) === "object") {
        Object.keys(args[0]).forEach(function (key) {
          self.element.style[key] = args[0][key];
          shape.setAttribute(key, args[0][key]);
        });
      }
    }
  }, {
    key: "get",
    value: function get(propKey) {
      return this.props[propKey];
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(shape) {
      var _this4 = this;
      Object.keys(this.props).forEach(function (key) {
        shape.setAttribute(key, _this4.props[key]);
      });
    }
  }, {
    key: "fill",
    value: function fill(color) {
      document.getElementById(this.props.id).setAttribute('fill', color);
      return this;
    }
  }, {
    key: "stroke",
    value: function stroke(color) {
      document.getElementById(this.props.id).setAttribute('stroke', color);
      return this;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return {
        x: this.props.x,
        y: this.props.y
      };
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      if (['dragStart', 'dragMove', 'dragEnd'].includes(event)) {
        this.getStage().addEventListener(this.props.id, event, callback);
      } else {
        document.getElementById(this.props.id).addEventListener(event, callback);
      }
    }
  }]);
  return Shape;
}();
var Rect = /*#__PURE__*/function (_Shape) {
  _inherits(Rect, _Shape);
  var _super = _createSuper(Rect);
  function Rect(props) {
    var _this5;
    _classCallCheck(this, Rect);
    _this5 = _super.call(this, props);
    _this5.props = _objectSpread({}, props);
    _this5.data = {
      shape: 'rect'
    };
    return _this5;
  }
  _createClass(Rect, [{
    key: "_wrap",
    value: function _wrap(shape) {
      var group = document.createElementNS(svgns, "g");
      group.setAttribute("id", "".concat(this.props.id, "-container"));
      group.setAttribute("transform", "translate(".concat(this.props.x - this.props.width / 2, ", ").concat(this.props.y - this.props.height / 2, ")"));
      group.appendChild(shape);
      return group;
    }
  }, {
    key: "render",
    value: function render(container) {
      var _this$create = this.create(),
        shape = _this$create.shape;
      shape.setAttribute("x", 0);
      shape.setAttribute("y", 0);
      var group = this._wrap(shape);
      document.getElementById("svg-".concat(container)).appendChild(group);
    }
  }]);
  return Rect;
}(Shape);
var Circle = /*#__PURE__*/function (_Shape2) {
  _inherits(Circle, _Shape2);
  var _super2 = _createSuper(Circle);
  function Circle(props) {
    var _this6;
    _classCallCheck(this, Circle);
    _this6 = _super2.call(this, props);
    _this6.props = _objectSpread({}, props);
    _this6.data = {
      shape: 'circle'
    };
    return _this6;
  }
  _createClass(Circle, [{
    key: "_wrap",
    value: function _wrap(shape) {
      var group = document.createElementNS(svgns, "g");
      group.setAttribute("id", "".concat(this.props.id, "-container"));
      group.setAttribute("transform", "translate(".concat(this.props.cx, ", ").concat(this.props.cy, ")"));
      group.appendChild(shape);
      return group;
    }
  }, {
    key: "render",
    value: function render(container) {
      var _this$create2 = this.create(),
        shape = _this$create2.shape;
      shape.setAttribute("cx", 0);
      shape.setAttribute("cy", 0);
      var group = this._wrap(shape);
      document.getElementById("svg-".concat(container)).appendChild(group);
    }
  }]);
  return Circle;
}(Shape);
var Ellipse = /*#__PURE__*/function (_Shape3) {
  _inherits(Ellipse, _Shape3);
  var _super3 = _createSuper(Ellipse);
  function Ellipse(props) {
    var _this7;
    _classCallCheck(this, Ellipse);
    _this7 = _super3.call(this, props);
    _this7.props = _objectSpread({}, props);
    _this7.data = {
      shape: 'ellipse'
    };
    return _this7;
  }
  _createClass(Ellipse, [{
    key: "_wrap",
    value: function _wrap(shape) {
      var group = document.createElementNS(svgns, "g");
      group.setAttribute("id", "".concat(this.props.id, "-container"));
      group.setAttribute("transform", "translate(".concat(this.props.cx, ", ").concat(this.props.cy, ")"));
      group.appendChild(shape);
      return group;
    }
  }, {
    key: "render",
    value: function render(container) {
      var _this$create3 = this.create(),
        shape = _this$create3.shape;
      shape.setAttribute("cx", 0);
      shape.setAttribute("cy", 0);
      var group = this._wrap(shape);
      document.getElementById("svg-".concat(container)).appendChild(group);
    }
  }]);
  return Ellipse;
}(Shape);
var SVGCanvas = function () {
  return {
    Stage: Stage,
    Rect: Rect,
    Circle: Circle,
    Ellipse: Ellipse,
    getTranslateValues: function getTranslateValues(element) {
      var style = window.getComputedStyle(element);
      var matrix = style.transform || style.webkitTransform || style.mozTransform;

      // No transform property. Simply return 0 values.
      if (matrix === 'none') {
        return {
          x: 0,
          y: 0,
          z: 0
        };
      }

      // Can either be 2d or 3d transform
      var matrixType = matrix.includes('3d') ? '3d' : '2d';
      var matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');

      // 2d matrices have 6 values
      // Last 2 values are X and Y.
      // 2d matrices does not have Z value.
      if (matrixType === '2d') {
        return {
          x: matrixValues[4],
          y: matrixValues[5],
          z: 0
        };
      }

      // 3d matrices have 16 values
      // The 13th, 14th, and 15th values are X, Y, and Z
      if (matrixType === '3d') {
        return {
          x: matrixValues[12],
          y: matrixValues[13],
          z: matrixValues[14]
        };
      }
    }
  };
}();
exports.SVGCanvas = SVGCanvas;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _canvas = require("./canvas");
require("./index.css");
var _lib = require("./lib");
document.getElementById("app").innerHTML = "\n   <div id=\"canvas\"></div>";

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
var stage = new _lib.SVGCanvas.Stage({
  container: "canvas",
  width: window.innerWidth,
  height: window.innerHeight
});
var rect1 = new _lib.SVGCanvas.Rect({
  id: 1,
  x: 300,
  y: 100,
  fill: 'red',
  width: 100,
  height: 50,
  draggable: true
});
var circle1 = new _lib.SVGCanvas.Circle({
  id: 2,
  cx: 100,
  cy: 100,
  fill: 'blue',
  r: 40,
  stroke: 'black'
});
var ellipse = new _lib.SVGCanvas.Ellipse({
  id: 3,
  cx: 100,
  cy: 100,
  fill: 'white',
  rx: 100,
  ry: 60,
  stroke: 'black'
});
stage.add(ellipse);
stage.add(rect1);
stage.add(circle1);

// builder pattern
rect1.fill('black').stroke('red');
rect1.getPosition();
var colorToggle = false;
rect1.on('click', function (e) {
  e.target.setAttribute('fill', colorToggle ? 'red' : 'blue');
  colorToggle = !colorToggle;
});
// observer pattern
rect1.on('dragMove', function (e) {
  var pos = _lib.SVGCanvas.getTranslateValues(e.target.parentNode);
  document.getElementById("data").innerHTML = "X: ".concat(pos.x, ", Y: ").concat(pos.y, " ");
});
console.log(stage.exportJSON());
},{"./canvas":"src/canvas.js","./index.css":"src/index.css","./lib":"src/lib.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54238" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map