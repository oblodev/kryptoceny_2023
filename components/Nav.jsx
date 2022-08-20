import styles from "../styles/Nav.module.scss";
import Image from "next/image";
import logo from "../public/images/logo_kryptokurs.png";

function Nav() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Image src={logo} />
        </div>
        <div className={styles.navList}>
          <ul>
            <li> KryptoKurs</li>
            <li>Kryptowaluty</li>
            <li>O nas</li>
            <li>Kontakt</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
