import styles from './conversationpage.module.css';

import ConversationDetail from '@/app/components/inbox/ConversationDetail';

export default function ConversatinPage() {
  return (
    <main className={styles.main}>
      <ConversationDetail />
    </main>
  )
}