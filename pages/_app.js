import "../styles/globals.css";
import "../styles/newGlobal.css";
import Layout from "../components/Layout";
import { ThemeProvider } from "../context/ThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
