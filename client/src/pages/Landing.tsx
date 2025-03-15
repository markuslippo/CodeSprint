import { Link } from "react-router-dom";
import Button from "../components/Button.tsx";
import styles from "../styles/Landing.module.css";

function Landing() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Learn to Write Code, But Faster</h1>
      <p>Now with support for multiple languages</p>
      <nav className={styles.buttonGroup}>
        <Link to="/login"><Button text="Login" variant="primary" /></Link>
        <Link to="/register"><Button text="Register" variant="secondary" /></Link>
      </nav>
    </div>
  );
}

export default Landing;
