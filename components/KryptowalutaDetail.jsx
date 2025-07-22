import styles from "../styles/KryptowalutaDetail.module.scss";
import Image from "next/image";
import Link from "next/link";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

// Helper for formatting numbers consistently
const formatters = {
  usd: new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'USD' }),
  usdCompact: new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2 }),
  percent: new Intl.NumberFormat('pl-PL', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  number: new Intl.NumberFormat('pl-PL')
};

// Reusable component for the stats sidebar
function StatItem({ label, value, note = '' }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value} {note}</span>
    </div>
  );
}

function KryptowalutaDetail({ krypto }) {
  // Process data for the 7-day chart
  const chartData = krypto?.market_data?.sparkline_7d?.price
    ?.map((price, index) => ({
      day: index + 1,
      cena: price,
    })) || [];

  const change24h = krypto.market_data.price_change_percentage_24h;

  return (
    <main className={styles.container}>
      {/* --- Dashboard Header --- */}
      <header className={styles.dashboardHeader}>
        <Image src={krypto.image.large} alt={`${krypto.name} logo`} height="50px" width="50px" />
        <div className={styles.titleGroup}>
          <h1>{krypto.name}</h1>
          <span>{krypto.symbol.toUpperCase()}</span>
        </div>
        <div className={styles.priceGroup}>
          <p className={styles.currentPrice}>{formatters.usd.format(krypto.market_data.current_price.usd)}</p>
          <span className={change24h > 0 ? styles.positive : styles.negative}>
            {formatters.percent.format(change24h / 100)} (24h)
          </span>
        </div>
      </header>
      
      {/* --- Dashboard Grid --- */}
      <div className={styles.dashboardGrid}>
        {/* --- Main Content (Left Column) --- */}
        <div className={styles.mainContent}>
          <section className={styles.chartContainer}>
            <h3>Wykres Ceny (7 dni)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="day" tickFormatter={(tick) => `Dzień ${tick}`} stroke="#6c757d" />
                <YAxis orientation="right" stroke="#6c757d" tickFormatter={(value) => formatters.usd.format(value)} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                  formatter={(value) => [formatters.usd.format(value), 'Cena']}
                  labelFormatter={(label) => `Dzień ${label}`}
                />
                <Line type="monotone" dataKey="cena" stroke="#5e5ce6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <section className={styles.infoText}>
            <h3>Informacje o {krypto.name}</h3>
            <p>
              Aktualny kurs <strong>{krypto.name}</strong> wynosi <strong>{formatters.usd.format(krypto.market_data.current_price.usd)}</strong>. 
              W ciągu ostatnich 24 godzin kurs {change24h > 0 ? "zyskał" : "stracił"} na wartości <strong>{formatters.percent.format(change24h / 100)}</strong>.
              Kryptowaluta plasuje się na <strong>#{krypto.market_cap_rank}</strong> miejscu w globalnym rankingu.
            </p>
          </section>
        </div>

        {/* --- Sidebar (Right Column) --- */}
        <aside className={styles.statsPanel}>
          <h3>Kluczowe Dane</h3>
          <StatItem label="Kapitalizacja rynkowa" value={formatters.usdCompact.format(krypto.market_data.market_cap.usd)} />
          <StatItem label="Wolumen (24h)" value={formatters.usdCompact.format(krypto.market_data.total_volume.usd)} />
          <StatItem label="Ilość w obiegu" value={formatters.number.format(krypto.market_data.circulating_supply)} note={krypto.symbol.toUpperCase()} />
          {krypto.market_data.total_supply && <StatItem label="Ilość całkowita" value={formatters.number.format(krypto.market_data.total_supply)} note={krypto.symbol.toUpperCase()} />}
          <StatItem label="ATH (Najwyższy kurs)" value={formatters.usd.format(krypto.market_data.ath.usd)} />
          <StatItem label="Zmiana od ATH" value={formatters.percent.format(krypto.market_data.ath_change_percentage.usd / 100)} />
        </aside>
      </div>

      <div className={styles.backButtonContainer}>
        <Link href="/kurskryptowalut">
          <a className={styles.backButton}>Wróć do listy</a>
        </Link>
      </div>
    </main>
  );
}

export default KryptowalutaDetail;