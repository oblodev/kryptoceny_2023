import { useState, useEffect } from "react";
import styles from "../styles/KursKryptowalut.module.scss";
import Image from "next/image";
import NumberFormat from "react-number-format";
import Link from "next/link";

function KursyKryptowalut({ cryptoData }) {
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Filter the data based on search text
  const filteredData = cryptoData.filter((coin) => {
    if (text === "") {
      return true;
    } else if (coin.name.toLowerCase().includes(text.toLowerCase())) {
      return true;
    }
    return false;
  });

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    // Reset to the first page when search text changes
    setCurrentPage(1);
  }, [text]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Aktualne kursy kryptowalut</h1>
      </div>
      <div className={styles.searchContainer}>
        <input
          className={styles.search}
          type="search"
          onChange={(e) => setText(e.target.value)}
          placeholder="Wpisz nazwę kryptowaluty..."
        />
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
          {currentItems ? (
            currentItems
              .filter((coin) => {
                if (text === "") {
                  return coin;
                } else if (
                  coin.name.toLowerCase().includes(text.toLocaleLowerCase())
                ) {
                  return coin;
                }
              })
              .map((crypto) => (
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
                          alt="crypto-logo"
                          width="24px"
                          height="24px"
                          style={{ marginRight: "8px" }}
                        />
                      </div>{" "}
                      <Link href={`/kryptowaluta/${crypto.id}`}>
                        <a>{crypto.name}</a>
                      </Link>
                    </td>
                    <td className={styles.kryptoBorder2}>
                      {crypto?.current_price >= 1
                        ? crypto?.current_price?.toFixed(2)
                        : crypto?.current_price?.toFixed(4)}
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
                        {crypto?.price_change_percentage_1h_in_currency?.toFixed(
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
                        {crypto.price_change_percentage_24h?.toFixed(2)} %
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
            <div>
              <p>Laduje dane ...</p>
            </div>
          )}
        </table>
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.activePage : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default KursyKryptowalut;
