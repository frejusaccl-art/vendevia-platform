"use client";

import { useState } from "react";
import { Icon, type IconName } from "./icons";

const items: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield", title: "Consentement clair", text: "Vous gardez le contrôle sur le partage de vos informations." },
  { icon: "building", title: "Agences vérifiées", text: "Des professionnels de l’immobilier rigoureusement sélectionnés." },
  { icon: "chart", title: "Suivi en temps réel", text: "Vous suivez votre demande à chaque étape." },
  { icon: "check", title: "Aucun engagement", text: "Vous restez libre, sans obligation de suite." },
];

export function ProtectBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <section aria-labelledby="protect-title" className="vv-protect">
      <button aria-label="Masquer ce bandeau" className="vv-protect-close" onClick={() => setOpen(false)} type="button">
        <Icon name="x" size={18} />
      </button>
      <h2 id="protect-title">Des données protégées, un accompagnement transparent</h2>
      <div className="vv-protect-grid">
        {items.map((item) => (
          <div className="vv-protect-item" key={item.title}>
            <span className="ico"><Icon name={item.icon} size={20} /></span>
            <div>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
