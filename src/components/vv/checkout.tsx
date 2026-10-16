"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CREDIT_VALUE_EUR, offers, packs } from "@/lib/pricing";

const VAT = 0.2;
const eur = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export const checkoutItems = [
  ...offers.map((o, i) => ({ id: `offre-${i}`, label: o.name, credits: o.credits, price: o.credits * CREDIT_VALUE_EUR })),
  ...packs.map((p, i) => ({ id: `pack-${i}`, label: p.name, credits: p.credits, price: p.price })),
];

export function Checkout() {
  const params = useSearchParams();
  const initial = checkoutItems.find((i) => i.id === params.get("produit"))?.id ?? "offre-1";
  const [id, setId] = useState(initial);
  const [cgv, setCgv] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const item = checkoutItems.find((i) => i.id === id)!;
  const vat = item.price * VAT;

  if (done) {
    return (
      <div className="vv-form-ok" role="status">
        <strong>Commande enregistrée (démonstration).</strong>
        <p>Le paiement en ligne sera activé au lancement. Aucune somme n’a été débitée et aucun crédit n’a été ajouté.</p>
        <Link className="vv-btn vv-btn--outline vv-btn--sm" href="/agence/credits">Retour à mes crédits</Link>
      </div>
    );
  }
  return (
    <div className="vv-a-grid2">
      <section className="vv-panel">
        <div className="vv-panel-head"><h2>Votre achat</h2></div>
        <div role="radiogroup" aria-label="Produit" className="vv-a-radios">
          {checkoutItems.map((i) => (
            <label className={`vv-a-radio${i.id === id ? " on" : ""}`} key={i.id}>
              <input checked={i.id === id} name="produit" onChange={() => setId(i.id)} type="radio" />
              <span><strong>{i.label}</strong><small className="vv-muted">{i.credits} crédits</small></span>
              <b>{eur(i.price)} HT</b>
            </label>
          ))}
        </div>
      </section>
      <section className="vv-panel">
        <div className="vv-panel-head"><h2>Récapitulatif</h2></div>
        <dl className="vv-a-sum">
          <div><dt>{item.label}</dt><dd>{item.credits} crédits</dd></div>
          <div><dt>Total HT</dt><dd>{eur(item.price)}</dd></div>
          <div><dt>TVA 20 %</dt><dd>{eur(vat)}</dd></div>
          <div className="total"><dt>Total TTC</dt><dd>{eur(item.price + vat)}</dd></div>
        </dl>
        <label className="vv-check" style={{ marginTop: 14 }}>
          <input checked={cgv} onChange={(e) => { setCgv(e.target.checked); setError(""); }} type="checkbox" />
          <span>J’ai lu et j’accepte les <Link className="vv-link" href="/legal/cgv">conditions générales de vente</Link>. Crédits valables 12 mois, remboursables sous 14 jours s’ils ne sont pas utilisés.</span>
        </label>
        {error && <p className="vv-error" role="alert">{error}</p>}
        <button className="vv-btn vv-btn--primary vv-btn--block" onClick={() => (cgv ? setDone(true) : setError("Acceptez les conditions générales de vente pour continuer."))} style={{ marginTop: 14 }} type="button">Payer {eur(item.price + vat)}</button>
        <p className="vv-demo-note" style={{ marginTop: 14 }}>Paiement par carte, Apple Pay ou Google Pay via un prestataire sécurisé, activé au lancement.</p>
      </section>
    </div>
  );
}
