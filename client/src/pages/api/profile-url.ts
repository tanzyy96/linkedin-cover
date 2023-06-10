import { NextApiRequest, NextApiResponse } from "next";
import { getLinkedInPublicUrl } from "@/utils/puppeteer";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// const url = await getLinkedInPublicUrl();

	res
		.status(200)
		.json({ url: "https://www.linkedin.com/in/alexander-lee-1b1b1b1b1/" });
}
