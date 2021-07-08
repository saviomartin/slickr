import "tailwindcss/tailwind.css";
import "../styles/App.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
