import { Avatar, Badge, Box, Button } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function NavBar() {
	const router = useRouter();
	const { data: session, status } = useSession();

	return (
		<Box>
			<p className="mb-10 w-full flex justify-between items-center px-4 py-6 border-b border-gray-300 bg-gradient-to-b from-zinc-200  dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
				<code
					className="font-mono font-bold cursor-pointer ml-4"
					onClick={() => router.push("/welcome")}
				>
					CoverAI
				</code>
				{status === "authenticated" &&
				session.user?.name &&
				session.user?.image ? (
					<Avatar
						name={session?.user?.name}
						src={session?.user?.image}
						size="sm"
						onClick={() => signOut()}
					/>
				) : (
					<Button onClick={() => router.push("/login")}>Login</Button>
				)}
			</p>
		</Box>
	);
}
