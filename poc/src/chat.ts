/**
 * The objective of this file is to utilise a underlying chat
 * system to allows users to further update the original cover letter generated
 */

import * as dotenv from "dotenv";
import { OpenAI } from "langchain";
import { loadQAStuffChain, loadSummarizationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models";
import { TextLoader } from "langchain/document_loaders";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
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

const txtLoader = new TextLoader("jd.txt");
const jd = await txtLoader.load();

const sumChain = loadSummarizationChain(new OpenAI());
// const res = await sumChain.call({
// 	input_documents: [...jd],
// });
// console.log(res);

const chat = new ChatOpenAI();

const messages = [
	new SystemChatMessage("Here is the applicant's resume."),
	new SystemChatMessage(docs.map((d) => d.pageContent).join("\n\n")),
	new SystemChatMessage("Here is the job description."),
	new SystemChatMessage(
		"Padlet is a software company that builds products for a good education, inspiring curiosity, creativity, and community. They are looking for Fullstack Engineers to develop exceptional software products, with a vision of every child in the world growing up with Mickey Mouse and Padlet. They have over 50 million active users and are both venture backed and profitable. Candidates must have been told they write good code and know how to copy-paste code from Stack Overflow. Benefits include top tier medical, good stock options, catered lunches and dinners, 20 vacation days and more. There is a lot of energy and the first commit touches millions."
	),
	new HumanChatMessage(
		`
			Write 3 iterations of the first paragraph of the cover letter for this job. [No pre-text]
			`
	),
];
const resp = await chat.call(messages);

// Split 3 iterations up
const options = resp.text.split(/[1-3]./g);
