import { GptCaller } from "../server/sdk/gptCaller.sdk";

function sendRequest(params) {
    params.preventDefault();
    let requestText = 'what is google?';
    GptCaller.askChatGPT(requestText).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}