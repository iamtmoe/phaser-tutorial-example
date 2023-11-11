"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["index"],{

/***/ "./node_modules/phaser3-rex-plugins/plugins/input/touchcursor/TouchCursor.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/input/touchcursor/TouchCursor.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_input_VectorToCursorKeys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/input/VectorToCursorKeys.js */ "./node_modules/phaser3-rex-plugins/plugins/utils/input/VectorToCursorKeys.js");
/* harmony import */ var _utils_eventemitter_EventEmitterMethods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/eventemitter/EventEmitterMethods.js */ "./node_modules/phaser3-rex-plugins/plugins/utils/eventemitter/EventEmitterMethods.js");
/* harmony import */ var _utils_position_ScreenXYToWorldXY_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/position/ScreenXYToWorldXY.js */ "./node_modules/phaser3-rex-plugins/plugins/utils/position/ScreenXYToWorldXY.js");




const GetValue = Phaser.Utils.Objects.GetValue;
const CircleClass = Phaser.Geom.Circle;
const CircleContains = Phaser.Geom.Circle.Contains;

class TouchCursor extends _utils_input_VectorToCursorKeys_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(gameObject, config) {
        var scene = gameObject.scene;
        super(scene, config);
        //this.resetFromJSON(config); // this function had been called in super(config)

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.scene = scene;
        this.mainCamera = scene.sys.cameras.main;
        this.pointer = undefined;
        this.gameObject = gameObject;
        this.radius = GetValue(config, 'radius', 100);

        gameObject.setInteractive(new CircleClass(gameObject.displayOriginX, gameObject.displayOriginY, this.radius), CircleContains);

        this.boot();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.pointer = undefined;

        return this;
    }

    toJSON() {
        var o = super.toJSON();
        o.radius = this.radius;

        return o;
    }

    boot() {
        this.gameObject.on('pointerdown', this.onKeyDownStart, this);
        this.gameObject.on('pointerover', this.onKeyDownStart, this);

        this.scene.input.on('pointermove', this.onKeyDown, this);
        this.scene.input.on('pointerup', this.onKeyUp, this);

        this.gameObject.once('destroy', this.onParentDestroy, this);
    }

    shutdown(fromScene) {
        if (!this.scene) {
            return;
        }

        // gameObject events will be removed when this gameObject destroyed 
        // this.gameObject.off('pointerdown', this.onKeyDownStart, this);
        // this.gameObject.off('pointerover', this.onKeyDownStart, this);

        this.scene.input.off('pointermove', this.onKeyDown, this);
        this.scene.input.off('pointerup', this.onKeyUp, this);

        this.destroyEventEmitter();

        this.scene = undefined;
        this.mainCamera = undefined;
        this.pointer = undefined;
        this.gameObject = undefined;

        super.shutdown();
    }

    destroy(fromScene) {
        this.shutdown(fromScene);
    }

    onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
    }

    onKeyDownStart(pointer) {
        if ((!pointer.isDown) ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.onKeyDown(pointer);
        this.emit('pointerdown', pointer);
    }

    onKeyDown(pointer) {
        if (this.pointer !== pointer) {
            return;
        }

        var camera = pointer.camera;
        if (!camera) {
            // Pointer is outside of any camera, no worldX/worldY available
            return;
        }

        // Vector of world position
        var gameObject = this.gameObject;
        var worldXY = this.end;

        // Note: pointer.worldX, pointer.worldY might not be the world position of this camera,
        // if this camera is not main-camera
        if (camera !== this.mainCamera) {
            worldXY = (0,_utils_position_ScreenXYToWorldXY_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pointer.x, pointer.y, camera, worldXY);
        } else {
            worldXY.x = pointer.worldX;
            worldXY.y = pointer.worldY;
        }

        var startX = gameObject.x;
        var startY = gameObject.y;
        if (gameObject.scrollFactorX === 0) {
            startX += camera.scrollX;
        }
        if (gameObject.scrollFactorY === 0) {
            startY += camera.scrollY;
        }

        this.setVector(startX, startY, worldXY.x, worldXY.y);

        this.emit('update');
    }

    onKeyUp(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
        this.clearVector();
        this.emit('update');
        this.emit('pointerup', pointer);
    }

    forceUpdate() {
        var pointer = this.pointer;
        if (!pointer || !pointer.isDown) {
            return this;
        }

        this.onKeyDown(pointer);
        return this;
    }

}

Object.assign(
    TouchCursor.prototype,
    _utils_eventemitter_EventEmitterMethods_js__WEBPACK_IMPORTED_MODULE_1__["default"]
);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TouchCursor);

/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/input/virtualjoystick/VirtualJoyStick.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/input/virtualjoystick/VirtualJoyStick.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _touchcursor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../touchcursor.js */ "./node_modules/phaser3-rex-plugins/plugins/touchcursor.js");
/* harmony import */ var _utils_eventemitter_EventEmitterMethods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/eventemitter/EventEmitterMethods.js */ "./node_modules/phaser3-rex-plugins/plugins/utils/eventemitter/EventEmitterMethods.js");



const GetValue = Phaser.Utils.Objects.GetValue;

class VirtualJoyStick {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);
        config.eventEmitter = this.getEventEmitter();

        this.scene = scene;
        this.base = undefined;
        this.thumb = undefined;
        this.touchCursor = undefined;
        this.setRadius(GetValue(config, 'radius', 100));

        this.addBase(GetValue(config, 'base', undefined), config);
        this.addThumb(GetValue(config, 'thumb', undefined));

        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        this.base.setPosition(x, y);
        this.thumb.setPosition(x, y);

        if (GetValue(config, 'fixed', true)) {
            this.setScrollFactor(0);
        }

        this.boot();
    }

    destroy() {
        this.destroyEventEmitter();
        this.base.destroy(); // Also destroy touchCursor behavior
        this.thumb.destroy();

        this.scene = undefined;
        this.base = undefined;
        this.thumb = undefined;
        this.touchCursor = undefined;
    }

    createCursorKeys() {
        return this.touchCursor.createCursorKeys();
    }

    get forceX() {
        return this.touchCursor.forceX;
    }

    get forceY() {
        return this.touchCursor.forceY;
    }

    get force() {
        return this.touchCursor.force;
    }

    get rotation() {
        return this.touchCursor.rotation;
    }

    get angle() {
        return this.touchCursor.angle; // -180 ~ 180
    }

    get up() {
        return this.touchCursor.upKeyDown;
    }

    get down() {
        return this.touchCursor.downKeyDown;
    }

    get left() {
        return this.touchCursor.leftKeyDown;
    }

    get right() {
        return this.touchCursor.rightKeyDown;
    }

    get noKey() {
        return this.touchCursor.noKeyDown;
    }

    get pointerX() {
        return this.touchCursor.end.x;
    }

    get pointerY() {
        return this.touchCursor.end.y;
    }

    get pointer() {
        return this.touchCursor.pointer;
    }

    setPosition(x, y) {
        if ((this.x === x) && (this.y === y)) {
            return this;
        }

        this.x = x;
        this.y = y;

        this.forceUpdateThumb();
        return this;
    }

    set x(value) {
        if (this.x === value) {
            return;
        }
        this.base.x = value;
        this.thumb.x = value;
    }

    set y(value) {
        if (this.y === value) {
            return;
        }
        this.base.y = value;
        this.thumb.y = value;
    }

    get x() {
        return this.base.x;
    }

    get y() {
        return this.base.y;
    }

    setVisible(visible) {
        this.visible = visible;
        return this;
    }

    toggleVisible() {
        this.visible = !this.visible;
        return this;
    }

    get visible() {
        return this.base.visible;
    }

    set visible(visible) {
        this.base.visible = visible;
        this.thumb.visible = visible;
    }

    get enable() {
        return this.touchCursor.enable;
    }

    set enable(value) {
        this.touchCursor.setEnable(value);
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    setRadius(radius) {
        this.radius = radius;
        return this;
    }

    addBase(gameObject, config) {
        if (this.base) {
            this.base.destroy();
            // Also destroy touchCursor behavior
        }

        if (gameObject === undefined) {
            gameObject = this.scene.add.circle(0, 0, this.radius)
                .setStrokeStyle(3, 0x0000ff);
        }

        if (config === undefined) {
            config = {};
        }
        config.eventEmitter = this.getEventEmitter();
        this.touchCursor = new _touchcursor_js__WEBPACK_IMPORTED_MODULE_0__["default"](gameObject, config)
        this.base = gameObject;
        return this;
    }

    addThumb(gameObject) {
        if (this.thumb) {
            this.thumb.destroy();
        }

        if (gameObject === undefined) {
            gameObject = this.scene.add.circle(0, 0, 40)
                .setStrokeStyle(3, 0x00ff00);
        }
        this.thumb = gameObject;
        return this;
    }

    setScrollFactor(scrollFactor) {
        this.base.setScrollFactor(scrollFactor);
        this.thumb.setScrollFactor(scrollFactor);
        return this;
    }

    boot() {
        this.on('update', this.update, this);
    }

    // Internal method
    update() {
        var touchCursor = this.touchCursor;
        // Start from (0,0)
        var dx, dy;
        var dirMode = touchCursor.dirMode;        
        if (touchCursor.anyKeyDown) {
            if (touchCursor.force > this.radius) { // Exceed radius
                var rad = touchCursor.rotation;

                // NOT 'up&down'
                dx = (dirMode !== 0) ? Math.cos(rad) * this.radius : 0;
                // NOT 'left&right'
                dy = (dirMode !== 1) ? Math.sin(rad) * this.radius : 0;
            } else {
                // NOT 'up&down'
                dx = (dirMode !== 0) ? touchCursor.forceX : 0;
                // NOT 'left&right'
                dy = (dirMode !== 1) ? touchCursor.forceY : 0;

            }
        } else {
            dx = 0;
            dy = 0;
        }

        this.thumb.x = this.base.x + dx;
        this.thumb.y = this.base.y + dy;
        return this;
    }

    forceUpdateThumb() {
        this.touchCursor.forceUpdate();
        return this;
    }
}

Object.assign(
    VirtualJoyStick.prototype,
    _utils_eventemitter_EventEmitterMethods_js__WEBPACK_IMPORTED_MODULE_1__["default"]
);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VirtualJoyStick);

