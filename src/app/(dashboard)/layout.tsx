import { Header } from "@/ui/components/Header";

export default function DashboardLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <>
    <Header/>
    { children }
    </>
  );
}
