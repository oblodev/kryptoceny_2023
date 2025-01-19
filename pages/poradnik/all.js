import { getPoradnikPosts } from "../../services/poradnikPostsIndex";
import styles from "../../styles/poradnikAll.module.scss";
import moment from "moment";
import Link from "next/link";

const PoradnikAll = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Poradnik Krypto</h1>
          <p>
            Witaj w naszym Poradniku Krypto – miejscu, gdzie znajdziesz
            praktyczne informacje, porady oraz odpowiedzi na najczęstsze
            pytania dotyczące świata kryptowalut. Niezależnie od tego, czy
            jesteś początkującym inwestorem, czy doświadczonym traderem, nasze
            artykuły pomogą Ci lepiej zrozumieć rynek kryptowalut oraz uniknąć
            typowych błędów.
          </p>
        </div>
        <div className={styles.postWrap}>
          {data &&
            data.reverse().map((post) => (
              <Link href={`/poradnik/${post.node.slug}`} key={post.node.slug}>
                <div className={styles.postCard}>
                  <div className={styles.postImage}>
                    <img
                      src={post.node.poradnikImage.url}
                      alt={post.node.title || "Poradnik obraz"}
                    />
                  </div>
                  <div className={styles.postHeader}>
                    <h2>{post.node.title}</h2>
                  </div>
                  <div className={styles.postText}>
                    <p>{post.node.excerpt}</p>
                  </div>
                  <div className={styles.postInfo}>
                    <p>{moment(post.node.createdAt).format("DD.MM.YYYY")}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className={styles.footer} style={{ marginBottom: "2rem" }}>
          <p>
            Chcesz dowiedzieć się więcej? Regularnie publikujemy nowe treści, które
            pomogą Ci zdobyć wiedzę i umiejętności niezbędne do odniesienia sukcesu
            w świecie kryptowalut. Śledź nas na bieżąco i bądź na czasie z
            najnowszymi trendami, analizami oraz poradami.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoradnikAll;

export async function getStaticProps() {
  const data = await getPoradnikPosts();

  return {
    props: {
      data,
    },
  };
}
