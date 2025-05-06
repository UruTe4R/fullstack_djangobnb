import styles from './propertyPage.module.css';
import Image from 'next/image';
import Link from 'next/link';

import ReservationSidebar from '@/app/components/properties/ReservationSidebar';
import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';

export default async function PropertyDetailPage({ params }: {params: {id: string}}) {
  const { id } = await params
  const property = await apiService.get(`/api/properties/${id}`)
  const landlord = property.landlord
  const userId = await getUserId()
  return (
    <main className={styles.main}>
      <div className={styles.imageContainer}>
        <Image
          fill 
          src={property.image_url}
          className={styles.image}
          alt="Beach house"
        />
      </div>

      <div className={styles.infosGrid}>
        <div className={styles.propertyInfo}>
          <h1 className={styles.title}>{property.title}</h1>
          <span className={styles.guests}>{property.guests} guests - {property.guests} bedrooms - {property.bathrooms} bathroom</span>
          <hr />
          <Link
            href={`/landlords/${property.landlord.id}`}
            className={styles.landlordContainer}
          >
            {landlord.avatar_url ? (
              <Image 
              src={landlord.avatar_url}
              alt="Profile Picture"
              width={50}
              height={50}
              className={styles.profileImage}/>
            ) : (
              <Image 
              src="/images/profile_pic_1.jpg"
              alt="Profile Picture"
              width={50}
              height={50}
              className={styles.profileImage}/>
            )}
            
            
            <p><strong>{landlord.name ?? 'anonymous'}</strong> is your host</p>
          </Link>

          <hr />

          <div className={styles.description}>{property.description}</div>
        </div>

        <ReservationSidebar 
          property={property}
          userId={userId}
        />
        
      </div>
    </main>
  )
}