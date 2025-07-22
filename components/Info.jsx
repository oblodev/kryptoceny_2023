import styles from "../styles/Info.module.scss";
import Link from "next/link";
import { AiOutlineLineChart, AiOutlineWarning } from "react-icons/ai";
import { motion } from "framer-motion";

function Info() {
  return (
    <section className={styles.container} aria-labelledby="info-heading">
      <motion.header
        className={styles.header}
        whileInView={{ y: [30, 0], opacity: [0, 1] }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <AiOutlineLineChart className={styles.icon} />
        <h2 id="info-heading">Kursy Kryptowalut</h2>
      </motion.header>

      <div className={styles.contentGrid}>
        <main className={styles.mainContent}>
          <p>
            KryptoCeny.pl to szybki i prosty sposób na sprawdzenie aktualnych
            kursów kryptowalut, niezależnie czy interesuje Cię Bitcoin czy jeden
            z wielu altcoinów dostępnych na rynku.
          </p>
          <p>
            W ostatnich latach handel kryptowalutami stał się istotną częścią
            rynku walutowego. Wszystko zaczęło się od Bitcoina – prekursora
            kryptowalut, który wprowadził nową alternatywę dla tradycyjnych
            walut FIAT i zapoczątkował globalny ruch kryptowalut.
          </p>
          <p>
            Rynek kryptowalut to jednak nie tylko Bitcoin. Obecnie istnieje
            tysiące tzw. altcoinów, takich jak Ethereum, Ripple, Litecoin,
            Cardano, IOTA, EOS czy Binance Coin, które zdobywają coraz większą
            popularność.
          </p>
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.infoBlock}>
            <h3>Dlaczego warto sprawdzać kursy?</h3>
            <p>
              Znajomość aktualnych kursów pozwala zrozumieć bieżącą sytuację
              rynkową i podejmować świadome decyzje inwestycyjne.
            </p>
          </div>
          <div className={styles.infoBlock}>
            <h3>Co wpływa na kurs?</h3>
            <p>
              Ich wartość opiera się głównie na zainteresowaniu inwestorów
              oraz liczbie transakcji. Wiele kryptowalut, jak Bitcoin, ma
              ograniczoną podaż, co minimalizuje ryzyko inflacji.
            </p>
            <p>
              Więcej informacji znajdziesz w naszym przewodniku{" "}
              <Link href="/kryptokursy">
                <a>Kursy kryptowalut – wszystkie informacje</a>
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>

      <aside className={styles.disclaimerBox}>
        <AiOutlineWarning className={styles.disclaimerIcon}/>
        <p>
          <strong>Nota ostrzegawcza:</strong> Witryna KryptoCeny.pl nie stanowi
          poradnika inwestycyjycyjnego. Treści są subiektywnymi opiniami
          autorów. Inwestowanie w kryptowaluty wiąże się z ryzykiem utraty
          kapitału. Inwestuj ostrożnie i tylko środki, na których stratę
          możesz sobie pozwolić.
        </p>
      </aside>
    </section>
  );
}

export default Info;