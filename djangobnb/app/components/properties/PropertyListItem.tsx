import styles from './properties.module.css';
import Image from 'next/image';

import { PropertyType } from "./PropertyList";
import LikeButton from '@/app/components/LikeButton';

interface PropertyProps {
  property: PropertyType;
  like?: (is_liked: boolean) => void;
}

export default function PropertyListItem({ property, like }: PropertyProps) {
  
  return (
    <div className={styles.propertyList}>
      <div className={styles.item}>
        <Image
          fill
          sizes={'(max-width: 975px) 33vw, (max-width: 1500px) 20vw, 20vw'}
          src={property.image_url}
          alt="image of beach house"
          className={styles.image}/>
          
        {like && (
          <LikeButton 
            property_id={property.id}
            is_liked={property.is_liked}
            like={like}
          />
        )}
      </div>

      <div className={styles.mt_2}>
        <p className={styles.text}>{property.title}</p>
      </div>

      <div className={styles.mt_2}>
        <p className={styles.text_sm}>
          <strong>${property.price_per_night}</strong> per night
        </p>
      </div>

    </div>
  )
}