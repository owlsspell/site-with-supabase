import NavbarDashboard from "@/app/components/dashboard/create/navbar";
import Loading from "@/app/(home)/loading";
import { Suspense } from "react";

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
