import type { SVGProps } from "react";

const paths = {
  home: "M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6",
  building: "M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18",
  terrain: "M3 20l6-10 4 6 3-4 5 8z",
  expand: "M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  check: "M5 12.5l4.5 4.5L19 7",
  lock: "M6 11h12v9H6zM8 11V8a4 4 0 018 0v3",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6",
  users: "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5M16 4.5a3.5 3.5 0 010 6.5M18 14.8c2.4.6 4 2.2 4 5.2",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4",
  arrow: "M5 12h14M13 6l6 6-6 6",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  bell: "M6 17V11a6 6 0 0112 0v6l2 2H4zM10 21h4",
  chart: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  file: "M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6",
  sliders: "M4 7h10M18 7h2M4 17h2M10 17h10M14 5v4M8 15v4",
  help: "M12 21a9 9 0 100-18 9 9 0 000 18zM9.5 9.5a2.5 2.5 0 115 0c0 1.6-2.5 2-2.5 4M12 17v.5",
  inbox: "M3 13l3-8h12l3 8v6H3zM3 13h5l1 3h6l1-3h5",
  message: "M4 5h16v11H9l-5 4z",
  card: "M3 6h18v12H3zM3 10h18M7 15h3",
  refresh: "M20 11a8 8 0 00-14-4M4 13a8 8 0 0014 4M5 3v4h4M19 21v-4h-4",
  headset: "M4 14v-2a8 8 0 0116 0v2M4 14h3v5H4zM17 14h3v5h-3zM17 19c0 1-2 2-5 2",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  phone: "M6 3h4l2 5-2.5 1.5a11 11 0 005 5L16 12l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 013-2z",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
  x: "M6 6l12 12M18 6L6 18",
  down: "M6 9l6 6 6-6",
  right: "M9 6l6 6-6 6",
  left: "M15 6l-6 6 6 6",
  pin: "M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  clipboard: "M8 4h8v3H8zM6 5H5v16h14V5h-1M9 12h6M9 16h4",
  handshake: "M3 12l4-4 4 2 3-2 4 3 3-1M7 8l-4 4 5 6 3-1 3 2 2-2 4-4M10 17l2 2",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  logout: "M10 4H5v16h5M15 8l4 4-4 4M19 12H9",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
      width={size}
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
