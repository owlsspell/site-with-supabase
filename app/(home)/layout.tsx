import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../../styles/global.scss";
import Header from "../components/headers/header";
import StoreProvider from "../StoreProvider";
import 'remixicon/fonts/remixicon.css'
import { Suspense } from "react";
import Loading from "./loading";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Eventbrite",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <StoreProvider>
          <Suspense fallback={<Loading />} >
            <Header />
          </Suspense>
          <Suspense fallback={<Loading />} >
            {children}
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
