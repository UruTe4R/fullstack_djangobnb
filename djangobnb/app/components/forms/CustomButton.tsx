import styles from './forms.module.css';

interface CustomButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function CustomButton({ label, onClick, style, type = "button" }: CustomButtonProps) {
  return (
    <button
      type={type}
      className={styles.customButton}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
}
