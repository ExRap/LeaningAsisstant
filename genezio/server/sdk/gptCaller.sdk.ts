/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
     
import { Remote } from "./remote"



export class GptCaller {
    static remote = new Remote("https://uauhoq3fdqdylezq2eptjygbwe0tsrnh.lambda-url.us-east-1.on.aws/")

    static async askChatGPT(requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.askChatGPT", requestText)  
  }

  static async optimizeCode(requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.optimizeCode", requestText)  
  }

  static async describeCode(requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.describeCode", requestText)  
  }

  

}

export { Remote };
