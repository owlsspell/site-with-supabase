import NavbarDashboard from "@/app/components/events/create/navbar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div> <NavbarDashboard />{children}</div>
    );
}
