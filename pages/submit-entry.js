import { useState } from "react";

export default function SubmitEntry() {
    const [entryText, entryTextSet] = useState('');

    async function handleSubmit(evt) {
        evt.preventDefault();

        const url = '/api/make-entry'
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