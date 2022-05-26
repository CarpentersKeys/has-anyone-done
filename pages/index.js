import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Temporal } from '@js-temporal/polyfill';
import { useState } from 'react';
import TimeUntil from '../Components/TimeUntil';

export async function getStaticProps() {

  const urlResp = await fetch('http://localhost:3000/api/entry');
  // console.log('fetch url resp', urlResp);
  const todaysEntry = await urlResp.json();
  const entryDateMadeCurrent = todaysEntry?.newEntry?.dateMadeCurrent || todaysEntry?.lastEntry?.dateMadeCurrent;
  const dateMadeCurrent = Temporal.ZonedDateTime.from(entryDateMadeCurrent)
    .round({
      roundingMode: 'floor',
      smallestUnit: 'day',
    })
  const updateDate = dateMadeCurrent.add({ days: 1, minutes: 1 }) // 1 min buffer to make sure we've ticked over 

  // run on the server so temporal should use the right timezone FUTURE: make this zoning explicit
  const secondsFromNow = Math.ceil(Temporal.Now.zonedDateTimeISO().until(updateDate).total('seconds'));

  return {
    props: {
      todaysEntry,
      updateDate: updateDate.toString(),
    },
    revalidate: secondsFromNow || 1,
  }
}

export default function Home({ todaysEntry, updateDate }) {
  const [hover, hoverSet] = useState(false);

  const entryText = todaysEntry?.newEntry?.text || todaysEntry?.lastEntry?.text;

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
