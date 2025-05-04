'use client'

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import styles from './forms.module.css';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
  value: Range,
  onChange: (state: RangeKeyDict) => void;
  bookedDates?: Date[];
}
export default function DatePicker({ value, onChange, bookedDates}: DatePickerProps) {
  return (
    <DateRange
      className={styles.daterange}
      ranges={[value]}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={bookedDates}
    />
  )
}