import styles from './forms.module.css';

interface CustomButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}

export default function CustomButton({ label, onClick, className, type = "button" }: CustomButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.customButton} ${className || ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
