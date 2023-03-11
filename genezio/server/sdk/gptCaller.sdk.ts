/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
     
import { Remote } from "./remote"



export class GptCaller {
<<<<<<< HEAD
    static remote = new Remote("https://uauhoq3fdqdylezq2eptjygbwe0tsrnh.lambda-url.us-east-1.on.aws/")
=======
    static remote = new Remote("https://2oga24x2bp3efzcvdirxm6eaei0fbzch.lambda-url.us-east-1.on.aws/")
>>>>>>> c0445c6 (Improve extension.)

    static async askChatGPT(requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.askChatGPT", requestText)  
  }

<<<<<<< HEAD
  static async optimizeCode(requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.optimizeCode", requestText)  
  }

  static async describeCode(requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.describeCode", requestText)  
  }

=======
>>>>>>> c0445c6 (Improve extension.)
  

}

export { Remote };
