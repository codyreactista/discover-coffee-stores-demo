import { IBM_Plex_Sans } from "@next/font/google";
import Image from "next/image";

import StoreProvider from "@/store/store-context";
import "@/styles/globals.css";
import background from "public/static/background.png";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <div className={`${ibmPlexSans.className} container`}>
        <Image
          src={background}
          alt="background image"
          placeholder="blur"
          fill
        />
        <Component {...pageProps} />
      </div>
    </StoreProvider>
  );
}

export default MyApp;
