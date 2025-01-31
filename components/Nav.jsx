import styles from "../styles/Nav.module.scss";
import Image from "next/image";
import logo from "../public/images/KryptoCeny.png";
import Link from "next/link";
import { VscMenu } from "react-icons/vsc";
import { HiX } from "react-icons/hi";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

function Nav() {
  const [toggleSide, setToggleSide] = useState(false);

  const { changeMode, mode } = useTheme();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} alt="kryptokurs-logo" />
          </Link>
         
        </div>
        <div className={styles.navList}>
          <ul>
            <li>
              <Link href="/kurskryptowalut">Kurs Kryptowalut</Link>
            </li>
            <li>
              <div className={styles.dropdown}>
                <Link href="/kryptowaluty">Kryptowaluty</Link>
                <div className={styles.dropdownContent}>
                  <Link href="/kryptokursy">Informacje</Link>
                  <Link href="/kryptowaluty">Kryptowaluty</Link>
                </div>
              </div>
            </li>
            <li>
              <Link href="onas">O nas</Link>
            </li>
            <li>
              <a href="mailto:hello@netcreators.io">Kontakt</a>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar}>
          <VscMenu
            onClick={() => setToggleSide(true)}
            className={styles.sideIcon}
          />
          {toggleSide && (
            <motion.div
              whileInView={{ x: [300, 0], opacity: [0, 1] }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <HiX className={styles.x} onClick={() => setToggleSide(false)} />
              <ul>
                <li>
                  <Link href="/kurskryptowalut">
                    <a onClick={() => setToggleSide(false)}>Kurs Kryptowalut</a>
                  </Link>
                </li>
                <li>
                  <Link href="/kryptokursy">
                    <a onClick={() => setToggleSide(false)}>Informacje</a>
                  </Link>
                </li>
                <li>
                  <Link href="/onas" onClick={() => setToggleSide(false)}>
                    O nas
                  </Link>
                </li>
                <li>
                  <a href="mailto:hello@kryptokurs.pl">
                    <a onClick={() => setToggleSide(false)}>Kontakt</a>
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
