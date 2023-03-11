// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GptCaller} from "./sdk/gptCaller.sdk" 
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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
		})

		const options = ['Beginner', 'Intermedaiate', 'Advanced'];
		vscode.window.showQuickPick(options).then((experienceLevel) => {
			if (experienceLevel) {
				console.log(experienceLevel)
			}
			let hotestSubjectQuestions = 'Please provide my the most relevant 10 topics to learn Python as an' + experienceLevel
			let hotestSubjectAnswer = ""
			GptCaller.askChatGPT(hotestSubjectQuestions).then((response) => {
				hotestSubjectAnswer = response
			})
			.then(()=> {
				editor.edit((editBuilder) => {
					const currentLine = editor.selection.active.line;
					editBuilder.insert(new vscode.Position(currentLine + 1, 0), "\n" + '\n"""Take a look at the hotest topics for your experience"""' + '\n\n' + '"""' + hotestSubjectAnswer.slice(1) + '\n' + '"""' + '\n\n' + '"""If you are interested in one, please do not hesitate to ask ;)"""');
				});
			})
			.catch((error) => {
				console.log(error);
			})		
		});
	
		

	});
	context.subscriptions.push(initialDisposable);

	let fullDisposable = vscode.commands.registerCommand('exraplearningextension.fullquestionhandler', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
		  return; // No open text editor
		}
	  
		// Get the selected text
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		vscode.window.showInformationMessage(selectedText);
		GptCaller.askChatGPT(selectedText).then((response) => {
			editor.edit((editBuilder) => {
				const document = editor.document;
    			const lastLine = document.lineAt(document.lineCount - 1).lineNumber;

				editBuilder.insert(new vscode.Position(lastLine + 1, 0), '\n\n"""' + response.slice(1) + '\n"""');
			});
			
		}).catch((error) => {
			console.log(error);
		});
		
	});

	context.subscriptions.push(fullDisposable);

	let describeDisposable = vscode.commands.registerCommand('exraplearningextension.describecodehandler', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
		  return; // No open text editor
		}
	  
		// Get the selected text
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		vscode.window.showInformationMessage(selectedText);
		GptCaller.describeCode(selectedText).then((response) => {
			editor.edit((editBuilder) => {
				const document = editor.document;
    			const lastLine = document.lineAt(document.lineCount - 1).lineNumber;

				editBuilder.insert(new vscode.Position(lastLine + 1, 0), '\n\n"""' + response.slice(1) + '\n"""');
			});
			
		}).catch((error) => {
			console.log(error);
		});
		
	});

	context.subscriptions.push(describeDisposable);

	let writeFunctionDisposable = vscode.commands.registerCommand('exraplearningextension.writeFunctionhandler', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
		  return; // No open text editor
		}
	  
		// Get the selected text
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		vscode.window.showInformationMessage(selectedText);
		GptCaller.describeCode("Write a Pythn function " + selectedText).then((response) => {
			editor.edit((editBuilder) => {
				const document = editor.document;
    			const lastLine = document.lineAt(document.lineCount - 1).lineNumber;

				editBuilder.insert(new vscode.Position(lastLine + 1, 0), '\n\n' + response.slice(1) + '\n');
			});
			
		}).catch((error) => {
			console.log(error);
		});
		
	});

	context.subscriptions.push(writeFunctionDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
