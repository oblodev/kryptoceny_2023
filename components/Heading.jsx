import { useState, useEffect } from 'react';
import styles from '../styles/Heading.module.scss';

// Reusable formatters can be defined outside the component
const numberFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'decimal',
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'percent',
  signDisplay: 'exceptZero',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function Heading({ stats }) {
  const marketCap = stats?.data?.total_market_cap?.usd;
  const marketCapChange = stats?.data?.market_cap_change_percentage_24h_usd;

  // --- ✨ JS Effect Addition ---
  // 1. State to hold the animated value that is actually displayed on screen.
  // We start it at 0.
  const [animatedMarketCap, setAnimatedMarketCap] = useState(0);

  // 2. useEffect to run the animation logic when the component loads and `marketCap` is available.
  useEffect(() => {
    // Don't start the animation until the real marketCap value has been loaded.
    if (marketCap === undefined) return;

    const targetValue = marketCap / 1e12; // The final number we want to reach (in trillions)
    const duration = 1500; // Animation duration in milliseconds (1.5 seconds)
    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Animate the number from 0 to the targetValue with an "ease-out" effect.
      // This makes the animation start fast and slow down at the end.
      const currentValue = progress * targetValue;
      setAnimatedMarketCap(currentValue);

      // If the animation is not yet complete, request the next frame.
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    // Start the animation loop.
    animationFrameId = requestAnimationFrame(step);

    // 3. Cleanup function: This is important! It stops the animation
    // if the component unmounts before the animation finishes.
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [marketCap]); // The effect re-runs if the `marketCap` prop ever changes.


  // Loading state
  if (marketCap === undefined || marketCapChange === undefined) {
    return (
      <header className={styles.container}>
        <p>Ładowanie danych rynkowych...</p>
      </header>
    );
  }

  const changeStyle = marketCapChange >= 0 ? styles.positive : styles.negative;
  const formattedChange = percentFormatter.format(marketCapChange / 100);

  return (
    <header className={styles.container}>
      <p>
        Globalna kapitalizacja rynkowa wynosi dziś
        {/* 4. Use the animated state variable for the display value. */}
        <strong className={styles.value}> ${numberFormatter.format(animatedMarketCap)} biliona</strong>,
        co stanowi zmianę o <span className={changeStyle}>{formattedChange}</span> w ciągu 24h.
      </p>
    </header>
  );
}

export default Heading;