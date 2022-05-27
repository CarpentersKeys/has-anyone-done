import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// import path from 'node:path';

// this doesn't work for some reason
// const logo = path.join(process.cwd(), 'public', 'favicon'); 
// console.log(logo)

console.log('NEXT_PUBLIC_HOST_URL',process.env.NEXT_PUBLIC_HOST_URL)

export default NextAuth({

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            console.log('user.email',user.email );
            console.log('MY_EMAIL', process.env.MY_EMAIL);
            if (user.email === process.env.MY_EMAIL) {
                return true;
            } else { return false; };
        }
    },
    theme: {
        brandColor: '#0052DB',
        // logo,
    }
})