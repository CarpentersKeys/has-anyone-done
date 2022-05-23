export default function ListPageButtons({ entries, pageSet }) {

    const howManyButtons = Math.ceil(entries.length / 10)
    const numberedbuttons = new Array(howManyButtons).fill(0);

    return (
        <ul>
            {entries.length > 10 && <li key={'prev'}><button onClick={() => { pageSet(p => Math.max(p - 1, 0)) }}>Prev</button></li>}
            {numberedbuttons.map((_, i) => <li key={i}><button onClick={() => { pageSet(i) }}>{i + 1}</button></li>)}
            {entries.length > 10 && <li key={'next'}><button onClick={() => { pageSet(p => Math.min(p + 1, howManyButtons -1)) }}>Next</button></li>}
        </ul>
    );
}