import styles from "../styles/Footer.module.scss";
import Image from "next/image";
import logo from "../public/images/logo_kryptokurs.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Image src={logo} alt="kryptokurs-logo" />
          <p>
            <span>Kryptokurs.pl</span> - Aktualne kursy kryptowalut według
            kapitalizacji rynkowej i najświeższe newsy ze świata kryptowalut.
          </p>
          <div className={styles.icons}>
            <div className={styles.icon}>
              <Link href="https://www.facebook.com">
                <FaFacebookF />
              </Link>
            </div>
            <div className={styles.icon}>
              <Link href="https://www.twitter.com">
                <FaTwitter />
              </Link>
            </div>
            <div className={styles.icon}>
              <Link href="https://www.instagram.com">
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.categories}>
          <h3>Kategorie</h3>
          <ul>
            <li>Bitcoin</li>
            <li>Blockchain</li>
            <li>Inwestycje</li>
            <li>Kryptowaluty</li>
            <li>Poradnik Krypto</li>
          </ul>
        </div>
        <div className={styles.links}>
          <h3>Przydatne</h3>
          <ul>
            <li>O nas</li>
            <li>Regulamin Serwisu</li>
            <li>Inwestycje</li>
            <li>Polityka prywatności</li>
            <li>Kontakt</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
