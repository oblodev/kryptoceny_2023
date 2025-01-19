export async function getServerSideProps({ res }) {
    const content = `
      User-agent: *
      Allow: /
      Disallow: /private
      Sitemap: https://kryptoceny.pl/sitemap.xml
    `;
  
    res.setHeader("Content-Type", "text/plain");
    res.write(content);
    res.end();
  
    return {
      props: {},
    };
  }
  
  export default function Robots() {
    return null; 
  }