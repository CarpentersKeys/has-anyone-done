import { useState } from "react";
import { useSession } from 'next-auth/react';
import styles from '../../styles/Submit-Entry.module.css';
import TimedMessage from "../../Components/TimedMessage";
import SignInOrOut from "../../Components/SignInOrOut";
import { useRouter } from "next/router";

export default function SubmitEntry() {
    const [entryText, entryTextSet] = useState('');
    const { data: session } = useSession();
    const router = useRouter();

    async function handleSubmit(evt) {
        evt.preventDefault();

        const fetchUrl = `../api/entry`
        console.log('fetchurl', fetchUrl)
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

        const result = await fetch(fetchUrl, reqOptions);
        if (result.ok) {
            router.push('/admin/view-entries');
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
                <SignInOrOut />
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
                    <SignInOrOut />
                </div>
            } time='800' />
        )
    }
}