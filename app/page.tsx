import { Header } from "@/components/shared/header";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <>
      <Button variant={"outline"}>Click me</Button>
      <ThemeToggle />
    </>
    </div>
  );
}
