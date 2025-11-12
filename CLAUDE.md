# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KryptoCeny.pl is a Next.js 12 cryptocurrency information portal providing real-time pricing, news, educational content, and market statistics. The site fetches data from multiple sources: CoinGecko API for crypto prices/stats, Hygraph (GraphCMS) for editorial content, and NewsAPI for aggregated news articles.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Production build
npm run build

# Serve production build locally
npm run start

# Lint codebase (must pass before commits)
npm run lint
```

**Important:** Always run `npm run lint` before committing. The project uses `eslint-config-next` which enforces Next.js best practices and accessibility standards.

## Architecture & Data Flow

### Content Sources

1. **Hygraph GraphQL API** (`services/index.js`, `services/featuredPostIndex.js`, `services/poradnikPostsIndex.js`)
   - Editorial posts, featured articles, and educational guides (poradnik)
   - Endpoint: `https://api-eu-central-1.hygraph.com/v2/cl76l80og092e01ukc84h18n2/master`
   - Uses `graphql-request` library for queries
   - All GraphQL queries fetch up to 500-700 items ordered by `createdAt_DESC`

2. **CoinGecko API** (fetched in page `getStaticProps`)
   - Cryptocurrency market data, prices, charts, and global statistics
   - Main endpoints:
     - `/api/v3/coins/markets` - market cap ranked crypto list with sparklines
     - `/api/v3/global` - global market statistics
     - `/api/v3/coins/{id}` - individual coin details
   - **No API key required** for current endpoints

3. **NewsAPI** (fetched in page `getStaticProps`)
   - Aggregated Polish-language crypto news
   - API key embedded in fetch URL (search for `newsapi.org`)
   - Query targets crypto-related keywords in Polish media

### State Management

Global state is managed via `ThemeContext` (context/ThemeContext.jsx):
- `page`: Current pagination page number
- `show`: Modal/overlay visibility toggle
- `isFetched`: Data fetch completion flag
- `mode`: Display mode toggle (light/dark)

Access via the `useTheme` hook (hooks/useTheme.jsx):
```javascript
import { useTheme } from '../hooks/useTheme';

const { page, changePage, show, changeShow, isFetched, changeFetch } = useTheme();
```

**Note:** The `changeMode` dispatcher exists in the reducer but is NOT exported in the context provider value (line 46 in ThemeContext.jsx).

### Page Structure & Routing

Next.js file-based routing:
- `pages/index.js` - Homepage aggregating all content types
- `pages/kryptokursy.js` - Full crypto price list
- `pages/kryptowaluta/[id].js` - Individual crypto detail page (dynamic route by CoinGecko ID)
- `pages/post/[slug].js` - Blog post detail (Hygraph posts)
- `pages/featured/[slug].js` - Featured article detail (Hygraph featured posts)
- `pages/poradnik/[slug].js` - Educational guide detail (Hygraph poradnik)
- `pages/category/[slug].js` - Category-filtered posts
- `pages/sitemap.xml.js` & `pages/robots.txt.js` - SEO files generated server-side

All pages using external data implement `getStaticProps` with `revalidate: 60` for Incremental Static Regeneration (ISR) - pages rebuild every 60 seconds.

### Component Organization

- **Layout components**: `Layout.js` wraps all pages with `Nav` and `Footer`
- **Data display components**: `Cryptos`, `PriceTicker`, `PriceWidget`, `Stats` handle crypto data
- **Content components**: `Featured`, `PostDetail`, `PoradnikDetail` render CMS content
- **Utility components**: `Heading`, `BackPageBtn`, `NextPageBtn` for navigation/UI

Each component imports its styles from `styles/<ComponentName>.module.scss` using CSS Modules pattern.

### Image Handling

The project uses `next/image` with the `unoptimized` prop to bypass Vercel's Image Optimization API (avoiding free tier quota limits). Images are served directly from their CDN sources:
- Approved domains: CoinGecko, Hygraph CDN, various Polish news outlets
- SVG support enabled with CSP restrictions
- **Key components already updated**: `Cryptos`, `KursyKryptowalut`, `PriceTicker`, `Featured`

**Important**: Always add the `unoptimized` prop to `<Image>` components:
```javascript
import Image from 'next/image';

<Image
  src={crypto.image}
  alt={crypto.name}
  width={32}
  height={32}
  unoptimized  // Required to avoid Vercel image optimization quota
/>
```

This preserves Next.js Image benefits (lazy loading, proper sizing, responsive) without transformation costs.

**Alternative**: Use the wrapper component `components/OptimizedImage.jsx` which automatically adds the `unoptimized` prop:
```javascript
import OptimizedImage from '../components/OptimizedImage';

<OptimizedImage
  src={crypto.image}
  alt={crypto.name}
  width={32}
  height={32}
/>
```

