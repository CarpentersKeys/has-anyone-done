import TimedMessage from "../../Components/TimedMessage";
import { useSession } from "next-auth/react";
import styles from '../../styles/ViewEntries.module.css';
import { useState, useEffect } from "react";
import ListPageButtons from "../../Components/ListPageButtons";

export default function ViewEntries() {
    const { data: session } = useSession();
    const [entries, entriesSet] = useState([]);
    const [page, pageSet] = useState(0);

    useEffect(() => {
        const urlBase = process.env.VERCEL_URL || 'http://localhost:3000'
        const fetchUrl = `${urlBase}/api/view`
        const reqOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch(fetchUrl, reqOptions)
            .then(result => result.ok && result.json() || new Error('result not ok'))
            .then(json => entriesSet(json.entries))
            .catch(err => console.log('fetch error in ViewEntries', err))
    }, [])

    if (session) {

        return (entries.length > 0 &&
            <div className={styles.container}>
                <h1 id={styles.title}>these Have Been Done..</h1 >
                <ul className={styles.listCont}>
                    {
                        entries.slice(page * 10, page * 10 + 10).map((e, i) => (
                            <li key={i}>
                                <p>
                                    {e.text} | {e.updatedAt.match(/[\d]{4}-[\d]{2}-[\d]{2}/)}
                                </p>
                            </li>)
                        )
                    }
                </ul>
                <ListPageButtons entries={entries} pageSet={pageSet} />
            </div >
        )
    } else {
        return (
            <TimedMessage id={styles.TimedMessage} jsx={
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