import * as dotenv from "dotenv";
import { OpenAI } from "langchain";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { TextLoader } from "langchain/document_loaders";
import { LinkedinLoader } from "linkedinLoader.js";

dotenv.config();

const model = new OpenAI({
	modelName: "gpt-3.5-turbo",
	openAIApiKey: process.env.OPENAI_API_KEY,
});

const loader = new LinkedinLoader(
	"https://sg.linkedin.com/in/zhi-yang-tan-265815166"
);
const docs = await loader.load();

const txtLoader = new TextLoader("jd.txt");
const jd = await txtLoader.load();

const chain = loadQAStuffChain(model);
const res = await chain.call({
	input_documents: [...docs, ...jd],
	question: `Write a cover letter for this job. 
		Find relevant experiences in the applicant's resume and talk about how they match the job requirements.
		Ignore experiences that are not relevant to the job or are not recent.
		Talk about how relevant experiences have equipped the applicant with the appropriate soft skills.
		`,
});

console.log(res);
