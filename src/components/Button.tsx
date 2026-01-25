import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  full?: boolean;
};

export default function Button({ variant = "primary", full, className = "", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0B0B]";
  const variants: Record<Variant, string> = {
    primary: "bg-[#9E1B1B] text-white hover:opacity-90 focus:ring-[#9E1B1B]",
    secondary:
      "bg-[#151515] text-[#F5F5F5] border border-[#2A2A2A] hover:bg-[#1C1C1C] focus:ring-[#C89B3C]",
    ghost: "text-[#B5B5B5] hover:text-white hover:bg-[#151515] focus:ring-[#2A2A2A]",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${full ? "w-full" : ""} ${className}`}
    />
  );
}
