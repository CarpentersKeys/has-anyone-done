import { useSession } from "next-auth/react";
import styles from '../../styles/ViewEntries.module.css';
import { useState, useEffect } from "react";
import ListPageButtons from "../../Components/ListPageButtons";
import SignInOrOut from "../../Components/SignInOrOut";
import NotSignedIn from "../../Components/NotSignedIn";

// TODO: highlight recent entries
// BUG: on submission get request fails after redirect here
export default function ViewEntries() {
    const { data: session, status } = useSession();
    const [entries, entriesSet] = useState([]);
    const [page, pageSet] = useState(0);

    useEffect(() => {
        const fetchUrl = `../api/view`
        const reqOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch(fetchUrl, reqOptions)
            .then(result => result.ok && result.json() || new Error('result not ok'))
            .then(json => json?.entries?.length
                ? entriesSet(json.entries) // happy path
                : new Error(`no entries or fetch didnt return an array. json: ${json}`))
            .catch(err => console.log('fetch error in ViewEntries', err))
    }, [])

    if (status === 'authenticated') {

        return (entries.length > 0 &&
            <div className={styles.container}>
                <h1 id={styles.title}>these Have Been Done..</h1 >
                <ul className={styles.listCont}>
                    {
                        entries
                            .slice(page * 10, page * 10 + 10)
                            .map((e, i) => {
                                // const recencyClass = e.text === session?.recentEntryText && styles.recentEntry || styles.oldEntry;
                                const recencyClass = i === 0 && styles.recentEntry || styles.oldEntry;
                                return (
                                    <li key={i} className={recencyClass && recencyClass}>
                                        <p>
                                            {e.text} | {e.updatedAt.match(/[\d]{4}-[\d]{2}-[\d]{2}/)}
                                        </p>
                                    </li>
                                )
                            })
                    }
                </ul>
                <ListPageButtons entries={entries} pageSet={pageSet} />
                <SignInOrOut />
            </div >
        )
    } else if(status === 'unauthenticated') {
        return (
            <div>
                <NotSignedIn />
                <SignInOrOut />
            </div>
        )
    }
}