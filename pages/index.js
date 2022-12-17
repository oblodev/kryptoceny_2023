import Head from "next/head";
import Cryptos from "../components/Cryptos";
import Featured from "../components/Featured";
import Header from "../components/Header";
import Info from "../components/Info";
import MoreFeatured from "../components/MoreFeatured";
import Poradnik from "../components/Poradnik";
import Stats from "../components/Stats";
import { getFeaturedPost } from "../services/featuredPostIndex";
import { getPosts } from "../services";
import { getPoradnikPosts } from "../services/poradnikPostsIndex";
import styles from "../styles/Home.module.css";
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

export default function Home({
  stats,
  featuredPost,
  posts,
  poradnikPosts,
  cryptoData,
}) {
  const analytics = Analytics({
    app: "KryptoKurs",
    plugins: [
      googleAnalytics({
        measurementIds: ["G-FWJK9L9RED"],
      }),
    ],
  });

  analytics.page();
  return (
    <div className={styles.container}>
      <Head>
        <title>Aktualne kursy kryptowalut - KryptoKurs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Cryptos cryptoData={cryptoData} />
      <Stats stats={stats} />
      <Featured featuredPost={featuredPost} />
      <MoreFeatured posts={posts} />
      <Poradnik poradnikPosts={poradnikPosts} />
      <Info />
    </div>
  );
}

export async function getStaticProps() {
  const resStat = await fetch(`https://api.coingecko.com/api/v3/global`);
  const statData = await resStat.json();

  const featuredPost = (await getFeaturedPost()) || [];

  const posts = (await getPosts()) || [];

  const poradnikPosts = (await getPoradnikPosts()) || [];

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );
  const data = await res.json();

  return {
    props: {
      stats: statData,
      featuredPost,
      posts,
      poradnikPosts,
      cryptoData: data,
    },
    revalidate: 3,
  };
}
