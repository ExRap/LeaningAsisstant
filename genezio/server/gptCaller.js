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
      prompt: `optimize me this code:` + requestText,
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
      prompt: `describe me this code:` + requestText,
      max_tokens: 2048
    });
    console.log(
      `DEBUG: request: ${requestText}, response: ${completion.data.choices[0]
        .text}`
    );

    // create a POST request and add it to mongodb
    // TODO
    let lines = completion.data.choices[0].text.split("\n");
    lines = lines.splice(0, lines.length / 2);
    lines.append("# TODO");
    return lines.join(lines);
    // return completion.data.choices[0].text.splice() / 2;
  }

  async generateCompleteFunction(user_id, requestText) {
    // create a GET request to get it from mongodb

  }


}
