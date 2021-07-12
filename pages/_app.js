import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "tailwindcss/tailwind.css";
import "../styles/App.css";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  const props = {
    darkMode,
    setDarkMode,
  };

  return (
    <div
      className={`w-full h-full overflow-x-hidden ${
        darkMode ? "dark" : "light"
      }"`}
    >
      <Toaster position="bottom-right" reverseOrder={false} />
      <Component {...pageProps} {...props} />
    </div>
  );
}

export default MyApp;
