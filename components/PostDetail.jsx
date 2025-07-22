import styles from "../styles/PostDetail.module.scss";
import moment from "moment";
import PriceWidget from "./PriceWidget";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function PostDetail({ post }) {
  // Eine einzige, rekursive Funktion, um den Rich-Text-Baum zu rendern
  const renderRichTextNode = (node, index) => {
    // Wenn es sich um einen reinen Text-Knoten handelt, wende Formatierungen an
    if (node.text) {
      let textElement = <>{node.text}</>; // Beginne mit dem reinen Text

      if (node.bold) {
        textElement = <b>{textElement}</b>;
      }
      if (node.italic) {
        textElement = <em>{textElement}</em>;
      }
      if (node.underline) {
        textElement = <u>{textElement}</u>;
      }
      if (node.code) {
        textElement = <code>{textElement}</code>;
      }

      return <React.Fragment key={index}>{textElement}</React.Fragment>;
    }

    // Wenn es sich um einen Element-Knoten handelt, rendere seine Kinder rekursiv
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
      // list-item-child ist ein Container innerhalb eines list-item,
      // wir rendern seinen Inhalt direkt.
      case "list-item-child":
        return <>{children}</>;
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
        return <Link href={node.href} key={index} target={node.openInNewTab ? "_blank" : "_self"}>{children}</Link>;
      default:
        // Fallback für unbekannte Typen
        return <React.Fragment key={index}>{children}</React.Fragment>;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{post?.title}</h1>
        <div className={styles.headerInfo}>
          <p>
            od <span>{post?.author?.name}</span>
          </p>
          <p>{moment(post?.date).format("DD.MM.YYYY")}</p>
          {post?.categories?.[0] && (
            <Link
              href={`/category/${post.categories[0].slug}`}
              className={styles.category}
            >
              {post.categories[0].name}
            </Link>
          )}
        </div>
      </div>
      <div className={styles.postWrap}>
        <div className={styles.post}>
          {post?.featuredImage?.url && (
            <div className={styles.postImageContainer}>
              <Image
                src={post.featuredImage.url}
                alt={post.title || "post-image"}
                width={880}
                height={520}
                style={{ objectFit: "cover" }}
                priority // Lade das Hauptbild priorisiert
              />
            </div>
          )}

          <p className={styles.excerpt}>{post?.excerpt}</p>
          <div className={styles.postText}>
            {post?.content?.raw?.children.map((node, index) =>
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

export default PostDetail;