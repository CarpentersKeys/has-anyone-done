import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Temporal } from '@js-temporal/polyfill';
import { useState } from 'react';
import TimeUntil from '../Components/TimeUntil';
import getDailyEntry from '../lib/getDailyEntry';
if (!process.env.NEXT_PUBLIC_HOST_URL) { process.env.NEXT_PUBLIC_HOST_URL = process.env.NEXT_PUBLIC_VERCEL_URL; };

export async function getStaticProps() {
  const todaysEntry = await getDailyEntry();
  const entryDateMadeCurrent = todaysEntry.dateMadeCurrent;
  const dateMadeCurrent = Temporal.ZonedDateTime.from(entryDateMadeCurrent)
    .round({
      roundingMode: 'floor',
      smallestUnit: 'day',
    })
  const updateDate = dateMadeCurrent.add({ days: 1, minutes: 1 }) // 1 min buffer to make sure we've ticked over 

  // run on the server so temporal should use the right timezone FUTURE: make this zoning explicit
  const secondsFromNow = Math.max(Math.ceil(Temporal.Now.zonedDateTimeISO().until(updateDate).total('seconds')), 1);

  return {
    props: {
      todaysEntry: JSON.stringify(todaysEntry),
      updateDate: updateDate.toString(),
    },
    revalidate: secondsFromNow,
  }
}

export default function Home({ todaysEntry, updateDate }) {
  const [hover, hoverSet] = useState(false);

  console.log('client NEXT PBLIC URL check',process.env.NEXT_PUBLIC_HOST_URL)
  const entryText = JSON.parse(todaysEntry).text;

  return (
    <div className={styles.container}>
      <Head>
        <title>Has Anyone Done?</title>
        <meta name="description" content="Just wondering" />
      </Head>

      <main className={styles.main}>
        <div
          onMouseEnter={() => hoverSet(true)}
          onMouseLeave={() => hoverSet(false)}
          className={styles.mainBg}
        >
          <div>
            <h1 className={styles.title}>
              has Anyone Done
            </h1>

            {
              !hover &&
              <p className={styles.entry}>
                {entryText}..?
              </p>
            }
            {
              hover &&

              <p id={styles.time}>
                <TimeUntil dateTime={updateDate} />
              </p>
            }
          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
