import { cn } from "@/lib/cn";

export function PhoneArt({
  color,
  lenses = 3,
  className,
  compact = false,
}: {
  color: string;
  lenses?: 2 | 3;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-[170px] w-[84px] rounded-[22px] shadow-[inset_0_0_0_3px_rgba(255,255,255,0.18),0_24px_30px_-18px_rgba(0,0,0,0.5)] animate-float",
        className,
      )}
      style={{ background: color }}
    >
      <div
        className={cn(
          "absolute grid grid-cols-2 place-items-center bg-white/20",
          compact ? "left-1.5 top-1.5 h-8 w-8 rounded-lg p-0.5" : "left-2 top-2 h-11 w-11 rounded-xl p-1",
        )}
      >
        {Array.from({ length: lenses }, (_, i) => (
          <i
            key={i}
            className={cn(
              "block rounded-full border-2 border-neutral-600 bg-black",
              compact ? "h-3 w-3" : "h-4 w-4",
            )}
          />
        ))}
      </div>
    </div>
  );
}
