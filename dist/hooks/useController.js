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
// import React from '../../../react-commander-web/node_modules/react';
import React from 'react';
var statusTypes;
(function (statusTypes) {
    statusTypes[statusTypes["LOADING"] = 0] = "LOADING";
    statusTypes[statusTypes["SUCCESS"] = 1] = "SUCCESS";
    statusTypes[statusTypes["FAILED"] = 2] = "FAILED";
})(statusTypes || (statusTypes = {}));
function useController(_controller_group, _controller_name) {
    var _this = this;
    var controller = _controller_group.getController(_controller_name);
    var storage = (controller.persist === true) ? _controller_group.storage : undefined;
    var default_counter = _controller_group.getDefault(_controller_name);
    var _a = React.useState(default_counter), state = _a[0], setState = _a[1];
    var _b = React.useState(statusTypes.LOADING), status = _b[0], setStatus = _b[1];
    var getPersist = function () { return __awaiter(_this, void 0, void 0, function () {
        var item, parsed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storage.load(_controller_name)];
                case 1:
                    item = _a.sent();
                    parsed = JSON.parse(item);
                    if (item !== null) {
                        setState(parsed);
                        setStatus(statusTypes.SUCCESS);
                    }
                    else {
                        setStatus(statusTypes.FAILED);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        _controller_group.mount(_controller_name);
        return function () {
            _controller_group.unmount(_controller_name);
        };
    }, []);
    React.useEffect(function () {
        _controller_group.connect(_controller_name, setState);
        if (controller.persist === true) {
            getPersist();
        }
        else {
            setStatus(statusTypes.SUCCESS);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [state, status];
}
export { useController, statusTypes };
