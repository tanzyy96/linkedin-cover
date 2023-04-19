import * as dotenv from "dotenv";
import { OpenAI } from "langchain";
import { LinkedinLoader } from "linkedinLoader.js";

dotenv.config();

// const model = new OpenAI({
// 	modelName: "gpt-3.5-turbo",
// 	openAIApiKey: process.env.OPENAI_API_KEY,
// });

const loader = new LinkedinLoader(
	"https://sg.linkedin.com/in/zhi-yang-tan-265815166"
);
const docs = await loader.load();

console.log(docs);
// const res = await model.call(
// 	"What's a good idea for an application to build with GPT-3?"
// );

// console.log(res);
