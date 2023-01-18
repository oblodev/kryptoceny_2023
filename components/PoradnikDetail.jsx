import styles from "../styles/PoradnikDetail.module.scss";
import Image from "next/image";
import moment from "moment";
import PriceWidget from "./PriceWidget";
import React from "react";

function PoradnikDetail({ poradnik }) {
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
          <Image
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
        <h1>{poradnik.title}</h1>
        <div className={styles.headerInfo}>
          <p>
            od <span>{poradnik.author.name}</span>
          </p>
          <p>{moment(poradnik.date).format("DD.MM.YYYY")}</p>
          <p className={styles.category}>{poradnik.categories[0].name}</p>
        </div>
      </div>
      <div className={styles.postWrap}>
        <div className={styles.post}>
          <div
            className={styles.featuredImage}
            style={{
              border: "8px solid #fff",
              borderRadius: "16px",
              objectFit: "cover",
              overflow: "hidden",
            }}
          >
            <Image
              src={poradnik.poradnikImage.url}
              alt="post-image"
              width="880px"
              height="520px"
              objectFit="cover"
            />
          </div>

          <p className={styles.excerpt}>{poradnik.excerpt}</p>
          <div className={styles.postText}>
            {poradnik.content.raw.children.map((typeObj, index) => {
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

export default PoradnikDetail;
