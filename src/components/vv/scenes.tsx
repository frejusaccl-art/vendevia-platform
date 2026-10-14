/*
 * Illustrations vectorielles des biens et des intérieurs.
 * Elles remplacent les photos de la maquette : chaque scène peut être remplacée
 * par une vraie photo (next/image) sans toucher à la mise en page.
 */

export type SceneKind = "villa" | "cabin" | "interior" | "office" | "door" | "facade" | "skyline";

function Pine({ x, y, s = 1, c = "#1f5a43" }: { x: number; y: number; s?: number; c?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect fill="#5a4332" height="34" width="8" x="-4" y="0" />
      <path d="M0 -150 L38 -70 H16 L48 -10 H-48 L-16 -70 H-38 Z" fill={c} />
    </g>
  );
}

function Round({ x, y, r, c = "#3f8a5f" }: { x: number; y: number; r: number; c?: string }) {
  return (
    <g>
      <rect fill="#5a4332" height={r} width="10" x={x - 5} y={y} />
      <circle cx={x} cy={y} fill={c} r={r} />
      <circle cx={x - r * 0.35} cy={y - r * 0.2} fill="#ffffff" opacity=".08" r={r * 0.55} />
    </g>
  );
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#b6dcf0" />
        <stop offset="1" stopColor="#eef4ee" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#b9d8e4" />
        <stop offset="1" stopColor="#6f9fb2" />
      </linearGradient>
      <linearGradient id={`${id}-water`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#59c3d1" />
        <stop offset="1" stopColor="#2f93a8" />
      </linearGradient>
    </defs>
  );
}

function Villa() {
  return (
    <>
      <Defs id="villa" />
      <rect fill="url(#villa-sky)" height="600" width="800" />
      <ellipse cx="640" cy="120" fill="#fff" opacity=".7" rx="120" ry="22" />
      <ellipse cx="180" cy="90" fill="#fff" opacity=".6" rx="90" ry="16" />
      <path d="M0 360 C150 320 260 350 400 330 C560 308 680 340 800 322 V600 H0 Z" fill="#5f9a6f" />
      <Pine s={1.5} x={640} y={400} />
      <Pine c="#23684c" s={1.1} x={730} y={390} />
      <Pine s={1.25} x={90} y={410} />
      <Round c="#4f9a68" r={46} x={180} y={370} />
      <rect fill="#e9e4d6" height="14" width="640" x="80" y="500" />
      <rect fill="#f4f0e6" height="120" width="420" x="160" y="400" />
      <rect fill="#f9f6ee" height="26" width="470" x="130" y="374" />
      <rect fill="#b98a5a" height="96" width="150" x="400" y="304" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect fill="#9c6f43" height="96" key={i} width="3" x={410 + i * 14} y="304" />
      ))}
      <rect fill="#f9f6ee" height="22" width="210" x="360" y="282" />
      <rect fill="url(#villa-glass)" height="84" width="190" x="180" y="414" />
      <rect fill="url(#villa-glass)" height="70" width="120" x="430" y="414" />
      <rect fill="#2b3f3a" height="2" width="190" x="180" y="456" />
      <path d="M0 520 H800 V600 H0 Z" fill="#d9d2bf" />
      <path d="M120 528 H700 L780 600 H40 Z" fill="url(#villa-water)" />
      <path d="M170 548 H640 M120 572 H700" opacity=".35" stroke="#fff" strokeWidth="3" />
    </>
  );
}

