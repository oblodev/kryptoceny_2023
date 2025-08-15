import styles from "../styles/PoradnikDetail.module.scss";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import PriceWidget from "./PriceWidget";
import React from "react";

function PoradnikDetail({ poradnik }) {
  // ++ ADDED the robust rich text renderer from PostDetail.js
  const renderRichTextNode = (node, index) => {
    if (node.text) {
      let textElement = <>{node.text}</>;
      if (node.bold) textElement = <b>{textElement}</b>;
      if (node.italic) textElement = <em>{textElement}</em>;
      if (node.underline) textElement = <u>{textElement}</u>;
      if (node.code) textElement = <code>{textElement}</code>;
      return <React.Fragment key={index}>{textElement}</React.Fragment>;
    }

    const children = node.children?.map((childNode, childIndex) =>
      renderRichTextNode(childNode, childIndex)
    );

    switch (node.type) {
      case "heading-two":
        return <h2 key={index}>{children}</h2>;
      case "heading-three":
        return <h3 key={index}>{children}</h3>;
      case "heading-four":
        return <h4 key={index}>{children}</h4>;
      case "paragraph":
        return <p key={index}>{children}</p>;
      case "bulleted-list":
        return <ul key={index}>{children}</ul>;
      case "numbered-list":
        return <ol key={index}>{children}</ol>;
      case "list-item":
        return <li key={index}>{children}</li>;
      case "list-item-child":
         return <React.Fragment key={index}>{children}</React.Fragment>;
      case "image":
        return (
          <Image
            key={index}
            alt={node.title || "Bild aus Inhalt"}
            height={node.height}
            width={node.width}
            src={node.src}
          />
        );
      case "link":
        return (
          <Link href={node.href} key={index} legacyBehavior passHref>
            <a target={node.openInNewTab ? "_blank" : "_self"}>{children}</a>
          </Link>
        );
      default:
        return <React.Fragment key={index}>{children}</React.Fragment>;
    }
  };

  // -- REMOVED the old getContentFragment function

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{poradnik.title}</h1>
        <div className={styles.headerInfo}>
          <p>
            od <span>{poradnik.author.name}</span>
          </p>
          <p>{moment(poradnik.date).format("DD.MM.YYYY")}</p>
          <Link href="/poradnik/all" className={styles.category}>
            Poradnik Krypto
          </Link>
        </div>
      </div>
      <div className={styles.postWrap}>
        <div className={styles.post}>
          {poradnik?.poradnikImage?.url && ( // Added optional chaining for safety
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
                alt={poradnik.title || "post-image"} // Used poradnik title for better alt text
                width={880}
                height={520}
                style={{ objectFit: "cover" }}
                priority // Added priority prop since it's likely LCP
              />
            </div>
          )}

          <p className={styles.excerpt}>{poradnik.excerpt}</p>
          <div className={styles.postText}>
            {/* ++ UPDATED this mapping logic to be simpler and more powerful */}
            {poradnik?.content?.raw?.children.map((node, index) =>
              renderRichTextNode(node, index)
            )}
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