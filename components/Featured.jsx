import styles from "../styles/Featured.module.scss";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { FaNewspaper } from "react-icons/fa";
import { motion } from "framer-motion";

function Featured({ featuredPost }) {
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

        <Link href={`/featured/${post.slug}`}>
          <div className={styles.featured}>
            <div className={styles.imgWrapper}>
              <Image
                src={post.featuredImage.url}
                className={styles.img}
                objectFit="cover"
                layout="fill"
                alt="post-image"
              />
            </div>
            <div className={styles.feature}>
              <p></p>
              <h3>{post.title}</h3>
              <p>{moment(post.createdAt).format("DD.MM.YYYY")}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Featured;
