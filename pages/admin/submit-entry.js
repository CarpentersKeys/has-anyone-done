import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import styles from '../../styles/Submit-Entry.module.css';
import TimedMessage from "../../Components/TimedMessage";
import SignInOrOut from "../../Components/SignInOrOut";
import { useRouter } from "next/router";
import NotSignedIn from "../../Components/NotSignedIn";

export default function SubmitEntry() {
    const [entryText, entryTextSet] = useState('');
    const [submitDisplay, submitDisplaySet] = useState(null);
    const { data: session } = useSession();
    const router = useRouter();

    // handle timed submission messages (display success or fail for 3s)
    useEffect(() => {
        let timer;

        if (submitDisplay) {
            timer = setTimeout(() => { submitDisplaySet(null) }, 3000)
        };

        return () => { timer && clearTimeout(timer); };
    }, [submitDisplay]);

    async function handleSubmit(evt) {
        // TODO: learn about input sanitization 
        evt.preventDefault();

        const fetchUrl = `../api/entry`
        const postOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: entryText.trim(),
            })
        }

        const result = await fetch(fetchUrl, postOptions);
        if (result.ok) {
            submitDisplaySet('Entry successfully submote!');
            entryTextSet('');
            const recentText = await result.json();
            session.recentEntryText = recentText;
            router.push('/admin/view-entries');
        } else {
            submitDisplaySet('Entry failfully submote!');
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
                {submitDisplay && <span>{submitDisplay}</span>}
                <SignInOrOut />
            </div >
        )
    } else {
        return (
            <div>
                <NotSignedIn />
                <SignInOrOut />
            </div>
        )
    }
}