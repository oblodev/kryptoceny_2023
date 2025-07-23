import { useState } from "react";
import styles from "../styles/Nav.module.scss";
import Image from "next/image";
import logo from "../public/images/KryptoCeny.png";
import Link from "next/link";
import { VscMenu } from "react-icons/vsc";
import { HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

// Updated navLinks structure to support dropdowns
const navLinks = [
  { href: "/kurskryptowalut", label: "Kurs Kryptowalut" },
  {
    label: "Informacje", // Parent item
    subLinks: [ // Child items
      { href: "/kryptokursy", label: "O Kursach" },
      { href: "/kryptowaluty", label: "O Kryptowalutach" },
    ],
  },
  { href: "/onas", label: "O nas" },
  { href: "mailto:kontakt@kryptoceny.pl", label: "Kontakt", isExternal: true },
];

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>
          <Image src={logo} alt="KryptoCeny.pl logo" width={180} height={40} />
        </a>
      </Link>

      {/* --- Desktop Navigation --- */}
      <ul className={styles.navList}>
        {navLinks.map((link) => (
          <li key={link.label} className={link.subLinks ? styles.dropdown : ""}>
            {link.subLinks ? (
              <>
                <span>
                  {link.label} <FaChevronDown className={styles.chevron} />
                </span>
                <ul className={styles.dropdownContent}>
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.href}>
                      <Link href={subLink.href}>{subLink.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : link.isExternal ? (
              <a href={link.href}>{link.label}</a>
            ) : (
              <Link href={link.href}>{link.label}</Link>
            )}
          </li>
        ))}
      </ul>

      {/* --- Mobile Menu --- */}
      <button
        className={styles.menuToggle}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <HiX /> : <VscMenu />}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          >
            <ul>
              {/* Flatten the links for the mobile menu */}
              {navLinks.flatMap((link) =>
                link.subLinks ? link.subLinks : link
              ).map((item) => (
                <li key={item.href || item.label}>
                  {item.isExternal ? (
                    <a href={item.href} onClick={handleLinkClick}>{item.label}</a>
                  ) : (
                    <Link href={item.href}>
                      <a onClick={handleLinkClick}>{item.label}</a>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Nav;