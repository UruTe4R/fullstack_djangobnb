import styles from './contactbutton.module.css';

interface ContactButtonProps {
  onClick: () => void;
}

export default function ContactButton({ onClick }: ContactButtonProps) {
  return (
   <div 
   className={styles.button}
   onClick={onClick}
   >
    Contact
   </div>
  )
}