import Image from "next/image";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex items-center justify-between bg-sidebar-foreground text-sidebar px-20 py-6",
        className,
      )}
      data-slot="footer"
    >
      {/* Powered By Section */}
      <div className="flex items-center gap-2">
        <span className="text-xl ">Powered by</span>
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
      <div className="flex items-center gap-4">
        <span className="text-base font-medium ">Helpline</span>

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
          <span className="text-base">+88 011020202505</span>
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
          <span className="text-base ">support@akij.work</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
