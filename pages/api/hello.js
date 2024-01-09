// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const data = await fetch(
    `https://newsapi.org/v2/everything?q=krypto&language=pl&from=2023-01-17&sortBy=publishedAt&apiKey=802bc8322889437a80f9be9198939678`
  ).then((response) => response.json());

  res.json(data);
}
