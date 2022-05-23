import styles from '../styles/ListPageButtons.module.css';

export default function ListPageButtons({ entries, pageSet }) {

    const howManyButtons = Math.ceil(entries.length / 10)
    const numberedbuttons = new Array(howManyButtons).fill(0);

    return (
        numberedbuttons.length <= 1 && <p id={styles.onlyPage}>That&apos;s all</p>
        || <ul className={styles.listCont}>
            {entries.length > 10 && <li className={styles.relativeButton} key={'prev'}><button onClick={() => { pageSet(p => Math.max(p - 1, 0)) }}>Prev</button></li>}
            {numberedbuttons.map((_, i) => <li className={styles.absoluteButton} key={i}><button onClick={() => { pageSet(i) }}>{i + 1}</button></li>)}
            {entries.length > 10 && <li className={styles.relativeButton} key={'next'}><button onClick={() => { pageSet(p => Math.min(p + 1, howManyButtons - 1)) }}>Next</button></li>}
        </ul>
    );
}