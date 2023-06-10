import { Text, Button, Container, Heading, Flex } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaLinkedin } from "react-icons/fa";

export default function LoginPage() {
	const router = useRouter();
	const { data: session, status } = useSession();

	if (status === "authenticated") {
		router.push("/generate");
	}

	const signInWithLinkedIn = async () => {
		await signIn();
	};
	return (
		<Container marginY="25vh" className="flex flex-col gap-2 items-center">
			<Heading>Get in here!</Heading>
			<Text>
				We use LinkedIn to authenticate you. We don&apos;t store any of your
				data.
			</Text>
			<Flex justifyContent="center" marginTop="12px">
				<Button
					colorScheme="linkedin"
					leftIcon={<FaLinkedin />}
					onClick={() => signInWithLinkedIn()}
				>
					Sign in with LinkedIn
				</Button>
			</Flex>
		</Container>
	);
}
