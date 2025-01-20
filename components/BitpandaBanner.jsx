import React from "react";

const BitpandaBanner = () => {
  return (
    <div style={{ marginTop: "4rem", display: "flex", justifyContent: "center" }}>
        
      {/* Desktop Banner */}
      <div className="banner-desktop">
        <a href="https://www.bitpanda.com/?ref=349859561128416533">
          <img
            height="250px"
            width="970px"
            src="https://bitpanda-broker-production-assets.s3-eu-west-1.amazonaws.com/affiliate/crypto/Bitpanda_970x250_A_PL.jpg"
            alt="banner"
          />
        </a>
      </div>

      {/* Mobile Banner */}
      <div className="banner-mobile">
        <a href="https://www.bitpanda.com/?ref=349859561128416533&tag=kryptoceny">
          <img
            height="250px"
            width="300px"
            src="https://bitpanda-broker-production-assets.s3-eu-west-1.amazonaws.com/affiliate/crypto/Bitpanda_300x250_A_PL.jpg"
            alt="banner"
          />
        </a>
      </div>

      {/* Styling */}
      <style jsx>{`
        .banner-desktop {
          display: flex;
        }
        .banner-mobile {
          display: none;
        }
        @media (max-width: 768px) {
          .banner-desktop {
            display: none;
          }
          .banner-mobile {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;