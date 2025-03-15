import React from 'react';
import { Link } from "react-router-dom";
import Button from "../components/Button"
import styles from "../styles/Navbar.module.css";

interface NavbarProps {
    isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false }) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navWrapper}>

                {/* Left Side: Logo + Home/Profile */}
                <div className={styles.navLeft}>
                    <div className={styles.logo}>CodeSprint</div>
                    
                    {/* Navigation links only visible when authenticated */}
                    {isAuthenticated && (
                        <ul className={styles.navLinks}>
                            <li><Link to="/"><Button text="Home" variant="secondary" /></Link></li>
                            <li><Link to="/profile"><Button text="Profile" variant="secondary" /></Link></li>
                        </ul>
                    )}
                </div>
                
                {/* Right Side: Conditional Auth Links */}
                <div className={styles.navRight}>
                    <ul className={styles.navLinks}>
                        {isAuthenticated ? (
                            <li><Link to="/logout"><Button text="Logout" variant="secondary" /></Link></li>
                        ) : (
                            <>
                                <li><Link to="/login"><Button text="Login" variant="secondary" /></Link></li>
                                <li><Link to="/register"><Button text="Register" variant="secondary" /></Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;