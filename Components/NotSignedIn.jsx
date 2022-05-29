import styles from '../styles/NotSignedIn.module.css';

export default function NotSignedIn() {

    return (
        <div className={styles.container}>
            <h3 className={styles.message}>
                Not signed in
            </h3>
            <p className={styles.message}>btw only I can sign in</p>
        </div>
    )
}