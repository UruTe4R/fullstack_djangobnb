import styles from './myreservations.module.css';
import Image from 'next/image';


export default function MyReservationsPage() {
  return (
    <main className={styles.main}>
        <h1 className={styles.h1}>My reservations</h1>
        <div className={styles.propertyContainer}>
{/* reservation 1 */}
          <div className={styles.property}>
            <div className={styles.span1}>
              <div className={styles.imageContainer}>
                <Image 
                  fill
                  src="/images/beach_1.jpg"
                  className={styles.image}
                  alt="Beach house"/>
              </div>
            </div>

            <div className={styles.reservationInfoContainer}>
              <div className={styles.reservationInfo}>
                Property name
              </div>

              <p className={styles.p}><strong>Check in date:</strong>18/5/2025</p>
              <p className={styles.p}><strong>Check out date:</strong>20/5/2025</p>

              <p className={styles.p}><strong>Number of nights:</strong>2</p>
              <p className={styles.p}><strong>Total prices:</strong>$200</p>

              <div className={styles.button}>Go to property</div>   
            </div>
          </div>


{/* reservation 2 */}
          <div className={styles.property}>
            <div className={styles.span1}>
              <div className={styles.imageContainer}>
                <Image 
                  fill
                  src="/images/beach_1.jpg"
                  className={styles.image}
                  alt="Beach house"/>
              </div>
            </div>

            <div className={styles.reservationInfoContainer}>
              <div className={styles.reservationInfo}>
                Property name
              </div>

              <p className={styles.p}><strong>Check in date:</strong>18/5/2025</p>
              <p className={styles.p}><strong>Check out date:</strong>20/5/2025</p>

              <p className={styles.p}><strong>Number of nights:</strong>2</p>
              <p className={styles.p}><strong>Total prices:</strong>$200</p>

              <div className={styles.button}>Go to property</div>   
            </div>
          </div>

{/* reservation 3 */}
          <div className={styles.property}>
            <div className={styles.span1}>
              <div className={styles.imageContainer}>
                <Image 
                  fill
                  src="/images/beach_1.jpg"
                  className={styles.image}
                  alt="Beach house"/>
              </div>
            </div>

            <div className={styles.reservationInfoContainer}>
              <div className={styles.reservationInfo}>
                Property name
              </div>

              <p className={styles.p}><strong>Check in date:</strong>18/5/2025</p>
              <p className={styles.p}><strong>Check out date:</strong>20/5/2025</p>

              <p className={styles.p}><strong>Number of nights:</strong>2</p>
              <p className={styles.p}><strong>Total prices:</strong>$200</p>

              <div className={styles.button}>Go to property</div>   
            </div>
          </div>
        </div>
    </main>
  )
}