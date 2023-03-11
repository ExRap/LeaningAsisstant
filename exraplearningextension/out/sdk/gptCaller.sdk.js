"use strict";
/**
* This is an auto generated code. This code should not be modified since the file can be overwriten
* if new genezio commands are executed.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remote = exports.GptCaller = void 0;
const remote_1 = require("./remote");
Object.defineProperty(exports, "Remote", { enumerable: true, get: function () { return remote_1.Remote; } });
class GptCaller {
    static askChatGPT(requestText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GptCaller.remote.call("GptCaller.askChatGPT", requestText);
        });
    }
    static optimizeCode(requestText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GptCaller.remote.call("GptCaller.optimizeCode", requestText);
        });
    }
    static describeCode(requestText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GptCaller.remote.call("GptCaller.describeCode", requestText);
        });
    }
    static generatePartialFunction(user_id, requestText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GptCaller.remote.call("GptCaller.generatePartialFunction", user_id, requestText);
        });
    }
    static generateCompleteFunction(user_id, requestText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GptCaller.remote.call("GptCaller.generateCompleteFunction", user_id, requestText);
        });
    }
}
exports.GptCaller = GptCaller;
GptCaller.remote = new remote_1.Remote("https://2oga24x2bp3efzcvdirxm6eaei0fbzch.lambda-url.us-east-1.on.aws/");
//# sourceMappingURL=gptCaller.sdk.js.map