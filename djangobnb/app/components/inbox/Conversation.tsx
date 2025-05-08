'use client'

import styles from './conversation.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

//types
import { ConversationType } from '@/app/inbox/page';
import CustomButton from '@/app/components/forms/CustomButton';

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

export default function Conversation({ conversation, userId }: ConversationProps) {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id !== userId);
  return (
    <div className={styles.container}>
      <p className={styles.personName}>
        {otherUser?.name ? otherUser.name : 'anonymous'}
      </p>

      <Link
        href={`/inbox/${conversation.id}`}  
      >
        <p className={styles.bnbtext}>Go to conversations</p>
      </Link>
    </div>
  )
}