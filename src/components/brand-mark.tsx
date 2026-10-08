export function BrandMark({ inverted = false }: { inverted?: boolean }) {
  const background = inverted ? "#F7F5F0" : "#111318";
  const foreground = inverted ? "#111318" : "#D8FF62";

  return (
    <svg aria-hidden="true" className="brand-mark" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="14" fill={background} />
      <path d="M14 11v26M24 11v26M34 11v16" stroke={foreground} strokeWidth="3" strokeLinecap="round" />
      <circle cx="34" cy="35" r="2.5" fill={foreground} />
    </svg>
  );
}
