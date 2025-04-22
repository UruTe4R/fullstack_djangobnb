import styles from './conversation.module.css';

export default function Conversation() {
  return (
    <div className={styles.container}>
      <p className={styles.personName}>Jogn Doe</p>

      <p className={styles.bnbtext}>Go to conversations</p>
    </div>
  )
}