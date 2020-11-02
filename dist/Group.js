var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { isEqual, isPlainObject, reduce } from 'lodash';
import ControllerStorage from './ControllerStorage';
var Group = /** @class */ (function () {
    function Group(bridge) {
        this.controllers = [];
        this.storage = new ControllerStorage(bridge);
    }
    /**
     * add controller to the group to add new properties so it can be used in other controllers
     *
     * @param {Array<IBasicController>} controller
     * @memberof Group
     */
    Group.prototype.add = function (_controller) {
        var _this = this;
        _controller.forEach(function (controller) {
            controller.state = [];
            controller.http = undefined;
            controller.mount = false;
            controller.setState = function (_new_state, _prevState, _caller) {
                controller.state
                    .forEach(function (_state) { return __awaiter(_this, void 0, void 0, function () {
                    var handler;
                    return __generator(this, function (_a) {
                        handler = _state;
                        if (controller.persist === true) {
                            this.storage.store(controller.name, _new_state);
                        }
                        else {
                            this.storage.clear();
                        }
                        controller.default = _new_state;
                        if (controller.mount === true) {
                            handler(_new_state);
                        }
                        return [2 /*return*/];
                    });
                }); });
                if (controller.onChange !== undefined) {
                    controller.onChange(controller, _this, _new_state, _prevState);
                }
            };
            controller.getState = function () {
                return controller.state[0];
            };
            controller.diff = function (_prev_state, _new_state) {
                var _this = this;
                return reduce(_prev_state, function (result, value, key) {
                    if (isPlainObject(value)) {
                        result[key] = _this.diff(value, _new_state[key]);
                    }
                    else if (!isEqual(value, _new_state[key])) {
                        result[key] = { from: value, to: _new_state[key] };
                    }
                    return result;
                }, {});
            };
            controller.isEqual = function (_prev_state, _new_state) {
                return isEqual(_prev_state, _new_state);
            };
            _this.controllers.push(controller);
        });
    };
    /**
     * select controller in group and run method of that controller
     *
     * @param {*} controller_name
     * ```js
     * controller_name`@`method
     * ````
     * @param {*} input
     * @param {*} states
     * @memberof Group
     */
    Group.prototype.run = function (_method, _input, _states) {
        var _this = this;
        var state_name = _method.substr(0, _method.search('@'));
        var method_name = _method.substr(_method.search('@') + 1, _method.length);
        this.controllers.filter(function (_controller) {
            return _controller.name === state_name;
        }).forEach(function (_controller) {
            var method = _controller.methods[method_name];
            method(_controller, _this, _input, _states);
        });
    };
    Group.prototype.connect = function (_controller_name, _handler) {
        this.controllers.filter(function (controller) {
            return controller.name === _controller_name;
        }).forEach(function (_controller) {
            _controller.state.push(_handler);
        });
    };
    Group.prototype.getDefault = function (_controller_name) {
        var _default;
        this.controllers.filter(function (controller) {
            return controller.name === _controller_name;
        }).forEach(function (controller) {
            _default = controller.default;
        });
        return _default;
    };
    Group.prototype.getController = function (_controller_name) {
        var _controller;
        this.controllers.filter(function (controller) {
            return controller.name === _controller_name;
        }).forEach(function (controller) {
            _controller = controller;
        });
        return _controller;
    };
    Group.prototype.mount = function (_controller_name) {
        this.controllers.filter(function (controller) {
            return controller.name === _controller_name;
        }).forEach(function (controller) {
            controller.mount = true;
        });
    };
    Group.prototype.unmount = function (_controller_name) {
        this.controllers.filter(function (controller) {
            return controller.name === _controller_name;
        }).forEach(function (controller) {
            controller.mount = false;
        });
    };
    Group.prototype.all = function () {
        this.controllers.forEach(function (controller) { return console.log(controller); });
    };
    return Group;
}());
export { Group };
