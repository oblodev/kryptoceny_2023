import { useState, useEffect } from "react";
import styles from "../styles/Nav.module.scss";
import Image from "next/image";
import logo from "../public/images/KryptoCeny.png";
import Link from "next/link";
import { VscMenu } from "react-icons/vsc";
import { HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

// Define navigation links once to avoid duplication
const navLinks = [
  { href: "/kurskryptowalut", label: "Kurs Kryptowalut" },
  { href: "/kryptowaluty", label: "Informacje" },
  { href: "/onas", label: "O nas" },
  { href: "mailto:kontakt@kryptoceny.pl", label: "Kontakt", isExternal: true },
];

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change (useful for mobile)
  // This is a placeholder; in a real app, you'd use router events.
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>
          <Image src={logo} alt="KryptoCeny.pl logo" width={180} height={48} />
        </a>
      </Link>

      {/* Unified Navigation List */}
      <ul className={styles.navList}>
        {navLinks.map((link) => (
          <li key={link.href}>
            {link.isExternal ? (
              <a href={link.href}>{link.label}</a>
            ) : (
              <Link href={link.href}>{link.label}</Link>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        className={styles.menuToggle}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <HiX /> : <VscMenu />}
      </button>

      {/* Mobile Menu Overlay with Animation */}
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
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.isExternal ? (
                    <a href={link.href} onClick={handleLinkClick}>{link.label}</a>
                  ) : (
                    <Link href={link.href}>
                      <a onClick={handleLinkClick}>{link.label}</a>
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