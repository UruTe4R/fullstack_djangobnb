import styles from './myproperties.module.css';

import PropertyList from '@/app/components/properties/PropertyList'

export default function MyPropertiesPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}> My properties</h1>

      <div className={styles.propertylistContainer}>
        <PropertyList />
      </div>
    </main>
  )
}