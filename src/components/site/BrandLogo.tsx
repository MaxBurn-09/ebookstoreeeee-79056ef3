import logo from "@/assets/logo-fga.png";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-9 max-h-9 w-auto max-w-[160px]",
  md: "h-11 max-h-11 w-auto max-w-[min(196px,50vw)] lg:h-16 lg:max-h-16 lg:max-w-[268px]",
  lg: "h-[4.25rem] max-h-[4.25rem] w-auto max-w-[min(360px,90vw)] sm:h-20 sm:max-h-20 sm:max-w-[400px]",
} as const;

export function BrandLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: keyof typeof sizes;
}) {
  return (
    <img
      src={logo}
      alt="Future Grow Academy"
      width={1400}
      height={471}
      className={cn("w-auto object-contain object-left", sizes[size], className)}
      decoding="async"
    />
  );
}
