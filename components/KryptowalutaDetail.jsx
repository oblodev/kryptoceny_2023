import styles from "../styles/KryptowalutaDetail.module.scss";
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";
import Link from "next/link";

function KryptowalutaDetail({ krypto }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>
          Kurs {krypto.name} ({krypto.symbol.toUpperCase()}) - Wszystkie dane
        </h1>
      </div>
      <div className={styles.kryptoWrap}>
        <div className={styles.kryptoHeader}>
          <Image
            src={krypto.image.thumb}
            alt="krypto-logo"
            height="32px"
            width="32px"
          />
          <h2>
            {krypto.name} Kurs:{" "}
            <span>${krypto?.market_data.current_price.usd.toFixed(3)}</span>
          </h2>
        </div>
        <div className={styles.kryptoChanges}>
          <div className={styles.kryptoChange}>
            <p>Zmiana (24h)</p>
            <div className={styles.kryptoChangeProc}>
              <p
                className={
                  krypto.market_data.price_change_percentage_24h > 0
                    ? "green"
                    : "red"
                }
              >
                {krypto.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className={styles.kryptoChange}>
            <p>Zmiana (1 dzien)</p>
            <div className={styles.kryptoChangeProc}>
              <p
                className={
                  krypto.market_data.price_change_percentage_7d > 0
                    ? "green"
                    : "red"
                }
              >
                {krypto.market_data.price_change_percentage_7d.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className={styles.kryptoChange}>
            <p>Zmiana (7 dni)</p>
            <div className={styles.kryptoChangeProc}>
              <p
                className={
                  krypto.market_data.price_change_percentage_30d > 0
                    ? "green"
                    : "red"
                }
              >
                {krypto.market_data.price_change_percentage_30d.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className={styles.kryptoChange}>
            <p>Zmiana (1 rok)</p>
            <div className={styles.kryptoChangeProc}>
              <p
                className={
                  krypto.market_data.price_change_percentage_1y > 0
                    ? "green"
                    : "red"
                }
              >
                {krypto.market_data.price_change_percentage_1y.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.kryptoWrap}>
        <div className={styles.chartHeader}>
          <div>
            <Image
              src={krypto.image.thumb}
              alt="krypto-logo"
              height="32px"
              width="32px"
            />
            <h3>{krypto.name} - Ostatnie 7 dni</h3>
          </div>
        </div>
        <div className={styles.chartKrypto}>
          <Sparklines
            data={krypto.market_data.sparkline_7d.price}
            limit={75}
            margin={5}
          >
            <SparklinesLine color={"#5277ff"}></SparklinesLine>
          </Sparklines>
          <div className={styles.chartInfo}>
            <p>ATH: ${krypto.market_data.ath.usd.toFixed(2)}</p>
            <p>
              Obecny Kurs: ${krypto.market_data.current_price.usd.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.kryptoWrap}>
        <div className={styles.chartHeader}>
          <div>
            <Image
              src={krypto.image.thumb}
              alt="krypto-logo"
              height="32px"
              width="32px"
            />
            <h3>{krypto.name} - Informacje</h3>
          </div>
        </div>
        <div className={styles.kryptoFakty}>
          <p>
            Obecny kurs {krypto.name} wynosi $
            {krypto.market_data.current_price.usd.toFixed(2)}. Kurs kryptowaluty{" "}
            {krypto.name}{" "}
            {krypto.market_data.price_change_percentage_24h > 0
              ? "zyskal"
              : "stracil"}{" "}
            w ostatnich 24h{" "}
            {krypto.market_data.price_change_percentage_24h.toFixed(2)}%.
            Kryptowaluta {krypto.name} obecnie sie plasuje na{" "}
            {krypto.market_cap_rank}. miejscu wedlug kapitalizacji rynokowej.
          </p>
          <p>
            Do osagniecia nowego ATH brakuje{" "}
            {krypto.market_data.ath_change_percentage.usd.toFixed(2)}%.
          </p>
          <div className={styles.kryptoInfo}>
            <div className={styles.kryptoInfoCard}>
              <h4>Ranking</h4>
              <p># {krypto.market_cap_rank}</p>
            </div>
            <div className={styles.kryptoInfoCard}>
              <h4>Kapitalizacja rynkowa</h4>
              <p>${krypto.market_data.market_cap.usd}</p>
            </div>
            <div className={styles.kryptoInfoCard}>
              <h4>Kapitalizacja rynkowa (24h)</h4>
              <p>
                {krypto.market_data.market_cap_change_percentage_24h_in_currency.usd.toFixed(
                  2
                )}
                %
              </p>
            </div>
          </div>
          <div className={styles.kryptoInfo}>
            <div className={styles.kryptoInfoCard}>
              <h4>Wolumen (24h)</h4>
              <p>${krypto.market_data.market_cap.usd}</p>
            </div>
            <div className={styles.kryptoInfoCard}>
              <h4>Ilość w obrocie</h4>
              <p>
                {krypto.market_data.circulating_supply}{" "}
                {krypto.symbol.toUpperCase()}
              </p>
            </div>

            <div className={styles.kryptoInfoCard}>
              <h4>Ilość maksymalna</h4>
              <p>
                {krypto.market_data.total_supply} {krypto.symbol.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KryptowalutaDetail;
