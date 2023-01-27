import styles from "../styles/News.module.scss";
import Link from "next/link";
import moment from "moment";
import "moment/locale/pl";
import { FaRegNewspaper } from "react-icons/fa";
import newsLogo from "../public/images/Kryptoceny-news.jpg";
import { motion } from "framer-motion";

function News({ newsData }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.header}
          whileInView={{ y: [40, 0], opacity: [0, 1] }}
          transition={{ duration: 0.75 }}
        >
          <FaRegNewspaper className={styles.icon} />
          <h2>News</h2>
        </motion.div>
        <div className={styles.news}>
          {newsData &&
            newsData.articles.slice(0, 9).map((news) => (
              <Link href={news.url} key={news.title}>
                <div className={styles.newsCard}>
                  <div className={styles.newsImage}>
                    <img
                      src={
                        news.urlToImage === null ? newsLogo : news.urlToImage
                      }
                      alt="news-image"
                    />
                  </div>

                  <div className={styles.newsCardInfo}>
                    <div>
                      <h3>{news.title}</h3>
                      <p>{news.description.slice(0, 200)} ...</p>
                    </div>

                    <div className={styles.source}>
                      <p>{news.source.name}</p>
                      <p>
                        {moment(news.publishedAt).startOf("hour").fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default News;
