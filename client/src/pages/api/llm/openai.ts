import { OpenAI } from "langchain";
import { ChatOpenAI } from "langchain/chat_models";
import * as dotenv from "dotenv";
import { LinkedinLoader } from "./linkedinLoader";
import { Document } from "langchain/document";
import {
	AIChatMessage,
	BaseChatMessage,
	HumanChatMessage,
	SystemChatMessage,
} from "langchain/schema";

dotenv.config();

export const generateInitialOptions = async (
	linkedInUrl: string,
	jdText: string
) => {
	const model = new ChatOpenAI();
	const loader = new LinkedinLoader(linkedInUrl);
	const linkedInDocs = await loader.load();
	const jdDocs = new Document({ pageContent: jdText });
	const messages = [
		new SystemChatMessage(`
		You are trying to help me complete my cover letter.
		You will present me with 3 options of the next paragraph based on my current cover letter.
		I will pick one option.
		You will then reply me with my next 3 options for the next paragraph.
		[Only reply in the format of "1. ..., 2. ... or 3. ..." with no pretext.]
		My cover letter should not extend beyond 4 paragraphs.
		When the cover letter is complete, start your response with "DONE. Here's your final cover letter." with no pretext.
	`),
		new HumanChatMessage(`
		Here is my resume:
		\`\`\`
		${linkedInDocs.map((d) => d.pageContent).join("\n\n")}
		\`\`\`
		Here is the job description:
		\`\`\`
		${jdDocs.pageContent}
		\`\`\`
		`),
		new HumanChatMessage(
			"My starting cover letter:\n```Dear Hiring Manager,\n```"
		),
	];

	const resp = await model.call(messages);

	// find the 3 options using regex
	const regex = /[1-3][.][^\n]+/g;
	const options = resp.text.match(regex)?.map((s) => s.slice(3).trim()) ?? [];

	return { options, messages: [...messages, new AIChatMessage(resp.text)] };
};

export const generateNextOptions = async (
	messages: { text: string; type: "human" | "assistant" | "system" }[],
	indexPicked: 0 | 1 | 2
) => {
	const model = new ChatOpenAI();

	const castedMsgs = messages.map((msg) => {
		if (msg.type == "human") {
			return new HumanChatMessage(msg.text);
		} else if (msg.type == "assistant") {
			return new AIChatMessage(msg.text);
		} else return new SystemChatMessage(msg.text);
	});

	const messagesWithPick = [
		...castedMsgs,
		new HumanChatMessage("I pick option " + (indexPicked + 1) + "."),
	];
	const resp = await model.call(messagesWithPick);

	const regex = /[1-3][.][^\n]+/g;
	const options = resp.text.match(regex)?.map((s) => s.slice(3).trim()) ?? [];
	if (options.length < 3) {
		console.log(resp.text);
	}
	return {
		options,
		messages: [...messagesWithPick, new AIChatMessage(resp.text)],
	};
};
