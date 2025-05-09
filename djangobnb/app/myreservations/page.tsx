import styles from './myreservations.module.css';
import Image from 'next/image';

import apiService from '@/app/services/apiService';
import Link from 'next/link';
import UnAuthorized from '../auth/UnAuthorized';


export default async function MyReservationsPage() {

  const reservations = await apiService.getWithCredentials('/api/auth/myreservations/');

  if (reservations === null) {
    return (
      <UnAuthorized />
    )
  }
  return (
    <main className={styles.main}>
        <h1 className={styles.h1}>My reservations</h1>
        <div className={styles.propertyContainer}>
          {reservations.map((reservation: any) => {
            return (
              <div 
                className={styles.property}
                key={reservation.id}
              >
                <div className={styles.span1}>
                  <div className={styles.imageContainer}>
                    <Image 
                      fill
                      src={reservation.property_obj.image_url}
                      sizes={'(max-width: 975px) 33vw, (max-width: 1500px) 20vw, 20vw'}
                      className={styles.image}
                      alt="Beach house"/>
                  </div>
                </div>

                <div className={styles.reservationInfoContainer}>
                  <div className={styles.reservationInfo}>
                    {reservation.property_obj.title}
                  </div>

                  <p className={styles.p}><strong>Check in date:</strong>{reservation.checkin_date}</p>
                  <p className={styles.p}><strong>Check out date:</strong>{reservation.checkout_date}</p>

                  <p className={styles.p}><strong>Number of nights:</strong>{reservation.number_of_nights}</p>
                  <p className={styles.p}><strong>Total prices:</strong>${reservation.total_price}</p>
                  <Link 
                    href={`/properties/${reservation.property_obj.id}`}
                  >
                    <div className={styles.button}>Go to property</div>   
                  </Link>
                </div>
              </div>
            )
          })}
          

        </div>
    </main>
  )
}