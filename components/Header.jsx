import styles from "../styles/Header.module.scss";
import { motion } from "framer-motion";

function Header() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.wrapper}
        whileInView={{ y: [40, 0], opacity: [0, 1] }}
        transition={{ duration: 0.55 }}
      >
        <h1>KryptoCeny.pl - Aktualne kursy kryptowalut</h1>
      </motion.div>
    </div>
  );
}

export default Header;