function Cabin() {
  return (
    <>
      <Defs id="cabin" />
      <rect fill="url(#cabin-sky)" height="600" width="800" />
      <path d="M0 330 C180 280 320 320 460 290 C620 255 720 300 800 280 V600 H0 Z" fill="#2f6b4c" />
      <Pine c="#1d5a41" s={2} x={90} y={470} />
      <Pine c="#256b4c" s={1.7} x={700} y={470} />
      <Pine c="#1d5a41" s={1.3} x={760} y={430} />
      <Round c="#4f9a68" r={44} x={60} y={520} />
      <rect fill="#6d7f56" height="120" width="800" x="0" y="480" />
      <rect fill="#c18a55" height="170" width="330" x="235" y="320" />
      {Array.from({ length: 11 }).map((_, i) => (
        <rect fill="#a8733f" height="170" key={i} width="2" x={265 + i * 28} y="320" />
      ))}
      <path d="M205 330 L400 200 L595 330 Z" fill="#4e4034" />
      <path d="M205 330 L400 200 L430 220 L235 340 Z" fill="#3d3128" opacity=".35" />
      <rect fill="#f6d58b" height="84" width="96" x="270" y="372" />
      <rect fill="#f6d58b" height="64" width="96" x="440" y="372" />
      <rect fill="#6b4a2f" height="104" width="62" x="360" y="386" />
      <path d="M270 414 H366 M318 372 V456 M440 404 H536 M488 372 V436" stroke="#6b4a2f" strokeWidth="4" />
      <rect fill="#8a6a4a" height="16" width="400" x="200" y="490" />
      <ellipse cx="400" cy="560" fill="#5e7a48" rx="320" ry="26" />
    </>
  );
}

function Interior() {
  return (
    <>
      <rect fill="#efe6d4" height="600" width="800" />
      <rect fill="#d9c7a6" height="150" width="800" y="450" />
      <rect fill="#d8ead8" height="290" rx="6" width="360" x="360" y="70" />
      <path d="M360 300 C440 250 520 280 560 230 C620 170 680 200 720 190 V360 H360 Z" fill="#7fb08a" />
      <circle cx="640" cy="130" fill="#fff6c9" r="30" />
      <path d="M540 70 V360 M360 215 H720" stroke="#faf6ea" strokeWidth="10" />
      <rect fill="none" height="290" rx="6" stroke="#faf6ea" strokeWidth="12" width="360" x="360" y="70" />
      <rect fill="#cdb48e" height="92" rx="16" width="320" x="70" y="360" />
      <rect fill="#bfa27a" height="60" rx="14" width="320" x="70" y="318" />
      <rect fill="#e7d3a9" height="30" rx="10" width="70" x="95" y="332" />
      <rect fill="#e7d3a9" height="30" rx="10" width="70" x="305" y="332" />
      <rect fill="#8a6a4a" height="40" width="10" x="90" y="452" />
      <rect fill="#8a6a4a" height="40" width="10" x="360" y="452" />
      <ellipse cx="300" cy="520" fill="#e6d8bd" rx="260" ry="34" />
      <rect fill="#6b4f33" height="8" width="150" x="520" y="470" />
      <rect fill="#6b4f33" height="46" width="8" x="535" y="470" />
      <rect fill="#6b4f33" height="46" width="8" x="655" y="470" />
      <path d="M700 380 C690 330 740 320 745 360 C770 340 790 380 760 400 Z" fill="#3f8a5f" />
      <rect fill="#b58a5c" height="70" rx="8" width="46" x="705" y="400" />
      <path d="M180 70 V150" stroke="#8a6a4a" strokeWidth="4" />
      <path d="M130 150 H230 L214 200 H146 Z" fill="#f3e2b0" />
    </>
  );
}

function Office() {
  return (
    <>
      <rect fill="#e8eee9" height="600" width="800" />
      <rect fill="#cfe2e6" height="260" width="420" x="380" y="50" />
      <path d="M380 310 V210 H430 V150 H490 V230 H540 V120 H610 V260 H680 V180 H800 V310 Z" fill="#8bb2bb" />
      <path d="M590 50 V310 M380 180 H800" stroke="#f4f7f4" strokeWidth="8" />
      <rect fill="#c9a97f" height="18" width="560" x="120" y="400" />
      <rect fill="#9b7b52" height="130" width="12" x="150" y="418" />
      <rect fill="#9b7b52" height="130" width="12" x="620" y="418" />
      <rect fill="#2f3f3b" height="110" rx="6" width="190" x="280" y="290" />
      <rect fill="#cfe9e0" height="92" width="172" x="289" y="298" />
      <path d="M255 400 H475 L460 412 H270 Z" fill="#aab5b1" />
      <circle cx="220" cy="210" fill="#e5b99a" r="38" />
      <path d="M170 215 C170 150 270 150 270 215 C255 190 190 190 170 215 Z" fill="#4a3426" />
      <path d="M160 400 C150 300 290 300 280 400 Z" fill="#124a3d" />
      <rect fill="#fff" height="30" rx="6" width="22" x="560" y="372" />
      <path d="M690 400 C680 350 730 340 735 380 C760 360 780 400 750 420 Z" fill="#3f8a5f" />
    </>
  );
}

