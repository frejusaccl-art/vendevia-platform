export function BrandMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <svg aria-hidden="true" className={inverted ? "brand-mark is-inverted" : "brand-mark"} viewBox="0 0 48 48" fill="none">
      <rect className="brand-mark-bg" width="48" height="48" rx="14" />
      <path className="brand-mark-line" d="M14 11v26M24 11v26M34 11v16" strokeWidth="3" strokeLinecap="round" />
      <circle className="brand-mark-line" cx="34" cy="35" r="2.5" />
    </svg>
  );
}
