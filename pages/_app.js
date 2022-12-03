import localFont from "@next/font/local";

import StoreProvider from "@store/store-context";
import "@styles/globals.css";

const IBMPlexSans = localFont({
  src: [
    {
      path: "../public/fonts/IBMPlexSans-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <div className={IBMPlexSans.className}>
        <Component {...pageProps} />
      </div>
    </StoreProvider>
  );
}

export default MyApp;
