import { Text, Card, CardBody } from "@chakra-ui/react";

export default function TextOption(props: {
	text: string;
	selected?: boolean;
	onClick?: () => void;
	className?: string;
}) {
	return (
		<Card
			border={props.selected ? "1px solid white" : "1px solid transparent"}
			cursor="pointer"
			_hover={{ border: "1px solid white" }}
			onClick={props.onClick}
			className={props.className}
		>
			<CardBody>
				<Text>{props.text}</Text>
			</CardBody>
		</Card>
	);
}
