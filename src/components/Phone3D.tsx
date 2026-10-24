import { cn } from "@/lib/cn";

const W = 210;
const H = 430;
const D = 22;

export function Phone3D({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("scene", className)}>
      <div className="preserve animate-float">
        <div
          className="preserve animate-spin3d relative"
          style={{ width: W, height: H }}
        >
          <div
            className="face absolute inset-0 overflow-hidden rounded-[38px] border-[6px] border-neutral-800 bg-gradient-to-br from-brand to-ink"
            style={{ transform: `translateZ(${D / 2}px)` }}
          >
            <div className="mx-auto mt-3 h-6 w-20 rounded-full bg-black" />
            <p className="mt-10 text-center font-display text-6xl font-extrabold text-white">9:41</p>
            <p className="mt-2 text-center text-xs font-bold uppercase tracking-widest text-white/80">
              Max Gadgets
            </p>
            <div className="mx-auto mt-14 grid w-40 grid-cols-4 gap-3">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} className="block h-8 w-8 rounded-lg bg-white/25" />
              ))}
            </div>
          </div>
          <div
            className="face absolute inset-0 rounded-[38px] border-[6px] border-neutral-700 bg-gradient-to-br from-neutral-600 to-neutral-900"
            style={{ transform: `rotateY(180deg) translateZ(${D / 2}px)` }}
          >
            <div className="absolute left-4 top-4 grid h-24 w-24 grid-cols-2 place-items-center rounded-3xl bg-white/15 p-2">
              <i className="block h-9 w-9 rounded-full border-4 border-neutral-500 bg-black" />
              <i className="block h-9 w-9 rounded-full border-4 border-neutral-500 bg-black" />
              <i className="block h-9 w-9 rounded-full border-4 border-neutral-500 bg-black" />
              <i className="block h-4 w-4 rounded-full bg-white/80" />
            </div>
          </div>
          <div
            className="face absolute top-[30px] rounded-sm bg-neutral-700"
            style={{ width: D, height: H - 60, left: (W - D) / 2, transform: `rotateY(90deg) translateZ(${W / 2 - 2}px)` }}
          />
          <div
            className="face absolute top-[30px] rounded-sm bg-neutral-700"
            style={{ width: D, height: H - 60, left: (W - D) / 2, transform: `rotateY(-90deg) translateZ(${W / 2 - 2}px)` }}
          />
        </div>
      </div>
    </div>
  );
}
