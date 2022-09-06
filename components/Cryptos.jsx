import { useState, useEffect } from "react";

import styles from "../styles/Cryptos.module.scss";
import axios from "axios";
import Image from "next/image";
import NumberFormat from "react-number-format";
import NextPageBtn from "./NextPageBtn";
import BackPageBtn from "./BackPageBtn";
import { useTheme } from "../hooks/useTheme";

function Cryptos() {
  const [cryptoData, setCryptoData] = useState([]);
  //const [isFetched, setIsFetched] = useState(false);

  const { page, show, isFetched } = useTheme();

  useEffect(() => {
    const fetchCryptos = async () => {
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );

      setCryptoData(data);
      console.log(data);
    };

    fetchCryptos();
  }, [page]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>
          <span>//</span> Aktualne kursy kryptowalut
        </h2>

        <div className={styles.cryptos}>
          <table className={styles.kryptoTable}>
            <thead>
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
                <th className={styles.kryptoBorder}>Kapitalzacja</th>
              </tr>
            </thead>
            {cryptoData ? (
              cryptoData.map((crypto) => (
                <tbody>
                  <tr key={crypto.market_cap_rank}>
                    <td className={styles.kryptoBorder2}>
                      {crypto.market_cap_rank}{" "}
                    </td>
                    <td
                      className={`${styles.kryptoName} ${styles.kryptoBorder2}`}
                    >
                      <div className={styles.kryptoImage}>
                        <Image
                          src={crypto.image}
                          width="24px"
                          height="24px"
                          style={{ marginRight: "8px" }}
                        />
                      </div>{" "}
                      <span>{crypto.name}</span>
                    </td>
                    <td className={styles.kryptoBorder2}>
                      {crypto.current_price >= 1
                        ? crypto.current_price.toFixed(2)
                        : crypto.current_price.toFixed(4)}
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
                        {crypto.price_change_percentage_1h_in_currency.toFixed(
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
                        {crypto.price_change_percentage_24h.toFixed(2)} %
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
                        {crypto.price_change_percentage_7d_in_currency.toFixed(
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
        <div className={styles.buttons}>
          {show ? <BackPageBtn /> : <p></p>}

          <NextPageBtn />
        </div>
      </div>
    </div>
  );
}

export default Cryptos;
