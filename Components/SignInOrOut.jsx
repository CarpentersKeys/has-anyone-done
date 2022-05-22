import styles from '../styles/SignInOrOut.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInOrOut() {
    const {data: session} = useSession();

    if (session) {
        return (
            <div className={styles.auth}>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        )
    } else {
        return (
            <div className={styles.auth}>
                <button onClick={() => signIn()}>Sign In</button>
            </div>
        )
    }
}