import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

const prompt = `explain and give suggestions about this code:
function sum (a, b) {
  return a - b
}
`;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

openai.createCompletion({
  model: "text-davinci-003",
  prompt,
  max_tokens: 2047,
})
.then((res) => console.log(res.data.choices[0].text));
