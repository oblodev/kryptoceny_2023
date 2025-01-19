import { getPoradnikPosts } from "../services/poradnikPostsIndex";
import { getKryptowaluty } from "../services/kryptoInfoData";


export async function getServerSideProps({ res }) {
    const baseUrl = "https://www.kryptoceny.pl"; // Replace with your actual domain
    let poradnikRoutes = [];
    let kryptowalutaRoutes = [];
    let kryptoinfoRoutes = [];
  
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
        console.log("Poradnik posts fetched:", poradnikPosts);
    
        // Map the poradnik posts to their routes
        poradnikRoutes = poradnikPosts.map((post) => `/poradnik/${post.node.slug}`);
        console.log("Poradnik routes:", poradnikRoutes);
      } catch (error) {
        console.error("Error fetching poradnik posts:", error);
      }
  
      // Fetch kryptowaluta data
      const kryptowalutaResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
      );
      if (kryptowalutaResponse.ok) {
        const kryptowalutaData = await kryptowalutaResponse.json();
        kryptowalutaRoutes = kryptowalutaData.map((krypto) => `/kryptowaluta/${krypto.id}`);
      }
  
      // Fetch kryptoinfo data
      const kryptoinfoRoutes = await getKryptowaluty().then((data) =>
        data.map((info) => `/kryptoinfo/${info.node.slug}`)
      );
      
  
      // Combine all routes
      const allRoutes = [...staticRoutes, ...poradnikRoutes, ...kryptowalutaRoutes, ...kryptoinfoRoutes];
  
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
      res.write(sitemap.trim()); // Use `.trim()` to remove extra whitespace
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
  