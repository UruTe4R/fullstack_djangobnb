import styles from './inbox.module.css';

import PropertyList from '@/app/components/properties/PropertyList';
import Conversation from '@/app/components/inbox/Conversation';

export default function InboxPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Inbox</h1>

      <Conversation />
      <Conversation />
      <Conversation />
    </main>
  )
}