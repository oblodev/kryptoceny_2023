// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Use POST" });
  }
  if (
    process.env.REVALIDATE_SECRET &&
    req.query.secret !== process.env.REVALIDATE_SECRET
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const { slug, paths = [] } = req.body || {};

    // homepage
    await res.revalidate("/");

    // post detail (if provided)
    if (slug) {
      await res.revalidate(`/post/${slug}`);
    }

    // any extra paths you want to refresh
    if (Array.isArray(paths)) {
      for (const p of paths) {
        await res.revalidate(p);
      }
    }

    return res.json({ revalidated: true });
  } catch (e) {
    return res.status(500).json({ revalidated: false, error: String(e) });
  }
}



