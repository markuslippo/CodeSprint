import React from 'react';
import styles from "../styles/Button.module.css";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = "primary" }) => {
    return (
      <button
        className={`${styles.button} ${variant === "primary" ? styles.primary : styles.secondary}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };
  
  export default Button;