/**
<<<<<<< HEAD
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/

async function makeRequest(request: any, url: any) {
    const response = await fetch(`${url}`, {
        keepalive: true,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
    });
    return response.json();
=======
 * This is an auto generated code. This code should not be modified since the file can be overwriten 
 * if new genezio commands are executed.
 */

import https from 'https';
import http from 'http';

async function makeRequest(request: any, url: any, agent: any) {

    const data = JSON.stringify(request);
    const hostUrl = new URL(url);

    const options = {
        hostname: hostUrl.hostname,
        port: hostUrl.port,
        path: hostUrl.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
        agent: agent,
    };
    const client = url.includes('https') ? https : http;

    return new Promise((resolve, reject) => {
        const req = client.request(options, res => {
            let body = '';

            res.on('data', d => {
                body += d
            });
            res.on('end', async function() {
                const response = JSON.parse(body);
                resolve(response);
            });

        });

        req.on('error', error => {
            reject(error);
        });

        req.write(data);
        req.end();
    });
>>>>>>> c0445c6 (Improve extension.)
}

/**
 * The class through which all request to the Genezio backend will be passed.
<<<<<<< HEAD
 * 
 */
export class Remote {
    url: any = undefined

    constructor(url: string) {
        this.url = url;
=======
 */
export class Remote {
    url: any = undefined;
    agent: any = undefined;

    constructor(url: string) {
        this.url = url;
        const client = url.includes("https") ? https : http;
        this.agent = new client.Agent({ keepAlive: true });
>>>>>>> c0445c6 (Improve extension.)
    }

    async call(method: any, ...args: any[]) {
        const requestContent = {"jsonrpc": "2.0", "method": method, "params": args, "id": 3};
<<<<<<< HEAD
        const response: any = await makeRequest(requestContent, this.url);
=======
        const response: any = await makeRequest(requestContent, this.url, this.agent);
>>>>>>> c0445c6 (Improve extension.)

        if (response.error) {
            return response.error.message;
        }

        return response.result;
    }
}
