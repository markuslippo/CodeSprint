import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styles from "./styles/Layout.module.css";

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.content}>
        <Outlet /> {/* Page content goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
