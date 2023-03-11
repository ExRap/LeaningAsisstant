"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const gptCaller_sdk_1 = require("./sdk/gptCaller.sdk");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "exraplearningextension" is now active!');
    let initialDisposable = vscode.commands.registerCommand('exraplearningextension.pythonTutorial', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        // Get the start position of the document
        const documentStart = new vscode.Position(0, 0);
        // Insert the text at the start of the document
        const introduction = `
	
	
	
	
	
	"""Welcome to your personal ExRap Python Learning Assistant! I am here to help you improve your Python skills and knowledge.
With me, you will have access to a range of resources, including interactive coding exercises, tutorials, and quizzes. You will also be able to,
track your progress as you learn, set goals for yourself, and get personalized recommendations for what to learn next.
I were designed to be flexible and customizable, so you can tailor your learning experience to your needs and interests. 
You can choose your own learning path, focus on specific topics or skills, and learn at your own pace.
Whether you are looking to learn Python for work, personal projects, or just for fun, I am here to help you achieve your goals. So what are you waiting for?"""`;
        editor.edit(editBuilder => {
            editBuilder.insert(documentStart, introduction);
        });
        vscode.window.showInputBox({
            prompt: 'Enter some text',
            placeHolder: 'Type here',
        }).then((experienceLevel) => {
            if (experienceLevel) {
                vscode.window.showInformationMessage(`You typed: ${experienceLevel}`);
            }
            else {
                vscode.window.showWarningMessage('No input provided');
            }
        });
        const options = ['Beginner', 'Intermedaiate', 'Advanced'];
        vscode.window.showQuickPick(options).then((experienceLevel) => {
            if (experienceLevel) {
                console.log(experienceLevel);
            }
            let hotestSubjectQuestions = 'Please provide my the most relevant 10 topics to learn Python as an' + experienceLevel;
            let hotestSubjectAnswer = "";
            gptCaller_sdk_1.GptCaller.askChatGPT(hotestSubjectQuestions).then((response) => {
                hotestSubjectAnswer = response;
            })
                .then(() => {
                editor.edit((editBuilder) => {
                    const currentLine = editor.selection.active.line;
                    editBuilder.insert(new vscode.Position(currentLine + 1, 0), "\n" + '\n"""Take a look at the hotest topics for your experience"""' + '\n\n' + '"""' + hotestSubjectAnswer.slice(1) + '\n' + '"""' + '\n\n' + '"""If you are interested in one, please do not hesitate to ask ;)"""');
                });
            })
                .catch((error) => {
                console.log(error);
            });
        });
    });
    context.subscriptions.push(initialDisposable);
    let disposable = vscode.commands.registerCommand('exraplearningextension.fullquestionhandler', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        // Get the selected text
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        vscode.window.showInformationMessage(selectedText);
        gptCaller_sdk_1.GptCaller.askChatGPT(selectedText).then((response) => {
            editor.edit((editBuilder) => {
                const document = editor.document;
                const lastLine = document.lineAt(document.lineCount - 1).lineNumber;
                editBuilder.insert(new vscode.Position(lastLine + 1, 0), '\n\n"""' + response.slice(1) + '\n"""');
            });
        }).catch((error) => {
            console.log(error);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map