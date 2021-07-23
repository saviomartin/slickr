import { useEffect, useState } from "react"; // react
import { Toaster } from "react-hot-toast"; // toaster

// css
import "tailwindcss/tailwind.css";
import "../styles/App.css";

// clerk
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { useRouter } from "next/router";
// Router from next
import Router from "next/router";

// showing progress using nprogress
import NProgress from "nprogress";

// clerk frontend API
const clerkFrontendAPI = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

// clerk public Pages
const publicPages = [
  "/",
  "/app",
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
];

function MyApp({ Component, pageProps }) {
  const router = useRouter(); // router

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

  // config nprogress
  NProgress.configure({ showSpinner: false });

  // showing loading and progress
  Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done();
  });

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