**Remaining components to update** (if image quota issues persist):
- Search for files using `next/image` without `unoptimized` prop
- Run: `grep -r "from 'next/image'" components/ pages/` to find all usage
- Add `unoptimized` prop to each `<Image>` component

## Coding Conventions

- **Component style**: Functional components with hooks (no class components)
- **Indentation**: 2 spaces
- **Quotes**: Double quotes for strings
- **File naming**:
  - Components/pages: PascalCase (e.g., `KursyKryptowalut.jsx`)
  - Hooks: camelCase with `use` prefix (e.g., `useTheme.jsx`)
  - SCSS modules: `<Feature>.module.scss` with hyphenated class names
- **Links**: Always use `next/link` for internal navigation
- **Images**: Always use `next/image` for optimization

## Data Fetching Patterns

### Standard Pattern for Pages

```javascript
export async function getStaticProps({ params }) {
  // Fetch from multiple sources in parallel
  const [hygraphData, coinData, newsData] = await Promise.all([
    getPostDetails(params.slug),
    fetch('https://api.coingecko.com/...').then(r => r.json()),
    fetch('https://newsapi.org/...').then(r => r.json())
  ]);

  return {
    props: { hygraphData, coinData, newsData },
    revalidate: 60 // ISR: rebuild every 60 seconds
  };
}
```

### Dynamic Routes

All dynamic routes (`[slug].js`, `[id].js`) must implement `getStaticPaths`:
```javascript
export async function getStaticPaths() {
  const items = await getAllItems(); // Fetch all possible paths

  return {
    paths: items.map(item => ({ params: { slug: item.slug } })),
    fallback: 'blocking' // or false for 404 on missing paths
  };
}
```

## Common Tasks

### Adding a New GraphQL Query

1. Add query function to appropriate service file (`services/index.js`, `services/featuredPostIndex.js`, or `services/poradnikPostsIndex.js`)
2. Use `gql` template tag from `graphql-request`
3. Follow existing pagination pattern (use `Connection` queries with `edges` and `cursor`)
4. Export function and import in page's `getStaticProps`

### Adding a New Page Route

1. Create page file in `pages/` directory (e.g., `pages/newpage.js`)
2. Create corresponding SCSS module in `styles/` (e.g., `styles/NewPage.module.scss`)
3. Implement `getStaticProps` if page needs data (add `revalidate: 60`)
4. Update `sitemap.xml.js` if page should be indexed
5. Test with `npm run dev` and verify with `npm run lint`

### Working with Crypto Data

CoinGecko API structure (key fields):
```javascript
{
  id: "bitcoin",               // Unique identifier
  symbol: "btc",              // Short symbol
  name: "Bitcoin",            // Display name
  image: "https://...",       // Logo URL
  current_price: 43250.12,    // Current USD price
  market_cap: 847682341234,   // Market capitalization
  market_cap_rank: 1,         // Ranking by market cap
  price_change_percentage_1h: 0.5,
  price_change_percentage_24h: 2.3,
  price_change_percentage_7d: -1.2,
  sparkline_in_7d: { price: [...] }  // 7-day price array for charts
}
```

### Styling Guidelines

- Use SASS modules exclusively (no global styles except `globals.css` and `newGlobal.css`)
- Follow existing breakpoint patterns found in SCSS files
- Prefer flexbox/grid for layouts over absolute positioning
- Maintain responsive design: mobile-first approach with `@media` queries for larger screens

## Known Patterns

### Error Handling

Currently uses defensive checks:
```javascript
{Array.isArray(cryptoData) && cryptoData.length > 0 ? (
  cryptoData.map(...)
) : (
  <p>No data available</p>
)}
```

### Number Formatting

Uses `react-number-format` for currency/number display:
```javascript
import NumberFormat from 'react-number-format';

<NumberFormat
  value={price}
  displayType="text"
  thousandSeparator={true}
  decimalSeparator="."
  prefix="$"
/>
```

### Date Handling

Mix of `moment` and `date-fns` libraries in dependencies. Prefer `date-fns` for new code (tree-shakeable, smaller bundle).

## Deployment

- Target platform: Vercel (optimized for Next.js)
- Node version: 22.x (specified in package.json engines)
- Build output: Static HTML + JSON for ISR pages
- Environment: Production builds should pass lint checks

## Important Notes

- **GraphQL API**: The Hygraph endpoint URL is hardcoded in three service files. If migrating CMS, update all three locations.
- **API Keys**: NewsAPI key is embedded in fetch URLs within `getStaticProps` functions. Search for "newsapi.org" to locate.
- **ISR Timing**: All pages use 60-second revalidation. Consider adjusting per page based on data freshness requirements.
- **Context Bug**: `changeMode` function exists in ThemeContext reducer but is not exposed in provider value (line 46).
