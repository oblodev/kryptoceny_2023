import styles from "../styles/KryptowalutaDetail.module.scss";
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";
import Link from "next/link";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function KryptowalutaDetail({ krypto }) {

  const sparklineData =
    krypto?.market_data?.sparkline_7d?.price
      ?.slice(-7) // Limit to the last 7 days
      .map((price, index) => ({
        dzien: `Dzień ${index + 1}`, // Polish labels for XAxis
        cena: price,
      })) || [];

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
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sparklineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dzien" label={{ value: "Dni", position: "insideBottom", offset: -5 }} />
              <YAxis domain={['auto', 'auto']} label={{ value: "Cena (USD)", angle: -90, position: "insideLeft" }} />
              <Tooltip
                formatter={(value) => `${value.toFixed(2)} USD`}
                labelFormatter={(label) => ` ${label}`}
              />
              <Line
                type="monotone"
                dataKey="cena"
                stroke="#5277ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
      <div className={styles.chartInfo}>
        <p>ATH: ${krypto.market_data.ath.usd.toFixed(2)}</p>
        <p>Obecny Kurs: ${krypto.market_data.current_price.usd.toFixed(2)}</p>
      </div>
    </div>
      </div>
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
            Obecny kurs <span style={{fontWeight: "700"}}>{krypto.name}</span> wynosi <span style={{fontWeight: "700"}}>$
            {krypto.market_data.current_price.usd.toFixed(2)}</span>. Kurs kryptowaluty{" "}
            {krypto.name}{" "}
            {krypto.market_data.price_change_percentage_24h > 0
              ? "zyskał"
              : "stracił"}{" "}
            w ostatnich 24h{" "}
            <span style={{fontWeight: "700"}}>{krypto.market_data.price_change_percentage_24h.toFixed(2)}%</span>.
            Kryptowaluta <span style={{fontWeight: "700"}}>{krypto.name}</span> obecnie się plasuje na{" "}
            <span style={{fontWeight: "700"}}>{krypto.market_cap_rank}. miejscu</span> według kapitalizacji rynkowej.
          </p>
          <p>
            Do osiągnięcia nowego ATH brakuje{" "}
            <span style={{fontWeight: "700"}}>{krypto.market_data.ath_change_percentage.usd.toFixed(2)}%</span>.
          </p>
          <div className={styles.kryptoInfo}>
            <div className={styles.kryptoInfoCard}>
              <h4>Ranking</h4>
              <p># {krypto.market_cap_rank}</p>
            </div>
            <div className={styles.kryptoInfoCard}>
              <h4>Kapitalizacja rynkowa</h4>
              <p>
                $
                {Intl.NumberFormat("pl-PL", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(krypto.market_data.market_cap.usd)}
              </p>
            </div>
            <div className={styles.kryptoInfoCard}>
              <h4>Kapitalizacja rynkowa (24h)</h4>
              <p>
                {Intl.NumberFormat("pl-PL", {
                  style: "percent",
                  maximumFractionDigits: 2,
                }).format(
                  krypto.market_data.market_cap_change_percentage_24h_in_currency.usd / 100
                )}
              </p>
            </div>
          </div>
          <div className={styles.kryptoInfo}>
            <div className={styles.kryptoInfoCard}>
              <h4>Wolumen (24h)</h4>
              <p>
                $
                {Intl.NumberFormat("pl-PL", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(krypto.market_data.total_volume.usd)}
              </p>
            </div>
            <div className={styles.kryptoInfoCard}>
              <h4>Ilość w obrocie</h4>
              <p>
                {Intl.NumberFormat("pl-PL", {
                  maximumFractionDigits: 0,
                }).format(krypto.market_data.circulating_supply)}{" "}
                {krypto.symbol.toUpperCase()}
              </p>
            </div>
            <div className={styles.kryptoInfoCard}>
              <h4>Ilość maksymalna</h4>
              <p>
                {Intl.NumberFormat("pl-PL", {
                  maximumFractionDigits: 0,
                }).format(krypto.market_data.total_supply)}{" "}
                {krypto.symbol.toUpperCase()}
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.kryptoButtons}>
        <Link href="/kurskryptowalut">
          <button className={styles.wroc}>Wróć</button>
        </Link>
      </div>
    </div>
  );
}

export default KryptowalutaDetail;
