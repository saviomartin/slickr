// head
import Head from "next/head";

const MetaTags = () => {
  return (
    <Head>
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="theme-color" content="#d73e87" />

      <title>
        Slickr - Try the most powerful cover image designer for hashnode blog
      </title>
      <meta
        name="description"
        content="Enjoy creating cover image for your hashnode blog like never before, get started in seconds 🎉"
      />
      <meta
        name="keywords"
        content="slickr, slickr editor, cover image editor, hashnode cover image editor, slick, hashnode, canva, canva cover image, slickr covers, slickr github, slicke producthunt, slickr by savio, slick, slickr savio, savio slickr"
      />
      <link rel="apple-touch-icon" href="/assets/logo.png" />
      <link rel="icon" href="/favicon.ico" />

      {/* Primary Meta Tags */}
      <meta
        name="title"
        content="Slickr - Try the most powerful cover image designer for hashnode blog"
      />
      <meta
        name="description"
        content="Enjoy creating cover image for your hashnode blog like never before, get started in seconds 🎉"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Slickr - Try the most powerful cover image designer for hashnode blog"
      />
      <meta
        property="og:description"
        content="Enjoy creating cover image for your hashnode blog like never before, get started in seconds 🎉"
      />
      <meta
        property="og:image"
        content="https://slickr.vercel.app/assets/cover.png"
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:title"
        content="Slickr - Try the most powerful cover image designer for hashnode blog"
      />
      <meta
        property="twitter:description"
        content="Enjoy creating cover image for your hashnode blog like never before, get started in seconds 🎉"
      />
      <meta
        property="twitter:image"
        content="https://slickr.vercel.app/assets/cover.png"
      />
    </Head>
  );
};

export default MetaTags;
