import styles from "../styles/Header.module.scss";
import { motion } from "framer-motion";

function Header() {
  return (
    <header className={styles.container} aria-label="Header Section">
      <motion.div
        className={styles.wrapper}
        whileInView={{ y: [40, 0], opacity: [0, 1] }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }} // Ensure the animation plays only once
      >
        <h1>KryptoCeny.pl - Aktualne kursy kryptowalut</h1>
      </motion.div>
    </header>
  );
}

export default Header;

