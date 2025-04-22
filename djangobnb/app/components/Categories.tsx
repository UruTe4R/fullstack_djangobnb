import styles from './categories.module.css';
import Image from 'next/image';

export default function Categories() {
  return (
    <div className={styles.categories_container}>
      <div className={styles.category}>
        <Image 
        src="/images/icn_category_beach.jpeg"
        alt="Category - Beach"
        height={20}
        width={20}/>

        <span className={styles.span}>Beach</span>
      </div>

      <div className={styles.category}>
        <Image 
        src="/images/icn_category_beach.jpeg"
        alt="Category - Beach"
        height={20}
        width={20}/>

        <span className={styles.span}>Villas</span>
      </div>
      <div className={styles.category}>
        <Image 
        src="/images/icn_category_beach.jpeg"
        alt="Category - Beach"
        height={20}
        width={20}/>

        <span className={styles.span}>Cabins</span>
      </div>

      <div className={styles.category}>
        <Image 
        src="/images/icn_category_beach.jpeg"
        alt="Category - Beach"
        height={20}
        width={20}/>

        <span className={styles.span}>Tiny homes</span>
      </div>

    </div>
  )
}