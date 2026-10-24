export function Rotator3D({ items }: { items: readonly [string, string, string, string] }) {
  const height = 56;
  return (
    <div className="scene" aria-label={items.join(", ")} role="img">
      <div className="preserve animate-rotx relative w-full max-w-md" style={{ height }} aria-hidden="true">
        {items.map((item, i) => (
          <div
            key={item}
            className="face absolute inset-0 flex items-center gap-3 rounded-xl bg-ink px-5 font-display text-lg font-extrabold uppercase text-white"
            style={{ transform: `rotateX(${i * 90}deg) translateZ(${height / 2}px)` }}
          >
            <span className="text-brand">●</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
