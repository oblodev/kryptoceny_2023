import React from "react";
import styles from "../styles/KryptowalutaDetail.module.scss";
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";
import Link from "next/link";
import NumberFormat from "react-number-format";

function KryptowalutaDetail({ krypto }) {
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h1>
          Kurs {krypto.name} ({krypto.symbol.toUpperCase()}) - Wszystkie dane
        </h1>
      </div>

      {/* Current Price Section */}
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
          {["24h", "7d", "30d", "1y"].map((timeframe, index) => (
            <div className={styles.kryptoChange} key={index}>
              <p>Zmiana ({timeframe})</p>
              <div className={styles.kryptoChangeProc}>
                <p
                  className={
                    krypto.market_data[`price_change_percentage_${timeframe}`] >
                    0
                      ? "green"
                      : "red"
                  }
                >
                  {krypto.market_data[`price_change_percentage_${timeframe}`]?.toFixed(2) ??
                    "N/A"}
                  %
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Section */}
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
          <Sparklines data={krypto.market_data.sparkline_7d.price} limit={75}>
            <SparklinesLine color={"#5277ff"}></SparklinesLine>
          </Sparklines>
          <div className={styles.chartInfo}>
            <p>ATH: ${krypto.market_data.ath.usd.toFixed(2)}</p>
            <p>Obecny Kurs: ${krypto.market_data.current_price.usd.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Informacje */}
      <div className={styles.kryptoWrap}>
        <div className={styles.kryptoFaktyHeader}>
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
            Obecny kurs <span style={{ fontWeight: "600" }}>{krypto.name}</span> wynosi $
            <span style={{ fontWeight: "600" }}>{krypto.market_data.current_price.usd.toFixed(2)}</span>. Kurs kryptowaluty{" "}
            {krypto.name}{" "}
            {krypto.market_data.price_change_percentage_24h > 0
              ? "zyskał"
              : "stracił"}{" "}
            w ostatnich 24h{" "}
            {krypto.market_data.price_change_percentage_24h.toFixed(2)}%.
            Kryptowaluta {krypto.name} obecnie się plasuje na{" "}
            {krypto.market_cap_rank}. miejscu według kapitalizacji rynkowej.
          </p>
          <p>
            Do osiągnięcia nowego ATH brakuje{" "}
            <span style={{ fontWeight: "600" }}>{krypto.market_data.ath_change_percentage.usd.toFixed(2)}%</span>.
          </p>
          <div className={styles.kryptoInfo}>
            {[
              {
                title: "Ranking",
                value: `# ${krypto.market_cap_rank}`,
              },
              {
                title: "Kapitalizacja rynkowa",
                value: (
                  <NumberFormat
                    value={krypto.market_data.market_cap.usd}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                  />
                ),
              },
              {
                title: "Wolumen (24h)",
                value: (
                  <NumberFormat
                    value={krypto.market_data.total_volume.usd}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                  />
                ),
              },
            ].map((info, idx) => (
              <div className={styles.kryptoInfoCard} key={idx}>
                <h4>{info.title}</h4>
                <p>{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.kryptoButtons}>
        <Link href="/kurskryptowalut">
          <button className={styles.wroc}>Wróć</button>
        </Link>
      </div>
    </div>
  );
}

export default KryptowalutaDetail;
