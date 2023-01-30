import styles from "../styles/FeaturedPostDetail.module.scss";
import moment from "moment";
import PriceWidget from "./PriceWidget";
import React from "react";
import Image from "next/image";

function PostDetail({ post }) {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index}>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index}>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index}>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{post.title}</h1>
        <div className={styles.headerInfo}>
          <p>
            od <span>{post.author.name}</span>
          </p>
          <p>{moment(post.date).format("DD.MM.YYYY")}</p>
          <p className={styles.category}></p>
        </div>
      </div>
      <div className={styles.postWrap}>
        <div className={styles.post}>
          <div
            className={styles.postImage}
            style={{
              border: "8px solid #fff",
              borderRadius: "16px",
              objectFit: "cover",
              overflow: "hidden",
            }}
          >
            <Image
              src={post.featuredImage.url}
              alt="post-image"
              width="880px"
              height="520px"
              objectFit="cover"
            />
          </div>
          {console.log(post.content.raw)}
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.postText}>
            {post.content.raw.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemIndex) =>
                getContentFragment(itemIndex, item.text, item)
              );

              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
          </div>
        </div>
        <div className={styles.widgets}>
          <PriceWidget />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
