// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { generateInitialOptions, generateNextOptions } from "./llm/openai";
import {
	AIChatMessage,
	BaseChatMessage,
	HumanChatMessage,
	SystemChatMessage,
} from "langchain/schema";

type PostCoverLetterRequest = {
	linkedInUrl: string;
	jdText: string;
	messages?: { text: string; type: "human" | "assistant" | "system" }[];
	indexPicked?: 0 | 1 | 2;
};

export default async function postCoverLetterOptions(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method == "GET")
		return res.status(405).json({ error: "Method not allowed" });
	const { linkedInUrl, jdText, messages } = req.body as PostCoverLetterRequest;
	var resp = {
		options: [] as string[],
		messages: [] as (HumanChatMessage | SystemChatMessage | AIChatMessage)[],
	};
	if (!messages) {
		resp = await generateInitialOptions(linkedInUrl, jdText);
	} else {
		resp = await generateNextOptions(messages, req.body.indexPicked);
	}

	const msgs = resp.messages.map((msg) => {
		if (msg instanceof HumanChatMessage) {
			return { text: msg.text, type: "human" };
		} else if (msg instanceof AIChatMessage) {
			return { text: msg.text, type: "assistant" };
		} else {
			return { text: msg.text, type: "system" };
		}
	});
	res.status(200).json({ options: resp.options, messages: msgs });
}
