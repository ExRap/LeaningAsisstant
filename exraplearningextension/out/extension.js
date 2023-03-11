"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const gptCaller_sdk_1 = require("./sdk/gptCaller.sdk");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "exraplearningextension" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('exraplearningextension.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from ExRapLearningExtension!');
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        // Get the selected text
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        vscode.window.showInformationMessage(selectedText);
        gptCaller_sdk_1.GptCaller.askChatGPT(selectedText).then((response) => {
            const responseChat = response;
            const nextLine = editor.document.lineAt(selection.end.line).rangeIncludingLineBreak.end;
            editor.edit(editBuilder => {
                editBuilder.insert(nextLine, responseChat);
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