import NavbarDashboard from "@/app/components/dashboard/create/navbar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div> <NavbarDashboard />{children}</div>
    );
}
