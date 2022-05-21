import { useState } from "react";

export default function TimedMessage({ jsx, time }) {
    const [content, contentSet] = useState('');

    setTimeout(() => {
        contentSet(jsx);
    }, time)

    return content
}