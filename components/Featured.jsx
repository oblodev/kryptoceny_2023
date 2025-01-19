import styles from "../styles/Featured.module.scss";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { FaNewspaper } from "react-icons/fa";
import { motion } from "framer-motion";

function Featured({ featuredPost }) {
  // Handle empty or undefined `featuredPost`
  if (!featuredPost || featuredPost.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <motion.div
            className={styles.header}
            whileInView={{ y: [40, 0], opacity: [0, 1] }}
            transition={{ duration: 0.75 }}
          >
            <FaNewspaper className={styles.icon} />
            <h2>Aktualności</h2>
          </motion.div>
          <p className={styles.emptyState}>Brak dostępnych postów do wyświetlenia.</p>
        </div>
      </div>
    );
  }

  const post = featuredPost[featuredPost.length - 1].node;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.header}
          whileInView={{ y: [40, 0], opacity: [0, 1] }}
          transition={{ duration: 0.75 }}
        >
          <FaNewspaper className={styles.icon} />
          <h2>Aktualności</h2>
        </motion.div>

        <Link href={`/featured/${post.slug}`} passHref>
          <motion.div
            className={styles.featured}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.imgWrapper}>
              <Image
                src={post.featuredImage.url}
                className={styles.img}
                objectFit="cover"
                layout="fill"
                alt={post.title || "Post image"}
              />
            </div>
            <div className={styles.feature}>
              <h3>{post.title}</h3>
              <p>{moment(post.createdAt).format("DD.MM.YYYY")}</p>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default Featured;
