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
        <h1>KryptoCeny - Aktualne kursy kryptowalut</h1>

        <p>Witamy! Portal obecnie jest w wersji Beta.</p>
      </motion.div>
    </div>
  );
}

export default Header;
