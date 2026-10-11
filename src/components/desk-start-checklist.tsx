"use client";

import { useState } from "react";

const steps = [
  ["Zone et équipe", "Votre contexte opérationnel est prêt."],
  ["Première priorité", "Une action claire est assignée."],
  ["Règle de rappel", "Votre équipe sait quand revenir au dossier."],
] as const;

export function DeskStartChecklist() {
  const [done, setDone] = useState<number[]>([0]);
  const progress = Math.round((done.length / steps.length) * 100);

  function toggle(index: number) {
    setDone((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  }

  return <div className="start-checklist"><div className="checklist-head"><div><span className="mono-label">04 / mise en route</span><h2>Votre Desk en trois gestes.</h2></div><span className="checklist-progress">{progress}%</span></div><div className="checklist-track"><span style={{ width: `${progress}%` }} /></div><div className="checklist-items">{steps.map(([label, detail], index) => <button type="button" className={done.includes(index) ? "checklist-item is-done" : "checklist-item"} key={label} onClick={() => toggle(index)}><span className="checkmark">{done.includes(index) ? "✓" : `0${index + 1}`}</span><span><strong>{label}</strong><small>{detail}</small></span><span className="check-arrow">{done.includes(index) ? "↺" : "→"}</span></button>)}</div><p className="checklist-note">Une checklist courte, jamais un écran de formation. Le reste se découvre dans le flux.</p></div>;
}
