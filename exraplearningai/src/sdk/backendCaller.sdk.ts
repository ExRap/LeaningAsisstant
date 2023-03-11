/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
     
import { Remote } from "./remote"



export class BackendCaller {
    static remote = new Remote("https://hijmk5b6v74gpmfjm7fdrocuom0skdif.lambda-url.us-east-1.on.aws/")

    static async basicGet(): Promise<any> {
        return await BackendCaller.remote.call("BackendCaller.basicGet")  
  }

  

}

export { Remote };
