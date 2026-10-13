export function ArchitecturalSketch({ variant = "plan" }: { variant?: "plan" | "facade" }) {
  if (variant === "facade") {
    return (
      <svg className="architectural-sketch" viewBox="0 0 620 420" fill="none" role="img" aria-label="Élévation architecturale stylisée d’une maison">
        <path d="M82 184 308 52l230 132" />
        <path d="M115 166v191h392V166M80 357h462" />
        <path d="M155 207h95v150h-95zM280 207h74v74h-74zM391 207h74v74h-74zM280 301h185v56H280z" />
        <path d="M174 224v115m-10-58h77M299 244h37m-37 18h37m76-18h37m-37 18h37M305 316v41m40-41v41m40-41v41m40-41v41" />
        <path d="M108 185h410M127 357v22m369-22v22" />
        <path d="M62 380h500M91 392h440" className="sketch-secondary" />
        <path d="M84 162h30v16M491 163h30v16" className="sketch-secondary" />
        <path d="M308 52v-22m0 0h76" className="sketch-note" />
        <circle cx="386" cy="30" r="3" className="sketch-dot" />
      </svg>
    );
  }

  return (
    <svg className="architectural-sketch" viewBox="0 0 620 440" fill="none" role="img" aria-label="Extrait de plan architectural annoté">
      <path d="M74 62h290v132H74zM364 62h180v230H364zM74 194h178v180H74zM252 194h112v180H252zM364 292h180v82H364z" />
      <path d="M96 84h118v88H96zM236 84h106v88H236zM386 84h136v88H386zM386 194h136v76H386zM96 216h134v136H96zM273 216h70v136h-70zM386 314h136v36H386z" />
      <path d="M214 62v32m150 40h-24m-92 60v-26m68 26v-28m-72 76h29m61 72h25m130-82h-31m-7-111v22m-19 178v-29" />
      <path d="M71 194h20m161 0h27m85-132v25m-186 287v20m186-20h24m-24-180h24" className="sketch-secondary" />
      <path d="M252 194v42m112-174v26m0 204h36m-290-28v58" className="sketch-accent" />
      <path d="M76 405h468M76 414h310" className="sketch-secondary" />
      <path d="M416 27h95" className="sketch-note" />
      <circle cx="511" cy="27" r="3" className="sketch-dot" />
      <text x="415" y="20">PLAN · 01</text>
      <text x="82" y="397">PIÈCE DE VIE</text>
      <text x="388" y="387">REPÈRE DU BIEN</text>
    </svg>
  );
}
