import styles from "../styles/NextPageBtn.module.scss";
import { useState } from "react";

import { useTheme } from "../hooks/useTheme";

function NextPageBtn() {
  const { changePage, page, changeShow, show } = useTheme();

  const handlePage = () => {
    changePage(page + 1);
    changeShow(true);
    console.log(page);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.btn} onClick={handlePage}>
          Wiecej ...
        </button>
      </div>
    </div>
  );
}

export default NextPageBtn;
