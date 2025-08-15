import type { SVGProps } from "react";

export const ShopeeFoodIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2c-1.657 0-3 1.343-3 3v1H7a3 3 0 00-3 3v8a3 3 0 003 3h10a3 3 0 003-3V9a3 3 0 00-3-3h-2V5c0-1.657-1.343-3-3-3zm-1 4V5a1 1 0 112 0v1h-2z" />
  </svg>
);

export const GrabFoodIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 12a6 6 0 0012 0V6h2v6a8 8 0 11-16 0V6h2v6zM19 6h2v12h-2z" />
    </svg>
);

export const GoFoodIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12A6 6 0 0112 6zm0 3a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
);
