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
var ControllerStorage = /** @class */ (function () {
    function ControllerStorage(_storage) {
        this.types = {
            WEB: 0,
            REACT_NATIVE: 1,
            NODE: 2
        };
        this.storage = _storage;
        if (typeof document != 'undefined') {
            this.platform = this.types.WEB;
        }
        else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
            this.platform = this.types.REACT_NATIVE;
        }
        else {
            this.platform = this.types.NODE;
        }
    }
    ControllerStorage.prototype.store = function (_controller_name, _value) {
        return __awaiter(this, void 0, void 0, function () {
            var jsonValue, jsonValue, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.platform === this.types.WEB)) return [3 /*break*/, 1];
                        try {
                            jsonValue = JSON.stringify(_value);
                            this.storage.setItem(_controller_name, jsonValue);
                        }
                        catch (e) {
                            throw Error('there was problem in storing value with react native');
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        if (!(this.platform === this.types.REACT_NATIVE)) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        jsonValue = JSON.stringify(_value);
                        return [4 /*yield*/, this.storage.setItem(_controller_name, jsonValue)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (this.platform === this.types.NODE) {
                            throw Error('nodejs not supported yet!');
                        }
                        else {
                            throw Error('unknow storage platform');
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ControllerStorage.prototype.load = function (_controller_name) {
        return __awaiter(this, void 0, void 0, function () {
            var _result, jsonValue, item, jsonValue, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.platform === this.types.WEB)) return [3 /*break*/, 1];
                        try {
                            _result = this.storage.getItem(_controller_name);
                            jsonValue = JSON.parse(_result);
                            return [2 /*return*/, jsonValue];
                        }
                        catch (e) {
                            throw Error('there was problem load value with react native');
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        if (!(this.platform === this.types.REACT_NATIVE)) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.storage.getItem(_controller_name)];
                    case 3:
                        item = _a.sent();
                        jsonValue = JSON.parse(item);
                        return [2 /*return*/, jsonValue];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (this.platform === this.types.NODE) {
                            throw Error('nodejs not supported yet!');
                        }
                        else {
                            throw Error('unknow storage platform');
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ControllerStorage.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.platform === this.types.WEB) {
                    try {
                        this.storage.clear();
                    }
                    catch (e) {
                        throw Error('there was problem in clear storage react native');
                    }
                }
                else if (this.platform === this.types.REACT_NATIVE) {
                    try {
                        this.storage.clear();
                    }
                    catch (error) {
                        return [2 /*return*/, error];
                    }
                }
                else if (this.platform === this.types.NODE) {
                    throw Error('nodejs not supported yet!');
                }
                else {
                    throw Error('unknow storage platform');
                }
                return [2 /*return*/];
            });
        });
    };
    return ControllerStorage;
}());
export default ControllerStorage;
