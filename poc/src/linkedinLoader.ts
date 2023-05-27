import { PuppeteerWebBaseLoader } from "langchain/document_loaders";
import { Browser, Page } from "puppeteer";

export class LinkedinLoader extends PuppeteerWebBaseLoader {
	constructor(webPath: string) {
		super(webPath, {
			launchOptions: {
				headless: true,
			},
			gotoOptions: {
				waitUntil: "networkidle0",
			},
			async evaluate(page: Page, browser: Browser) {
				console.log("Loading page: " + webPath);
				await page.waitForSelector(".profile-section-card__contents");
				console.log("Page loaded.");

				const result = await page.evaluate(() => {
					var res = "";
					document
						.querySelectorAll(".profile-section-card__contents")
						.forEach((el) => {
							res +=
								el.textContent
									?.split("\n")
									.map((t) => t.trim())
									.filter((t) => t.length > 0)
									.map((t, i) =>
										i == 0
											? "Title: " + t
											: i == 1
											? "Company: " + t
											: i == 2
											? "Duration: " + t
											: i == 3
											? "Location: " + t
											: "Description: " + t
									)
									.join("\n") + "\n\n";
						});
					return res;
				});
				return result;
			},
		});
	}
}
