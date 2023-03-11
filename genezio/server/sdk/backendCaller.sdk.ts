/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
     
import { Remote } from "./remote"



export class BackendCaller {
    static remote = new Remote("http://127.0.0.1:8083/BackendCaller")

    static async basicGet(): Promise<any> {
        return await BackendCaller.remote.call("BackendCaller.basicGet")  
  }

  

}

export { Remote };
