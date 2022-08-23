import styles from "../styles/BackPageBtn.module.scss";
import { useTheme } from "../hooks/useTheme";

function BackPageBtn() {
  const { changePage, page } = useTheme();

  const handlePage = () => {
    changePage(page - 1);
    console.log(page);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          className={page > 1 ? styles.btn : styles.hidden}
          onClick={handlePage}
        >
          Wroc ...
        </button>
      </div>
    </div>
  );
}

export default BackPageBtn;
