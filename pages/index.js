import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {

  const urlResp = await fetch('http://localhost:3000/api/todays-entry');
  const todaysEntry = await urlResp.json();

  return {
    props: {
      todaysEntry,
    },
    revalidate: 60 * 60 * 24,
  }
}

export default function Home({ todaysEntry }) {


  return (
    <div className={styles.container}>
      <Head>
        <title>Has Anyone Done?</title>
        <meta name="description" content="Just wondering" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          has Anyone Done
        </h1>

        <p className={styles.description}>
          {todaysEntry.text}
        </p>

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
