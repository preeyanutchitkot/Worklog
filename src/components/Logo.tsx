import { Link } from "@tanstack/react-router";

export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-label="LifeOS"
      role="img"
    >
      {/* hexagon shield */}
      <path
        d="M32 3 L57 17 V47 L32 61 L7 47 V17 Z"
        fill="#1A1A1A"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* yellow inner L */}
      <path
        d="M19 16 H30 V42 H45 V52 H19 Z"
        fill="#FFC81F"
      />
      {/* upward arrow */}
      <path
        d="M28 44 L46 26 M38 26 H46 V34"
        fill="none"
        stroke="#FFC81F"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  size = 36,
  showWordmark = true,
  tone = "ink",
  asLink = true,
}: {
  size?: number;
  showWordmark?: boolean;
  tone?: "ink" | "cream";
  asLink?: boolean;
}) {
  const content = (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      {showWordmark && (
        <span className={`font-display text-xl font-bold tracking-tight ${tone === "cream" ? "text-cream" : "text-ink"}`}>
          Life<span className="text-yellow-deep">OS</span>
        </span>
      )}
    </span>
  );
  return asLink ? <Link to="/" className="inline-flex items-center">{content}</Link> : content;
}