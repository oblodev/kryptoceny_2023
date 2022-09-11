import styles from "../styles/Nav.module.scss";
import Image from "next/image";
import logo from "../public/images/logo_kryptokurs.png";
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
          <p>BETA</p>
        </div>
        <div className={styles.navList}>
          <ul>
            <li>
              <Link href="/">KryptoKurs</Link>
            </li>
            <li>
              <Link href="#">Kurs Kryptowalut</Link>
            </li>
            <li>
              <Link href="/kryptokursy">Informacje</Link>
            </li>
            <li>
              <Link href="#">O nas</Link>
            </li>
            <li>
              <Link href="#">Kontakt</Link>
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
                  <Link href="/">
                    <a onClick={() => setToggleSide(false)}>KryptoKurs</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a onClick={() => setToggleSide(false)}>Kryptowaluty</a>
                  </Link>
                </li>
                <li>
                  <Link href="/kryptokursy">
                    <a onClick={() => setToggleSide(false)}>
                      Kursy Kryptowalut
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={() => setToggleSide(false)}>
                    O nas
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a onClick={() => setToggleSide(false)}>Kontakt</a>
                  </Link>
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
