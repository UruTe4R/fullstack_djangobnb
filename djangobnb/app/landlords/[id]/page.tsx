import styles from './landlord.module.css';
import Image from 'next/image';

import ContactButton from '@/app/components/ContactButton';
import PropertyList from '@/app/components/properties/PropertyList';
import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';

export default async function LandlordDetailPage({ params }: {params: {id: string}}) {
  const { id } = await params;
  const landlord = await apiService.get(`/api/auth/${id}`);
  const userId = await getUserId();
  return (
    <main className={styles.main}>
      <div className={styles.gridContainer}>
        <aside className={styles.aside}>
          <div className={styles.profileContainer}>
            <Image 
              src={landlord.avatar_url || "/images/profile_pic_1.jpg"}
              alt="profile pic"
              height={200}
              width={200}
              className={styles.profileImage}
              />
              
              <h1 className={styles.name}>{landlord.name || "anonymous"}</h1>

              {userId !== id && <ContactButton />}
              
            
          </div>
        </aside>

        <div className={styles.content}>
          <div className={styles.propertylistContainer}>
            <PropertyList 
              landlord_id={id}
            />
          </div>
        </div>

      </div>
    </main>
  )
}