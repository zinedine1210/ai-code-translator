import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps<{}>) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if(!mounted) setMounted(true)
  }, [mounted])

  if(mounted)
  return (
    <main className={inter.className}>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}

export default App;
