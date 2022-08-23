import styles from "../styles/MoreFeatured.module.scss";
import Image from "next/image";
import placeholder from "../public/images/placeholder.jpg";

function MoreFeatured() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.moreCard}>
          <h4>INWESTYCJE</h4>
          <div className={styles.moreImg}>
            <Image src={placeholder} objectFit="cover" />
          </div>

          <h5>Gielda FTX wyceniona na 25 miliardow dolarow</h5>
        </div>
        <div className={styles.moreCard}>
          <h4>INWESTYCJE</h4>
          <div className={styles.moreImg}>
            <Image src={placeholder} />
          </div>

          <h5>Gielda FTX wyceniona na 25 miliardow dolarow</h5>
        </div>
        <div className={styles.moreCard}>
          <h4>INWESTYCJE</h4>
          <div className={styles.moreImg}>
            <Image src={placeholder} />
          </div>

          <h5>Gielda FTX wyceniona na 25 miliardow dolarow</h5>
        </div>
        <div className={styles.moreCard}>
          <h4>INWESTYCJE</h4>
          <div className={styles.moreImg}>
            <Image src={placeholder} />
          </div>

          <h5>Gielda FTX wyceniona na 25 miliardow dolarow</h5>
        </div>
        <div className={styles.moreCard}>
          <h4>INWESTYCJE</h4>
          <div className={styles.moreImg}>
            <Image src={placeholder} />
          </div>

          <h5>Gielda FTX wyceniona na 25 miliardow dolarow</h5>
        </div>
        <div className={styles.moreCard}>
          <h4>INWESTYCJE</h4>
          <div className={styles.moreImg}>
            <Image src={placeholder} />
          </div>

          <h5>Gielda FTX wyceniona na 25 miliardow dolarow</h5>
        </div>
      </div>
    </div>
  );
}

export default MoreFeatured;
