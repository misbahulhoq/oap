import Image from "next/image";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex items-center justify-between bg-[#130b2c] px-20 py-6",
        "shadow-[0px_79px_128px_0px_rgba(192,192,192,0.09),0px_28.836px_46.722px_0px_rgba(192,192,192,0.06),0px_13.999px_22.683px_0px_rgba(192,192,192,0.05),0px_6.863px_11.119px_0px_rgba(192,192,192,0.04),0px_2.714px_4.397px_0px_rgba(192,192,192,0.03)]",
      )}
      data-slot="footer"
    >
      {/* Powered By Section */}
      <div className="flex items-center gap-2">
        <span className="text-xl text-white">Powered by</span>
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
        <span className="text-base font-medium text-white">Helpline</span>

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
          <span className="text-base text-white">+88 011020202505</span>
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
          <span className="text-base text-white">support@akij.work</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
