import styles from './inbox.module.css';
import { useEffect, useState } from 'react';

import PropertyList from '@/app/components/properties/PropertyList';
import Conversation from '@/app/components/inbox/Conversation';
import apiService from '@/app/services/apiService';
import { getUserId } from '../lib/actions';

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
}

export type ConversationType = {
  id: string;
  users: UserType[];
}

export default async function InboxPage() {
  const userId = await getUserId();

  const conversations = await apiService.getWithCredentials('/api/chat/')


  if (!userId) {
    return (
      <main className={styles.mainNotAuthed}>
        <h1 className={styles.h1}>You must be logged in to see your inboxes</h1>
      </main>
    )
  }
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Inbox</h1>

      {conversations.map((conversation: ConversationType) => {
        return (
          <Conversation 
            key={conversation.id}
            userId={userId}
            conversation={conversation}
          />
        )
      })}
    </main>
  )
}