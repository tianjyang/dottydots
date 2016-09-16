/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _npc_dots = __webpack_require__(1);
	
	var _npc_dots2 = _interopRequireDefault(_npc_dots);
	
	var _utils = __webpack_require__(3);
	
	var Util = _interopRequireWildcard(_utils);
	
	var _user_dot = __webpack_require__(4);
	
	var _user_dot2 = _interopRequireDefault(_user_dot);
	
	var _blaster_dot = __webpack_require__(5);
	
	var _blaster_dot2 = _interopRequireDefault(_blaster_dot);
	
	var _start_screen = __webpack_require__(6);
	
	var _bullet = __webpack_require__(7);
	
	var _bullet2 = _interopRequireDefault(_bullet);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(stage) {
	    _classCallCheck(this, Game);
	
	    this.stage = stage;
	    window.stage = stage;
	    this.movingObjects = [];
	    this.run = this.run.bind(this);
	    // this.addDots.bind(this)();
	    this.handleKeyboard = this.handleKeyboard.bind(this);
	    this.checkUserCollision = this.checkUserCollision.bind(this);
	    this.gameStatus = "StartScreen";
	    this.startScreenShowing = false;
	    this.endScreenShowing = false;
	    this.addBlasterDots = false;
	    createjs.Sound.registerSound("computerbeep_15.mp3", "beep");
	    createjs.Sound.registerSound("ent_doorchime.mp3", "death");
	    createjs.Sound.registerSound("force_field_hit.mp3", "bounce");
	    createjs.Sound.registerSound("tng_torpedo_clean.mp3", "blaster");
	    this.bullets = [];
	  }
	
	  _createClass(Game, [{
	    key: 'addDots',
	    value: function addDots(difficulty) {
	      var difficultyObject = {
	        Sample: [5, 5, 5, 5, true],
	        Easy: [6, 3, 0, 0, true],
	        Medium: [10, 12, 1, 0, true],
	        Hard: [15, 12, 9, 2, true]
	      };
	
	      var settings = difficultyObject[difficulty];
	      var temp = void 0;
	      var tempPos = void 0;
	
	      var mediumDotOpts = {
	        radius: 45,
	        vMax: .25
	      };
	
	      var smallMedDotOpts = {
	        radius: 30,
	        vMax: 0.75
	      };
	
	      var smallDotOpts = {
	        radius: 15,
	        vMax: 0.25
	      };
	
	      var microDotOpts = {
	        radius: 5,
	        vMax: 10
	      };
	
	      var userDotOpts = {
	        radius: 10,
	        vMax: 6
	      };
	
	      var blasterDotOpts = {
	        radius: 10,
	        vMax: 0.25
	      };
	
	      for (var i = 0; i < settings[3]; i++) {
	        temp = new _npc_dots2.default(this.stage, this, mediumDotOpts);
	        this.movingObjects.push(temp);
	      }
	
	      for (var _i = 0; _i < settings[2]; _i++) {
	        temp = new _npc_dots2.default(this.stage, this, smallMedDotOpts);
	        this.movingObjects.push(temp);
	      }
	      for (var _i2 = 0; _i2 < settings[1]; _i2++) {
	        temp = new _npc_dots2.default(this.stage, this, smallDotOpts);
	        this.movingObjects.push(temp);
	      }
	
	      for (var _i3 = 0; _i3 < settings[0]; _i3++) {
	        temp = new _npc_dots2.default(this.stage, this, microDotOpts);
	        this.movingObjects.push(temp);
	      }
	      if (this.addBlasterDots) {
	        temp = new _blaster_dot2.default(this.stage, this, blasterDotOpts);
	        this.movingObjects.push(temp);
	      }
	
	      temp = new _user_dot2.default(this.stage, this, userDotOpts);
	      this.userDot = temp;
	
	      this.stage.update();
	    }
	  }, {
	    key: 'handleKeyboard',
	    value: function handleKeyboard() {
	      var impulse = [0, 0];
	      if (key.isPressed("w")) {
	        impulse[1] = -.05;
	      }
	      if (key.isPressed("a")) {
	        impulse[0] = -.05;
	      }
	      if (key.isPressed("d")) {
	        impulse[0] = .05;
	      }
	      if (key.isPressed("s")) {
	        impulse[1] = .05;
	      }
	      this.userDot.updateVelocity(impulse);
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var _this = this;
	
	      var handleTick = function handleTick(e) {
	        switch (_this.gameStatus) {
	          case "StartScreen":
	            if (!_this.startScreenShowing) {
	              _this.startScreenShowing = true;
	              _this.addDots("Sample");
	              _this.userDot.x = 1000000;
	              _this.Title = new createjs.Text("Dotty Dots", "50px Arial", "#00AAAA");
	              _this.Title.x = 100;
	              _this.Title.y = 200;
	              _this.Title.textBaseline = "alphabetic";
	              _this.stage.addChild(_this.Title);
	              _this.Instructions = new createjs.Text("Eat smaller dots to grow but don't get eaten!", "20px Arial", "#00AAAA");
	              _this.Instructions.x = 100;
	              _this.Instructions.y = 250;
	              _this.Instructions.textBaseline = "alphabetic";
	              _this.stage.addChild(_this.Instructions);
	              _this.Controls = new createjs.Text("Use WASD to move", "20px Arial", "#00AAAA");
	              _this.Controls.x = 100;
	              _this.Controls.y = 280;
	              _this.Controls.textBaseline = "alphabetic";
	              _this.stage.addChild(_this.Controls);
	              _this.Confirm = new createjs.Text("Choose Your Difficulty!", "20px Arial", "#00AAAA");
	              _this.Confirm.x = 100;
	              _this.Confirm.y = 310;
	              _this.Confirm.textBaseline = "alphabetic";
	              _this.stage.addChild(_this.Confirm);
	              _this.Easy = new createjs.Shape();
	              _this.Easy.graphics.beginFill("red").drawRect(0, 0, 75, 50);
	              _this.Easy.x = 100;
	              _this.Easy.y = 350;
	              _this.stage.addChild(_this.Easy);
	              _this.EasyText = new createjs.Text("Easy", "20px Arial", "white");
	              _this.EasyText.textAlign = "center";
	              _this.EasyText.textBaseline = "middle";
	              _this.EasyText.x = 137.5;
	              _this.EasyText.y = 375;
	              _this.stage.addChild(_this.EasyText);
	              _this.Medium = new createjs.Shape();
	              _this.Medium.graphics.beginFill("red").drawRect(0, 0, 75, 50);
	              _this.Medium.x = 200;
	              _this.Medium.y = 350;
	              _this.stage.addChild(_this.Medium);
	              _this.MediumText = new createjs.Text("Medium", "20px Arial", "white");
	              _this.MediumText.textAlign = "center";
	              _this.MediumText.textBaseline = "middle";
	              _this.MediumText.x = 237.5;
	              _this.MediumText.y = 375;
	              _this.stage.addChild(_this.MediumText);
	              _this.Hard = new createjs.Shape();
	              _this.Hard.graphics.beginFill("red").drawRect(0, 0, 75, 50);
	              _this.Hard.x = 300;
	              _this.Hard.y = 350;
	              _this.stage.addChild(_this.Hard);
	              _this.HardText = new createjs.Text("Hard", "20px Arial", "white");
	              _this.HardText.textAlign = "center";
	              _this.HardText.textBaseline = "middle";
	              _this.HardText.x = 337.5;
	              _this.HardText.y = 375;
	              _this.stage.addChild(_this.HardText);
	
	              _this.BlasterOption = new createjs.Shape();
	              _this.BlasterOption.graphics.beginFill("red").drawRect(0, 0, 175, 50);
	              _this.BlasterOption.x = 400;
	              _this.BlasterOption.y = 350;
	              _this.stage.addChild(_this.BlasterOption);
	              _this.BlasterOptionText = new createjs.Text("Bonus Challenge?", "20px Arial", "white");
	              _this.BlasterOptionText.textAlign = "center";
	              _this.BlasterOptionText.textBaseline = "middle";
	              _this.BlasterOptionText.x = 487.5;
	              _this.BlasterOptionText.y = 375;
	              _this.stage.addChild(_this.BlasterOptionText);
	
	              _this.Easy.addEventListener("click", function (event) {
	                _this.stage.removeAllChildren();
	                _this.movingObjects = [];
	                _this.addDots("Easy");
	                _this.gameStatus = "Playing";
	                _this.startScreenShowing = false;
	              });
	
	              _this.Medium.addEventListener("click", function (event) {
	                _this.stage.removeAllChildren();
	                _this.movingObjects = [];
	                _this.addDots("Medium");
	                _this.gameStatus = "Playing";
	                _this.startScreenShowing = false;
	              });
	
	              _this.Hard.addEventListener("click", function (event) {
	                _this.stage.removeAllChildren();
	                _this.movingObjects = [];
	                _this.addDots("Hard");
	                _this.gameStatus = "Playing";
	                _this.startScreenShowing = false;
	              });
	
	              _this.BlasterOption.addEventListener("click", function (event) {
	                var thisContext = _this;
	                if (_this.addBlasterDots) {
	                  thisContext.addBlasterDots = false;
	                  thisContext.BlasterOption.graphics._fill.style = "red";
	                  thisContext.BlasterOptionText.color = "white";
	                } else {
	                  thisContext.addBlasterDots = true;
	                  thisContext.BlasterOption.graphics._fill.style = "yellow";
	                  thisContext.BlasterOptionText.color = "black";
	                }
	              });
	            }
	            _this.stage.update();
	            _this.movingObjects.forEach(function (el) {
	              el.updateState(_this.userDot);
	            });
	
	            break;
	          case "Playing":
	            _this.handleKeyboard();
	            _this.movingObjects.forEach(function (el) {
	              el.updateState(_this.userDot);
	            });
	            _this.bullets.forEach(function (el, idx) {
	              el.updateState(_this.userDot);
	              if (el.timeCount >= 100) {
	                _this.bullets.splice(idx, 1);
	                _this.stage.removeChild(el);
	              }
	            });
	            _this.userDot.updateState();
	            _this.checkCollisions(_this.bounceTwoEntities);
	            _this.checkUserCollision();
	            _this.checkIfWon();
	            _this.stage.update();
	            break;
	          case "Lost":
	            if (!_this.endScreenShowing) {
	              _this.Title = new createjs.Text("You Lost!", "50px Arial", "#00AAAA");
	              _this.Title.x = 100;
	              _this.Title.y = 200;
	              _this.Title.textBaseline = "alphabetic";
	              _this.subTitle = new createjs.Text("Press Space to Try Again!", "20px Arial", "#00AAAA");
	              _this.subTitle.x = 100;
	              _this.subTitle.y = 250;
	              _this.subTitle.textBaseline = "alphabetic";
	              _this.stage.addChild(_this.Title);
	              _this.stage.addChild(_this.subTitle);
	              _this.stage.update();
	              _this.endScreenShowing = true;
	              _this.addBlasterDots = false;
	            }
	            if (key.isPressed("space")) {
	              _this.stage.children = [];
	              _this.gameStatus = "StartScreen";
	              _this.endScreenShowing = false;
	              _this.movingObjects = [];
	              _this.bullets = [];
	            }
	            break;
	          case "Won":
	            if (!_this.endScreenShowing) {
	              _this.endScreenShowing = true;
	              _this.Title = new createjs.Text("You Won!", "50px Arial", "#00AAAA");
	              _this.Title.x = 100;
	              _this.Title.y = 200;
	              _this.Title.textBaseline = "alphabetic";
	              _this.subTitle = new createjs.Text("Press Space to Play Again!", "20px Arial", "#00AAAA");
	              _this.subTitle.x = 100;
	              _this.subTitle.y = 250;
	              _this.subTitle.textBaseline = "alphabetic";
	              _this.stage.addChild(_this.Title);
	              _this.stage.addChild(_this.subTitle);
	              _this.stage.update();
	              _this.addBlasterDots = false;
	            }
	
	            if (key.isPressed("space")) {
	              _this.stage.children = [];
	              _this.gameStatus = "StartScreen";
	              _this.endScreenShowing = false;
	              _this.movingObjects = [];
	            }
	            break;
	          default:
	        }
	      };
	      this.ticker = createjs.Ticker;
	      this.ticker.framerate = 60;
	      this.ticker.addEventListener("tick", handleTick.bind(this));
	    }
	  }, {
	    key: 'checkIfWon',
	    value: function checkIfWon() {
	      if (this.stage.children.length === 1) {
	        this.gameStatus = "Won";
	      }
	    }
	  }, {
	    key: 'bounceTwoEntities',
	    value: function bounceTwoEntities(object1, object2) {
	      var pos1 = Util.coordFromObj(object1);
	      var pos2 = Util.coordFromObj(object2);
	      var normalVector1 = Util.normalizedVector(Util.vectorBetweenCenters(pos2, pos1));
	      object1.reflectVelocity(normalVector1);
	      var normalVector2 = Util.normalizedVector(Util.vectorBetweenCenters(pos1, pos2));
	      object2.reflectVelocity(normalVector2);
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions(callback) {
	      var pos1 = [];
	      var pos2 = [];
	      var radius1 = void 0,
	          radius2 = void 0;
	      var distance = null;
	      var numEntities = this.movingObjects.length;
	      for (var i = 0; i < numEntities - 1; i++) {
	        for (var j = i + 1; j < numEntities; j++) {
	          pos1 = Util.coordFromObj(this.movingObjects[i]);
	          radius1 = this.movingObjects[i].radius;
	          pos2 = Util.coordFromObj(this.movingObjects[j]);
	          radius2 = this.movingObjects[j].radius;
	          distance = Util.distanceBetweenPoints(pos1, pos2);
	          if (distance <= radius1 + radius2) {
	            callback(this.movingObjects[i], this.movingObjects[j]);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'checkUserCollision',
	    value: function checkUserCollision() {
	      var radius2 = void 0,
	          pos2 = void 0,
	          distance = void 0;
	      var radius1 = this.userDot.radius;
	      var pos1 = Util.coordFromObj(this.userDot);
	      var thisScope = this;
	
	      this.bullets.forEach(function (el) {
	        radius2 = el.radius;
	        pos2 = Util.coordFromObj(el);
	        distance = Util.distanceBetweenPoints(pos1, pos2);
	        if (radius1 + radius2 > distance) {
	          thisScope.stage.removeChild(thisScope.userDot);
	          thisScope.gameStatus = "Lost";
	        }
	      });
	      this.movingObjects.forEach(function (el, idx) {
	        radius2 = el.radius;
	        pos2 = Util.coordFromObj(el);
	        distance = Util.distanceBetweenPoints(pos1, pos2);
	        if (radius1 + radius2 > distance) {
	          createjs.Sound.play("death");
	          if (radius1 > radius2) {
	            thisScope.userDot.incrementRadius();
	            thisScope.stage.removeChild(el);
	            thisScope.movingObjects.splice(idx, 1);
	          } else {
	            thisScope.stage.removeChild(thisScope.userDot);
	            thisScope.gameStatus = "Lost";
	          }
	        }
	      });
	    }
	  }, {
	    key: 'addBullet',
	    value: function addBullet(sourceDot) {
	      var pos1 = Util.coordFromObj(sourceDot);
	      var pos2 = Util.coordFromObj(this.userDot);
	      var vector = [pos2[0] - pos1[0], pos2[1] - pos1[1]];
	      var bulletDotOpts = {
	        radius: 5,
	        vel: Util.setVectorMagnitude(vector, 10),
	        pos: pos1
	      };
	
	      var temp = new _bullet2.default(this.stage, this, bulletDotOpts);
	      this.bullets.push(temp);
	    }
	  }]);
	
	  return Game;
	}();
	
	document.addEventListener("DOMContentLoaded", function () {
	  var stage = new createjs.Stage("game-canvas");
	  var game = new Game(stage);
	  game.run();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _moving_objects = __webpack_require__(2);
	
	var _moving_objects2 = _interopRequireDefault(_moving_objects);
	
	var _utils = __webpack_require__(3);
	
	var Util = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NpcDots = function (_MovingObjects) {
	  _inherits(NpcDots, _MovingObjects);
	
	  function NpcDots(stage, game, options) {
	    _classCallCheck(this, NpcDots);
	
	    var _this = _possibleConstructorReturn(this, (NpcDots.__proto__ || Object.getPrototypeOf(NpcDots)).call(this, stage, game, options));
	
	    _this.updateState = _this.updateState.bind(_this);
	    _this.scaredColor = [255, 255, 0];
	    _this.normalColor = [0, 255, 0];
	    _this.angryColor = [255, 0, 0];
	    _this.currentColor = [0, 255, 0];
	    _this.transitionColor = _this.transitionColor.bind(_this);
	
	    _this.accelScale = 0.05;
	
	    return _this;
	  }
	
	  _createClass(NpcDots, [{
	    key: 'updateState',
	    value: function updateState(userDot) {
	      if (this.affectedByUser(userDot)) {
	        this.stutter = true;
	        if (userDot.radius <= this.radius) {
	          this.transitionColor(this.angryColor);
	          this.chargeAtTarget(userDot);
	        } else if (userDot.radius > this.radius) {
	          this.transitionColor(this.scaredColor);
	          this.runAwayFrom(userDot);
	        }
	      } else {
	        this.stutter = false;
	        this.transitionColor(this.normalColor);
	        if (Util.vectorMagnitude(this.vel) > this.vMax) {
	          this.vel = Util.vectorScale(this.vel, 0.95);
	        }
	      }
	      _get(NpcDots.prototype.__proto__ || Object.getPrototypeOf(NpcDots.prototype), 'updateState', this).call(this, userDot);
	    }
	  }, {
	    key: 'chargeAtTarget',
	    value: function chargeAtTarget(userDot) {
	      var pos1 = Util.coordFromObj(this);
	      var pos2 = Util.coordFromObj(userDot);
	      var vectorSelfToA = Util.vectorBetweenCenters(pos1, pos2);
	      vectorSelfToA = Util.normalizedVector(vectorSelfToA);
	      this.vel[0] += 0.01 * vectorSelfToA[0];
	      this.vel[1] += 0.01 * vectorSelfToA[1];
	    }
	  }, {
	    key: 'runAwayFrom',
	    value: function runAwayFrom(userDot) {
	      var pos1 = Util.coordFromObj(this);
	      var pos2 = Util.coordFromObj(userDot);
	      var vectorSelfToA = Util.vectorBetweenCenters(pos2, pos1);
	      vectorSelfToA = Util.normalizedVector(vectorSelfToA);
	      this.vel[0] += this.accelScale * vectorSelfToA[0];
	      this.vel[1] += this.accelScale * vectorSelfToA[1];
	    }
	  }, {
	    key: 'affectedByUser',
	    value: function affectedByUser(userDot) {
	      var pos1 = Util.coordFromObj(this);
	      var pos2 = Util.coordFromObj(userDot);
	      var distance = Util.distanceBetweenPoints(pos1, pos2);
	      return 10 * userDot.radius > distance;
	    }
	  }, {
	    key: 'transitionColor',
	    value: function transitionColor(color) {
	      var newColor = [];
	      for (var i = 0; i < 3; i++) {
	        newColor[i] = Math.floor(0.1 * (color[i] - this.currentColor[i]) + this.currentColor[i]);
	      }
	      this.currentColor = newColor;
	      this.graphics._fill.style = "rgb(" + newColor + ")";
	    }
	  }]);
	
	  return NpcDots;
	}(_moving_objects2.default);
	
	exports.default = NpcDots;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(3);
	
	var Utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MovingObjects = function (_createjs$Shape) {
	  _inherits(MovingObjects, _createjs$Shape);
	
	  function MovingObjects(stage, game, options) {
	    var _ret;
	
	    _classCallCheck(this, MovingObjects);
	
	    var _this = _possibleConstructorReturn(this, (MovingObjects.__proto__ || Object.getPrototypeOf(MovingObjects)).call(this));
	
	    _this.vel = Utils.randomVecOfLength(1);
	    _this.radius = options.radius;
	    _this.color = "rgb(0,255,0)";
	    _this.game = game;
	    stage.addChild(_this);
	    _this.updateState = _this.updateState.bind(_this);
	    _this.graphics.beginFill(_this.color).drawCircle(0, 0, _this.radius);
	    var randomPos = Utils.initialSetupRandomPos(900, 500);
	    _this.x = randomPos[0];
	    _this.y = randomPos[1];
	    _this.realPosX = _this.x;
	    _this.realPosY = _this.y;
	    _this.vMax = options.vMax;
	    _this.stutter = false;
	    return _ret = _this, _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(MovingObjects, [{
	    key: "updateState",
	    value: function updateState(userDot) {
	      this.realPosX += this.vel[0];
	      this.realPosY += this.vel[1];
	      if (this.stutter) {
	        this.x = this.realPosX + Math.random() * 5;
	        this.y = this.realPosY + Math.random() * 5;
	      } else {
	        this.x = this.realPosX;
	        this.y = this.realPosY;
	      }
	
	      this.bounceOffWalls.bind(this)();
	    }
	  }, {
	    key: "bounceOffWalls",
	    value: function bounceOffWalls() {
	      var xLimit = this.stage.canvas.width;
	      var yLimit = this.stage.canvas.height;
	      if (this.x + this.radius > xLimit) {
	        this.vel[0] = -Math.abs(this.vel[0]);
	      }
	      if (this.y + this.radius > yLimit) {
	        this.vel[1] = -Math.abs(this.vel[1]);
	      }
	      if (this.x - this.radius < 0) {
	        this.vel[0] = Math.abs(this.vel[0]);
	      }
	      if (this.y - this.radius < 0) {
	        this.vel[1] = Math.abs(this.vel[1]);
	      }
	    }
	
	    // reflectVelocity(normalVector) {
	    //   let theta = Math.atan2(normalVector[1],normalVector[0]);
	    //   let projection = Utils.dotProduct(normalVector, this.vel);
	    //   let dVx = 2*projection*Math.cos(theta);
	    //   let dVy = 2*projection*Math.sin(theta);
	    //   this.vel[0] -= dVx;
	    //   this.vel[1] -= dVy;
	    // }
	
	  }, {
	    key: "reflectVelocity",
	    value: function reflectVelocity(normalVector) {
	      // let theta = Math.atan2(normalVector[1],normalVector[0]);
	      // let projection = Utils.dotProduct(normalVector, this.vel);
	      // let dVx = 2*projection*Math.cos(theta);
	      // let dVy = 2*projection*Math.sin(theta);
	      this.vel[0] += normalVector[0];
	      this.vel[1] += normalVector[1];
	      this.vel = Utils.setVectorMagnitude(this.vel, 1);
	    }
	  }]);
	
	  return MovingObjects;
	}(createjs.Shape);
	
	exports.default = MovingObjects;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var randomVecOfLength = exports.randomVecOfLength = function randomVecOfLength(length) {
	  var direction = Math.random() * Math.PI * 2;
	  var xComponent = Math.cos(direction) * length;
	  var yComponent = Math.sin(direction) * length;
	  return [xComponent, yComponent];
	};
	
	var initialSetupRandomPos = exports.initialSetupRandomPos = function initialSetupRandomPos(x, y) {
	  var outputX = 450;
	  var outputY = 250;
	  while (outputX < 550 && outputX > 350) {
	    outputX = Math.random() * x;
	  }
	  while (outputY < 350 && outputY > 150) {
	    outputY = Math.random() * y;
	  }
	  return [outputX, outputY];
	};
	
	var distanceBetweenPoints = exports.distanceBetweenPoints = function distanceBetweenPoints(pos1, pos2) {
	  var a = Math.pow(pos1[0] - pos2[0], 2);
	  var b = Math.pow(pos1[1] - pos2[1], 2);
	  return Math.sqrt(a + b);
	};
	
	var vectorBetweenCenters = exports.vectorBetweenCenters = function vectorBetweenCenters(pos1, pos2) {
	  var x1 = void 0,
	      x2 = void 0,
	      y1 = void 0,
	      y2 = void 0;
	  x1 = pos1[0];
	  y1 = pos1[1];
	  x2 = pos2[0];
	  y2 = pos2[1];
	  return [x2 - x1, y2 - y1];
	};
	
	var rotateVector = exports.rotateVector = function rotateVector(vector, degrees) {
	  var radians = degrees / 180 * Math.pi;
	  var xNew = vector[0] * Math.cos(radians) - vector[1] * Math.sin(radians);
	  var yNew = vector[0] * Math.sin(radians) + vector[1] * Math.cos(radians);
	  return [xNew, yNew];
	};
	
	var normalizedVector = exports.normalizedVector = function normalizedVector(vector) {
	  var x = vector[0];
	  var y = vector[1];
	  var magnitude = Math.sqrt(x * x + y * y);
	  return [x / magnitude, y / magnitude];
	};
	
	var vectorMagnitude = exports.vectorMagnitude = function vectorMagnitude(vector) {
	  var x = vector[0];
	  var y = vector[1];
	  return Math.sqrt(x * x + y * y);
	};
	
	var dotProduct = exports.dotProduct = function dotProduct(vector1, vector2) {
	  return vector1[0] * vector2[0] + vector1[1] * vector2[1];
	};
	
	var coordFromObj = exports.coordFromObj = function coordFromObj(obj) {
	  return [obj.x, obj.y];
	};
	
	var vectorScale = exports.vectorScale = function vectorScale(vector, scale) {
	  var x = vector[0];
	  var y = vector[1];
	  return [x * scale, y * scale];
	};
	
	var setVectorMagnitude = exports.setVectorMagnitude = function setVectorMagnitude(vector, magnitude) {
	  return vectorScale(vector, magnitude / vectorMagnitude(vector));
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _moving_objects = __webpack_require__(2);
	
	var _moving_objects2 = _interopRequireDefault(_moving_objects);
	
	var _utils = __webpack_require__(3);
	
	var Util = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UserDot = function (_MovingObjects) {
	  _inherits(UserDot, _MovingObjects);
	
	  function UserDot(stage, game, options) {
	    _classCallCheck(this, UserDot);
	
	    var _this = _possibleConstructorReturn(this, (UserDot.__proto__ || Object.getPrototypeOf(UserDot)).call(this, stage, game, options));
	
	    _this.updateVelocity = _this.updateVelocity.bind(_this);
	    _this.x = 450;
	    _this.y = 250;
	    _this.vel = [0, 0];
	    _this.graphics._fill.style = "rgb(0,0,255)";
	    _this.color = "rgb(0,0,255)";
	    _this.beepPos = [0, 0];
	    _this.realPosX = 450;
	    _this.realPosY = 250;
	    _this.vaMx = options.vMax;
	    return _this;
	  }
	
	  _createClass(UserDot, [{
	    key: 'updateVelocity',
	    value: function updateVelocity(impulse) {
	      this.vel[0] += impulse[0];
	      this.vel[1] += impulse[1];
	      if (Util.vectorMagnitude(this.vel) > this.vMax) {
	        this.vel = Util.setVectorMagnitude(this.vel, this.vMax);
	      }
	    }
	  }, {
	    key: 'incrementRadius',
	    value: function incrementRadius() {
	      this.radius += 1;
	      var tempX = this.x;
	      var tempY = this.y;
	      this.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
	    }
	  }, {
	    key: 'updateState',
	    value: function updateState() {
	      var currentPos = [this.x, this.y];
	      if (Util.distanceBetweenPoints(this.beepPos, currentPos) > 20) {
	        this.beepPos = [this.x, this.y];
	        createjs.Sound.play("beep");
	      }
	      _get(UserDot.prototype.__proto__ || Object.getPrototypeOf(UserDot.prototype), 'updateState', this).call(this);
	    }
	  }]);
	
	  return UserDot;
	}(_moving_objects2.default);
	
	exports.default = UserDot;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _moving_objects = __webpack_require__(2);
	
	var _moving_objects2 = _interopRequireDefault(_moving_objects);
	
	var _utils = __webpack_require__(3);
	
	var Utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BlasterDot = function (_MovingObjects) {
	  _inherits(BlasterDot, _MovingObjects);
	
	  function BlasterDot(stage, game, options) {
	    _classCallCheck(this, BlasterDot);
	
	    var _this = _possibleConstructorReturn(this, (BlasterDot.__proto__ || Object.getPrototypeOf(BlasterDot)).call(this, stage, game, options));
	
	    _this.updateState = _this.updateState.bind(_this);
	    _this.color = [0, 0, 0];
	    _this.normalColor = [0, 0, 0];
	    _this.angryColor = [255, 0, 0];
	    _this.currentColor = [0, 255, 0];
	    _this.graphics.clear();
	    _this.graphics.beginFill(_this.color).drawPolyStar(0, 0, _this.radius, 3, 0, 0);
	    _this.velHolder = null;
	    _this.radiusHolder = null;
	    var randomPos = Utils.initialSetupRandomPos(900, 500);
	    return _this;
	  }
	
	  _createClass(BlasterDot, [{
	    key: 'updateState',
	    value: function updateState(userDot) {
	      if (this.seesUser(userDot)) {
	        this.freezePosition();
	        this.stutter = true;
	        this.pointAtUser(userDot);
	        this.fireCannon();
	      } else {
	        this.unloadCannon();
	        this.stutter = false;
	        this.unfreezePosition();
	        this.rotation++;
	      }
	      _get(BlasterDot.prototype.__proto__ || Object.getPrototypeOf(BlasterDot.prototype), 'updateState', this).call(this, userDot);
	    }
	  }, {
	    key: 'fireCannon',
	    value: function fireCannon() {
	      if (!this.radiusHolder) {
	        this.radiusHolder = this.radius;
	      }
	      this.radius += 0.1;
	      this.graphics.beginFill(this.color).drawPolyStar(0, 0, this.radius, 3, 0, 0);
	      if (this.radius >= 25) {
	        this.fireBullet();
	        createjs.Sound.play("blaster");
	        this.radius = this.radiusHolder;
	        this.radiusHolder = null;
	        this.graphics.clear();
	        this.graphics.beginFill(this.color).drawPolyStar(0, 0, this.radius, 3, 0, 0);
	      }
	    }
	  }, {
	    key: 'unloadCannon',
	    value: function unloadCannon() {
	      if (this.radiusHolder && this.radius > this.radiusHolder) {
	        this.radius -= 0.5;
	        this.graphics.clear();
	        this.graphics.beginFill(this.color).drawPolyStar(0, 0, this.radius, 3, 0, 0);
	      } else {
	        this.radiusHolder = null;
	      }
	    }
	  }, {
	    key: 'freezePosition',
	    value: function freezePosition() {
	      if (!this.velHolder) {
	        this.velHolder = this.vel.slice(0);
	        this.vel = [0, 0];
	      }
	    }
	  }, {
	    key: 'unfreezePosition',
	    value: function unfreezePosition() {
	      if (this.velHolder) {
	        this.vel = this.velHolder.slice(0);
	        this.velHolder = null;
	      }
	    }
	  }, {
	    key: 'fireBullet',
	    value: function fireBullet() {
	      this.game.addBullet(this);
	    }
	  }, {
	    key: 'pointAtUser',
	    value: function pointAtUser(userDot) {
	      var y = userDot.y - this.y;
	      var x = userDot.x - this.x;
	      this.rotation = Math.atan2(y, x) * 180 / Math.PI;
	    }
	  }, {
	    key: 'seesUser',
	    value: function seesUser(userDot) {
	      var pos1 = Utils.coordFromObj(userDot);
	      var pos2 = Utils.coordFromObj(this);
	      return Utils.distanceBetweenPoints(pos1, pos2) < 200;
	    }
	  }]);
	
	  return BlasterDot;
	}(_moving_objects2.default);
	
	exports.default = BlasterDot;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StartScreen = function StartScreen(stage) {
	  _classCallCheck(this, StartScreen);
	
	  this.stage = stage;
	  this.Title = new createjs.Text("Welcome to Dotty Dots!", "20px arial", "#0000FF");
	  this.Title.x = 450;
	  this.Title.y = 100;
	  stage.addChild(this.Title);
	};
	
	exports.default = StartScreen;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _moving_objects = __webpack_require__(2);
	
	var _moving_objects2 = _interopRequireDefault(_moving_objects);
	
	var _utils = __webpack_require__(3);
	
	var Util = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Bullets = function (_MovingObjects) {
	  _inherits(Bullets, _MovingObjects);
	
	  function Bullets(stage, game, options) {
	    _classCallCheck(this, Bullets);
	
	    var _this = _possibleConstructorReturn(this, (Bullets.__proto__ || Object.getPrototypeOf(Bullets)).call(this, stage, game, options));
	
	    _this.updateVelocity = _this.updateVelocity.bind(_this);
	    _this.x = options.pos[0];
	    _this.y = options.pos[1];
	    _this.realPosX = _this.x;
	    _this.realPosY = _this.y;
	    _this.vel = options.vel;
	    _this.graphics._fill.style = "rgb(0,0,0)";
	    _this.color = "rgb(0,0,0)";
	    _this.timeCount = 0;
	    return _this;
	  }
	
	  _createClass(Bullets, [{
	    key: 'updateVelocity',
	    value: function updateVelocity(impulse) {
	      this.vel[0] += impulse[0];
	      this.vel[1] += impulse[1];
	    }
	  }, {
	    key: 'incrementRadius',
	    value: function incrementRadius() {
	      this.radius += 1;
	      var tempX = this.x;
	      var tempY = this.y;
	      this.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
	    }
	  }, {
	    key: 'updateState',
	    value: function updateState() {
	      this.timeCount++;
	      _get(Bullets.prototype.__proto__ || Object.getPrototypeOf(Bullets.prototype), 'updateState', this).call(this);
	    }
	  }]);
	
	  return Bullets;
	}(_moving_objects2.default);
	
	exports.default = Bullets;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map