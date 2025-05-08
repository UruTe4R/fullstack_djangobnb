import styles from './propertyPage.module.css';
import Image from 'next/image';
import Link from 'next/link';

import ReservationSidebar from '@/app/components/properties/ReservationSidebar';
import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';
import LandlordInfo from '@/app/components/LandLordInfo';


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

          <LandlordInfo
            landlord={landlord}
            property={property}
          />

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