/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/touchcursor.js":
/*!*****************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/touchcursor.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _input_touchcursor_TouchCursor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input/touchcursor/TouchCursor.js */ "./node_modules/phaser3-rex-plugins/plugins/input/touchcursor/TouchCursor.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_input_touchcursor_TouchCursor_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/utils/eventemitter/EventEmitterMethods.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/utils/eventemitter/EventEmitterMethods.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    setEventEmitter(eventEmitter, EventEmitterClass) {
        if (EventEmitterClass === undefined) {
            EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
        }
        this._privateEE = (eventEmitter === true) || (eventEmitter === undefined);
        this._eventEmitter = (this._privateEE) ? (new EventEmitterClass()) : eventEmitter;
        return this;
    },

    destroyEventEmitter() {
        if (this._eventEmitter && this._privateEE) {
            this._eventEmitter.shutdown();
        }
        return this;
    },

    getEventEmitter() {
        return this._eventEmitter;
    },

    on: function () {
        if (this._eventEmitter) {
            this._eventEmitter.on.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    once: function () {
        if (this._eventEmitter) {
            this._eventEmitter.once.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    off: function () {
        if (this._eventEmitter) {
            this._eventEmitter.off.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    emit: function (event) {
        if (this._eventEmitter && event) {
            this._eventEmitter.emit.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    addListener: function () {
        if (this._eventEmitter) {
            this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    removeListener: function () {
        if (this._eventEmitter) {
            this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    removeAllListeners: function () {
        if (this._eventEmitter) {
            this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    listenerCount: function () {
        if (this._eventEmitter) {
            return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
        }
        return 0;
    },

    listeners: function () {
        if (this._eventEmitter) {
            return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
        }
        return [];
    },

    eventNames: function () {
        if (this._eventEmitter) {
            return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
        }
        return [];
    },
});

/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/utils/input/CursorKeys.js":
/*!****************************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/utils/input/CursorKeys.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Key = Phaser.Input.Keyboard.Key;
const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

class CursorKeys {
    constructor(scene) {
        // scene: scene instance, or undefined
        this.cursorKeys = {
            up: new Key(scene, KeyCodes.UP),
            down: new Key(scene, KeyCodes.DOWN),
            left: new Key(scene, KeyCodes.LEFT),
            right: new Key(scene, KeyCodes.RIGHT)
        }
        this.noKeyDown = true;
    }

    shutdown(fromScene) {
        for (var key in this.cursorKeys) {
            this.cursorKeys[key].destroy();
        }
        this.cursorKeys = undefined;
    }

    destroy(fromScene) {
        shutdown(fromScene);
    }

    createCursorKeys() {
        return this.cursorKeys;
    }

    setKeyState(keyName, isDown) {
        var key = this.cursorKeys[keyName];

        if (!key.enabled) {
            return this;
        }
        if (isDown) {
            this.noKeyDown = false;
        }

        if (key.isDown !== isDown) {
            FakeEvent.timeStamp = Date.now();
            FakeEvent.keyCode = key.keyCode;
            if (isDown) {
                key.onDown(FakeEvent);
            } else {
                key.onUp(FakeEvent);
            }
        }

        return this;
    }

    clearAllKeysState() {
        this.noKeyDown = true;
        for (var keyName in this.cursorKeys) {
            this.setKeyState(keyName, false);
        }
        return this;
    }

    getKeyState(keyName) {
        return this.cursorKeys[keyName];
    }

    get upKeyDown() {
        return this.cursorKeys.up.isDown;
    }

    get downKeyDown() {
        return this.cursorKeys.down.isDown;
    }

    get leftKeyDown() {
        return this.cursorKeys.left.isDown;
    }

    get rightKeyDown() {
        return this.cursorKeys.right.isDown;
    }

    get anyKeyDown() {
        return !this.noKeyDown;
    }
}

var FakeEvent = {
    timeStamp: 0,
    keyCode: 0,
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    metaKey: false,
    location: 0,
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CursorKeys);


/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/utils/input/VectorToCursorKeys.js":
/*!************************************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/utils/input/VectorToCursorKeys.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CursorKeys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CursorKeys.js */ "./node_modules/phaser3-rex-plugins/plugins/utils/input/CursorKeys.js");
/* harmony import */ var _math_RadToDeg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/RadToDeg.js */ "./node_modules/phaser3-rex-plugins/plugins/utils/math/RadToDeg.js");
/* harmony import */ var _math_angle_angletodirections_Const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/angle/angletodirections/Const.js */ "./node_modules/phaser3-rex-plugins/plugins/utils/math/angle/angletodirections/Const.js");
/* harmony import */ var _math_angle_angletodirections_AngleToDirections_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/angle/angletodirections/AngleToDirections.js */ "./node_modules/phaser3-rex-plugins/plugins/utils/math/angle/angletodirections/AngleToDirections.js");





const GetValue = Phaser.Utils.Objects.GetValue;
const GetDist = Phaser.Math.Distance.Between;
const GetAngle = Phaser.Math.Angle.Between;

class VectorToCursorKeys extends _CursorKeys_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(scene, config) {
        super(scene);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        if (this.start == undefined) {
            this.start = { x: 0, y: 0 };
        }
        if (this.end == undefined) {
            this.end = { x: 0, y: 0 };
        }
        this._enable = undefined;
        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'dir', '8dir'));
        this.setDistanceThreshold(GetValue(o, 'forceMin', 16));

        var startX = GetValue(o, "start.x", null);
        var startY = GetValue(o, "start.y", null);
        var endX = GetValue(o, "end.x", null);
        var endY = GetValue(o, "end.y", null);
        this.setVector(startX, startY, endX, endY);
        return this;
    }

    toJSON() {
        return {
            enable: this.enable,
            dir: this.dirMode,
            forceMin: this.forceMin,

            start: {
                x: this.start.x,
                y: this.start.y
            },
            end: {
                x: this.end.x,
                y: this.end.y
            }
        };
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = _math_angle_angletodirections_Const_js__WEBPACK_IMPORTED_MODULE_2__["default"][m];
        }
        this.dirMode = m;
        return this;
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }
        if (!e) {
            this.clearVector();
        }
        this._enable = e;
        return this;
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    setDistanceThreshold(d) {
        if (d < 0) {
            d = 0;
        }
        this.forceMin = d;
        return this;
    }

    clearVector() {
        this.start.x = 0;
        this.start.y = 0;
        this.end.x = 0;
        this.end.y = 0;
        this.clearAllKeysState();
        return this;
    }

    setVector(x0, y0, x1, y1) {
        if (!this.enable) {
            // Do nothing
            return this;
        }

        if (x0 === null) {
            // Clear all keys' state
            this.clearVector();
            return this;
        }

        // (0,0) -> (x0, y0)
        if (x1 === undefined) {
            x1 = x0;
            x0 = 0;
            y1 = y0;
            y0 = 0;
        }

        this.start.x = x0;
        this.start.y = y0;
        this.end.x = x1;
        this.end.y = y1;

        if ((this.forceMin > 0) && (this.force < this.forceMin)) {
            // No key pressed
            this.clearVector();
            return this;
        }

        // Update keys' state
        this.noKeyDown = true;
        var dirStates = (0,_math_angle_angletodirections_AngleToDirections_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this.angle, this.dirMode, true);
        for (var dir in dirStates) {
            this.setKeyState(dir, dirStates[dir]);
        }

        return this;
    }

    get forceX() {
        return this.end.x - this.start.x;
    }

    get forceY() {
        return this.end.y - this.start.y;
    }

    get force() {
        return GetDist(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    get rotation() {
        return GetAngle(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    get angle() {
        return (0,_math_RadToDeg_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.rotation); // -180 ~ 180
    }

    get octant() {
        var octant = 0;
        if (this.rightKeyDown) {
            octant = (this.downKeyDown) ? 45 : 0;
        } else if (this.downKeyDown) {
            octant = (this.leftKeyDown) ? 135 : 90;
        } else if (this.leftKeyDown) {
            octant = (this.upKeyDown) ? 225 : 180;
        } else if (this.upKeyDown) {
            octant = (this.rightKeyDown) ? 315 : 270;
        }
        return octant;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VectorToCursorKeys);

/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/utils/math/RadToDeg.js":
/*!*************************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/utils/math/RadToDeg.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var RAD_TO_DEG = 180 / Math.PI;

/**
 * Convert the given angle in radians, to the equivalent angle in degrees.
 *
 * @function Phaser.Math.RadToDeg
 * @since 3.0.0
 *
 * @param {number} radians - The angle in radians to convert ot degrees.
 *
 * @return {integer} The given angle converted to degrees.
 */
var RadToDeg = function (radians)
{
    return radians * RAD_TO_DEG;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RadToDeg);


/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/utils/math/angle/angletodirections/AngleToDirections.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/utils/math/angle/angletodirections/AngleToDirections.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var AngleToDirections = function (angle, dirMode, out) {
    if (out === undefined) {
        out = {}
    } else if (out === true) {
        out = globOut;
    }

    out.left = false;
    out.right = false;
    out.up = false;
    out.down = false;

    angle = (angle + 360) % 360;
    switch (dirMode) {
        case 0: // up & down
            if (angle < 180) {
                out.down = true;
            } else {
                out.up = true;
            }
            break;

        case 1: // left & right
            if ((angle > 90) && (angle <= 270)) {
                out.left = true;
            } else {
                out.right = true;
            }
            break;

        case 2: // 4 dir
            if ((angle > 45) && (angle <= 135)) {
                out.down = true;
            } else if ((angle > 135) && (angle <= 225)) {
                out.left = true;
            } else if ((angle > 225) && (angle <= 315)) {
                out.up = true;
            } else {
                out.right = true;
            }
            break;

        case 3: // 8 dir
            if ((angle > 22.5) && (angle <= 67.5)) {
                out.down = true;
                out.right = true;
            } else if ((angle > 67.5) && (angle <= 112.5)) {
                out.down = true;
            } else if ((angle > 112.5) && (angle <= 157.5)) {
                out.down = true;
                out.left = true;
            } else if ((angle > 157.5) && (angle <= 202.5)) {
                out.left = true;
            } else if ((angle > 202.5) && (angle <= 247.5)) {
                out.left = true;
                out.up = true;
            } else if ((angle > 247.5) && (angle <= 292.5)) {
                out.up = true;
            } else if ((angle > 292.5) && (angle <= 337.5)) {
                out.up = true;
                out.right = true;
            } else {
                out.right = true;
            }
            break;
    }

    return out;
};

var globOut = {};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AngleToDirections);

/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/utils/math/angle/angletodirections/Const.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/utils/math/angle/angletodirections/Const.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    'up&down': 0,
    'left&right': 1,
    '4dir': 2,
    '8dir': 3
});

/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/utils/position/ScreenXYToWorldXY.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/utils/position/ScreenXYToWorldXY.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ScreenXYToWorldXY = function (screenX, screenY, camera, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globalOut;
    }

    camera.getWorldPoint(screenX, screenY, out);
    return out;
}

var globalOut = {};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScreenXYToWorldXY);

/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/virtualjoyStick-plugin.js":
/*!****************************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/virtualjoyStick-plugin.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _virtualjoystick_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./virtualjoystick.js */ "./node_modules/phaser3-rex-plugins/plugins/virtualjoystick.js");


class VirtualJoyStickPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new _virtualjoystick_js__WEBPACK_IMPORTED_MODULE_0__["default"](scene, config);
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VirtualJoyStickPlugin);

/***/ }),

/***/ "./node_modules/phaser3-rex-plugins/plugins/virtualjoystick.js":
/*!*********************************************************************!*\
  !*** ./node_modules/phaser3-rex-plugins/plugins/virtualjoystick.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _input_virtualjoystick_VirtualJoyStick_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input/virtualjoystick/VirtualJoyStick.js */ "./node_modules/phaser3-rex-plugins/plugins/input/virtualjoystick/VirtualJoyStick.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_input_virtualjoystick_VirtualJoyStick_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var phaser3_rex_plugins_plugins_virtualjoyStick_plugin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser3-rex-plugins/plugins/virtualjoyStick-plugin.js */ "./node_modules/phaser3-rex-plugins/plugins/virtualjoyStick-plugin.js");
/* harmony import */ var _assets_bomb_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/bomb.png */ "./src/assets/bomb.png");
/* harmony import */ var _assets_collect_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/collect.mp3 */ "./src/assets/collect.mp3");
/* harmony import */ var _assets_dude_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/dude.png */ "./src/assets/dude.png");
/* harmony import */ var _assets_kill_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/kill.mp3 */ "./src/assets/kill.mp3");
/* harmony import */ var _assets_music_mp3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/music.mp3 */ "./src/assets/music.mp3");
/* harmony import */ var _assets_platform_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/platform.png */ "./src/assets/platform.png");
/* harmony import */ var _assets_spritesheet_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/spritesheet.png */ "./src/assets/spritesheet.png");
/* harmony import */ var _assets_spritesheet_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/spritesheet.json */ "./src/assets/spritesheet.json");
/* harmony import */ var _assets_star_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/star.png */ "./src/assets/star.png");
/* harmony import */ var _assets_musicon_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/musicon.svg */ "./src/assets/musicon.svg");
/* harmony import */ var _assets_musicoff_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/musicoff.svg */ "./src/assets/musicoff.svg");
// import Phaser from "phaser"














var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        parent: document.body,
        mode: Phaser.Scale.FIT,
        // width: 800,
        // height: 600,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    },
    plugins: {
        global: [{
            key: 'rexVirtualJoystick',
            plugin: phaser3_rex_plugins_plugins_virtualjoyStick_plugin_js__WEBPACK_IMPORTED_MODULE_0__["default"],
            start: true
        },
            // ...
        ]
    }
};

var player;
var beauty;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var joyStick
var gameStart = false
var music

function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}
function is_touch_enabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

function getScreenCenter() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    return { screenCenterX, screenCenterY }
}

var game = new Phaser.Game(config);

function preload() {
    // this.load.image('sky', './assets/sky.png');
    this.load.image('ground', _assets_platform_png__WEBPACK_IMPORTED_MODULE_6__);
    this.load.image('star', _assets_star_png__WEBPACK_IMPORTED_MODULE_9__);
    this.load.image('bomb', _assets_bomb_png__WEBPACK_IMPORTED_MODULE_1__);
    this.load.spritesheet('dude', _assets_dude_png__WEBPACK_IMPORTED_MODULE_3__, { frameWidth: 32, frameHeight: 48 });
    this.load.atlas("spritesheet", _assets_spritesheet_png__WEBPACK_IMPORTED_MODULE_7__, _assets_spritesheet_json__WEBPACK_IMPORTED_MODULE_8__);
    // this.load.plugin('rexvirtualjoyStickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoyStickplugin.min.js', true);
    this.load.audio("collect", _assets_collect_mp3__WEBPACK_IMPORTED_MODULE_2__)
    this.load.audio("kill", _assets_kill_mp3__WEBPACK_IMPORTED_MODULE_4__)
    this.load.svg('musicon', _assets_musicon_svg__WEBPACK_IMPORTED_MODULE_10__)
    this.load.svg('musicoff', _assets_musicoff_svg__WEBPACK_IMPORTED_MODULE_11__)
    this.load.audio("music", _assets_music_mp3__WEBPACK_IMPORTED_MODULE_5__)
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...(this may take a minute or a little more)',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    const percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    // const assetText = this.make.text({
    //     x: width / 2,
    //     y: height / 2 + 50,
    //     text: '',
    //     style: {
    //         font: '18px monospace',
    //         fill: '#ffffff'
    //     }
    // });
    // assetText.setOrigin(0.5, 0.5);
    this.load.on('progress', function (value) {
        console.log(value);
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
        try {
            percentText.setText(parseInt(value * 100) + '%');
        } catch (e) { }
    });

    this.load.on('fileprogress', function (file) {
        console.log(file.src);
        // assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', function () {
        console.log('complete');
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        // assetText.destroy();
    });
}

