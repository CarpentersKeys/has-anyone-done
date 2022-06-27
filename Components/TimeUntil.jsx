import { useState, useEffect } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { useRouter } from "next/router";
import styles from '../styles/TimeUntil.module.css';
import formatDigits from "../lib/formatDigits";

export default function TimeUntil({ dateTime }) {
    const [time, timeSet] = useState(null);
    const [displayTime, displayTimeSet] = useState(null);
    const router = useRouter();

    useEffect(() => {

        // run on client so timezone must be explicit
        if (!time) {
            const secondsUntil = Math.ceil(
                Temporal.Now.zonedDateTimeISO('America/Toronto')
                    .until(dateTime)
                    .total('seconds'))

            timeSet(secondsUntil);
        }; // setinitial time

        const timer = setInterval(() => timeSet(prev => prev - 1), 1000);

        return () => clearInterval(timer);
    }, [time, dateTime])

    useEffect(() => {
        if (time instanceof Number && time < 0) { return router.reload() } // refresh page when time's up
    }, [time, router])

    // format time for display since Intl isn't supported yet
    useEffect(() => {
        const balancedTime = Temporal.Duration.from({ seconds: time, })
            .round({ largestUnit: 'hour', smallestUnit: 'second' })
        const formattedSeconds = formatDigits({ value: balancedTime.seconds, numberOfDigits: 2, emptyCharacter: '0' })
        const formattedMinutes = formatDigits({ value: balancedTime.minutes, numberOfDigits: 2, emptyCharacter: '0' })
        const formattedHours = formatDigits({ value: balancedTime.hours, numberOfDigits: 2, emptyCharacter: '0' })

        displayTimeSet(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
    }, [time])

    return (
        <>
            {
                dateTime
                    ? time && <span id={styles.time}>
                        time &apos;till next: {displayTime}
                    </span>
                    : <span id={styles.time}>
                        i&apos;m thinking...
                    </span>

            }
        </>
    )
}