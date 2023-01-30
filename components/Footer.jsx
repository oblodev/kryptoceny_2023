import { useState, useEffect } from "react";
import styles from "../styles/Footer.module.scss";
import Image from "next/image";
import logo from "../public/images/KryptoCeny.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { getCategories } from "../services";

function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Image src={logo} alt="kryptokurs-logo" />
          <p>
            <span>KryptoCeny.pl</span> - Aktualne kursy kryptowalut według
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
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.links}>
          <h3>Przydatne</h3>
          <ul>
            <li>
              <Link href="/poradnik/all">Poradnik Krypto</Link>
            </li>
            <li>
              <Link href="/onas">O nas</Link>
            </li>
            <li>
              <Link href="/regulamin">Regulamin Serwisu</Link>
            </li>
            <li>
              <Link href="/politykaprywatnosci">Polityka prywatności</Link>
            </li>
            <li>
              <a href="mailto:hello@kryptokurs.pl">Kontakt</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
