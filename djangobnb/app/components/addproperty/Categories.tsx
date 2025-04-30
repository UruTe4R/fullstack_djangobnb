import styles from './categories.module.css';
import Image from 'next/image';


interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}

export default function Categories({ dataCategory, setCategory}: CategoriesProps) {
  return(
    <>
      <div className={styles.flexContainer}>
        <div className={`${styles.category} ${dataCategory === 'Beach' && styles.active}`}
          onClick={() => setCategory('Beach')}
        >
          <Image 
          src="/images/icn_category_beach.jpeg"
          alt="Category - Beach"
          height={20}
          width={20}/>

          <span className={styles.span}>Beach</span>
        </div>

        <div className={`${styles.category} ${dataCategory === 'Villas' && styles.active}`}
          onClick={() => setCategory('Villas')}
        >
          <Image 
          src="/images/icn_category_beach.jpeg"
          alt="Category - Beach"
          height={20}
          width={20}/>

          <span className={styles.span}>Villas</span>
        </div>
        <div className={`${styles.category} ${dataCategory === 'Cabins' && styles.active}`}
          onClick={() => setCategory('Cabins')}>
          <Image 
          src="/images/icn_category_beach.jpeg"
          alt="Category - Beach"
          height={20}
          width={20}/>

          <span className={styles.span}>Cabins</span>
        </div>

        <div className={`${styles.category} ${dataCategory === 'Tiny homes' && styles.active}`}
          onClick={() => setCategory('Tiny homes')}
        >
          <Image 
          src="/images/icn_category_beach.jpeg"
          alt="Category - Beach"
          height={20}
          width={20}/>

          <span className={styles.span}>Tiny homes</span>
        </div>
      </div>
    </>
  )
}