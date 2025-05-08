'use client'

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import styles from './forms.module.css';
import { useState, useEffect } from 'react';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
  value: Range,
  onChange: (state: RangeKeyDict) => void;
  bookedDates?: Date[];
}
export default function DatePicker({ value, onChange, bookedDates}: DatePickerProps) {
  const [ months, setMonths ] = useState(1);

  useEffect(() => {
    const updateMonths = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setMonths(2);
      } else {
        setMonths(1);
      }
    }

    window.addEventListener('resize', updateMonths);
    updateMonths();

    return () => {
      window.removeEventListener('resize', updateMonths);
    }
  })

  return (
    <DateRange
      className={styles.daterange}
      ranges={[value]}
      onChange={onChange}
      direction='horizontal'
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={bookedDates}
      months={months}
      showMonthAndYearPickers={true}

    />
  
  )
}