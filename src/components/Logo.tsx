import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/lifeos-logo.png.asset.json";

export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={logoAsset.url}
      width={size}
      height={size}
      alt="LifeOS"
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
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