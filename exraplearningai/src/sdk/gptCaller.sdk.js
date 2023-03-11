"use strict";
/**
* This is an auto generated code. This code should not be modified since the file can be overwriten
* if new genezio commands are executed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remote = exports.GptCaller = void 0;
const remote_1 = require("./remote");
Object.defineProperty(exports, "Remote", { enumerable: true, get: function () { return remote_1.Remote; } });
class GptCaller {
    static async askChatGPT(requestText) {
        return await GptCaller.remote.call("GptCaller.askChatGPT", requestText);
    }
}
exports.GptCaller = GptCaller;
GptCaller.remote = new remote_1.Remote("https://2oga24x2bp3efzcvdirxm6eaei0fbzch.lambda-url.us-east-1.on.aws/");
//# sourceMappingURL=gptCaller.sdk.js.map