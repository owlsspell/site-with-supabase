import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../../styles/global.scss";
import StoreProvider from "../StoreProvider";
import DashboardHeader from "../components/headers/dashboard-header";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
    title: "Create Next App",
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
                <DashboardHeader />
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
