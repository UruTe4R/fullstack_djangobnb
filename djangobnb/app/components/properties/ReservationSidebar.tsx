'use client'

import styles from './properties.module.css';

import { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import {differenceInDays, eachDayOfInterval } from 'date-fns';

import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

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
  userId: string | null;
  property: Property;
}




export default function ReservationSidebar({ property }: ReservationSidebarProps) {
  const LoginModal = useLoginModal();

  const [ fee, setFee ] = useState<number>(0);
  const [ nights, setNights ] = useState<number>(1);
  const [ totalPrice, setTotalPrice ] = useState<number>(0);
  const [ dateRange, setDateRange ] = useState(initialDateRange);
  const [ minDate, setMinDate ] = useState<Date>(new Date());
  const [ guests, setGuests ] = useState<number>(1);
  const guestsRange = Array.from({length: property.guests}, (_, i) => (i + 1))
  // effect
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && property.price_per_night) {
        const _fee = dayCount * property.price_per_night;
      }
    }
  }, [dateRange])

  return (
    <aside className={styles.resAside}>
      <h2 className={styles.price}>${property.price_per_night} per night</h2>

      <div className={styles.calenderContainer}>
        <label className={styles.label}>Guests</label>

        <select 
          className={styles.select}
          value={guests}
          onChange={e => setGuests(Number(e.target.value))}
          disabled={guestsRange.length === 1}
        >
          {guestsRange.map((n) => {
            return (
              <option key={n} value={n}>{n}</option>
            )
          }) }
        </select>
      </div>

      <div className={styles.button}>Book</div>

      <div className={styles.total}>
        <p>${property.price_per_night} * {nights} nights</p>
        <p>${property.price_per_night * nights}</p>
      </div>

      <div className={styles.feeSection}>
        <p>Djangobnb fee</p>
        <p>${fee}</p>
      </div>

      <hr />

      <div className={styles.sum}>
        <p>Total</p>
        <p>${property.price_per_night * nights + fee}</p>
      </div>
    </aside>
    
  )
}