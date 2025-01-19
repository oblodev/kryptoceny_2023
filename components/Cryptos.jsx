import styles from "../styles/Cryptos.module.scss";
import { useState } from "react";
import Image from "next/image";
import NumberFormat from "react-number-format";

import Link from "next/link";

function Cryptos({ cryptoData }) {
  const formatNumber = (value) =>
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator={true}
      decimalSeparator="."
      allowNegative={false}
    />;


    const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    // Simulate a delay for loading
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to the desired page
      window.location.href = "/kurskryptowalut";
    }, 1850); // Adjust timeout as needed
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cryptos}>
          <table className={styles.kryptoTable} aria-label="Tabela kryptowalut">
            <thead>
              <tr className={styles.kryptoHead}>
                <th className={styles.kryptoBorder}>#</th>
                <th className={`${styles.kryptoLeft} ${styles.kryptoBorder}`}>
                  <p>Kryptowaluta</p>
                </th>
                <th className={styles.kryptoBorder}>Kurs</th>
                <th className={styles.kryptoBorder}>Kurs 1h</th>
                <th className={`${styles.kryptoBorder} ${styles.hide}`}>
                  Kurs 24h
                </th>
                <th className={`${styles.kryptoBorder} ${styles.hide}`}>
                  Kurs 7d
                </th>
                <th
                  className={`${styles.kryptoBorder} ${styles.hide} ${styles.tabHide}`}
                >
                  Wolumen 24h
                </th>
                <th className={styles.kryptoBorder}>Kapitalizacja</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(cryptoData) && cryptoData.length > 0 ? (
                cryptoData.map((crypto) => (
                  <tr key={crypto.market_cap_rank}>
                    <td className={styles.kryptoBorder2}>
                      {crypto.market_cap_rank}
                    </td>
                    <td
                      className={`${styles.kryptoName} ${styles.kryptoBorder2}`}
                    >
                      <div className={styles.kryptoImage}>
                        <Image
                          src={crypto.image}
                          alt={`${crypto.name} logo`}
                          width={24}
                          height={24}
                        />
                      </div>
                      {crypto.id ? (
                        <Link href={`/kryptowaluta/${crypto.id}`}>
                          <a>{crypto.name}</a>
                        </Link>
                      ) : (
                        <span>{crypto.name}</span>
                      )}
                    </td>
                    <td className={styles.kryptoBorder2}>
                      {crypto.current_price >= 1
                        ? crypto.current_price.toFixed(2)
                        : crypto.current_price.toFixed(5)}
                      $
                    </td>
                    <td className={styles.kryptoBorder2}>
                      <span
                        className={
                          crypto.price_change_percentage_1h_in_currency > 0
                            ? "green"
                            : "red"
                        }
                      >
                        {crypto.price_change_percentage_1h_in_currency?.toFixed(
                          2
                        )}
                        %
                      </span>
                    </td>
                    <td className={`${styles.kryptoBorder2} ${styles.hide}`}>
                      <span
                        className={
                          crypto.price_change_percentage_24h > 0
                            ? "green"
                            : "red"
                        }
                      >
                        {crypto.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </td>
                    <td
                      className={`${styles.kryptoPrice} ${styles.kryptoBorder2} ${styles.hide}`}
                    >
                      <span
                        className={
                          crypto.price_change_percentage_7d_in_currency > 0
                            ? "green"
                            : "red"
                        }
                      >
                        {crypto.price_change_percentage_7d_in_currency?.toFixed(
                          2
                        )}
                        %
                      </span>
                    </td>
                    <td
                      className={`${styles.kryptoPrice} ${styles.kryptoBorder2} ${styles.hide} ${styles.tabHide}`}
                    >
                      {formatNumber(crypto.total_volume)}$
                    </td>
                    <td className={`${styles.kryptoPrice} ${styles.kryptoBorder2}`}>
                      {formatNumber(crypto.market_cap)}$
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className={styles.loading}>
                    Ładowanie danych...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.headerBtn}>
          <button
            onClick={handleButtonClick}
            aria-label="Zobacz więcej kursów kryptowalut"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              "Zobacz więcej"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cryptos;
