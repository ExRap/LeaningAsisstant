import dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

export class BackendCaller {
    backend_ip = "";

    constructor() {
        this.backend_ip = process.env.BACKEND_SERVER;
    }

    async basicGet() {
        try {
            const response = await axios.get(this.backend_ip, {
                params: {
                    // Specify any query parameters here
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}
