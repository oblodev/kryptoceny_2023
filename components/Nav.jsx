import styles from "../styles/Nav.module.scss";
import Image from "next/image";
import logo from "../public/images/logo_kryptokurs.png";
import Link from "next/link";

function Nav() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Image src={logo} />
        </div>
        <div className={styles.navList}>
          <ul>
            <li>
              <Link href="/">KryptoKurs</Link>
            </li>
            <li>
              <Link href="/kryptowaluty">Kryptowaluty</Link>
            </li>
            <li>
              <Link href="/o-nas">O nas</Link>
            </li>
            <li>
              <Link href="/kontakt">Kontakt</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
