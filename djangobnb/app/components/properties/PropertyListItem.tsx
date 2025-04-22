import styles from './properties.module.css';
import Image from 'next/image';

export default function PropertyListItem() {
  return (
    <div className={styles.propertyList}>
      <div className={styles.item}>
        <Image
          fill
          sizes={'(max-width: 975px) 33vw, (max-width: 1500px) 20vw, 20vw'}
          src="/images/beach_1.jpg"
          alt="image of beach house"
          className={styles.image}/>
      </div>

      <div className={styles.mt_2}>
        <p className={styles.text}>Property name</p>
      </div>

      <div className={styles.mt_2}>
        <p className={styles.text_sm}>
          <strong>$200</strong> per night
        </p>
      </div>

    </div>
  )
}