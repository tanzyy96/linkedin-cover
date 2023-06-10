import puppeteer from "puppeteer";

export const getLinkedInPublicUrl = async () => {
	const browser = await puppeteer.launch({
		headless: false, // for testing
	});
	const page = await browser.newPage();
	await page.goto("https://www.linkedin.com");
	// TODO: verify if we're logged in
	(
		document.querySelector(
			".global-nav__primary-link-me-menu-trigger"
		) as HTMLButtonElement
	).click();
	return (
		document.querySelector(".global-nav__me-content a") as HTMLAnchorElement
	)?.href;
};
