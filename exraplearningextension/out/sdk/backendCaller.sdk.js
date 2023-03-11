"use strict";
/**
* This is an auto generated code. This code should not be modified since the file can be overwriten
* if new genezio commands are executed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remote = exports.BackendCaller = void 0;
const remote_1 = require("./remote");
Object.defineProperty(exports, "Remote", { enumerable: true, get: function () { return remote_1.Remote; } });
class BackendCaller {
    static async basicGet() {
        return await BackendCaller.remote.call("BackendCaller.basicGet");
    }
}
exports.BackendCaller = BackendCaller;
BackendCaller.remote = new remote_1.Remote("https://hijmk5b6v74gpmfjm7fdrocuom0skdif.lambda-url.us-east-1.on.aws/");
//# sourceMappingURL=backendCaller.sdk.js.map