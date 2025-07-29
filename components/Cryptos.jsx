import styles from "../styles/Cryptos.module.scss";
import { useState } from "react";
import Image from "next/image";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import Link from "next/link";

function Cryptos({ cryptoData }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formatNumber = (value) => (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator={true}
      decimalSeparator="."
      allowNegative={false}
    />
  );

  const handleButtonClick = () => {
    setIsLoading(true);
    router.push("/kurskryptowalut");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cryptos}>
          <table className={styles.kryptoTable} aria-label="Tabela kryptowalut">
            <thead>
              <tr>
                <th>#</th>
                <th className={styles.kryptoLeft}>Kryptowaluta</th>
                <th>Kurs</th>
                <th className={styles.hideOnMobile}>Kurs 1h</th>
                <th className={styles.hideOnMobile}>Kurs 24h</th>
                <th className={styles.hideOnTablet}>Kurs 7d</th>
                <th className={styles.hideOnTablet}>Wolumen 24h</th>
                <th>Kapitalizacja</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(cryptoData) && cryptoData.length > 0 ? (
                cryptoData.map((crypto) => (
                  <tr key={crypto.id}>
                    <td>{crypto.market_cap_rank}</td>
                    <td className={styles.kryptoName}>
                      <Image
                        src={crypto.image}
                        alt={`${crypto.name} logo`}
                        width={24}
                        height={24}
                        unoptimized
                      />
                      <Link href={`/kryptowaluta/${crypto.id}`}>
                        {crypto.name}
                      </Link>
                    </td>
                    <td>${crypto.current_price?.toFixed(2)}</td>
                    <td className={styles.hideOnMobile}>
                      <span className={crypto.price_change_percentage_1h_in_currency > 0 ? "green" : "red"}>
                        {crypto.price_change_percentage_1h_in_currency?.toFixed(2)}%
                      </span>
                    </td>
                    <td className={styles.hideOnMobile}>
                      <span className={crypto.price_change_percentage_24h > 0 ? "green" : "red"}>
                        {crypto.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </td>
                    <td className={styles.hideOnTablet}>
                      <span className={crypto.price_change_percentage_7d_in_currency > 0 ? "green" : "red"}>
                        {crypto.price_change_percentage_7d_in_currency?.toFixed(2)}%
                      </span>
                    </td>
                    <td className={styles.hideOnTablet}>
                      {formatNumber(crypto.total_volume)}$
                    </td>
                    <td>{formatNumber(crypto.market_cap)}$</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Ładowanie danych...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.headerBtn}>
          <button
            onClick={handleButtonClick}
            aria-label="Zobacz więcej kursów kryptowalut"
            disabled={isLoading}
          >
            {isLoading ? <div className={styles.spinner}></div> : "Zobacz więcej"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cryptos;