function create() {
    //  A simple background for our game
    // this.add.image(400, 300, 'sky');
    beauty = this.add.sprite(400, 300, 'spritesheet');


    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    // beauty.setBounce(0.2);
    // beauty.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'attack',
        frames: [
            { key: 'spritesheet', frame: "cy0.png" },
            { key: 'spritesheet', frame: "cy1.png" },
            { key: 'spritesheet', frame: "cy2.png" },
            { key: 'spritesheet', frame: "cy3.png" },
            { key: 'spritesheet', frame: "cy4.png" },
            { key: 'spritesheet', frame: "cy5.png" },
            { key: 'spritesheet', frame: "cy6.png" },
            { key: 'spritesheet', frame: "cy7.png" },
            { key: 'spritesheet', frame: "cy8.png" },
            // { key: 'spritesheet', frame: "cy9.png" },
        ],
        frameRate: 0.3,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
    // console.log('anims', this.anims.anims.entries);
    beauty.anims.play('attack', true);

    this.sound.add('collect')
    this.sound.add('kill')

    const musicon = this.add.image(750, 50, 'musicon');
    const musicoff = this.add.image(750, 50, 'musicoff');
    music = this.sound.add('music', { loop: true })
    musicoff.setVisible(false)
    musicon.addListener('pointerdown', () => {
        music.pause();
        musicon.setVisible(false);
        musicoff.setVisible(true)
    })
    musicoff.addListener('pointerdown', () => { music.resume(); musicoff.setVisible(false); musicon.setVisible(true) })

    is_touch_enabled() && (joyStick = this.plugins.get('rexVirtualJoystick').add(this, {
        x: 140,
        y: 480,
        radius: 100,
    }));
    if (window.innerHeight > window.innerWidth) {
        const p = document.createElement('p')
        p.innerText = '横屏体验更佳'
        p.style.textAlign = 'center'
        document.body.appendChild(p)
        window.addEventListener('resize', () => {
            console.log('resize')
            if (window.innerHeight > window.innerWidth) {
                p.style.display = 'block'
            } else {
                p.style.display = 'none'
            }
        })
        window.addEventListener('deviceorientation', () => {
            console.log('deviceorientation')
            if (window.innerHeight > window.innerWidth) {
                p.style.display = 'block'
            } else {
                p.style.display = 'none'
            }
        })
    }
    if (!gameOver) {
        const { screenCenterX, screenCenterY } = getScreenCenter.call(this)
        const button = this.add.dom(screenCenterX, screenCenterY, 'button', 'width: 100px; height: 50px; border-radius: 20px;cursor: pointer; border-color: yellow', 'start').setOrigin(0.5);
        button.addListener('click')
        button.on('click', () => {
            if (this.sys.game.device.fullscreen.available) {
                document.body[this.sys.game.device.fullscreen.request]();
            }
            button.setVisible(false)
            gameStart = true;
            music.play();
            musicon.setInteractive()
            musicoff.setInteractive()
        })
    } else {
        gameOver = false
        musicon.setInteractive()
        musicoff.setInteractive()
        music.play()
    }
}

function update() {
    if (gameOver || !gameStart) {
        return;
    }

    if (cursors.left.isDown || (is_touch_enabled() && joyStick.left)) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || (is_touch_enabled() && joyStick.right)) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if ((cursors.up.isDown || (is_touch_enabled() && joyStick.up)) && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectStar(player, star) {
    this.sound.play('collect')
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb(player, bomb) {
    this.sound.play('kill')

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;

    const { screenCenterX, screenCenterY } = getScreenCenter.call(this)
    const button = this.add.dom(screenCenterX, screenCenterY, 'button', 'width: 100px; height: 50px; border-radius: 20px;cursor: pointer; border-color: yellow', 'play again').setOrigin(0.5);
    button.addListener('click')
    button.on('click', () => { music.stop(); this.scene.restart() })
}

/***/ }),

/***/ "./src/assets/bomb.png":
/*!*****************************!*\
  !*** ./src/assets/bomb.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1344cabbbf6c61010d6e.png";

/***/ }),

/***/ "./src/assets/collect.mp3":
/*!********************************!*\
  !*** ./src/assets/collect.mp3 ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "46c8de69b3374dc8b23a.mp3";

/***/ }),

/***/ "./src/assets/dude.png":
/*!*****************************!*\
  !*** ./src/assets/dude.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "96aa753af441d2464d09.png";

/***/ }),

/***/ "./src/assets/kill.mp3":
/*!*****************************!*\
  !*** ./src/assets/kill.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a9a6e14f0a69da7f753e.mp3";

/***/ }),

/***/ "./src/assets/music.mp3":
/*!******************************!*\
  !*** ./src/assets/music.mp3 ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "03d74d34c7b03f994a4a.mp3";

/***/ }),

/***/ "./src/assets/musicoff.svg":
/*!*********************************!*\
  !*** ./src/assets/musicoff.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "47f8ddb551887f94cb29.svg";

/***/ }),

/***/ "./src/assets/musicon.svg":
/*!********************************!*\
  !*** ./src/assets/musicon.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d9e09fd9f43a146cae7e.svg";

/***/ }),

/***/ "./src/assets/platform.png":
/*!*********************************!*\
  !*** ./src/assets/platform.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "69db09bf9618dbe6c387.png";

/***/ }),

/***/ "./src/assets/spritesheet.json":
/*!*************************************!*\
  !*** ./src/assets/spritesheet.json ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ea84101bedefc3ff7dfc.json";

/***/ }),

/***/ "./src/assets/spritesheet.png":
/*!************************************!*\
  !*** ./src/assets/spritesheet.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b2ecfbee6dc62884bc87.png";

/***/ }),

