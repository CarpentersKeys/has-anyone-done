import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Temporal } from '@js-temporal/polyfill';

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
  console.log('datemade', dateMadeCurrent);
  const updateDate = dateMadeCurrent.add({ days: 1, minutes: 20 })
  const secondsFromNow = Math.ceil(Temporal.Now.zonedDateTimeISO().until(updateDate).total('seconds'));
  return {
    props: {
      todaysEntry,
    },
    revalidate: secondsFromNow,
  }
}

export default function Home({ todaysEntry }) {
  const entryText = todaysEntry?.newEntry?.text || todaysEntry?.lastEntry?.text;

  return (
    <div className={styles.container}>
      <Head>
        <title>Has Anyone Done?</title>
        <meta name="description" content="Just wondering" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.mainBg}>
          <h1 className={styles.title}>
            has Anyone Done
          </h1>

          <p className={styles.entry}>
            {entryText}..?
          </p>
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
