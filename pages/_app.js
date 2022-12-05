import { IBM_Plex_Sans } from "@next/font/google";

import StoreProvider from "@/store/store-context";
import "@/styles/globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <div className={ibmPlexSans.className}>
        <Component {...pageProps} />
      </div>
    </StoreProvider>
  );
}

export default MyApp;
