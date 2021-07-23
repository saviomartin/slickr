import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "tailwindcss/tailwind.css";
import "../styles/App.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { useRouter } from "next/router";

const clerkFrontendAPI = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const publicPages = [
  "/",
  "/app",
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("darkMode")) {
      setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
    } else {
      setDarkMode(false);
      window.localStorage.setItem("darkMode", false);
    }
  }, []);

  const props = {
    darkMode,
    setDarkMode,
  };

  return (
    <ClerkProvider
      frontendApi={clerkFrontendAPI}
      navigate={(to) => router.push(to)}
    >
      <div
        className={`w-full h-full overflow-x-hidden ${
          darkMode ? "dark text-white" : "light"
        }"`}
      >
        <Toaster position="bottom-right" reverseOrder={false} />
        {publicPages.includes(router.pathname) ? (
          <Component {...pageProps} {...props} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} {...props} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </div>
    </ClerkProvider>
  );
}

export default MyApp;
