import { Inter } from "next/font/google";
import {
	Button,
	Text,
	Card,
	CardBody,
	Divider,
	Input,
	InputGroup,
	InputLeftAddon,
	Textarea,
	useBoolean,
	Flex,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ParagraphsView from "@/components/ParagraphsView/ParagraphsView";
import { useIntervalText } from "@/hooks/useIntervalText";
import OptionCard from "@/components/OptionCard/OptionCard";

const inter = Inter({ subsets: ["latin"] });

const getCoverLetter = async (
	linkedinUrl: string,
	jdText: string,
	messageHistory?: { text: string; type: "human" | "assistant" | "system" }[],
	indexPicked?: number
) => {
	const call = await fetch("/api/cover-letter", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			linkedInUrl: linkedinUrl,
			jdText,
			...(messageHistory && { messages: messageHistory }),
			...(indexPicked != undefined && indexPicked > -1 && { indexPicked }),
		}),
	});
	return call.json() as Promise<{
		options: string[];
		messages: { text: string; type: "human" | "assistant" | "system" }[];
	}>;
};

export default function Home() {
	const router = useRouter();
	const isDemo = router.query.demo == "true";
	const messageHistory = useRef(
		[] as { text: string; type: "human" | "assistant" | "system" }[]
	);

	const [charCount, setCharCount] = useState(0);
	const [showOutput, setShowOutput] = useBoolean();
	const [isLoading, setIsLoading] = useBoolean();
	const buttonLoadingText = useIntervalText(
		[
			"Reading your LinkedIn profile...",
			"Analyzing the job description...",
			"Generating ideas...",
		],
		8000,
		isLoading
	);

	const [jdText, setJdText] = useState("");
	const [linkedinUrl, setLinkedinUrl] = useState("");
	const [options, setOptions] = useState([] as string[]);
	const [coverLetterText, setCoverLetterText] = useState("");
	const [paragraphs, setParagraphs] = useState([] as string[]);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

	useEffect(() => {
		setCharCount(jdText.length);
	}, [jdText]);
	const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setJdText(e.target.value);
	};
	const onUpdateMessage = (index: number, newText: string) => {
		messageHistory.current[index].text = newText;
	};

	useEffect(() => {
		if (isDemo) {
			setLinkedinUrl("sg.linkedin.com/in/zhi-yang-tan-265815166");
			setJdText(
				"Padlet is a software company that builds products for a good education, inspiring curiosity, creativity, and community. They are looking for Fullstack Engineers to develop exceptional software products, with a vision of every child in the world growing up with Mickey Mouse and Padlet. They have over 50 million active users and are both venture backed and profitable. Candidates must have been told they write good code and know how to copy-paste code from Stack Overflow. Benefits include top tier medical, good stock options, catered lunches and dinners, 20 vacation days and more. There is a lot of energy and the first commit touches millions."
			);
		}
	}, [isDemo]);

	const generate = async () => {
		setIsLoading.on();
		var text = coverLetterText.length
			? coverLetterText + "\n\n" + options[selectedOptionIndex]
			: options[selectedOptionIndex];
		if (selectedOptionIndex >= 0) {
			setCoverLetterText(text);
			setParagraphs(paragraphs.concat([options[selectedOptionIndex]]));
		}
		const resp = await getCoverLetter(
			"https://" + linkedinUrl,
			jdText,
			selectedOptionIndex >= 0 ? messageHistory.current : undefined,
			selectedOptionIndex >= 0 ? selectedOptionIndex : undefined
		);
		setOptions(resp.options);
		setSelectedOptionIndex(-1);
		messageHistory.current = resp.messages;

		setShowOutput.on();
		setIsLoading.off();
	};

	return (
		<main
			className={`flex min-h-screen flex-col items-center gap-10 p-24 ${inter.className}`}
		>
			<div className="justify-center font-mono text-sm lg:flex">
				<p className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
					Welcome to
					<code className="font-mono font-bold"> &nbsp;CoverAll</code>
				</p>
			</div>
			<Flex flexDirection="row" width="full" alignItems="flex-start">
				<div className="flex flex-col gap-4 justify-center items-center w-8/12 px-20">
					<InputGroup size="lg" maxWidth={2000}>
						<InputLeftAddon>https://</InputLeftAddon>
						<Input
							placeholder="sg.linkedin.com/in/my-name-id"
							value={linkedinUrl}
							onChange={(e) => setLinkedinUrl(e.target.value)}
						></Input>
					</InputGroup>
					<Textarea
						placeholder="Insert Job description here!"
						onChange={onTextChange}
						value={jdText}
					></Textarea>
					<div className="self-end text-xs">Word Count: {charCount}</div>
					<Button
						onClick={generate}
						isLoading={isLoading}
						isDisabled={options.length > 0 && selectedOptionIndex == -1}
						loadingText={buttonLoadingText}
					>
						{options.length == 0
							? "Generate Cover Letter"
							: selectedOptionIndex == -1
							? "Select Option"
							: "Submit Option"}
					</Button>
					<Divider />
					{showOutput && (
						<div className="flex flex-col items-center gap-4 max-w-xl">
							{options.map((option, i) => {
								return (
									<OptionCard
										key={option}
										onClick={() => {
											setSelectedOptionIndex(
												selectedOptionIndex == -1
													? i
													: i == selectedOptionIndex
													? -1
													: i
											);
										}}
										text={option}
										selected={i == selectedOptionIndex}
									/>
								);
							})}
						</div>
					)}
				</div>
				<ParagraphsView
					paragraphs={paragraphs}
					onUpdateMessage={onUpdateMessage}
				/>
			</Flex>
		</main>
	);
}
