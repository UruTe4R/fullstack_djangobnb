import styles from './landlord.module.css';
import Image from 'next/image';

import ContactButton from '@/app/components/ContactButton';
import PropertyList from '@/app/components/properties/PropertyList';

export default function LandlordDetailPage() {
  return (
    <main className={styles.main}>
      <div className={styles.gridContainer}>
        <aside className={styles.aside}>
          <div className={styles.profileContainer}>
            <Image 
              src="/images/profile_pic_1.jpg"
              alt="profile pic"
              height={200}
              width={200}
              className={styles.profileImage}
              />
              
              <h1 className={styles.name}>Name</h1>

              <ContactButton />
            
          </div>
        </aside>

        <div className={styles.content}>
          <div className={styles.propertylistContainer}>
            <PropertyList />
          </div>
        </div>

      </div>
    </main>
  )
}