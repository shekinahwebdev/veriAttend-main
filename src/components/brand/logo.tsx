import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "mark" | "full";
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { mark: 32, full: { width: 140, height: 36 } },
  md: { mark: 36, full: { width: 160, height: 40 } },
  lg: { mark: 48, full: { width: 200, height: 50 } },
};

export function Logo({
  variant = "mark",
  className,
  href = "#home",
  size = "md",
}: LogoProps) {
  const content =
    variant === "full" ? (
      <Image
        src="/images/veriAttend-main-logo.png"
        alt="VeriAttend"
        width={sizes[size].full.width}
        height={sizes[size].full.height}
        className={cn("h-auto w-auto object-contain", className)}
        priority
      />
    ) : (
      <div className={cn("flex items-center gap-2.5", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-mark.svg"
          alt=""
          width={sizes[size].mark}
          height={sizes[size].mark}
          className="shrink-0 transition-transform group-hover:scale-105"
          aria-hidden
        />
        <span className="text-xl font-bold tracking-tight">VeriAttend</span>
      </div>
    );

  return (
    <Link href={href} className="group inline-flex items-center">
      {content}
    </Link>
  );
}
