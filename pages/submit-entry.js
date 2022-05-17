import { useState } from "react";
import useSWR from "swr";

const url = 'http://localhost:3000/api/make-entry'
const reqOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        text: entryText
    })
}

const fetcher = (...args) => {
    fetch(url, reqOptions)
    .then(resp => resp.json)
    .then 
}

export default function SubmitEntry() {
    const [entryText, entryTextSet] = useState('');

    const { data, error } = useSWR();
    async function handleSubmit(evt) {
        evt.preventDefault();


        console.log('fetch started');
        console.log(json)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button
                    type='submit'
                    value='has Anyone Done..'
                />
                <input
                    type="text"
                    onChange={(evt) => { entryTextSet(evt.target.value) }}
                    value={entryText}
                />
            </form>
        </div >
    )
}