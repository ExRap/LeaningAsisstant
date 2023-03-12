"use strict";
const https = require('http');
function makePostRequest(url, postData) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
        },
    };
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve(body);
            });
        }).on('error', (err) => {
            reject(err);
        });
        req.write(postData);
        req.end();
    });
}
function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                }
                catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}
fetchData('http://hackathon.echopoint.tech/api/v1/partial/ceva')
    .then((data) => {
    console.log(data.requestText);
})
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=test_api.js.map