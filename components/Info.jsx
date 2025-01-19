import styles from "../styles/Info.module.scss";
import Link from "next/link";
import { AiOutlineLineChart } from "react-icons/ai";
import { motion } from "framer-motion";

function Info() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.infoWrap}>
          <motion.div
            className={styles.header}
            whileInView={{ y: [40, 0], opacity: [0, 1] }}
            transition={{ duration: 0.75 }}
          >
            <AiOutlineLineChart className={styles.icon} />
            <h2>Kursy Kryptowalut</h2>
          </motion.div>

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
        </div>

        <div className={styles.infoWrap}>
          <h2>Dlaczego warto sprawdzać kursy kryptowalut?</h2>
          <p>
            Znajomość aktualnych kursów kryptowalut pozwala zrozumieć bieżącą
            sytuację rynkową i podejmować świadome decyzje inwestycyjne.
            Informacja o cenie danej kryptowaluty jest kluczowa, by określić
            budżet potrzebny do jej zakupu oraz ocenić potencjalny zysk lub
            stratę.
          </p>
        </div>

        <div className={styles.infoWrap}>
          <h2>Co wpływa na kurs kryptowaluty?</h2>
          <p>
            Kursy kryptowalut zależą od wielu czynników i nie są bezpośrednio
            powiązane z gospodarką państw czy instytucjami finansowymi. Ich
            wartość opiera się głównie na dwóch aspektach: zainteresowaniu
            inwestorów oraz liczbie transakcji przeprowadzanych na rynku.
          </p>
          <p>
            Wiele kryptowalut, takich jak Bitcoin (21 mln), Ethereum (18 mln) czy
            Litecoin (84 mln), ma ograniczoną podaż. Dzięki temu, po osiągnięciu
            maksymalnej liczby monet, ryzyko inflacji jest minimalne. Stabilność
            kursu wymaga jednak równowagi pomiędzy zainteresowaniem inwestorów a
            liczbą transakcji.
          </p>
          <p>
            Więcej informacji znajdziesz w naszym przewodniku{" "}
            <Link href="/kryptokursy">
              <span className={styles.kryptoLink}>
                Kursy kryptowalut – wszystkie najważniejsze informacje
              </span>
            </Link>
            .
          </p>
        </div>

        <p className={styles.nota}>
          *Nota ostrzegawcza: Witryna KryptoCeny.pl nie stanowi poradnika
          inwestycyjnego w rozumieniu Rozporządzenia Ministra Finansów z dnia 19
          października 2005 r. Treści prezentowane na stronie są subiektywnymi
          opiniami autorów i nie należy ich traktować jako porady inwestycyjnej.
          Inwestowanie w kryptowaluty wiąże się z ryzykiem utraty kapitału.
          Decyzje inwestycyjne podejmuj ostrożnie i inwestuj jedynie środki, na
          których stratę możesz sobie pozwolić. Instrumenty rynku OTC, w tym
          kontrakty na różnice kursowe (CFD), są związane z wysokim ryzykiem
          strat wynikających z mechanizmu dźwigni finansowej. Zyski nie są
          gwarantowane, a decyzje inwestycyjne należy podejmować na podstawie
          własnego osądu.
        </p>
      </div>
    </div>
  );
}

export default Info;
