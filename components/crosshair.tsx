export function Crosshair({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const positionClasses = {
    "top-left": "top-3 left-3",
    "top-right": "top-3 right-3",
    "bottom-left": "bottom-3 left-3",
    "bottom-right": "bottom-3 right-3",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} pointer-events-none`}
      aria-hidden="true"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="text-muted-foreground/40"
      >
        <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
