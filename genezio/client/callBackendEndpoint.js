"use strict";
exports.__esModule = true;
var gptCaller_sdk_1 = require("../server/sdk/gptCaller.sdk");
function sendRequest(params) {
    params.preventDefault();
    var requestText = 'what is google?';
    gptCaller_sdk_1.GptCaller.askChatGPT(requestText).then(function (response) {
        console.log(response);
    })["catch"](function (error) {
        console.log(error);
    });
}
