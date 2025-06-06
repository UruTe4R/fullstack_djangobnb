'use client'

import styles from './properties.module.css';

import { useState, useEffect } from 'react';
import { Range, RangeKeyDict } from 'react-date-range';
import {differenceInDays, eachDayOfInterval, format } from 'date-fns';
import { useRouter } from 'next/navigation';

import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';
import useTransactionFee from '@/app/hooks/useTransactionFee';
import PropertyList from './PropertyList';
import DatePicker from '@/app/components/forms/DatePicker';

const initialDateRange: Range = {
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




export default function ReservationSidebar({ property, userId }: ReservationSidebarProps) {
  const router = useRouter();

  const openLogin = useLoginModal((state) => state.open);
  const fetchFees = useTransactionFee((state) => state.fetchFees);
  const transactionFee = useTransactionFee((state) => state.transactionFee);

  const [ fee, setFee ] = useState<number>(0);
  const [ nights, setNights ] = useState<number>(1);
  const [ totalPrice, setTotalPrice ] = useState<number>(0);
  const [ dateRange, setDateRange ] = useState(initialDateRange);
  const [ minDate, setMinDate ] = useState<Date>(new Date());
  const [ bookedDates, setBookedDates ] = useState<Date[]>([]);
  const [ guests, setGuests ] = useState<number>(1);
  const guestsRange = Array.from({length: property.guests}, (_, i) => (i + 1))

  // get fees effect
  useEffect(() => {
    async function fetchTransactionFee() {
      try {
        await fetchFees();
      }
      catch (error) {
        console.error('Error fetching transaction fee:', error);
      }
    }

    async function getReservations() {
      try {
        const response = await apiService.get(`/api/properties/${property.id}/reservations/`)
        
        const reservations = response.data;

        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
          const range = eachDayOfInterval({
            start: new Date(reservation.checkin_date),
            end: new Date(reservation.checkout_date)
          });

          dates = [...dates, ...range];
        })

        setBookedDates(dates)

      }
      catch (error) {
        console.error('Error fetching reservations:', error);
      }
    }
    fetchTransactionFee();
    getReservations()
  }, []);

  // calculate fees on date range chang effect
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && property.price_per_night) {
        const _feeAmount = (dayCount * property.price_per_night) * (transactionFee / 100);
        console.log(_feeAmount)

        setFee(_feeAmount);
        setNights(dayCount);
        setTotalPrice((dayCount * property.price_per_night) + _feeAmount);
      } else {
        setNights(1);
        setFee(property.price_per_night * (transactionFee / 100));
        setTotalPrice(property.price_per_night);
      } 
    }
  }, [dateRange, transactionFee])

  function handleDateChange(state: RangeKeyDict) {
    const selection = state.selection
    console.log(selection)
    const newStartDate = new Date(selection.startDate || new Date());
    const newEndDate = new Date(selection.endDate || new Date());

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() +1)
    }
    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate
    })
  }

  async function performbooking() {
    if (!userId) {
      openLogin()
    }

    const formData = new FormData();
    formData.append('guests', guests.toString());
    if (dateRange.startDate && dateRange.endDate) { 
      formData.append('checkin_date', format(dateRange.startDate, 'yyyy-MM-dd'))
      formData.append('checkout_date', format(dateRange.endDate, 'yyyy-MM-dd'))
    }
    
    const response = await apiService.postWithCredentials(`/api/properties/${property.id}/book/`, formData);

    if (response.success) {
      console.log('Booking successed', response.data);
      router.push('/myreservations')
    } else {
      console.log('Booking failed', response.error);
    }
  }
  

  return (
    <aside className={styles.resAside}>
      <h2 className={styles.price}>${property.price_per_night} per night</h2>

      <DatePicker 
        value={dateRange}
        onChange={handleDateChange}
        bookedDates={bookedDates}
      />

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

      <div 
        className={styles.button}
        onClick={performbooking}
      >
        Book</div>

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
        <p>${totalPrice}</p>
      </div>
    </aside>
    
  )
}