import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../styles/Submit-Entry.module.css';
import TimedMessage from "../Components/TimedMessage";

export default function SubmitEntry() {
    const [entryText, entryTextSet] = useState('');
    const { data: session } = useSession();

    async function handleSubmit(evt) {
        evt.preventDefault();

        const url = '/api/entry'
        const reqOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: entryText,
            })
        }

        const result = await fetch(url, reqOptions);
        console.log('result:', result)
        if (result.ok) {
            const entry = await result.json();
            console.log('entry', entry)
        }
    }

    if (session) {
        return (
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <button
                        type='submit'
                    >has Anyone Done..
                    </button>
                    <input
                        type="text"
                        onChange={(evt) => { entryTextSet(evt.target.value) }}
                        value={entryText}
                    />
                    {/* FUTURE: auto search the db and display similar options as input to avoid dups */}
                </form>
                <div className={styles.auth}>
                    <button onClick={() => signOut()}>Sign Out</button>
                </div>
            </div >
        )
    } else {
        return (
            <TimedMessage jsx={
                <div className={styles.container}>
                    <h3 className={styles.message}>
                        Not signed in
                    </h3>
                    <p className={styles.message}>btw only I can sign in</p>
                    <div className={styles.auth}>
                        <button onClick={() => signIn()}>Sign In</button>
                    </div>
                </div>
            } time='800' />
        )
    }
}