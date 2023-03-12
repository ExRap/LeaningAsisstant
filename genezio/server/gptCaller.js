import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

export class GptCaller {
  openai = null;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_SECRET_KEY
    });
    const openai = new OpenAIApi(configuration);
    this.openai = openai;
  }

  async askChatGPT(requestText) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: requestText,
      max_tokens: 2048
    });
    console.log(
      `DEBUG: request: ${requestText}, response: ${completion.data.choices[0]
        .text}`
    );
    return completion.data.choices[0].text;
  }

  async optimizeCode(requestText) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: `optimize me this code \n` + requestText,
      max_tokens: 2048
    });
    console.log(
      `DEBUG: request: ${requestText}, response: ${completion.data.choices[0]
        .text}`
    );
    return completion.data.choices[0].text;
  }

  async describeCode(requestText) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: `describe me this code:` + requestText,
      max_tokens: 2048
    });
    console.log(
      `DEBUG: request: ${requestText}, response: ${completion.data.choices[0]
        .text}`
    );
    return completion.data.choices[0].text;
  }

  async generatePartialFunction(user_id, requestText) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a Python function` + requestText,
      max_tokens: 2048
    });
    console.log(
      `DEBUG: request: ${requestText}, response: ${completion.data.choices[0]
        .text}`
    );

    // create a POST request and add it to mongodb
    // TODO
    const postData = JSON.stringify({
      file_content: JSON.stringify({uid: user_id,
      requestText: requestText})
  });
		
		makePostRequest('http://hackathon.echopoint.tech/api/v1/partial/', postData)
			.then((data) => {
				console.log(data)
			})
			.catch((err) => {
			console.error(err);
			});


    let lines = completion.data.choices[0].text.split("\n");
    lines = lines.splice(0, lines.length / 2);
    lines.push("# TODO");
    return lines.join("\n");
  }

  async generateCompleteFunction(user_id, requestText) {
    fetchData('http://hackathon.echopoint.tech/api/v1/partial/${user_id}')
    .then((data) => {
              console.log(data.requestText)
              return data.requestText
          })
        .catch((err) => {
            console.error(err);
            });
  }


}
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
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}