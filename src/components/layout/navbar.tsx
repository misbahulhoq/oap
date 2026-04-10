import Image from "next/image";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav
      className={cn(
        "relative flex h-20 w-full items-center bg-background px-20",
        "shadow-[0px_79px_128px_0px_rgba(192,192,192,0.09),0px_28.836px_46.722px_0px_rgba(192,192,192,0.06),0px_13.999px_22.683px_0px_rgba(192,192,192,0.05),0px_6.863px_11.119px_0px_rgba(192,192,192,0.04),0px_2.714px_4.397px_0px_rgba(192,192,192,0.03)]",
        className,
      )}
      data-slot="navbar"
    >
      {/* Logo */}
      <div className="relative h-8 w-[116px]">
        <Image
          src="/assets/logo.svg"
          alt="Akij Resource Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Centered Title */}
      <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold text-foreground">
        Akij Resource
      </h1>
    </nav>
  );
}

export default Navbar;
