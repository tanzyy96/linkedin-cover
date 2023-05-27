import { useEffect, useState } from "react";

export const useIntervalText = (
	texts: string[],
	interval: number,
	show: boolean
) => {
	const [text, setText] = useState(texts[0]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (!show) return;
		const intervalId = setInterval(() => {
			setIndex((index) => (index + 1) % texts.length);
			setText(texts[index]);
		}, interval);
		return () => clearInterval(intervalId);
	});

	return text;
};