/***/ "./src/assets/star.png":
/*!*****************************!*\
  !*** ./src/assets/star.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a7cb585cf61f7dafb028.png";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUU7QUFDUztBQUNSO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsMEVBQWtCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsZ0ZBQWlCO0FBQ3ZDLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGtGQUFtQjtBQUN2QjtBQUNBO0FBQ0EsaUVBQWUsV0FBVzs7Ozs7Ozs7Ozs7Ozs7OztBQy9KcUI7QUFDbUM7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHVEQUFXO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksa0ZBQW1CO0FBQ3ZCO0FBQ0E7QUFDQSxpRUFBZSxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUMvUStCO0FBQzdELGlFQUFlLHlFQUFXOzs7Ozs7Ozs7Ozs7OztBQ0QxQixpRUFBZTtBQUNmO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUMxRkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoR2U7QUFDRTtBQUNvQjtBQUNzQjtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHNEQUFVO0FBQzNDO0FBQ0E7QUFDQTtB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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MsWUFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGdEQUFnRCxnQkFBZ0IsNEJBQTRCLDBCQUEwQjs7QUFFdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZ0JBQWdCLCtCQUErQjtBQUMvQywyRkFBMkYsY0FBYyxvQkFBb0IsaUJBQWlCO0FBQzlJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsWUFBWSwrQkFBK0I7QUFDM0MsdUZBQXVGLGNBQWMsb0JBQW9CLGlCQUFpQjtBQUMxSTtBQUNBLCtCQUErQixjQUFjLHNCQUFzQjtBQUNuRSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9waGFzZXIzLXJleC1wbHVnaW5zL3BsdWdpbnMvaW5wdXQvdG91Y2hjdXJzb3IvVG91Y2hDdXJzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BoYXNlcjMtcmV4LXBsdWdpbnMvcGx1Z2lucy9pbnB1dC92aXJ0dWFsam95c3RpY2svVmlydHVhbEpveVN0aWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9waGFzZXIzLXJleC1wbHVnaW5zL3BsdWdpbnMvdG91Y2hjdXJzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BoYXNlcjMtcmV4LXBsdWdpbnMvcGx1Z2lucy91dGlscy9ldmVudGVtaXR0ZXIvRXZlbnRFbWl0dGVyTWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGhhc2VyMy1yZXgtcGx1Z2lucy9wbHVnaW5zL3V0aWxzL2lucHV0L0N1cnNvcktleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BoYXNlcjMtcmV4LXBsdWdpbnMvcGx1Z2lucy91dGlscy9pbnB1dC9WZWN0b3JUb0N1cnNvcktleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BoYXNlcjMtcmV4LXBsdWdpbnMvcGx1Z2lucy91dGlscy9tYXRoL1JhZFRvRGVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9waGFzZXIzLXJleC1wbHVnaW5zL3BsdWdpbnMvdXRpbHMvbWF0aC9hbmdsZS9hbmdsZXRvZGlyZWN0aW9ucy9BbmdsZVRvRGlyZWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGhhc2VyMy1yZXgtcGx1Z2lucy9wbHVnaW5zL3V0aWxzL21hdGgvYW5nbGUvYW5nbGV0b2RpcmVjdGlvbnMvQ29uc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BoYXNlcjMtcmV4LXBsdWdpbnMvcGx1Z2lucy91dGlscy9wb3NpdGlvbi9TY3JlZW5YWVRvV29ybGRYWS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGhhc2VyMy1yZXgtcGx1Z2lucy9wbHVnaW5zL3ZpcnR1YWxqb3lTdGljay1wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BoYXNlcjMtcmV4LXBsdWdpbnMvcGx1Z2lucy92aXJ0dWFsam95c3RpY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZWN0b3JUb0N1cnNvcktleXMgZnJvbSAnLi4vLi4vdXRpbHMvaW5wdXQvVmVjdG9yVG9DdXJzb3JLZXlzLmpzJztcclxuaW1wb3J0IEV2ZW50RW1pdHRlck1ldGhvZHMgZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnRlbWl0dGVyL0V2ZW50RW1pdHRlck1ldGhvZHMuanMnO1xyXG5pbXBvcnQgU2NyZWVuWFlUb1dvcmxkWFkgZnJvbSAnLi4vLi4vdXRpbHMvcG9zaXRpb24vU2NyZWVuWFlUb1dvcmxkWFkuanMnO1xyXG5cclxuY29uc3QgR2V0VmFsdWUgPSBQaGFzZXIuVXRpbHMuT2JqZWN0cy5HZXRWYWx1ZTtcclxuY29uc3QgQ2lyY2xlQ2xhc3MgPSBQaGFzZXIuR2VvbS5DaXJjbGU7XHJcbmNvbnN0IENpcmNsZUNvbnRhaW5zID0gUGhhc2VyLkdlb20uQ2lyY2xlLkNvbnRhaW5zO1xyXG5cclxuY2xhc3MgVG91Y2hDdXJzb3IgZXh0ZW5kcyBWZWN0b3JUb0N1cnNvcktleXMge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZU9iamVjdCwgY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHNjZW5lID0gZ2FtZU9iamVjdC5zY2VuZTtcclxuICAgICAgICBzdXBlcihzY2VuZSwgY29uZmlnKTtcclxuICAgICAgICAvL3RoaXMucmVzZXRGcm9tSlNPTihjb25maWcpOyAvLyB0aGlzIGZ1bmN0aW9uIGhhZCBiZWVuIGNhbGxlZCBpbiBzdXBlcihjb25maWcpXHJcblxyXG4gICAgICAgIC8vIEV2ZW50IGVtaXR0ZXJcclxuICAgICAgICB2YXIgZXZlbnRFbWl0dGVyID0gR2V0VmFsdWUoY29uZmlnLCAnZXZlbnRFbWl0dGVyJywgdW5kZWZpbmVkKTtcclxuICAgICAgICB2YXIgRXZlbnRFbWl0dGVyQ2xhc3MgPSBHZXRWYWx1ZShjb25maWcsICdFdmVudEVtaXR0ZXJDbGFzcycsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5zZXRFdmVudEVtaXR0ZXIoZXZlbnRFbWl0dGVyLCBFdmVudEVtaXR0ZXJDbGFzcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm1haW5DYW1lcmEgPSBzY2VuZS5zeXMuY2FtZXJhcy5tYWluO1xyXG4gICAgICAgIHRoaXMucG9pbnRlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVPYmplY3QgPSBnYW1lT2JqZWN0O1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0gR2V0VmFsdWUoY29uZmlnLCAncmFkaXVzJywgMTAwKTtcclxuXHJcbiAgICAgICAgZ2FtZU9iamVjdC5zZXRJbnRlcmFjdGl2ZShuZXcgQ2lyY2xlQ2xhc3MoZ2FtZU9iamVjdC5kaXNwbGF5T3JpZ2luWCwgZ2FtZU9iamVjdC5kaXNwbGF5T3JpZ2luWSwgdGhpcy5yYWRpdXMpLCBDaXJjbGVDb250YWlucyk7XHJcblxyXG4gICAgICAgIHRoaXMuYm9vdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0RnJvbUpTT04obykge1xyXG4gICAgICAgIHN1cGVyLnJlc2V0RnJvbUpTT04obyk7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB0b0pTT04oKSB7XHJcbiAgICAgICAgdmFyIG8gPSBzdXBlci50b0pTT04oKTtcclxuICAgICAgICBvLnJhZGl1cyA9IHRoaXMucmFkaXVzO1xyXG5cclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICBib290KCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdC5vbigncG9pbnRlcmRvd24nLCB0aGlzLm9uS2V5RG93blN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWVPYmplY3Qub24oJ3BvaW50ZXJvdmVyJywgdGhpcy5vbktleURvd25TdGFydCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUuaW5wdXQub24oJ3BvaW50ZXJtb3ZlJywgdGhpcy5vbktleURvd24sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuaW5wdXQub24oJ3BvaW50ZXJ1cCcsIHRoaXMub25LZXlVcCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdC5vbmNlKCdkZXN0cm95JywgdGhpcy5vblBhcmVudERlc3Ryb3ksIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNodXRkb3duKGZyb21TY2VuZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zY2VuZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnYW1lT2JqZWN0IGV2ZW50cyB3aWxsIGJlIHJlbW92ZWQgd2hlbiB0aGlzIGdhbWVPYmplY3QgZGVzdHJveWVkIFxyXG4gICAgICAgIC8vIHRoaXMuZ2FtZU9iamVjdC5vZmYoJ3BvaW50ZXJkb3duJywgdGhpcy5vbktleURvd25TdGFydCwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5nYW1lT2JqZWN0Lm9mZigncG9pbnRlcm92ZXInLCB0aGlzLm9uS2V5RG93blN0YXJ0LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2VuZS5pbnB1dC5vZmYoJ3BvaW50ZXJtb3ZlJywgdGhpcy5vbktleURvd24sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuaW5wdXQub2ZmKCdwb2ludGVydXAnLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmRlc3Ryb3lFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLm1haW5DYW1lcmEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgc3VwZXIuc2h1dGRvd24oKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KGZyb21TY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2h1dGRvd24oZnJvbVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBhcmVudERlc3Ryb3kocGFyZW50LCBmcm9tU2NlbmUpIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koZnJvbVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBvbktleURvd25TdGFydChwb2ludGVyKSB7XHJcbiAgICAgICAgaWYgKCghcG9pbnRlci5pc0Rvd24pIHx8XHJcbiAgICAgICAgICAgICh0aGlzLnBvaW50ZXIgIT09IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSBwb2ludGVyO1xyXG4gICAgICAgIHRoaXMub25LZXlEb3duKHBvaW50ZXIpO1xyXG4gICAgICAgIHRoaXMuZW1pdCgncG9pbnRlcmRvd24nLCBwb2ludGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBvbktleURvd24ocG9pbnRlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnBvaW50ZXIgIT09IHBvaW50ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNhbWVyYSA9IHBvaW50ZXIuY2FtZXJhO1xyXG4gICAgICAgIGlmICghY2FtZXJhKSB7XHJcbiAgICAgICAgICAgIC8vIFBvaW50ZXIgaXMgb3V0c2lkZSBvZiBhbnkgY2FtZXJhLCBubyB3b3JsZFgvd29ybGRZIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBWZWN0b3Igb2Ygd29ybGQgcG9zaXRpb25cclxuICAgICAgICB2YXIgZ2FtZU9iamVjdCA9IHRoaXMuZ2FtZU9iamVjdDtcclxuICAgICAgICB2YXIgd29ybGRYWSA9IHRoaXMuZW5kO1xyXG5cclxuICAgICAgICAvLyBOb3RlOiBwb2ludGVyLndvcmxkWCwgcG9pbnRlci53b3JsZFkgbWlnaHQgbm90IGJlIHRoZSB3b3JsZCBwb3NpdGlvbiBvZiB0aGlzIGNhbWVyYSxcclxuICAgICAgICAvLyBpZiB0aGlzIGNhbWVyYSBpcyBub3QgbWFpbi1jYW1lcmFcclxuICAgICAgICBpZiAoY2FtZXJhICE9PSB0aGlzLm1haW5DYW1lcmEpIHtcclxuICAgICAgICAgICAgd29ybGRYWSA9IFNjcmVlblhZVG9Xb3JsZFhZKHBvaW50ZXIueCwgcG9pbnRlci55LCBjYW1lcmEsIHdvcmxkWFkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdvcmxkWFkueCA9IHBvaW50ZXIud29ybGRYO1xyXG4gICAgICAgICAgICB3b3JsZFhZLnkgPSBwb2ludGVyLndvcmxkWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdGFydFggPSBnYW1lT2JqZWN0Lng7XHJcbiAgICAgICAgdmFyIHN0YXJ0WSA9IGdhbWVPYmplY3QueTtcclxuICAgICAgICBpZiAoZ2FtZU9iamVjdC5zY3JvbGxGYWN0b3JYID09PSAwKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBjYW1lcmEuc2Nyb2xsWDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGdhbWVPYmplY3Quc2Nyb2xsRmFjdG9yWSA9PT0gMCkge1xyXG4gICAgICAgICAgICBzdGFydFkgKz0gY2FtZXJhLnNjcm9sbFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFZlY3RvcihzdGFydFgsIHN0YXJ0WSwgd29ybGRYWS54LCB3b3JsZFhZLnkpO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ3VwZGF0ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5VXAocG9pbnRlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnBvaW50ZXIgIT09IHBvaW50ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5jbGVhclZlY3RvcigpO1xyXG4gICAgICAgIHRoaXMuZW1pdCgndXBkYXRlJyk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdwb2ludGVydXAnLCBwb2ludGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3JjZVVwZGF0ZSgpIHtcclxuICAgICAgICB2YXIgcG9pbnRlciA9IHRoaXMucG9pbnRlcjtcclxuICAgICAgICBpZiAoIXBvaW50ZXIgfHwgIXBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbktleURvd24ocG9pbnRlcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFxyXG4gICAgVG91Y2hDdXJzb3IucHJvdG90eXBlLFxyXG4gICAgRXZlbnRFbWl0dGVyTWV0aG9kc1xyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG91Y2hDdXJzb3I7IiwiaW1wb3J0IFRvdWNoQ3Vyc29yIGZyb20gJy4uLy4uL3RvdWNoY3Vyc29yLmpzJztcclxuaW1wb3J0IEV2ZW50RW1pdHRlck1ldGhvZHMgZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnRlbWl0dGVyL0V2ZW50RW1pdHRlck1ldGhvZHMuanMnO1xyXG5cclxuY29uc3QgR2V0VmFsdWUgPSBQaGFzZXIuVXRpbHMuT2JqZWN0cy5HZXRWYWx1ZTtcclxuXHJcbmNsYXNzIFZpcnR1YWxKb3lTdGljayB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZyA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRXZlbnQgZW1pdHRlclxyXG4gICAgICAgIHZhciBldmVudEVtaXR0ZXIgPSBHZXRWYWx1ZShjb25maWcsICdldmVudEVtaXR0ZXInLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIHZhciBFdmVudEVtaXR0ZXJDbGFzcyA9IEdldFZhbHVlKGNvbmZpZywgJ0V2ZW50RW1pdHRlckNsYXNzJywgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLnNldEV2ZW50RW1pdHRlcihldmVudEVtaXR0ZXIsIEV2ZW50RW1pdHRlckNsYXNzKTtcclxuICAgICAgICBjb25maWcuZXZlbnRFbWl0dGVyID0gdGhpcy5nZXRFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMuYmFzZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnRodW1iID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMudG91Y2hDdXJzb3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5zZXRSYWRpdXMoR2V0VmFsdWUoY29uZmlnLCAncmFkaXVzJywgMTAwKSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQmFzZShHZXRWYWx1ZShjb25maWcsICdiYXNlJywgdW5kZWZpbmVkKSwgY29uZmlnKTtcclxuICAgICAgICB0aGlzLmFkZFRodW1iKEdldFZhbHVlKGNvbmZpZywgJ3RodW1iJywgdW5kZWZpbmVkKSk7XHJcblxyXG4gICAgICAgIHZhciB4ID0gR2V0VmFsdWUoY29uZmlnLCAneCcsIDApO1xyXG4gICAgICAgIHZhciB5ID0gR2V0VmFsdWUoY29uZmlnLCAneScsIDApO1xyXG4gICAgICAgIHRoaXMuYmFzZS5zZXRQb3NpdGlvbih4LCB5KTtcclxuICAgICAgICB0aGlzLnRodW1iLnNldFBvc2l0aW9uKHgsIHkpO1xyXG5cclxuICAgICAgICBpZiAoR2V0VmFsdWUoY29uZmlnLCAnZml4ZWQnLCB0cnVlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNjcm9sbEZhY3RvcigwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYm9vdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95RXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgICAgdGhpcy5iYXNlLmRlc3Ryb3koKTsgLy8gQWxzbyBkZXN0cm95IHRvdWNoQ3Vyc29yIGJlaGF2aW9yXHJcbiAgICAgICAgdGhpcy50aHVtYi5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5iYXNlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMudGh1bWIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy50b3VjaEN1cnNvciA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDdXJzb3JLZXlzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvdWNoQ3Vyc29yLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZm9yY2VYKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvdWNoQ3Vyc29yLmZvcmNlWDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZm9yY2VZKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvdWNoQ3Vyc29yLmZvcmNlWTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZm9yY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG91Y2hDdXJzb3IuZm9yY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJvdGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvdWNoQ3Vyc29yLnJvdGF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhbmdsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b3VjaEN1cnNvci5hbmdsZTsgLy8gLTE4MCB+IDE4MFxyXG4gICAgfVxyXG5cclxuICAgIGdldCB1cCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b3VjaEN1cnNvci51cEtleURvd247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRvd24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG91Y2hDdXJzb3IuZG93bktleURvd247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxlZnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG91Y2hDdXJzb3IubGVmdEtleURvd247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJpZ2h0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvdWNoQ3Vyc29yLnJpZ2h0S2V5RG93bjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbm9LZXkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG91Y2hDdXJzb3Iubm9LZXlEb3duO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwb2ludGVyWCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b3VjaEN1cnNvci5lbmQueDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcG9pbnRlclkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG91Y2hDdXJzb3IuZW5kLnk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBvaW50ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG91Y2hDdXJzb3IucG9pbnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgaWYgKCh0aGlzLnggPT09IHgpICYmICh0aGlzLnkgPT09IHkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlVGh1bWIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgeCh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnggPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iYXNlLnggPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRodW1iLnggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgeSh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnkgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iYXNlLnkgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRodW1iLnkgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYXNlLng7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZS55O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZpc2libGUodmlzaWJsZSkge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlVmlzaWJsZSgpIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSAhdGhpcy52aXNpYmxlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2aXNpYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhc2UudmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmlzaWJsZSh2aXNpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5iYXNlLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgICAgIHRoaXMudGh1bWIudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGVuYWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b3VjaEN1cnNvci5lbmFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGVuYWJsZSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMudG91Y2hDdXJzb3Iuc2V0RW5hYmxlKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRFbmFibGUoZSkge1xyXG4gICAgICAgIGlmIChlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW5hYmxlID0gZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVFbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRFbmFibGUoIXRoaXMuZW5hYmxlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRSYWRpdXMocmFkaXVzKSB7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQmFzZShnYW1lT2JqZWN0LCBjb25maWcpIHtcclxuICAgICAgICBpZiAodGhpcy5iYXNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFzZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIC8vIEFsc28gZGVzdHJveSB0b3VjaEN1cnNvciBiZWhhdmlvclxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdhbWVPYmplY3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBnYW1lT2JqZWN0ID0gdGhpcy5zY2VuZS5hZGQuY2lyY2xlKDAsIDAsIHRoaXMucmFkaXVzKVxyXG4gICAgICAgICAgICAgICAgLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMGZmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25maWcgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uZmlnLmV2ZW50RW1pdHRlciA9IHRoaXMuZ2V0RXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgICAgdGhpcy50b3VjaEN1cnNvciA9IG5ldyBUb3VjaEN1cnNvcihnYW1lT2JqZWN0LCBjb25maWcpXHJcbiAgICAgICAgdGhpcy5iYXNlID0gZ2FtZU9iamVjdDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBhZGRUaHVtYihnYW1lT2JqZWN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGh1bWIpIHtcclxuICAgICAgICAgICAgdGhpcy50aHVtYi5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZ2FtZU9iamVjdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGdhbWVPYmplY3QgPSB0aGlzLnNjZW5lLmFkZC5jaXJjbGUoMCwgMCwgNDApXHJcbiAgICAgICAgICAgICAgICAuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMGZmMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRodW1iID0gZ2FtZU9iamVjdDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRTY3JvbGxGYWN0b3Ioc2Nyb2xsRmFjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5iYXNlLnNldFNjcm9sbEZhY3RvcihzY3JvbGxGYWN0b3IpO1xyXG4gICAgICAgIHRoaXMudGh1bWIuc2V0U2Nyb2xsRmFjdG9yKHNjcm9sbEZhY3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYm9vdCgpIHtcclxuICAgICAgICB0aGlzLm9uKCd1cGRhdGUnLCB0aGlzLnVwZGF0ZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW50ZXJuYWwgbWV0aG9kXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdmFyIHRvdWNoQ3Vyc29yID0gdGhpcy50b3VjaEN1cnNvcjtcclxuICAgICAgICAvLyBTdGFydCBmcm9tICgwLDApXHJcbiAgICAgICAgdmFyIGR4LCBkeTtcclxuICAgICAgICB2YXIgZGlyTW9kZSA9IHRvdWNoQ3Vyc29yLmRpck1vZGU7ICAgICAgICBcclxuICAgICAgICBpZiAodG91Y2hDdXJzb3IuYW55S2V5RG93bikge1xyXG4gICAgICAgICAgICBpZiAodG91Y2hDdXJzb3IuZm9yY2UgPiB0aGlzLnJhZGl1cykgeyAvLyBFeGNlZWQgcmFkaXVzXHJcbiAgICAgICAgICAgICAgICB2YXIgcmFkID0gdG91Y2hDdXJzb3Iucm90YXRpb247XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTk9UICd1cCZkb3duJ1xyXG4gICAgICAgICAgICAgICAgZHggPSAoZGlyTW9kZSAhPT0gMCkgPyBNYXRoLmNvcyhyYWQpICogdGhpcy5yYWRpdXMgOiAwO1xyXG4gICAgICAgICAgICAgICAgLy8gTk9UICdsZWZ0JnJpZ2h0J1xyXG4gICAgICAgICAgICAgICAgZHkgPSAoZGlyTW9kZSAhPT0gMSkgPyBNYXRoLnNpbihyYWQpICogdGhpcy5yYWRpdXMgOiAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gTk9UICd1cCZkb3duJ1xyXG4gICAgICAgICAgICAgICAgZHggPSAoZGlyTW9kZSAhPT0gMCkgPyB0b3VjaEN1cnNvci5mb3JjZVggOiAwO1xyXG4gICAgICAgICAgICAgICAgLy8gTk9UICdsZWZ0JnJpZ2h0J1xyXG4gICAgICAgICAgICAgICAgZHkgPSAoZGlyTW9kZSAhPT0gMSkgPyB0b3VjaEN1cnNvci5mb3JjZVkgOiAwO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGR4ID0gMDtcclxuICAgICAgICAgICAgZHkgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50aHVtYi54ID0gdGhpcy5iYXNlLnggKyBkeDtcclxuICAgICAgICB0aGlzLnRodW1iLnkgPSB0aGlzLmJhc2UueSArIGR5O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcmNlVXBkYXRlVGh1bWIoKSB7XHJcbiAgICAgICAgdGhpcy50b3VjaEN1cnNvci5mb3JjZVVwZGF0ZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFxyXG4gICAgVmlydHVhbEpveVN0aWNrLnByb3RvdHlwZSxcclxuICAgIEV2ZW50RW1pdHRlck1ldGhvZHNcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpcnR1YWxKb3lTdGljazsiLCJpbXBvcnQgVG91Y2hDdXJzb3IgZnJvbSAnLi9pbnB1dC90b3VjaGN1cnNvci9Ub3VjaEN1cnNvci5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IFRvdWNoQ3Vyc29yOyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHNldEV2ZW50RW1pdHRlcihldmVudEVtaXR0ZXIsIEV2ZW50RW1pdHRlckNsYXNzKSB7XHJcbiAgICAgICAgaWYgKEV2ZW50RW1pdHRlckNsYXNzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgRXZlbnRFbWl0dGVyQ2xhc3MgPSBQaGFzZXIuRXZlbnRzLkV2ZW50RW1pdHRlcjsgLy8gVXNlIGJ1aWx0LWluIEV2ZW50RW1pdHRlciBjbGFzcyBieSBkZWZhdWx0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ByaXZhdGVFRSA9IChldmVudEVtaXR0ZXIgPT09IHRydWUpIHx8IChldmVudEVtaXR0ZXIgPT09IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyID0gKHRoaXMuX3ByaXZhdGVFRSkgPyAobmV3IEV2ZW50RW1pdHRlckNsYXNzKCkpIDogZXZlbnRFbWl0dGVyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95RXZlbnRFbWl0dGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudEVtaXR0ZXIgJiYgdGhpcy5fcHJpdmF0ZUVFKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5zaHV0ZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RXZlbnRFbWl0dGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudEVtaXR0ZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50RW1pdHRlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub24uYXBwbHkodGhpcy5fZXZlbnRFbWl0dGVyLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgb25jZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudEVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9uY2UuYXBwbHkodGhpcy5fZXZlbnRFbWl0dGVyLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgb2ZmOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50RW1pdHRlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub2ZmLmFwcGx5KHRoaXMuX2V2ZW50RW1pdHRlciwgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudEVtaXR0ZXIgJiYgZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLmVtaXQuYXBwbHkodGhpcy5fZXZlbnRFbWl0dGVyLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgYWRkTGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZXZlbnRFbWl0dGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5hZGRMaXN0ZW5lci5hcHBseSh0aGlzLl9ldmVudEVtaXR0ZXIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVMaXN0ZW5lcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudEVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLnJlbW92ZUxpc3RlbmVyLmFwcGx5KHRoaXMuX2V2ZW50RW1pdHRlciwgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUFsbExpc3RlbmVyczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudEVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLnJlbW92ZUFsbExpc3RlbmVycy5hcHBseSh0aGlzLl9ldmVudEVtaXR0ZXIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW5lckNvdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50RW1pdHRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQuYXBwbHkodGhpcy5fZXZlbnRFbWl0dGVyLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50RW1pdHRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRFbWl0dGVyLmxpc3RlbmVycy5hcHBseSh0aGlzLl9ldmVudEVtaXR0ZXIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH0sXHJcblxyXG4gICAgZXZlbnROYW1lczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudEVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50RW1pdHRlci5ldmVudE5hbWVzLmFwcGx5KHRoaXMuX2V2ZW50RW1pdHRlciwgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSxcclxufTsiLCJjb25zdCBLZXkgPSBQaGFzZXIuSW5wdXQuS2V5Ym9hcmQuS2V5O1xyXG5jb25zdCBLZXlDb2RlcyA9IFBoYXNlci5JbnB1dC5LZXlib2FyZC5LZXlDb2RlcztcclxuXHJcbmNsYXNzIEN1cnNvcktleXMge1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUpIHtcclxuICAgICAgICAvLyBzY2VuZTogc2NlbmUgaW5zdGFuY2UsIG9yIHVuZGVmaW5lZFxyXG4gICAgICAgIHRoaXMuY3Vyc29yS2V5cyA9IHtcclxuICAgICAgICAgICAgdXA6IG5ldyBLZXkoc2NlbmUsIEtleUNvZGVzLlVQKSxcclxuICAgICAgICAgICAgZG93bjogbmV3IEtleShzY2VuZSwgS2V5Q29kZXMuRE9XTiksXHJcbiAgICAgICAgICAgIGxlZnQ6IG5ldyBLZXkoc2NlbmUsIEtleUNvZGVzLkxFRlQpLFxyXG4gICAgICAgICAgICByaWdodDogbmV3IEtleShzY2VuZSwgS2V5Q29kZXMuUklHSFQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9LZXlEb3duID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzaHV0ZG93bihmcm9tU2NlbmUpIHtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jdXJzb3JLZXlzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yS2V5c1trZXldLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJzb3JLZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koZnJvbVNjZW5lKSB7XHJcbiAgICAgICAgc2h1dGRvd24oZnJvbVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDdXJzb3JLZXlzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnNvcktleXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0S2V5U3RhdGUoa2V5TmFtZSwgaXNEb3duKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IHRoaXMuY3Vyc29yS2V5c1trZXlOYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKCFrZXkuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLm5vS2V5RG93biA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGtleS5pc0Rvd24gIT09IGlzRG93bikge1xyXG4gICAgICAgICAgICBGYWtlRXZlbnQudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgRmFrZUV2ZW50LmtleUNvZGUgPSBrZXkua2V5Q29kZTtcclxuICAgICAgICAgICAgaWYgKGlzRG93bikge1xyXG4gICAgICAgICAgICAgICAga2V5Lm9uRG93bihGYWtlRXZlbnQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAga2V5Lm9uVXAoRmFrZUV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJBbGxLZXlzU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub0tleURvd24gPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGtleU5hbWUgaW4gdGhpcy5jdXJzb3JLZXlzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0S2V5U3RhdGUoa2V5TmFtZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRLZXlTdGF0ZShrZXlOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3Vyc29yS2V5c1trZXlOYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdXBLZXlEb3duKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnNvcktleXMudXAuaXNEb3duO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkb3duS2V5RG93bigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JLZXlzLmRvd24uaXNEb3duO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsZWZ0S2V5RG93bigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JLZXlzLmxlZnQuaXNEb3duO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByaWdodEtleURvd24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3Vyc29yS2V5cy5yaWdodC5pc0Rvd247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFueUtleURvd24oKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLm5vS2V5RG93bjtcclxuICAgIH1cclxufVxyXG5cclxudmFyIEZha2VFdmVudCA9IHtcclxuICAgIHRpbWVTdGFtcDogMCxcclxuICAgIGtleUNvZGU6IDAsXHJcbiAgICBhbHRLZXk6IGZhbHNlLFxyXG4gICAgY3RybEtleTogZmFsc2UsXHJcbiAgICBzaGlmdEtleTogZmFsc2UsXHJcbiAgICBtZXRhS2V5OiBmYWxzZSxcclxuICAgIGxvY2F0aW9uOiAwLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yS2V5cztcclxuIiwiaW1wb3J0IEN1cnNvcktleXMgZnJvbSAnLi9DdXJzb3JLZXlzLmpzJztcclxuaW1wb3J0IFJhZFRvRGVnIGZyb20gJy4uL21hdGgvUmFkVG9EZWcuanMnO1xyXG5pbXBvcnQgRElSTU9ERSBmcm9tICcuLi9tYXRoL2FuZ2xlL2FuZ2xldG9kaXJlY3Rpb25zL0NvbnN0LmpzJztcclxuaW1wb3J0IEFuZ2xlVG9EaXJlY3Rpb25zIGZyb20gJy4uL21hdGgvYW5nbGUvYW5nbGV0b2RpcmVjdGlvbnMvQW5nbGVUb0RpcmVjdGlvbnMuanMnO1xyXG5cclxuY29uc3QgR2V0VmFsdWUgPSBQaGFzZXIuVXRpbHMuT2JqZWN0cy5HZXRWYWx1ZTtcclxuY29uc3QgR2V0RGlzdCA9IFBoYXNlci5NYXRoLkRpc3RhbmNlLkJldHdlZW47XHJcbmNvbnN0IEdldEFuZ2xlID0gUGhhc2VyLk1hdGguQW5nbGUuQmV0d2VlbjtcclxuXHJcbmNsYXNzIFZlY3RvclRvQ3Vyc29yS2V5cyBleHRlbmRzIEN1cnNvcktleXMge1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIGNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lKTtcclxuICAgICAgICB0aGlzLnJlc2V0RnJvbUpTT04oY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldEZyb21KU09OKG8pIHtcclxuICAgICAgICBpZiAodGhpcy5zdGFydCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IHsgeDogMCwgeTogMCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5lbmQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0geyB4OiAwLCB5OiAwIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2VuYWJsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnNldEVuYWJsZShHZXRWYWx1ZShvLCAnZW5hYmxlJywgdHJ1ZSkpO1xyXG4gICAgICAgIHRoaXMuc2V0TW9kZShHZXRWYWx1ZShvLCAnZGlyJywgJzhkaXInKSk7XHJcbiAgICAgICAgdGhpcy5zZXREaXN0YW5jZVRocmVzaG9sZChHZXRWYWx1ZShvLCAnZm9yY2VNaW4nLCAxNikpO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnRYID0gR2V0VmFsdWUobywgXCJzdGFydC54XCIsIG51bGwpO1xyXG4gICAgICAgIHZhciBzdGFydFkgPSBHZXRWYWx1ZShvLCBcInN0YXJ0LnlcIiwgbnVsbCk7XHJcbiAgICAgICAgdmFyIGVuZFggPSBHZXRWYWx1ZShvLCBcImVuZC54XCIsIG51bGwpO1xyXG4gICAgICAgIHZhciBlbmRZID0gR2V0VmFsdWUobywgXCJlbmQueVwiLCBudWxsKTtcclxuICAgICAgICB0aGlzLnNldFZlY3RvcihzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdG9KU09OKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVuYWJsZTogdGhpcy5lbmFibGUsXHJcbiAgICAgICAgICAgIGRpcjogdGhpcy5kaXJNb2RlLFxyXG4gICAgICAgICAgICBmb3JjZU1pbjogdGhpcy5mb3JjZU1pbixcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICAgICAgICB4OiB0aGlzLnN0YXJ0LngsXHJcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnN0YXJ0LnlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICAgICAgICB4OiB0aGlzLmVuZC54LFxyXG4gICAgICAgICAgICAgICAgeTogdGhpcy5lbmQueVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RlKG0pIHtcclxuICAgICAgICBpZiAodHlwZW9mIChtKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgbSA9IERJUk1PREVbbV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGlyTW9kZSA9IG07XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGVuYWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBlbmFibGUoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9lbmFibGUgPT09IGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclZlY3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9lbmFibGUgPSBlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEVuYWJsZShlKSB7XHJcbiAgICAgICAgaWYgKGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZW5hYmxlID0gZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVFbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRFbmFibGUoIXRoaXMuZW5hYmxlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXN0YW5jZVRocmVzaG9sZChkKSB7XHJcbiAgICAgICAgaWYgKGQgPCAwKSB7XHJcbiAgICAgICAgICAgIGQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcmNlTWluID0gZDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclZlY3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0LnggPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhcnQueSA9IDA7XHJcbiAgICAgICAgdGhpcy5lbmQueCA9IDA7XHJcbiAgICAgICAgdGhpcy5lbmQueSA9IDA7XHJcbiAgICAgICAgdGhpcy5jbGVhckFsbEtleXNTdGF0ZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZlY3Rvcih4MCwgeTAsIHgxLCB5MSkge1xyXG4gICAgICAgIGlmICghdGhpcy5lbmFibGUpIHtcclxuICAgICAgICAgICAgLy8gRG8gbm90aGluZ1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh4MCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBDbGVhciBhbGwga2V5cycgc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5jbGVhclZlY3RvcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICgwLDApIC0+ICh4MCwgeTApXHJcbiAgICAgICAgaWYgKHgxID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgeDEgPSB4MDtcclxuICAgICAgICAgICAgeDAgPSAwO1xyXG4gICAgICAgICAgICB5MSA9IHkwO1xyXG4gICAgICAgICAgICB5MCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0LnggPSB4MDtcclxuICAgICAgICB0aGlzLnN0YXJ0LnkgPSB5MDtcclxuICAgICAgICB0aGlzLmVuZC54ID0geDE7XHJcbiAgICAgICAgdGhpcy5lbmQueSA9IHkxO1xyXG5cclxuICAgICAgICBpZiAoKHRoaXMuZm9yY2VNaW4gPiAwKSAmJiAodGhpcy5mb3JjZSA8IHRoaXMuZm9yY2VNaW4pKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGtleSBwcmVzc2VkXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJWZWN0b3IoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUga2V5cycgc3RhdGVcclxuICAgICAgICB0aGlzLm5vS2V5RG93biA9IHRydWU7XHJcbiAgICAgICAgdmFyIGRpclN0YXRlcyA9IEFuZ2xlVG9EaXJlY3Rpb25zKHRoaXMuYW5nbGUsIHRoaXMuZGlyTW9kZSwgdHJ1ZSk7XHJcbiAgICAgICAgZm9yICh2YXIgZGlyIGluIGRpclN0YXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldEtleVN0YXRlKGRpciwgZGlyU3RhdGVzW2Rpcl0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZvcmNlWCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmQueCAtIHRoaXMuc3RhcnQueDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZm9yY2VZKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuZC55IC0gdGhpcy5zdGFydC55O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmb3JjZSgpIHtcclxuICAgICAgICByZXR1cm4gR2V0RGlzdCh0aGlzLnN0YXJ0LngsIHRoaXMuc3RhcnQueSwgdGhpcy5lbmQueCwgdGhpcy5lbmQueSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJvdGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBHZXRBbmdsZSh0aGlzLnN0YXJ0LngsIHRoaXMuc3RhcnQueSwgdGhpcy5lbmQueCwgdGhpcy5lbmQueSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFuZ2xlKCkge1xyXG4gICAgICAgIHJldHVybiBSYWRUb0RlZyh0aGlzLnJvdGF0aW9uKTsgLy8gLTE4MCB+IDE4MFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBvY3RhbnQoKSB7XHJcbiAgICAgICAgdmFyIG9jdGFudCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMucmlnaHRLZXlEb3duKSB7XHJcbiAgICAgICAgICAgIG9jdGFudCA9ICh0aGlzLmRvd25LZXlEb3duKSA/IDQ1IDogMDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZG93bktleURvd24pIHtcclxuICAgICAgICAgICAgb2N0YW50ID0gKHRoaXMubGVmdEtleURvd24pID8gMTM1IDogOTA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmxlZnRLZXlEb3duKSB7XHJcbiAgICAgICAgICAgIG9jdGFudCA9ICh0aGlzLnVwS2V5RG93bikgPyAyMjUgOiAxODA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnVwS2V5RG93bikge1xyXG4gICAgICAgICAgICBvY3RhbnQgPSAodGhpcy5yaWdodEtleURvd24pID8gMzE1IDogMjcwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2N0YW50O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWZWN0b3JUb0N1cnNvcktleXM7IiwiLyoqXHJcbiAqIEBhdXRob3IgICAgICAgUmljaGFyZCBEYXZleSA8cmljaEBwaG90b25zdG9ybS5jb20+XHJcbiAqIEBjb3B5cmlnaHQgICAgMjAxOCBQaG90b24gU3Rvcm0gTHRkLlxyXG4gKiBAbGljZW5zZSAgICAgIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vcGhvdG9uc3Rvcm0vcGhhc2VyL2Jsb2IvbWFzdGVyL2xpY2Vuc2UudHh0fE1JVCBMaWNlbnNlfVxyXG4gKi9cclxuXHJcbnZhciBSQURfVE9fREVHID0gMTgwIC8gTWF0aC5QSTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhbmdsZSBpbiByYWRpYW5zLCB0byB0aGUgZXF1aXZhbGVudCBhbmdsZSBpbiBkZWdyZWVzLlxyXG4gKlxyXG4gKiBAZnVuY3Rpb24gUGhhc2VyLk1hdGguUmFkVG9EZWdcclxuICogQHNpbmNlIDMuMC4wXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zIC0gVGhlIGFuZ2xlIGluIHJhZGlhbnMgdG8gY29udmVydCBvdCBkZWdyZWVzLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtpbnRlZ2VyfSBUaGUgZ2l2ZW4gYW5nbGUgY29udmVydGVkIHRvIGRlZ3JlZXMuXHJcbiAqL1xyXG52YXIgUmFkVG9EZWcgPSBmdW5jdGlvbiAocmFkaWFucylcclxue1xyXG4gICAgcmV0dXJuIHJhZGlhbnMgKiBSQURfVE9fREVHO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFkVG9EZWc7XHJcbiIsInZhciBBbmdsZVRvRGlyZWN0aW9ucyA9IGZ1bmN0aW9uIChhbmdsZSwgZGlyTW9kZSwgb3V0KSB7XHJcbiAgICBpZiAob3V0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvdXQgPSB7fVxyXG4gICAgfSBlbHNlIGlmIChvdXQgPT09IHRydWUpIHtcclxuICAgICAgICBvdXQgPSBnbG9iT3V0O1xyXG4gICAgfVxyXG5cclxuICAgIG91dC5sZWZ0ID0gZmFsc2U7XHJcbiAgICBvdXQucmlnaHQgPSBmYWxzZTtcclxuICAgIG91dC51cCA9IGZhbHNlO1xyXG4gICAgb3V0LmRvd24gPSBmYWxzZTtcclxuXHJcbiAgICBhbmdsZSA9IChhbmdsZSArIDM2MCkgJSAzNjA7XHJcbiAgICBzd2l0Y2ggKGRpck1vZGUpIHtcclxuICAgICAgICBjYXNlIDA6IC8vIHVwICYgZG93blxyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCAxODApIHtcclxuICAgICAgICAgICAgICAgIG91dC5kb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG91dC51cCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTogLy8gbGVmdCAmIHJpZ2h0XHJcbiAgICAgICAgICAgIGlmICgoYW5nbGUgPiA5MCkgJiYgKGFuZ2xlIDw9IDI3MCkpIHtcclxuICAgICAgICAgICAgICAgIG91dC5sZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG91dC5yaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMjogLy8gNCBkaXJcclxuICAgICAgICAgICAgaWYgKChhbmdsZSA+IDQ1KSAmJiAoYW5nbGUgPD0gMTM1KSkge1xyXG4gICAgICAgICAgICAgICAgb3V0LmRvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChhbmdsZSA+IDEzNSkgJiYgKGFuZ2xlIDw9IDIyNSkpIHtcclxuICAgICAgICAgICAgICAgIG91dC5sZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoYW5nbGUgPiAyMjUpICYmIChhbmdsZSA8PSAzMTUpKSB7XHJcbiAgICAgICAgICAgICAgICBvdXQudXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3V0LnJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAzOiAvLyA4IGRpclxyXG4gICAgICAgICAgICBpZiAoKGFuZ2xlID4gMjIuNSkgJiYgKGFuZ2xlIDw9IDY3LjUpKSB7XHJcbiAgICAgICAgICAgICAgICBvdXQuZG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBvdXQucmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChhbmdsZSA+IDY3LjUpICYmIChhbmdsZSA8PSAxMTIuNSkpIHtcclxuICAgICAgICAgICAgICAgIG91dC5kb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoYW5nbGUgPiAxMTIuNSkgJiYgKGFuZ2xlIDw9IDE1Ny41KSkge1xyXG4gICAgICAgICAgICAgICAgb3V0LmRvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb3V0LmxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChhbmdsZSA+IDE1Ny41KSAmJiAoYW5nbGUgPD0gMjAyLjUpKSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGFuZ2xlID4gMjAyLjUpICYmIChhbmdsZSA8PSAyNDcuNSkpIHtcclxuICAgICAgICAgICAgICAgIG91dC5sZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG91dC51cCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGFuZ2xlID4gMjQ3LjUpICYmIChhbmdsZSA8PSAyOTIuNSkpIHtcclxuICAgICAgICAgICAgICAgIG91dC51cCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGFuZ2xlID4gMjkyLjUpICYmIChhbmdsZSA8PSAzMzcuNSkpIHtcclxuICAgICAgICAgICAgICAgIG91dC51cCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBvdXQucmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3V0LnJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG5cclxudmFyIGdsb2JPdXQgPSB7fTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ2xlVG9EaXJlY3Rpb25zOyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgICd1cCZkb3duJzogMCxcclxuICAgICdsZWZ0JnJpZ2h0JzogMSxcclxuICAgICc0ZGlyJzogMixcclxuICAgICc4ZGlyJzogM1xyXG59OyIsInZhciBTY3JlZW5YWVRvV29ybGRYWSA9IGZ1bmN0aW9uIChzY3JlZW5YLCBzY3JlZW5ZLCBjYW1lcmEsIG91dCkge1xyXG4gICAgaWYgKG91dCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgb3V0ID0ge307XHJcbiAgICB9IGVsc2UgaWYgKG91dCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIG91dCA9IGdsb2JhbE91dDtcclxuICAgIH1cclxuXHJcbiAgICBjYW1lcmEuZ2V0V29ybGRQb2ludChzY3JlZW5YLCBzY3JlZW5ZLCBvdXQpO1xyXG4gICAgcmV0dXJuIG91dDtcclxufVxyXG5cclxudmFyIGdsb2JhbE91dCA9IHt9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2NyZWVuWFlUb1dvcmxkWFk7IiwiaW1wb3J0IFZpcnR1YWxKb3lTdGljayBmcm9tICcuL3ZpcnR1YWxqb3lzdGljay5qcyc7XHJcblxyXG5jbGFzcyBWaXJ0dWFsSm95U3RpY2tQbHVnaW4gZXh0ZW5kcyBQaGFzZXIuUGx1Z2lucy5CYXNlUGx1Z2luIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwbHVnaW5NYW5hZ2VyKSB7XHJcbiAgICAgICAgc3VwZXIocGx1Z2luTWFuYWdlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdmFyIGV2ZW50RW1pdHRlciA9IHRoaXMuZ2FtZS5ldmVudHM7XHJcbiAgICAgICAgZXZlbnRFbWl0dGVyLm9uKCdkZXN0cm95JywgdGhpcy5kZXN0cm95LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQoc2NlbmUsIGNvbmZpZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmlydHVhbEpveVN0aWNrKHNjZW5lLCBjb25maWcpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlydHVhbEpveVN0aWNrUGx1Z2luOyIsImltcG9ydCBWaXJ0dWFsSm95U3RpY2sgZnJvbSAnLi9pbnB1dC92aXJ0dWFsam95c3RpY2svVmlydHVhbEpveVN0aWNrLmpzJztcclxuZXhwb3J0IGRlZmF1bHQgVmlydHVhbEpveVN0aWNrOyIsIi8vIGltcG9ydCBQaGFzZXIgZnJvbSBcInBoYXNlclwiXG5pbXBvcnQgVmlydHVhbEpveXN0aWNrUGx1Z2luIGZyb20gJ3BoYXNlcjMtcmV4LXBsdWdpbnMvcGx1Z2lucy92aXJ0dWFsam95U3RpY2stcGx1Z2luLmpzJztcbmltcG9ydCBib21iIGZyb20gJy4vYXNzZXRzL2JvbWIucG5nJ1xuaW1wb3J0IGNvbGxlY3QgZnJvbSAnLi9hc3NldHMvY29sbGVjdC5tcDMnXG5pbXBvcnQgZHVkZSBmcm9tICcuL2Fzc2V0cy9kdWRlLnBuZydcbmltcG9ydCBraWxsIGZyb20gJy4vYXNzZXRzL2tpbGwubXAzJ1xuaW1wb3J0IG11c2ljVXJsIGZyb20gJy4vYXNzZXRzL211c2ljLm1wMydcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuL2Fzc2V0cy9wbGF0Zm9ybS5wbmcnXG5pbXBvcnQgc3ByaXRlc2hlZXQgZnJvbSAnLi9hc3NldHMvc3ByaXRlc2hlZXQucG5nJ1xuaW1wb3J0IHNwcml0ZUpzb24gZnJvbSAnLi9hc3NldHMvc3ByaXRlc2hlZXQuanNvbidcbmltcG9ydCBzdGFyIGZyb20gJy4vYXNzZXRzL3N0YXIucG5nJ1xuaW1wb3J0IG11c2ljb24gZnJvbSAnLi9hc3NldHMvbXVzaWNvbi5zdmcnXG5pbXBvcnQgbXVzaWNvZmYgZnJvbSAnLi9hc3NldHMvbXVzaWNvZmYuc3ZnJ1xuXG5cbnZhciBjb25maWcgPSB7XG4gICAgdHlwZTogUGhhc2VyLkFVVE8sXG4gICAgd2lkdGg6IDgwMCxcbiAgICBoZWlnaHQ6IDYwMCxcbiAgICBwaHlzaWNzOiB7XG4gICAgICAgIGRlZmF1bHQ6ICdhcmNhZGUnLFxuICAgICAgICBhcmNhZGU6IHtcbiAgICAgICAgICAgIGdyYXZpdHk6IHsgeTogMzAwIH0sXG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2NlbmU6IHtcbiAgICAgICAgcHJlbG9hZDogcHJlbG9hZCxcbiAgICAgICAgY3JlYXRlOiBjcmVhdGUsXG4gICAgICAgIHVwZGF0ZTogdXBkYXRlXG4gICAgfSxcbiAgICBzY2FsZToge1xuICAgICAgICBwYXJlbnQ6IGRvY3VtZW50LmJvZHksXG4gICAgICAgIG1vZGU6IFBoYXNlci5TY2FsZS5GSVQsXG4gICAgICAgIC8vIHdpZHRoOiA4MDAsXG4gICAgICAgIC8vIGhlaWdodDogNjAwLFxuICAgICAgICBhdXRvQ2VudGVyOiBQaGFzZXIuU2NhbGUuQ0VOVEVSX0JPVEgsXG4gICAgfSxcbiAgICBkb206IHtcbiAgICAgICAgY3JlYXRlQ29udGFpbmVyOiB0cnVlXG4gICAgfSxcbiAgICBwbHVnaW5zOiB7XG4gICAgICAgIGdsb2JhbDogW3tcbiAgICAgICAgICAgIGtleTogJ3JleFZpcnR1YWxKb3lzdGljaycsXG4gICAgICAgICAgICBwbHVnaW46IFZpcnR1YWxKb3lzdGlja1BsdWdpbixcbiAgICAgICAgICAgIHN0YXJ0OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgICAgICAvLyAuLi5cbiAgICAgICAgXVxuICAgIH1cbn07XG5cbnZhciBwbGF5ZXI7XG52YXIgYmVhdXR5O1xudmFyIHN0YXJzO1xudmFyIGJvbWJzO1xudmFyIHBsYXRmb3JtcztcbnZhciBjdXJzb3JzO1xudmFyIHNjb3JlID0gMDtcbnZhciBnYW1lT3ZlciA9IGZhbHNlO1xudmFyIHNjb3JlVGV4dDtcbnZhciBqb3lTdGlja1xudmFyIGdhbWVTdGFydCA9IGZhbHNlXG52YXIgbXVzaWNcblxuZnVuY3Rpb24gaXNNb2JpbGUoKSB7XG4gICAgY29uc3QgcmVnZXggPSAvTW9iaXxBbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2k7XG4gICAgcmV0dXJuIHJlZ2V4LnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59XG5mdW5jdGlvbiBpc190b3VjaF9lbmFibGVkKCkge1xuICAgIHJldHVybiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fFxuICAgICAgICAobmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMCkgfHxcbiAgICAgICAgKG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCk7XG59XG5cbmZ1bmN0aW9uIGdldFNjcmVlbkNlbnRlcigpIHtcbiAgICBjb25zdCBzY3JlZW5DZW50ZXJYID0gdGhpcy5jYW1lcmFzLm1haW4ud29ybGRWaWV3LnggKyB0aGlzLmNhbWVyYXMubWFpbi53aWR0aCAvIDI7XG4gICAgY29uc3Qgc2NyZWVuQ2VudGVyWSA9IHRoaXMuY2FtZXJhcy5tYWluLndvcmxkVmlldy55ICsgdGhpcy5jYW1lcmFzLm1haW4uaGVpZ2h0IC8gMjtcbiAgICByZXR1cm4geyBzY3JlZW5DZW50ZXJYLCBzY3JlZW5DZW50ZXJZIH1cbn1cblxudmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoY29uZmlnKTtcblxuZnVuY3Rpb24gcHJlbG9hZCgpIHtcbiAgICAvLyB0aGlzLmxvYWQuaW1hZ2UoJ3NreScsICcuL2Fzc2V0cy9za3kucG5nJyk7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdncm91bmQnLCBwbGF0Zm9ybSk7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdzdGFyJywgc3Rhcik7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdib21iJywgYm9tYik7XG4gICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdkdWRlJywgZHVkZSwgeyBmcmFtZVdpZHRoOiAzMiwgZnJhbWVIZWlnaHQ6IDQ4IH0pO1xuICAgIHRoaXMubG9hZC5hdGxhcyhcInNwcml0ZXNoZWV0XCIsIHNwcml0ZXNoZWV0LCBzcHJpdGVKc29uKTtcbiAgICAvLyB0aGlzLmxvYWQucGx1Z2luKCdyZXh2aXJ0dWFsam95U3RpY2twbHVnaW4nLCAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3JleHJhaW5ib3cvcGhhc2VyMy1yZXgtbm90ZXMvbWFzdGVyL2Rpc3QvcmV4dmlydHVhbGpveVN0aWNrcGx1Z2luLm1pbi5qcycsIHRydWUpO1xuICAgIHRoaXMubG9hZC5hdWRpbyhcImNvbGxlY3RcIiwgY29sbGVjdClcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJraWxsXCIsIGtpbGwpXG4gICAgdGhpcy5sb2FkLnN2ZygnbXVzaWNvbicsIG11c2ljb24pXG4gICAgdGhpcy5sb2FkLnN2ZygnbXVzaWNvZmYnLCBtdXNpY29mZilcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJtdXNpY1wiLCBtdXNpY1VybClcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKCk7XG4gICAgY29uc3QgcHJvZ3Jlc3NCb3ggPSB0aGlzLmFkZC5ncmFwaGljcygpO1xuICAgIHByb2dyZXNzQm94LmZpbGxTdHlsZSgweDIyMjIyMiwgMC44KTtcbiAgICBwcm9ncmVzc0JveC5maWxsUmVjdCgyNDAsIDI3MCwgMzIwLCA1MCk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbWVyYXMubWFpbi53aWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbWVyYXMubWFpbi5oZWlnaHQ7XG4gICAgY29uc3QgbG9hZGluZ1RleHQgPSB0aGlzLm1ha2UudGV4dCh7XG4gICAgICAgIHg6IHdpZHRoIC8gMixcbiAgICAgICAgeTogaGVpZ2h0IC8gMiAtIDUwLFxuICAgICAgICB0ZXh0OiAnTG9hZGluZy4uLih0aGlzIG1heSB0YWtlIGEgbWludXRlIG9yIGEgbGl0dGxlIG1vcmUpJyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZvbnQ6ICcyMHB4IG1vbm9zcGFjZScsXG4gICAgICAgICAgICBmaWxsOiAnI2ZmZmZmZidcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxvYWRpbmdUZXh0LnNldE9yaWdpbigwLjUsIDAuNSk7XG4gICAgY29uc3QgcGVyY2VudFRleHQgPSB0aGlzLm1ha2UudGV4dCh7XG4gICAgICAgIHg6IHdpZHRoIC8gMixcbiAgICAgICAgeTogaGVpZ2h0IC8gMiAtIDUsXG4gICAgICAgIHRleHQ6ICcwJScsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmb250OiAnMThweCBtb25vc3BhY2UnLFxuICAgICAgICAgICAgZmlsbDogJyNmZmZmZmYnXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBwZXJjZW50VGV4dC5zZXRPcmlnaW4oMC41LCAwLjUpO1xuICAgIC8vIGNvbnN0IGFzc2V0VGV4dCA9IHRoaXMubWFrZS50ZXh0KHtcbiAgICAvLyAgICAgeDogd2lkdGggLyAyLFxuICAgIC8vICAgICB5OiBoZWlnaHQgLyAyICsgNTAsXG4gICAgLy8gICAgIHRleHQ6ICcnLFxuICAgIC8vICAgICBzdHlsZToge1xuICAgIC8vICAgICAgICAgZm9udDogJzE4cHggbW9ub3NwYWNlJyxcbiAgICAvLyAgICAgICAgIGZpbGw6ICcjZmZmZmZmJ1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG4gICAgLy8gYXNzZXRUZXh0LnNldE9yaWdpbigwLjUsIDAuNSk7XG4gICAgdGhpcy5sb2FkLm9uKCdwcm9ncmVzcycsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgIHByb2dyZXNzQmFyLmNsZWFyKCk7XG4gICAgICAgIHByb2dyZXNzQmFyLmZpbGxTdHlsZSgweGZmZmZmZiwgMSk7XG4gICAgICAgIHByb2dyZXNzQmFyLmZpbGxSZWN0KDI1MCwgMjgwLCAzMDAgKiB2YWx1ZSwgMzApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGVyY2VudFRleHQuc2V0VGV4dChwYXJzZUludCh2YWx1ZSAqIDEwMCkgKyAnJScpO1xuICAgICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICB9KTtcblxuICAgIHRoaXMubG9hZC5vbignZmlsZXByb2dyZXNzJywgZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZmlsZS5zcmMpO1xuICAgICAgICAvLyBhc3NldFRleHQuc2V0VGV4dCgnTG9hZGluZyBhc3NldDogJyArIGZpbGUua2V5KTtcbiAgICB9KTtcbiAgICB0aGlzLmxvYWQub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY29tcGxldGUnKTtcbiAgICAgICAgcHJvZ3Jlc3NCYXIuZGVzdHJveSgpO1xuICAgICAgICBwcm9ncmVzc0JveC5kZXN0cm95KCk7XG4gICAgICAgIGxvYWRpbmdUZXh0LmRlc3Ryb3koKTtcbiAgICAgICAgcGVyY2VudFRleHQuZGVzdHJveSgpO1xuICAgICAgICAvLyBhc3NldFRleHQuZGVzdHJveSgpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgLy8gIEEgc2ltcGxlIGJhY2tncm91bmQgZm9yIG91ciBnYW1lXG4gICAgLy8gdGhpcy5hZGQuaW1hZ2UoNDAwLCAzMDAsICdza3knKTtcbiAgICBiZWF1dHkgPSB0aGlzLmFkZC5zcHJpdGUoNDAwLCAzMDAsICdzcHJpdGVzaGVldCcpO1xuXG5cbiAgICAvLyAgVGhlIHBsYXRmb3JtcyBncm91cCBjb250YWlucyB0aGUgZ3JvdW5kIGFuZCB0aGUgMiBsZWRnZXMgd2UgY2FuIGp1bXAgb25cbiAgICBwbGF0Zm9ybXMgPSB0aGlzLnBoeXNpY3MuYWRkLnN0YXRpY0dyb3VwKCk7XG5cbiAgICAvLyAgSGVyZSB3ZSBjcmVhdGUgdGhlIGdyb3VuZC5cbiAgICAvLyAgU2NhbGUgaXQgdG8gZml0IHRoZSB3aWR0aCBvZiB0aGUgZ2FtZSAodGhlIG9yaWdpbmFsIHNwcml0ZSBpcyA0MDB4MzIgaW4gc2l6ZSlcbiAgICBwbGF0Zm9ybXMuY3JlYXRlKDQwMCwgNTY4LCAnZ3JvdW5kJykuc2V0U2NhbGUoMikucmVmcmVzaEJvZHkoKTtcblxuICAgIC8vICBOb3cgbGV0J3MgY3JlYXRlIHNvbWUgbGVkZ2VzXG4gICAgcGxhdGZvcm1zLmNyZWF0ZSg2MDAsIDQwMCwgJ2dyb3VuZCcpO1xuICAgIHBsYXRmb3Jtcy5jcmVhdGUoNTAsIDI1MCwgJ2dyb3VuZCcpO1xuICAgIHBsYXRmb3Jtcy5jcmVhdGUoNzUwLCAyMjAsICdncm91bmQnKTtcblxuICAgIC8vIFRoZSBwbGF5ZXIgYW5kIGl0cyBzZXR0aW5nc1xuICAgIHBsYXllciA9IHRoaXMucGh5c2ljcy5hZGQuc3ByaXRlKDEwMCwgNDUwLCAnZHVkZScpO1xuXG4gICAgLy8gIFBsYXllciBwaHlzaWNzIHByb3BlcnRpZXMuIEdpdmUgdGhlIGxpdHRsZSBndXkgYSBzbGlnaHQgYm91bmNlLlxuICAgIHBsYXllci5zZXRCb3VuY2UoMC4yKTtcbiAgICBwbGF5ZXIuc2V0Q29sbGlkZVdvcmxkQm91bmRzKHRydWUpO1xuICAgIC8vIGJlYXV0eS5zZXRCb3VuY2UoMC4yKTtcbiAgICAvLyBiZWF1dHkuc2V0Q29sbGlkZVdvcmxkQm91bmRzKHRydWUpO1xuXG4gICAgLy8gIE91ciBwbGF5ZXIgYW5pbWF0aW9ucywgdHVybmluZywgd2Fsa2luZyBsZWZ0IGFuZCB3YWxraW5nIHJpZ2h0LlxuICAgIHRoaXMuYW5pbXMuY3JlYXRlKHtcbiAgICAgICAga2V5OiAnbGVmdCcsXG4gICAgICAgIGZyYW1lczogdGhpcy5hbmltcy5nZW5lcmF0ZUZyYW1lTnVtYmVycygnZHVkZScsIHsgc3RhcnQ6IDAsIGVuZDogMyB9KSxcbiAgICAgICAgZnJhbWVSYXRlOiAxMCxcbiAgICAgICAgcmVwZWF0OiAtMVxuICAgIH0pO1xuXG4gICAgdGhpcy5hbmltcy5jcmVhdGUoe1xuICAgICAgICBrZXk6ICd0dXJuJyxcbiAgICAgICAgZnJhbWVzOiBbeyBrZXk6ICdkdWRlJywgZnJhbWU6IDQgfV0sXG4gICAgICAgIGZyYW1lUmF0ZTogMjBcbiAgICB9KTtcblxuICAgIHRoaXMuYW5pbXMuY3JlYXRlKHtcbiAgICAgICAga2V5OiAncmlnaHQnLFxuICAgICAgICBmcmFtZXM6IHRoaXMuYW5pbXMuZ2VuZXJhdGVGcmFtZU51bWJlcnMoJ2R1ZGUnLCB7IHN0YXJ0OiA1LCBlbmQ6IDggfSksXG4gICAgICAgIGZyYW1lUmF0ZTogMTAsXG4gICAgICAgIHJlcGVhdDogLTFcbiAgICB9KTtcblxuICAgIHRoaXMuYW5pbXMuY3JlYXRlKHtcbiAgICAgICAga2V5OiAnYXR0YWNrJyxcbiAgICAgICAgZnJhbWVzOiBbXG4gICAgICAgICAgICB7IGtleTogJ3Nwcml0ZXNoZWV0JywgZnJhbWU6IFwiY3kwLnBuZ1wiIH0sXG4gICAgICAgICAgICB7IGtleTogJ3Nwcml0ZXNoZWV0JywgZnJhbWU6IFwiY3kxLnBuZ1wiIH0sXG4gICAgICAgICAgICB7IGtleTogJ3Nwcml0ZXNoZWV0JywgZnJhbWU6IFwiY3kyLnBuZ1wiIH0sXG4gICAgICAgICAgICB7IGtleTogJ3Nwcml0ZXNoZWV0JywgZnJhbWU6IFwiY3kzLnBuZ1wiIH0sXG4gICAgICAgICAgICB7IGtleTogJ3Nwcml0ZXNoZWV0JywgZnJhbWU6IFwiY3k0LnBuZ1wiIH0sXG4gICAgICAgICAgICB7IGtleTogJ3Nwcml0ZXNoZWV0JywgZnJhbWU6IFwiY3k1LnBuZ1wiIH0sXG4gICAgICAgICAgICB7IGtleTogJ3Nwcml0ZXNoZWV0JywgZnJhbWU6IFwiY3k2LnBuZ1wiIH0sXG4gICAgICAgICAgICB7IGtleTogJ3Nwcml0ZXNoZWV0JywgZnJhbWU6IFwiY3k3LnBuZ1wiIH0sXG4gICAgICAgICAgICB7IGtleTogJ3Nwcml0ZXNoZWV0JywgZnJhbWU6IFwiY3k4LnBuZ1wiIH0sXG4gICAgICAgICAgICAvLyB7IGtleTogJ3Nwcml0ZXNoZWV0JywgZnJhbWU6IFwiY3k5LnBuZ1wiIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGZyYW1lUmF0ZTogMC4zLFxuICAgICAgICByZXBlYXQ6IC0xXG4gICAgfSk7XG5cbiAgICAvLyAgSW5wdXQgRXZlbnRzXG4gICAgY3Vyc29ycyA9IHRoaXMuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXG4gICAgLy8gIFNvbWUgc3RhcnMgdG8gY29sbGVjdCwgMTIgaW4gdG90YWwsIGV2ZW5seSBzcGFjZWQgNzAgcGl4ZWxzIGFwYXJ0IGFsb25nIHRoZSB4IGF4aXNcbiAgICBzdGFycyA9IHRoaXMucGh5c2ljcy5hZGQuZ3JvdXAoe1xuICAgICAgICBrZXk6ICdzdGFyJyxcbiAgICAgICAgcmVwZWF0OiAxMSxcbiAgICAgICAgc2V0WFk6IHsgeDogMTIsIHk6IDAsIHN0ZXBYOiA3MCB9XG4gICAgfSk7XG5cbiAgICBzdGFycy5jaGlsZHJlbi5pdGVyYXRlKGZ1bmN0aW9uIChjaGlsZCkge1xuXG4gICAgICAgIC8vICBHaXZlIGVhY2ggc3RhciBhIHNsaWdodGx5IGRpZmZlcmVudCBib3VuY2VcbiAgICAgICAgY2hpbGQuc2V0Qm91bmNlWShQaGFzZXIuTWF0aC5GbG9hdEJldHdlZW4oMC40LCAwLjgpKTtcblxuICAgIH0pO1xuXG4gICAgYm9tYnMgPSB0aGlzLnBoeXNpY3MuYWRkLmdyb3VwKCk7XG5cbiAgICAvLyAgVGhlIHNjb3JlXG4gICAgc2NvcmVUZXh0ID0gdGhpcy5hZGQudGV4dCgxNiwgMTYsICdzY29yZTogMCcsIHsgZm9udFNpemU6ICczMnB4JywgZmlsbDogJyMwMDAnIH0pO1xuXG4gICAgLy8gIENvbGxpZGUgdGhlIHBsYXllciBhbmQgdGhlIHN0YXJzIHdpdGggdGhlIHBsYXRmb3Jtc1xuICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIocGxheWVyLCBwbGF0Zm9ybXMpO1xuICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIoc3RhcnMsIHBsYXRmb3Jtcyk7XG4gICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcihib21icywgcGxhdGZvcm1zKTtcblxuICAgIC8vICBDaGVja3MgdG8gc2VlIGlmIHRoZSBwbGF5ZXIgb3ZlcmxhcHMgd2l0aCBhbnkgb2YgdGhlIHN0YXJzLCBpZiBoZSBkb2VzIGNhbGwgdGhlIGNvbGxlY3RTdGFyIGZ1bmN0aW9uXG4gICAgdGhpcy5waHlzaWNzLmFkZC5vdmVybGFwKHBsYXllciwgc3RhcnMsIGNvbGxlY3RTdGFyLCBudWxsLCB0aGlzKTtcblxuICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIocGxheWVyLCBib21icywgaGl0Qm9tYiwgbnVsbCwgdGhpcyk7XG4gICAgLy8gY29uc29sZS5sb2coJ2FuaW1zJywgdGhpcy5hbmltcy5hbmltcy5lbnRyaWVzKTtcbiAgICBiZWF1dHkuYW5pbXMucGxheSgnYXR0YWNrJywgdHJ1ZSk7XG5cbiAgICB0aGlzLnNvdW5kLmFkZCgnY29sbGVjdCcpXG4gICAgdGhpcy5zb3VuZC5hZGQoJ2tpbGwnKVxuXG4gICAgY29uc3QgbXVzaWNvbiA9IHRoaXMuYWRkLmltYWdlKDc1MCwgNTAsICdtdXNpY29uJyk7XG4gICAgY29uc3QgbXVzaWNvZmYgPSB0aGlzLmFkZC5pbWFnZSg3NTAsIDUwLCAnbXVzaWNvZmYnKTtcbiAgICBtdXNpYyA9IHRoaXMuc291bmQuYWRkKCdtdXNpYycsIHsgbG9vcDogdHJ1ZSB9KVxuICAgIG11c2ljb2ZmLnNldFZpc2libGUoZmFsc2UpXG4gICAgbXVzaWNvbi5hZGRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCAoKSA9PiB7XG4gICAgICAgIG11c2ljLnBhdXNlKCk7XG4gICAgICAgIG11c2ljb24uc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgIG11c2ljb2ZmLnNldFZpc2libGUodHJ1ZSlcbiAgICB9KVxuICAgIG11c2ljb2ZmLmFkZExpc3RlbmVyKCdwb2ludGVyZG93bicsICgpID0+IHsgbXVzaWMucmVzdW1lKCk7IG11c2ljb2ZmLnNldFZpc2libGUoZmFsc2UpOyBtdXNpY29uLnNldFZpc2libGUodHJ1ZSkgfSlcblxuICAgIGlzX3RvdWNoX2VuYWJsZWQoKSAmJiAoam95U3RpY2sgPSB0aGlzLnBsdWdpbnMuZ2V0KCdyZXhWaXJ0dWFsSm95c3RpY2snKS5hZGQodGhpcywge1xuICAgICAgICB4OiAxNDAsXG4gICAgICAgIHk6IDQ4MCxcbiAgICAgICAgcmFkaXVzOiAxMDAsXG4gICAgfSkpO1xuICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICAgIHAuaW5uZXJUZXh0ID0gJ+aoquWxj+S9k+mqjOabtOS9sydcbiAgICAgICAgcC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJ1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVzaXplJylcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgIHAuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZXZpY2VvcmllbnRhdGlvbicpXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0ID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHAuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBpZiAoIWdhbWVPdmVyKSB7XG4gICAgICAgIGNvbnN0IHsgc2NyZWVuQ2VudGVyWCwgc2NyZWVuQ2VudGVyWSB9ID0gZ2V0U2NyZWVuQ2VudGVyLmNhbGwodGhpcylcbiAgICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy5hZGQuZG9tKHNjcmVlbkNlbnRlclgsIHNjcmVlbkNlbnRlclksICdidXR0b24nLCAnd2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDUwcHg7IGJvcmRlci1yYWRpdXM6IDIwcHg7Y3Vyc29yOiBwb2ludGVyOyBib3JkZXItY29sb3I6IHllbGxvdycsICdzdGFydCcpLnNldE9yaWdpbigwLjUpO1xuICAgICAgICBidXR0b24uYWRkTGlzdGVuZXIoJ2NsaWNrJylcbiAgICAgICAgYnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN5cy5nYW1lLmRldmljZS5mdWxsc2NyZWVuLmF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHlbdGhpcy5zeXMuZ2FtZS5kZXZpY2UuZnVsbHNjcmVlbi5yZXF1ZXN0XSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnV0dG9uLnNldFZpc2libGUoZmFsc2UpXG4gICAgICAgICAgICBnYW1lU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgbXVzaWMucGxheSgpO1xuICAgICAgICAgICAgbXVzaWNvbi5zZXRJbnRlcmFjdGl2ZSgpXG4gICAgICAgICAgICBtdXNpY29mZi5zZXRJbnRlcmFjdGl2ZSgpXG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2FtZU92ZXIgPSBmYWxzZVxuICAgICAgICBtdXNpY29uLnNldEludGVyYWN0aXZlKClcbiAgICAgICAgbXVzaWNvZmYuc2V0SW50ZXJhY3RpdmUoKVxuICAgICAgICBtdXNpYy5wbGF5KClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAoZ2FtZU92ZXIgfHwgIWdhbWVTdGFydCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGN1cnNvcnMubGVmdC5pc0Rvd24gfHwgKGlzX3RvdWNoX2VuYWJsZWQoKSAmJiBqb3lTdGljay5sZWZ0KSkge1xuICAgICAgICBwbGF5ZXIuc2V0VmVsb2NpdHlYKC0xNjApO1xuXG4gICAgICAgIHBsYXllci5hbmltcy5wbGF5KCdsZWZ0JywgdHJ1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnNvcnMucmlnaHQuaXNEb3duIHx8IChpc190b3VjaF9lbmFibGVkKCkgJiYgam95U3RpY2sucmlnaHQpKSB7XG4gICAgICAgIHBsYXllci5zZXRWZWxvY2l0eVgoMTYwKTtcblxuICAgICAgICBwbGF5ZXIuYW5pbXMucGxheSgncmlnaHQnLCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHBsYXllci5zZXRWZWxvY2l0eVgoMCk7XG5cbiAgICAgICAgcGxheWVyLmFuaW1zLnBsYXkoJ3R1cm4nKTtcbiAgICB9XG5cbiAgICBpZiAoKGN1cnNvcnMudXAuaXNEb3duIHx8IChpc190b3VjaF9lbmFibGVkKCkgJiYgam95U3RpY2sudXApKSAmJiBwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duKSB7XG4gICAgICAgIHBsYXllci5zZXRWZWxvY2l0eVkoLTMzMCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb2xsZWN0U3RhcihwbGF5ZXIsIHN0YXIpIHtcbiAgICB0aGlzLnNvdW5kLnBsYXkoJ2NvbGxlY3QnKVxuICAgIHN0YXIuZGlzYWJsZUJvZHkodHJ1ZSwgdHJ1ZSk7XG5cbiAgICAvLyAgQWRkIGFuZCB1cGRhdGUgdGhlIHNjb3JlXG4gICAgc2NvcmUgKz0gMTA7XG4gICAgc2NvcmVUZXh0LnNldFRleHQoJ1Njb3JlOiAnICsgc2NvcmUpO1xuXG4gICAgaWYgKHN0YXJzLmNvdW50QWN0aXZlKHRydWUpID09PSAwKSB7XG4gICAgICAgIC8vICBBIG5ldyBiYXRjaCBvZiBzdGFycyB0byBjb2xsZWN0XG4gICAgICAgIHN0YXJzLmNoaWxkcmVuLml0ZXJhdGUoZnVuY3Rpb24gKGNoaWxkKSB7XG5cbiAgICAgICAgICAgIGNoaWxkLmVuYWJsZUJvZHkodHJ1ZSwgY2hpbGQueCwgMCwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHggPSAocGxheWVyLnggPCA0MDApID8gUGhhc2VyLk1hdGguQmV0d2Vlbig0MDAsIDgwMCkgOiBQaGFzZXIuTWF0aC5CZXR3ZWVuKDAsIDQwMCk7XG5cbiAgICAgICAgdmFyIGJvbWIgPSBib21icy5jcmVhdGUoeCwgMTYsICdib21iJyk7XG4gICAgICAgIGJvbWIuc2V0Qm91bmNlKDEpO1xuICAgICAgICBib21iLnNldENvbGxpZGVXb3JsZEJvdW5kcyh0cnVlKTtcbiAgICAgICAgYm9tYi5zZXRWZWxvY2l0eShQaGFzZXIuTWF0aC5CZXR3ZWVuKC0yMDAsIDIwMCksIDIwKTtcbiAgICAgICAgYm9tYi5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcblxuICAgIH1cbn1cblxuZnVuY3Rpb24gaGl0Qm9tYihwbGF5ZXIsIGJvbWIpIHtcbiAgICB0aGlzLnNvdW5kLnBsYXkoJ2tpbGwnKVxuXG4gICAgdGhpcy5waHlzaWNzLnBhdXNlKCk7XG5cbiAgICBwbGF5ZXIuc2V0VGludCgweGZmMDAwMCk7XG5cbiAgICBwbGF5ZXIuYW5pbXMucGxheSgndHVybicpO1xuXG4gICAgZ2FtZU92ZXIgPSB0cnVlO1xuXG4gICAgY29uc3QgeyBzY3JlZW5DZW50ZXJYLCBzY3JlZW5DZW50ZXJZIH0gPSBnZXRTY3JlZW5DZW50ZXIuY2FsbCh0aGlzKVxuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuYWRkLmRvbShzY3JlZW5DZW50ZXJYLCBzY3JlZW5DZW50ZXJZLCAnYnV0dG9uJywgJ3dpZHRoOiAxMDBweDsgaGVpZ2h0OiA1MHB4OyBib3JkZXItcmFkaXVzOiAyMHB4O2N1cnNvcjogcG9pbnRlcjsgYm9yZGVyLWNvbG9yOiB5ZWxsb3cnLCAncGxheSBhZ2FpbicpLnNldE9yaWdpbigwLjUpO1xuICAgIGJ1dHRvbi5hZGRMaXN0ZW5lcignY2xpY2snKVxuICAgIGJ1dHRvbi5vbignY2xpY2snLCAoKSA9PiB7IG11c2ljLnN0b3AoKTsgdGhpcy5zY2VuZS5yZXN0YXJ0KCkgfSlcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=