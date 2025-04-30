'use client';

import styles from './navbar.module.css';

import usePropertyModal from '@/app/hooks/usePropertyModal';
import useLoginModal from '@/app/hooks/useLoginModal';

interface AddPropertyButtonProps {
  userId?: string | null;
}

export default function AddPropertyButton({ userId }: AddPropertyButtonProps) {
  const open = usePropertyModal((state) => state.open);
  const openLogin = useLoginModal((state) => state.open);

  const airbnbYourHome = () => {
    if (userId) {
      open();
    } else {
      openLogin();
    }
  }
  return (
    <div
      onClick={airbnbYourHome}
      className={styles.addpropertybutton}
    >
      Djangobnb your home
    </div>
  )
}