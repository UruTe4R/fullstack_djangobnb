import styles from './likedproperties.module.css';

import PropertyList from '../components/properties/PropertyList';
import { getUserId } from '../lib/actions';

export default async function LikedPropertiesPage() {
  const userId = await getUserId();
  
  // if not logged in show 
  if (!userId) {
    return (
      <main className={styles.main}>
        <h1 className={styles.h1}>You must be logged in to see your liked properties</h1>
      </main>
    )
  }
  return (
    <main className={styles.main2}>
        <h1 className={styles.h1}>Liked properties</h1>

        <div className={styles.propertylistContainer}>
          <PropertyList 
            userId={userId}
            liked={true}
          />
        </div>
      </main>
  )
}