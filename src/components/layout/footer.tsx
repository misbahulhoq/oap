import Image from "next/image";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-sidebar-foreground text-sidebar flex flex-col px-8 py-6 md:flex-row md:items-center md:justify-between xl:px-20",
        className,
      )}
      data-slot="footer"
    >
      {/* Powered By Section */}
      <div className="mb-10 flex flex-col gap-2 md:mb-0 md:flex-row md:items-center">
        <span className="text-xl">Powered by</span>

        <div className="relative h-8 w-[116px]">
          <Image
            src="/assets/akij-resource.svg"
            alt="Akij Resource Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Helpline Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <span className="text-base font-medium">Helpline</span>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6">
            <Image
              src="/assets/icon-phone.svg"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
          </div>
          <a href="tel:+88011020202505" className="text-base">
            +88 011020202505
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6">
            <Image
              src="/assets/icon-mail.svg"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
          </div>
          <a href="mailto:support@akij.work" className="text-base">
            support@akij.work
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
