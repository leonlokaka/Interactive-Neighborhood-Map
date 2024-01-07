"use client";
import "./globals.css";
import Footer from "./common/Footer";
import Header from "./common/Header";
// import { metadata } from "./const";
import MainProvider from "./mainProvider";
import Head from "next/head";
import { metadata } from "./const";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title?.toString()}</title>
        <meta property="og:title" content={metadata.title?.toString()} />
        <meta name="description" content={metadata.description!} key="desc" />
        <meta
          name="og:description"
          content={metadata.description!}
          key="desc"
        />
        <meta name="image" content={metadata.icons?.toString()} />
        <meta name="og:image" content={metadata.icons?.toString()} />
        <meta name="keywords" content={metadata.title?.toString()} />
      </head>
      <body>
        <MainProvider>
          <Header />
          <main
            style={{
              // backgroundColor: defaultTheme.palette.primary.main,
              padding: "40px 0",
            }}
          >
            {children}
          </main>
          <Footer />
        </MainProvider>

        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.GA_MEASUREMENT_ID}');
        `}
        </Script>
      </body>
    </html>
  );
}
