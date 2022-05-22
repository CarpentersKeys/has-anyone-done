import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// import path from 'node:path';

// this doesn't work for some reason
// const logo = path.join(process.cwd(), 'public', 'favicon'); 
// console.log(logo)

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
    },
    theme: {
        brandColor: '#0052DB',
        // logo,
    }
})