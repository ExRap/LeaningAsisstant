/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
     
import { Remote } from "./remote"



export class GptCaller {
    static remote = new Remote("http://127.0.0.1:8083/GptCaller")

    static async askChatGPT(requestText: any): Promise<any> {
        return await GptCaller.remote.call("GptCaller.askChatGPT", requestText)  
  }

  

}

export { Remote };
