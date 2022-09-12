import styles from "../styles/kursy.module.scss";
import KursyKryptowalut from "../components/KursyKryptowalut";

function kursy() {
  return (
    <div className={styles.container}>
      <KursyKryptowalut />
    </div>
  );
}

export default kursy;
