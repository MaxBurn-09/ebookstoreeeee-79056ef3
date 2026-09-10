import logo from "@/assets/logo-fga.png";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-9 max-h-9 max-w-[168px]",
  md: "h-10 max-h-10 max-w-[min(200px,52vw)] sm:h-12 sm:max-h-12 sm:max-w-[240px]",
  lg: "h-[4.5rem] max-h-[4.5rem] max-w-[min(380px,92vw)] sm:h-[5.25rem] sm:max-h-[5.25rem]",
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
