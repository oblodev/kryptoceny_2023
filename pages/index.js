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
        <title>
          KryptoCeny.pl | Aktualne kursy kryptowalut, wiadomości i analizy
        </title>
        <meta
          name="description"
          content="KryptoCeny.pl oferuje najnowsze kursy, analizy, i przewodniki dla Bitcoin, Ethereum i innych kryptowalut. Śledź rynkowe trendy i pogłębiaj swoją wiedzę z naszymi artykułami."
        />
        <meta
          name="keywords"
          content="kursy kryptowalut, Bitcoin, Ethereum, analiza kryptowalut, wiadomości kryptowalut, inwestycje"
        />
        <meta
          property="og:title"
          content="KryptoCeny.pl | Aktualne Kursy Kryptowalut, Wiadomości i Analizy"
        />
        <meta
          property="og:description"
          content="Bądź na bieżąco z kursami i analizami kryptowalut. Nasza platforma dostarcza najnowsze wiadomości i przewodniki edukacyjne."
        />

        <meta property="og:url" content="https://kryptoceny.pl" />

        <link rel="canonical" href="https://kryptoceny.pl" />
        <meta
          name="google-site-verification"
          content="WotMEVkt3D6C6zrVbDo1LCqAO6gvsDcPbJH1xfBa-TQ"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Heading stats={stats} />
      <Cryptos cryptoData={cryptoData} />
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
    `https://newsapi.org/v2/everything?q=kryptowaluty+OR+bitcoin+OR+ethereum+OR+web3+OR+cardano+OR+binance+OR+ftx+OR+metaverse+OR+nft+OR+doge+OR+ripple+OR+coinbase+OR+coin+OR+solana+OR+elon+musk+coin+OR+etf+OR+binance&language=pl&from=${formattedDate}&sortBy=publishedAt&apiKey=802bc8322889437a80f9be9198939678`
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
