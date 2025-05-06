import styles from './myproperties.module.css';

import PropertyList from '@/app/components/properties/PropertyList'
import { getUserId } from '@/app/lib/actions';

export default async function MyPropertiesPage() {
  const userId = await getUserId();
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}> My properties</h1>

      <div className={styles.propertylistContainer}>
        <PropertyList 
          landlord_id={userId}
        />
      </div>
    </main>
  )
}