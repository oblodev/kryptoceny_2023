import styles from "../styles/404.module.scss";
import Image from "next/image";
import image404 from "../public/images/404.png";
import Link from "next/link";

function FourOhFour() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Oops! Strona, której szukasz, nie istnieje (błąd 404)</h2>
        <Image src={image404} alt="kryptokurs-404" />
        <button className={styles.btn}>
          <Link href="/">Wróc</Link>
        </button>
      </div>
    </div>
  );
}

export default FourOhFour;
