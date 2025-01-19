import { getPoradnikPosts } from "../services/poradnikPostsIndex";
import { getKryptowaluty } from "../services/kryptoInfoData";
import { getFeaturedPost } from "../services/featuredPostIndex";
import { getPosts, getCategories } from "../services";

export async function getServerSideProps({ res }) {
  const baseUrl = "https://www.kryptoceny.pl"; // Replace with your actual domain
  let poradnikRoutes = [];
  let kryptowalutaRoutes = [];
  let kryptoinfoRoutes = [];
  let featuredRoutes = [];
  let postRoutes = [];
  let categoryRoutes = [];

  try {
    // Static Routes
    const staticRoutes = [
      "/",
      "/kryptokursy",
      "/kurskryptowalut",
      "/onas",
      "/politykaprywatnosci",
      "/regulamin",
    ];

    // Fetch poradnik posts
    try {
      console.log("Fetching poradnik posts...");
      const poradnikPosts = await getPoradnikPosts();
      poradnikRoutes = poradnikPosts.map((post) => `/poradnik/${post.node.slug}`);
    } catch (error) {
      console.error("Error fetching poradnik posts:", error);
    }

    // Fetch kryptowaluta data
    try {
      const kryptowalutaResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
      );
      if (kryptowalutaResponse.ok) {
        const kryptowalutaData = await kryptowalutaResponse.json();
        kryptowalutaRoutes = kryptowalutaData.map((krypto) => `/kryptowaluta/${krypto.id}`);
      }
    } catch (error) {
      console.error("Error fetching kryptowaluta data:", error);
    }

    // Fetch kryptoinfo data
    try {
      const kryptoinfoData = await getKryptowaluty();
      kryptoinfoRoutes = kryptoinfoData.map((info) => `/kryptoinfo/${info.node.slug}`);
    } catch (error) {
      console.error("Error fetching kryptoinfo data:", error);
    }

    // Fetch featured posts
    try {
      console.log("Fetching featured posts...");
      const featuredPosts = await getFeaturedPost();
      featuredRoutes = featuredPosts.map((post) => `/featured/${post.node.slug}`);
    } catch (error) {
      console.error("Error fetching featured posts:", error);
    }

    // Fetch all posts
    try {
      console.log("Fetching posts...");
      const posts = await getPosts();
      postRoutes = posts.map((post) => `/post/${post.node.slug}`);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

    // Fetch categories
    try {
      console.log("Fetching categories...");
      const categories = await getCategories();
      categoryRoutes = categories.map((category) => `/category/${category.slug}`);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }

    // Combine all routes
    const allRoutes = [
      ...staticRoutes,
      ...poradnikRoutes,
      ...kryptowalutaRoutes,
      ...kryptoinfoRoutes,
      ...featuredRoutes,
      ...postRoutes,
      ...categoryRoutes,
    ];

    // Generate Sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${route === "/" ? "1.0" : "0.7"}</priority>
  </url>
  `
    )
    .join("")}
</urlset>`;

    // Set response headers and write sitemap
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap.trim());
    res.end();
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }

  return {
    props: {}, // No props are passed to the page
  };
}

export default function Sitemap() {
  return null; // No UI component needed for the sitemap
}
