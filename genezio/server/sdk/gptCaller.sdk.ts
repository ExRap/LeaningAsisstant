/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
     
import { Remote } from "./remote"



export class GptCaller {
    static remote = new Remote("https://2oga24x2bp3efzcvdirxm6eaei0fbzch.lambda-url.us-east-1.on.aws/")

    static async askChatGPT(requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.askChatGPT", requestText)  
  }

  static async optimizeCode(requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.optimizeCode", requestText)  
  }

  static async describeCode(requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.describeCode", requestText)  
  }

  static async generatePartialFunction(user_id: any, requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.generatePartialFunction", user_id, requestText)  
  }

  static async generateCompleteFunction(user_id: any, requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.generateCompleteFunction", user_id, requestText)  
  }

  

}

export { Remote };
