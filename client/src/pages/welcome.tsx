import OptionCard from "@/components/OptionCard/OptionCard";
import ParagraphsView from "@/components/ParagraphsView/ParagraphsView";
import {
	Box,
	Button,
	Image,
	Collapse,
	Flex,
	Heading,
	SimpleGrid,
	Text,
	useInterval,
	Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const ALL_MESSAGES = [
	"I believe that I am a right fit for ...",
	"As a highly motivated and results orientated individual, I am eager to contribute to your team ...",
	"My communication skills go hand in hand with my confidence to perform under pressure ...",
	"I hope that you will consider my application for the role of ...",
	"I am a hardworking and dedicated individual who is eager to learn ...",
	"I am a team player that thrives in a fast-paced environment ...",
	"Excited to by the opportunity to work at ...",
];

export default function WelcomePage() {
	const router = useRouter();
	const [messages, setMessages] = useState(ALL_MESSAGES.slice(0, 4));
	const msgIndexes = useRef([0, 1, 2]);

	useInterval(() => {
		msgIndexes.current = [
			...msgIndexes.current.slice(1),
			(msgIndexes.current[2] + 1) % ALL_MESSAGES.length,
		];
		setMessages(
			[
				...msgIndexes.current,
				(msgIndexes.current[2] + 1) % ALL_MESSAGES.length,
			].map((i) => ALL_MESSAGES[i])
		);
	}, 2000);

	return (
		<Box width="80vw" margin="auto" marginY="22vh" maxWidth="1500px">
			<SimpleGrid columns={2} spacing={10} width="100%">
				<Flex flexDirection="column" gap="10px">
					<Heading>Work on your Interviews</Heading>
					<Heading size="lg">
						not your{" "}
						<Text
							className="inline-block"
							fontSize={["3xl", "4xl", "5xl", "7xl"]}
							bgGradient="linear(to-tr, orange.300, yellow.400)"
							bgClip="text"
						>
							Cover Letters
						</Text>
					</Heading>
					<Text
						fontSize="18px"
						marginTop="20px"
						maxWidth="400px"
						className=" text-gray-400"
					>
						Connect directly to LinkedIn to generate your cover letter in under
						2 minutes using AI using a multiple choice approach.
					</Text>
				</Flex>
				<Box height="300px">
					<Flex
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						gap="12px"
						width="40vw"
					>
						{messages.map((message, i) => {
							return (
								<Collapse
									key={message}
									animateOpacity
									in={i == 1 || i == 2 || i == 3}
									delay={i * 0.2}
									className="w-full"
								>
									<OptionCard key={i} text={message} />
								</Collapse>
							);
						})}
					</Flex>
				</Box>
			</SimpleGrid>
			<Flex
				flexDirection="row"
				alignItems="center"
				justifyContent="center"
				gap="10px"
				marginY="120px"
			>
				<Button colorScheme="yellow" onClick={() => router.push("/login")}>
					Get started
				</Button>
				<Button
					onClick={() =>
						window.scrollBy({
							top: window.innerHeight,
							behavior: "smooth",
						})
					}
				>
					Learn more
				</Button>
			</Flex>
			<Flex flexDirection="column" gap="150px">
				<SimpleGrid columns={2} spacing={10} width="100%">
					<Flex
						flexDirection="column"
						gap="10px"
						justifyContent="center"
						alignItems="center"
					>
						<Image
							src="/einstein.png"
							boxSize="400px"
							alt="einstein writing cover letters"
							className="rounded-lg"
						/>
						<Text fontSize={"xs"} className=" italic">
							What you actually look like after writing your 100th cover letter
							without CoverAI
						</Text>
					</Flex>
					<Container className=" text-gray-400" marginY="auto">
						<Flex flexDirection="column" gap="10px">
							<Heading>Integrated with LinkedIn</Heading>
							<Text>
								If you&apos;re on the{" "}
								<Image
									src="/LI-Logo.png"
									objectFit={"contain"}
									alt="LinkedIn"
									className="inline-block pb-1"
									boxSize="100px"
									height="24px"
								/>
								look no further. Just by providing your public LinkedIn URL, we
								can pull your work, education and other experiences to teach our
								AI more about yourself!
							</Text>
							<Text className=" text-gray-400">
								Finally, simply pass in the job description and we&apos;ll
								generate a cover letter for you. Ezpz!
							</Text>
						</Flex>
					</Container>
				</SimpleGrid>
				<SimpleGrid columns={2} spacing={10} width="100%">
					<Container>
						<Flex flexDirection="column" gap="10px" marginY="auto">
							<Heading>Stay in control</Heading>
							<Text className=" text-gray-400">
								AI is great, but it&apos;s not perfect.
							</Text>
							<Text className=" text-gray-400">
								We&apos;ve designed CoverAI to be a multiple choice approach to
								generating your cover letter. This means that you&apos;re always
								in control of what&apos;s being generated.
							</Text>
							<Text className=" text-gray-400">
								Don&apos;t like a sentence? No problem, just add it in yourself!
							</Text>
							<Text className=" text-gray-400">
								We allow you to edit the generated cover letter at any time in
								case you want to add a personal touch.
							</Text>
						</Flex>
					</Container>
					<Flex
						flexDirection="column"
						gap="10px"
						justifyContent="center"
						alignItems="center"
					>
						<ParagraphsView
							paragraphs={[
								"I am applying to the best job in the world right now...",
								"You can click and edit easily!",
							]}
						/>
					</Flex>
				</SimpleGrid>
				<Flex className="flex justify-center items-center">
					<Button colorScheme="yellow" onClick={() => router.push("/login")}>
						Get started with CoverAI
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
}
