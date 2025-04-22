import styles from './properties.module.css';

export default function ReservationSidebar() {
  return (
    <aside className={styles.resAside}>
      <h2 className={styles.price}>$200 per night</h2>

      <div className={styles.calenderContainer}>
        <label className={styles.label}>Guests</label>

        <select className={styles.select}>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
        </select>
      </div>

      <div className={styles.button}>Book</div>

      <div className={styles.total}>
        <p>$200 * 4 nights</p>
        <p>$800</p>
      </div>

      <div className={styles.feeSection}>
        <p>Djangobnb fee</p>
        <p>$40</p>
      </div>

      <hr />

      <div className={styles.sum}>
        <p>Total</p>
        <p>$840</p>
      </div>
    </aside>
    
  )
}