import NavbarDashboard from "@/app/components/dashboard/create/navbar";
import { Suspense } from "react";
import Loading from "../../loading";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div> <NavbarDashboard />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </div>
    );
}
