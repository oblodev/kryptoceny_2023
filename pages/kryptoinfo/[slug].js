import React from "react";
import {
  getKryptowaluty,
  getKryptowalutyDetails,
} from "../../services/kryptoInfoData";
import styles from "../../styles/kryptoinfo.module.scss";
import Image from "next/image";
import PriceTicker from "../../components/PriceTicker";
import Head from "next/head";

function kryptoinfo({ data }) {
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
    <>
      <Head>
        <title>{`KryptoCeny.pl | Informacje o ${data.title} - Kurs i Szczegóły`}</title>
        <meta
          name="description"
          content={`Dowiedz się więcej o ${data.title}, jego kursie, kapitalizacji i aktualnych trendach. Poznaj szczegółowe informacje o tej kryptowalucie.`}
        />
        <meta
          name="keywords"
          content={`${data.title}, kryptowaluty, kurs, inwestycje`}
        />
        <meta
          property="og:title"
          content={`Informacje o ${data.title} - Kurs i Szczegóły`}
        />
        <meta
          property="og:description"
          content={`Aktualne informacje na temat kryptowaluty ${data.title}.`}
        />
        <meta property="og:image" content={data.kryptoImage.url} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://kryptoceny.pl/kryptoinfo/${data.slug}`}
        />
        <link
          rel="canonical"
          href={`https://kryptoceny.pl/kryptoinfo/${data.slug}`}
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <img
                src={data.kryptoImage.url}
                alt={`${data.title} logo`}
                loading="lazy"
              />
            </div>
            <div className={styles.heading}>
              <h1>{`Informacje o ${data.title} - Kurs i Szczegóły`}</h1>
              <p>{data.desc}</p>
            </div>
          </div>
          <div className={styles.info}>
            <h2>{data.title}</h2>
            {data.content.raw.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemIndex) =>
                getContentFragment(itemIndex, item.text, item)
              );

              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
          </div>
        </div>
        <PriceTicker />
      </div>
    </>
  );
}

export default kryptoinfo;

export async function getStaticProps({ params }) {
  const data = await getKryptowalutyDetails(params.slug);

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const kryptowaluty = await getKryptowaluty();

  return {
    paths: kryptowaluty.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}
