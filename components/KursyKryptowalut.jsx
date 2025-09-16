import { useState, useEffect } from "react";
import styles from "../styles/KursKryptowalut.module.scss";
import Image from "next/image";
import NumberFormat from "react-number-format";
import Link from "next/link";
import Head from "next/head";

function KursyKryptowalut({ cryptoData, isRateLimited }) {
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const dataSet = Array.isArray(cryptoData) ? cryptoData : [];

  // Filter the data based on search text
  const filteredData = dataSet.filter((coin) => {
    if (text === "") {
      return true;
    } else if (coin.name.toLowerCase().includes(text.toLowerCase())) {
      return true;
    }
    return false;
  });

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const hasResults = currentItems.length > 0;

  const getTrendClass = (value) => {
    if (value > 0) return styles.positive;
    if (value < 0) return styles.negative;
    return styles.neutral;
  };

  useEffect(() => {
    // Reset to the first page when search text changes
    setCurrentPage(1);
  }, [text]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {" "}
      <Head>
        <title>
          Kryptoceny.pl | Aktualne Kursy Kryptowalut - Sprawdź Najnowsze Ceny
        </title>
        <meta
          name="description"
          content="Kryptoceny.pl | Aktualne kursy kryptowalut. Porównaj ceny, zmiany kursów oraz kapitalizację rynku dla głównych kryptowalut."
        />
        <meta
          name="keywords"
          content="kursy kryptowalut, cena Bitcoin, cena Ethereum, kapitalizacja rynku, zmiany kursów"
        />
        <meta
          property="og:title"
          content="Aktualne Kursy Kryptowalut - Sprawdź Najnowsze Ceny"
        />
        <meta
          property="og:description"
          content="Zaktualizowane informacje o kursach kryptowalut, w tym Bitcoin, Ethereum i inne."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://kryptoceny.pl/kurskryptowalut"
        />
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Aktualne kursy kryptowalut</h1>
        </div>
        {!isRateLimited && dataSet.length === 0 && (
          <div className={styles.notice}>
            Dane chwilowo niedostępne. Spróbuj ponownie później.
          </div>
        )}
        <div className={styles.searchContainer}>
          <label htmlFor="cryptoSearch" className={styles.searchLabel}>
            Znajdź kryptowalutę:
          </label>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              id="cryptoSearch"
              className={styles.search}
              type="search"
              onChange={(e) => setText(e.target.value)}
              placeholder="Szukaj według nazwy, np. Bitcoin, Ethereum..."
            />
          </div>
        </div>
        <div className={styles.cryptos}>
          <table className={styles.kryptoTable}>
            <thead className={styles.kryptoHead}>
              <tr className={styles.kryptoHead}>
                <th className={styles.kryptoBorder}>#</th>
                <th className={`${styles.kryptoLeft} ${styles.kryptoBorder}`}>
                  <p>Kryptowaluta</p>{" "}
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
            {hasResults ? (
              currentItems.map((crypto) => (
                <tbody key={crypto.market_cap_rank}>
                  <tr>
                    <td className={styles.kryptoBorder2}>
                      {crypto.market_cap_rank}{" "}
                    </td>
                    <td
                      className={`${styles.kryptoName} ${styles.kryptoBorder2}`}
                    >
                      <div className={styles.kryptoImage}>
                        <Image
                          src={crypto.image}
                          alt={`${crypto.name} logo`}
                          width="24px"
                          height="24px"
                          style={{ marginRight: "8px" }}
                          loading="lazy"
                        />
                      </div>{" "}
                      <Link href={`/kryptowaluta/${crypto.id}`}>
                        <a>{crypto.name} </a>
                      </Link>
                    </td>
                    <td className={styles.kryptoBorder2}>
                      {crypto?.current_price >= 1
                        ? crypto?.current_price?.toFixed(2)
                        : crypto?.current_price?.toFixed(4)}
                      $
                    </td>
                    <td className={styles.kryptoBorder2}>
                      <span className={getTrendClass(crypto.price_change_percentage_1h_in_currency)}>
                        {crypto?.price_change_percentage_1h_in_currency?.toFixed(2)}%
                      </span>
                    </td>
                    <td className={`${styles.kryptoBorder2} ${styles.hide}`}>
                      <span className={getTrendClass(crypto.price_change_percentage_24h)}>
                        {crypto.price_change_percentage_24h?.toFixed(2)} %
                      </span>
                    </td>
                    <td
                      className={`${styles.kryptoPrice} ${styles.kryptoBorder2} ${styles.hide}`}
                    >
                      <span className={getTrendClass(crypto.price_change_percentage_7d_in_currency)}>
                        {crypto.price_change_percentage_7d_in_currency?.toFixed(2)}%
                      </span>
                    </td>
                    <td
                      className={`${styles.kryptoPrice} ${styles.kryptoBorder2} ${styles.hide} ${styles.tabHide}`}
                    >
                      {
                        <NumberFormat
                          thousandsGroupStyle="thousand"
                          value={crypto.total_volume}
                          decimalSeparator="."
                          displayType="text"
                          type="text"
                          thousandSeparator={true}
                          allowNegative={true}
                        />
                      }
                      $
                    </td>
                    <td
                      className={`${styles.kryptoPrice} ${styles.kryptoBorder2}`}
                    >
                      {
                        <NumberFormat
                          thousandsGroupStyle="thousand"
                          value={crypto.market_cap}
                          decimalSeparator="."
                          displayType="text"
                          type="text"
                          thousandSeparator={true}
                          allowNegative={true}
                        />
                      }
                      $
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              !isRateLimited && (
                <tbody>
                  <tr>
                    <td colSpan={8} className={styles.kryptoBorder2}>
                      Brak wyników do wyświetlenia.
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>
        </div>
        {filteredData.length > 0 && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? styles.activePage : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default KursyKryptowalut;
