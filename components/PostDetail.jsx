import styles from "../styles/PostDetail.module.scss";
import moment from "moment";
import PriceWidget from "./PriceWidget";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function PostDetail({ post }) {
  // Diese Funktion wandelt die "rohen" Daten von Hygraph in React-Komponenten um.
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    // Formatiert Text basierend auf den obj-Eigenschaften (fett, kursiv, etc.)
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
      if (obj.code) {
        modifiedText = <code key={index}>{text}</code>;
      }
    }

    // Wandelt die verschiedenen Inhaltstypen in HTML-Tags um.
    switch (type) {
      case "heading-two":
        return <h2 key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h2>;
      case "heading-three":
        return <h3 key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case "heading-four":
        return <h4 key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case "paragraph":
        return <p key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      
      // NEU: Unterstützung für Listen
      case "bulleted-list":
        return <ul key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</ul>;
      case "numbered-list":
        return <ol key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</ol>;
      case "list-item-child":
         return <>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</>
      case "list-item":
         return <li key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</li>;

      // NEU: Verwendung von next/image für bessere Performance
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
        <h1>{post.title}</h1>
        <div className={styles.headerInfo}>
          {/* VERBESSERUNG: Sicherer Zugriff auf Daten */}
          <p>
            od <span>{post.author?.name}</span>
          </p>
          <p>{moment(post.date).format("DD.MM.YYYY")}</p>
          {post.categories?.[0] && (
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
          {/* VERBESSERUNG: Stile in SCSS-Datei auslagern für Sauberkeit */}
          {post.featuredImage?.url && (
            <div className={styles.postImageContainer}>
              <Image
                src={post.featuredImage.url}
                alt={post.title || "post-image"}
                width={880}
                height={520}
                style={{ objectFit: 'cover' }} // objectFit als Prop für next/image v13+
              />
            </div>
          )}

          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.postText}>
            {post.content?.raw?.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemIndex) =>
                // Wichtig: Hier wird der Typ des Kind-Elements übergeben, falls es z.B. ein Link ist
                getContentFragment(itemIndex, item.text, item, item.type)
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