function Door() {
  return (
    <>
      <rect fill="#ddc8a8" height="600" width="800" />
      <rect fill="#e9d9bd" height="600" width="260" x="0" />
      <rect fill="#6b4a2f" height="460" rx="4" width="250" x="270" y="60" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect fill="#5a3d25" height="460" key={i} width="3" x={290 + i * 28} y="60" />
      ))}
      <circle cx="486" cy="300" fill="#e8d7a5" r="9" />
      <rect fill="#cbb48c" height="30" width="320" x="235" y="520" />
      <rect fill="#b79f78" height="60" width="800" y="540" />
      <rect fill="#b9855d" height="80" rx="10" width="60" x="620" y="440" />
      <path d="M650 440 C610 380 640 330 660 360 C670 310 720 340 700 400 C730 390 740 430 700 440 Z" fill="#3f8a5f" />
      <path d="M690 440 C700 360 770 330 770 270 C790 330 780 400 720 440 Z" fill="#2f7a52" />
      <path d="M0 540 H800" stroke="#fff" opacity=".25" strokeWidth="3" />
    </>
  );
}

function Facade() {
  return (
    <>
      <Defs id="facade" />
      <rect fill="url(#facade-sky)" height="600" width="800" />
      <path d="M0 420 C200 390 400 410 800 380 V600 H0 Z" fill="#5f9a6f" />
      <Pine c="#1d5a41" s={1.8} x={90} y={470} />
      <Pine c="#256b4c" s={1.5} x={720} y={470} />
      <rect fill="#efe7d4" height="170" width="460" x="170" y="330" />
      <rect fill="#f8f3e6" height="26" width="500" x="150" y="308" />
      <rect fill="#d49a6a" height="90" width="260" x="270" y="240" />
      <path d="M250 240 H550 L520 214 H280 Z" fill="#9c5f3b" />
      <rect fill="url(#facade-glass)" height="74" width="200" x="200" y="360" />
      <rect fill="url(#facade-glass)" height="74" width="120" x="450" y="360" />
      <rect fill="#6b4a2f" height="100" width="54" x="364" y="400" />
      <path d="M0 520 H800 V600 H0 Z" fill="#d9d2bf" />
      <path d="M120 528 H700 L780 600 H40 Z" fill="url(#facade-water)" />
    </>
  );
}

function Skyline() {
  return (
    <>
      <Defs id="sky" />
      <rect fill="url(#sky-sky)" height="130" width="800" />
      <path d="M0 130 V98 L40 98 V70 H70 V110 H100 V50 H150 V104 H190 V76 H230 V120 L260 120 V60 H300 V108 H340 V84 H380 V120 H430 V58 H470 V100 H520 V72 H560 V112 H610 V54 H650 V96 H700 V80 H740 V116 H800 V130 Z" fill="#1d5a45" opacity=".7" />
      <path d="M0 130 V112 C100 100 200 118 320 104 C460 88 600 118 800 100 V130 Z" fill="#14473a" />
      {Array.from({ length: 9 }).map((_, i) => (
        <Pine c="#0e3a2f" key={i} s={0.45} x={70 + i * 90} y={118} />
      ))}
    </>
  );
}

const scenes: Record<SceneKind, () => React.JSX.Element> = {
  villa: Villa,
  cabin: Cabin,
  interior: Interior,
  office: Office,
  door: Door,
  facade: Facade,
  skyline: Skyline,
};

export function Scene({ kind, label, className = "vv-scene" }: { kind: SceneKind; label: string; className?: string }) {
  const Body = scenes[kind];
  const wide = kind === "skyline";
  return (
    <svg aria-label={label} className={className} preserveAspectRatio="xMidYMid slice" role="img" viewBox={wide ? "0 0 800 130" : "0 0 800 600"}>
      <Body />
    </svg>
  );
}
