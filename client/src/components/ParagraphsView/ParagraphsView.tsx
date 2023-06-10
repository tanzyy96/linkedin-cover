import { Box, Flex, Heading } from "@chakra-ui/react";

export default function ParagraphsView(props: {
	paragraphs: string[];
	onUpdateMessage?: (index: number, newText: string) => void;
}) {
	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			width="100%"
			maxWidth={"600px"}
			border="1px solid white"
			borderRadius="20px"
			padding="20px"
		>
			<Heading size="md" paddingBottom="10px">
				My Cover Letter
			</Heading>
			{["Dear Hiring Manager,", ...props.paragraphs].map((paragraph, index) => {
				return (
					<Box
						key={index}
						contentEditable={index == 0 ? false : true}
						padding="16px"
						borderRadius="12px"
						textAlign="left"
						width="full"
						_hover={
							index == 0
								? {}
								: {
										backgroundColor: "gray.900",
										cursor: "text",
								  }
						}
						onInput={(e) =>
							props.onUpdateMessage &&
							props.onUpdateMessage(
								index,
								e.currentTarget.textContent as string
							)
						}
					>
						{paragraph}
					</Box>
				);
			})}
		</Flex>
	);
}
