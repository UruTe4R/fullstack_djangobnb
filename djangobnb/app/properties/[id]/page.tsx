import styles from './propertyPage.module.css';
import Image from 'next/image';

import ReservationSidebar from '@/app/components/properties/ReservationSidebar';

export default async function PropertyDetailPage() {
  return (
    <main className={styles.main}>
      <div className={styles.imageContainer}>
        <Image
          fill 
          src="/images/beach_1.jpg"
          className={styles.image}
          alt="Beach house"
        />
      </div>

      <div className={styles.infosGrid}>
        <div className={styles.propertyInfo}>
          <h1 className={styles.title}>Property Name</h1>
          <span className={styles.guests}>4 guests - 2 bedrooms - 1 bathroom</span>
          <hr />
          <div className={styles.landlordContainer}>
            <Image 
              src="/images/profile_pic_1.jpg"
              alt="Profile Picture"
              width={50}
              height={50}
              className={styles.profileImage}/>
            
            <p><strong>John Doe</strong> is your host</p>
          </div>

          <hr />

          <div className={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque veritatis quo non quaerat. Cumque, nobis vitae! Dolorem et distinctio veniam sint ratione placeat nemo aspernatur, amet libero. Possimus, error aliquam?</div>
        </div>

        <ReservationSidebar />
        
      </div>
    </main>
  )
}