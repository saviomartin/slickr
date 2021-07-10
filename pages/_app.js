import { useState } from "react";
import "tailwindcss/tailwind.css";
import "../styles/App.css";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  const props = {
    darkMode,
    setDarkMode,
  };
  return <Component {...pageProps} {...props} />;
}

export default MyApp;
