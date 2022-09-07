import styles from "../styles/kryptowaluty.module.scss";

function kryptowaluty() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Kryptowaluty</h1>
        <div className={styles.cryptoWrap}>
          <div className={styles.crypto}>
            <div className={styles.cryptoHeader}>
              <h2>Bitcoin</h2>
            </div>
            <div className={styles.cryptoInfo}>
              <div className={styles.cryptoInfoText}>
                <div>
                  <p>
                    Pozycja: <span>1</span>
                  </p>
                  <p>
                    Symbol: <span>BTC</span>
                  </p>
                </div>
                <div>
                  <p>
                    Kapitalzacja: <span>379,009,292,217$</span>
                  </p>
                  <p>
                    Kurs 24h: <span>-0.87%</span>
                  </p>
                </div>
              </div>
              <p>Info: saöldklasök asldkasöldk asd kaösdk</p>
              <button className={styles.cryptoBtn}>Zobacz wiecej ...</button>
            </div>
          </div>
          <div className={styles.crypto}>
            <div className={styles.cryptoHeader}>
              <h2>Bitcoin</h2>
            </div>
            <div className={styles.cryptoInfo}>
              <div className={styles.cryptoInfoText}>
                <div>
                  <p>
                    Pozycja: <span>1</span>
                  </p>
                  <p>
                    Symbol: <span>BTC</span>
                  </p>
                </div>
                <div>
                  <p>
                    Kapitalzacja: <span>379,009,292,217$</span>
                  </p>
                  <p>
                    Kurs 24h: <span>-0.87%</span>
                  </p>
                </div>
              </div>
              <p>Info: saöldklasök asldkasöldk asd kaösdk</p>
              <button className={styles.cryptoBtn}>Zobacz wiecej ...</button>
            </div>
          </div>
          <div className={styles.crypto}>
            <div className={styles.cryptoHeader}>
              <h2>Bitcoin</h2>
            </div>
            <div className={styles.cryptoInfo}>
              <div className={styles.cryptoInfoText}>
                <div>
                  <p>
                    Pozycja: <span>1</span>
                  </p>
                  <p>
                    Symbol: <span>BTC</span>
                  </p>
                </div>
                <div>
                  <p>
                    Kapitalzacja: <span>379,009,292,217$</span>
                  </p>
                  <p>
                    Kurs 24h: <span>-0.87%</span>
                  </p>
                </div>
              </div>
              <p>Info: saöldklasök asldkasöldk asd kaösdk</p>
              <button className={styles.cryptoBtn}>Zobacz wiecej ...</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default kryptowaluty;
