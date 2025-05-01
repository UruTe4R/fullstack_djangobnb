'use client'

import styles from './properties.module.css';

import { useState } from 'react';


// types
export type Property = {
  id: string;
  price_per_night: number;
  title: string;
  image_url: string;
  guests: number;
  bathrooms: number;
  bedrooms: number;
  description: string;
  landlord: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

interface ReservationSidebarProps {
  property: Property;
}




export default function ReservationSidebar({ property }: ReservationSidebarProps) {
  const [ nights, setNights ] = useState(1);
  const maxGuests = property.guests
  return (
    <aside className={styles.resAside}>
      <h2 className={styles.price}>${property.price_per_night} per night</h2>

      <div className={styles.calenderContainer}>
        <label className={styles.label}>Nights</label>

        <select 
          className={styles.select}
          value={nights}
          onChange={e => setNights(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div className={styles.button}>Book</div>

      <div className={styles.total}>
        <p>${property.price_per_night} * {nights} nights</p>
        <p>${property.price_per_night * nights}</p>
      </div>

      <div className={styles.feeSection}>
        <p>Djangobnb fee</p>
        <p>$40</p>
      </div>

      <hr />

      <div className={styles.sum}>
        <p>Total</p>
        <p>${property.price_per_night * nights + 40}</p>
      </div>
    </aside>
    
  )
}