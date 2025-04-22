import styles from './forms.module.css';

interface CustomButtonProps {
  label: string;
  style?: object;
  onClick: () => void;
}

export default function CustomButton({ label, onClick, style }: CustomButtonProps) {
  return (
    <div 
    className={styles.customButton}
    onClick={onClick}
    style={style}>
      {label}
    </div>
  )
}