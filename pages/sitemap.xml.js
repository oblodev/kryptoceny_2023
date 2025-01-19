export async function getServerSideProps({ res }) {
    const baseUrl = "https://kryptoceny.pl"; // Replace with your actual domain
  
    // Static routes
    const staticRoutes = [
      "/",
      "/kryptokursy",
      "/kurskryptowalut",
      "/onas",
      "/politykaprywatnosci",
      "/regulamin",
    ];
  
    // Dynamic routes: poradnik posts
    const poradnikPosts = await fetch(`${baseUrl}/api/poradnik/posts`); // Replace with your API or data fetch logic
    const poradnikRoutes = (await poradnikPosts.json()).map((post) => `/poradnik/${post.slug}`);
  
    // Dynamic routes: kryptowaluta
    const kryptowalutaResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
    );
    const kryptowalutaData = await kryptowalutaResponse.json();
    const kryptowalutaRoutes = kryptowalutaData.map((krypto) => `/kryptowaluta/${krypto.id}`);
  
    // Dynamic routes: kryptoinfo
    const kryptoinfoResponse = await fetch(`${baseUrl}/api/kryptoInfo`); // Replace with your API or data fetch logic
    const kryptoinfoRoutes = (await kryptoinfoResponse.json()).map((info) => `/kryptoinfo/${info.slug}`);
  
    // Combine all routes
    const allRoutes = [...staticRoutes, ...poradnikRoutes, ...kryptowalutaRoutes, ...kryptoinfoRoutes];
  
    // Generate sitemap XML
    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allRoutes
          .map((route) => `
            <url>
              <loc>${baseUrl}${route}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <priority>${route === "/" ? "1.0" : "0.7"}</priority>
            </url>
          `)
          .join("")}
      </urlset>
    `;
  
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  
    return {
      props: {}, // No props are passed to the page
    };
  }
  
  export default function Sitemap() {
    return null; // No UI component needed for the sitemap
  }
  