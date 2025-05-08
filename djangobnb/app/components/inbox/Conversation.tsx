import styles from './conversation.module.css';
import { useRouter } from 'next/navigation';

//types
import { ConversationType } from '@/app/inbox/page';
import CustomButton from '@/app/components/forms/CustomButton';

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

export default function Conversation({ conversation, userId }: ConversationProps) {
  return (
    <div className={styles.container}>
      <p className={styles.personName}>John Doe</p>

      <p className={styles.bnbtext}>Go to conversations</p>
    </div>
  )
}