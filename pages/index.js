import Head from "next/head";
import Cryptos from "../components/Cryptos";
import Featured from "../components/Featured";
import Header from "../components/Header";
import Info from "../components/Info";
import MoreFeatured from "../components/MoreFeatured";
import Poradnik from "../components/Poradnik";
import Stats from "../components/Stats";
import News from "../components/News";
import { getFeaturedPost } from "../services/featuredPostIndex";
import { getPosts } from "../services";
import { getPoradnikPosts } from "../services/poradnikPostsIndex";
import styles from "../styles/Home.module.css";
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";
import PriceTicker from "../components/PriceTicker";
import Heading from "../components/Heading";

export default function Home({
  stats,
  featuredPost,
  posts,
  poradnikPosts,
  cryptoData,
  newsData,
}) {
  const analytics = Analytics({
    app: "KryptoCeny",
    plugins: [
      googleAnalytics({
        measurementIds: ["G-WDF9PPGR3K"],
      }),
    ],
  });

  analytics.page();

  return (
    <div className={styles.container}>
      <Head>
        <title>Aktualne kursy kryptowalut || KryptoCeny.pl</title>
        <meta
          name="Aktualne kursy kryptowalut"
          content="Odkryj KryptoCeny.pl - Twoje źródło aktualnych informacji o kryptowalutach. Śledź na bieżąco kursy, trendy rynkowe oraz analizy głównych walut cyfrowych, takich jak Bitcoin, Ethereum i inne. Zapoznaj się z naszymi artykułami, aktualnościami oraz przewodnikami edukacyjnymi, aby pogłębić swoją wiedzę o świecie kryptowalut. Niezależnie od tego, czy jesteś doświadczonym inwestorem, czy początkującym entuzjastą, nasza platforma oferuje cenne wskazówki i dane, które pomogą Ci nawigować w dynamicznym świecie inwestycji w krypto."
        />
        <meta
          name="google-site-verification"
          content="WotMEVkt3D6C6zrVbDo1LCqAO6gvsDcPbJH1xfBa-TQ"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Heading stats={stats} />
      <Cryptos cryptoData={cryptoData} />
      <Featured featuredPost={featuredPost} />
      <MoreFeatured posts={posts} />
      <Stats stats={stats} />
      <News newsData={newsData} />
      <Poradnik poradnikPosts={poradnikPosts} />
      <Info />
      <PriceTicker />
    </div>
  );
}

export async function getStaticProps() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 2);
  const isoString = yesterday.toISOString();
  const formattedDate = isoString.slice(0, 10);

  const resStat = await fetch(`https://api.coingecko.com/api/v3/global`);
  const statData = await resStat.json();

  const featuredPost = (await getFeaturedPost()) || [];

  const posts = (await getPosts()) || [];

  const poradnikPosts = (await getPoradnikPosts()) || [];

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );
  const data = await res.json();

  const resNews = await fetch(
    `https://newsapi.org/v2/everything?q=kryptowaluty+OR+bitcoin+OR+ethereum+OR+web3+OR+cardano+OR+binance+OR+ftx+OR+metaverse+OR+nft+OR+doge+OR+ripple+OR+solana+OR+elon+musk+coin+OR+etf+OR+binance&language=pl&from=${formattedDate}&sortBy=publishedAt&apiKey=802bc8322889437a80f9be9198939678`
  );
  const newsData = await resNews.json();

  return {
    props: {
      stats: statData,
      featuredPost,
      posts,
      poradnikPosts,
      cryptoData: data,
      newsData,
    },
    revalidate: 30,
  };
}
