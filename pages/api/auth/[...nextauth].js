import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// import path from 'node:path';

// this doesn't work for some reason
// const logo = path.join(process.cwd(), 'public', 'favicon'); 
// console.log(logo)

const clientId = process.env.NODE_ENV === 'production' ? process.env.GITHUB_ID : process.env.DEV_GITHUB_ID;
const clientSecret = process.env.NODE_ENV === 'production' ? process.env.GITHUB_SECRET : process.env.DEV_GITHUB_SECRET;

export default NextAuth({

    providers: [
        GithubProvider({
            clientId,
            clientSecret,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            console.log(user.email)
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