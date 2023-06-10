import NextAuth, { Session } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export default NextAuth({
	providers: [
		LinkedInProvider({
			clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account?.access_token) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			let newSession = session as Session & { accessToken: string };
			newSession.accessToken = token.accessToken as string;
			// session.user.id = token.id;

			return session;
		},
	},
});
