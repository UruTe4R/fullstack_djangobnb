'use client'

import styles from '@/app/components/navbar/navbar.module.css';

interface MenuLinkProps {
  label: string;
  onClick?: () => void;
}

export default function MenuLink({ label, onClick }: MenuLinkProps) {
  return (
    <div 
      className={styles.menuLink}
      onClick={onClick}
    >
      {label}
    </div>
  )
}