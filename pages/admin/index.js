import { useRouter } from "next/router";

export default function Admin() {
    const router = useRouter();
    if (typeof window !== 'undefined' &&
        window.document && window.document.createElement) {

        const urlBase = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.LOCAL_URL;

        console.log('clientside NODE_env', process.env.NODE_ENV)
    } else {
        // it knows we're in dev
        console.log('serverside NODE_env', process.env.NODE_ENV === 'production')
    }
}