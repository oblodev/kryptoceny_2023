import styles from "../styles/Header.module.scss";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>KryptoKurs - Aktualne kursy kryptowalut</h1>
      </div>
    </div>
  );
}

export default Header;
