import styles from './navbar.module.css';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function SearchFilters() {
  return (
    <div className={styles.searchfilter}>
      <div className={styles.desktop}>
        <div className={styles.location}>
          <div className={styles.where}>
            <p className={styles.small_text}>Where</p>
            <p>Wanted location</p>
          </div>
          <div className={styles.where_small}>
            <p className={styles.small_text}>Check in</p>
            <p>Add dates</p>
          </div>
          <div className={styles.where_small}>
            <p className={styles.small_text}>Check out</p>
            <p>Add dates</p>
          </div>
          <div className={styles.where_small}>
            <p className={styles.small_text}>Who</p>
            <p>Add guests</p>
          </div>
        </div>
      </div>
      <div className={styles.p_2}>
        <div className={styles.p_4}>
        <svg viewBox="0 0 32 32" style={{display:'block',
          fill:'none',
          height:'16px',
          width:'16px',
          stroke:'currentColor',
          strokeWidth:4,
          overflow:'visible'
          }} 
          aria-hidden="true" role="presentation" focusable="false">
            <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
          </svg>

        </div>
      </div>
    </div>
  )
}