import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (user.email === 'carpenterskeys@gmail.com') {
                return true;
            } else { return false; };
        }
    }
})