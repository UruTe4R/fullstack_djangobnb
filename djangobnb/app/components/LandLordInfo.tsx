'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './landlordinfo.module.css';
import { useRouter } from 'next/navigation';


import apiService from '@/app/services/apiService';
import { PropertyType } from '@/app/components/properties/PropertyList';
import ContactButton from '@/app/components/ContactButton';

type landlordType = {
  id: string;
  name: string;
  avatar_url: string;
}

interface LandlordInfoProps {
  landlord: landlordType;
  property: PropertyType;
  userId: string | null;
}

export default function LandlordInfo({ landlord, property, userId }: LandlordInfoProps) {
  const router = useRouter();
  async function handleClick() {
    console.log('contact button clicked');
    async function fetchToCreateConversation() {
      
      const response = await apiService.postWithCredentials(`/api/chat/create_conversation/${landlord.id}/?property_id=${property.id}`)

      if (response.data) {
        console.log('Conversation created', response.data);
        return response.data.id
      } else {
        console.log('Conversation creation failed', response.detail);
        return null
      }

    }
    const conversation_id = await fetchToCreateConversation();
    if (conversation_id) {
      router.push(`/inbox/${conversation_id}`)
    }
  }
  return (
    <div className={styles.landlordContainer}>
      <div className={styles.landlordContainerLeft}>
        <Link href={`/landlords/${landlord.id}`} className={styles.landlordContainer}>
          <Image
            src={landlord.avatar_url || '/images/profile_pic_1.jpg'}
            alt="Profile Picture"
            width={50}
            height={50}
            className={styles.profileImage}
          />
          <strong>{landlord.name ?? 'anonymous'}</strong>
        </Link>
        <p>is your host</p>
      </div>
      {userId !== landlord.id && <ContactButton onClick={handleClick}/>}
    </div>
  );
}
