import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import theme from "../../theme";
import "@fontsource/caladea/700.css";
import NavBar from "@/components/NavBar/NavBar";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<ChakraProvider theme={theme}>
				<NavBar />
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	);
}
