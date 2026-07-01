"use client";

import { useState } from "react";

const phases = [
  {
    id: "evaluation",
    label: "Valutazione",
    eyebrow: "FASE 01",
    title: "Parametri consultati prima del risultato",
    text:
      "Questa fase mostra cosa viene controllato prima di generare il punteggio: segnali pubblici, presenza locale, recensioni, sito e competitor rilevati.",
    blocks: [
      "Profilo Google Business e coerenza NAP",
      "Recensioni, frequenza e qualità semantica",
      "Chiarezza del sito, servizi e aree trattate",
      "Citazioni locali e fonti sanitarie pubbliche"
    ],
    competitors: [
      { name: "Clinica Nova Salute", score: 68 },
      { name: "Studio Medico Armonia", score: 61 },
      { name: "Centro Specialistico Verdi", score: 57 }
    ]
  },
  {
    id: "result",
    label: "Risultato",
    eyebrow: "FASE 02",
    title: "Risultato globale della visibilità",
    text:
      "Quando l'analisi è pronta, il report passa automaticamente qui e mostra il punteggio complessivo con i parametri principali.",
    score: 42,
    metrics: [
      { label: "Presenza locale", value: 37 },
      { label: "Recensioni pazienti", value: 42 },
      { label: "Chiarezza del sito", value: 51 },
      { label: "Coerenza delle fonti", value: 39 }
    ]
  },
  {
    id: "improve",
    label: "Miglioralo",
    eyebrow: "FASE 03",
    title: "Azioni consigliate per aumentare la fiducia",
    text:
      "Le raccomandazioni non promettono posizionamenti automatici: indicano cosa rendere più chiaro, verificabile e leggibile per pazienti e motori di ricerca moderni.",
    blocks: [
      "Riorganizzare le pagine servizio con contenuti più specifici",
      "Rendere più evidenti specializzazioni, zone servite e prove di fiducia",
      "Migliorare struttura tecnica, dati pubblici e percorsi di conversione",
      "Aggiornare il sito per trasformarlo in una base più autorevole e misurabile"
    ]
  }
];

function EvaluationPanel() {
  const phase = phases[0];

  return (
    <article className="report-phase-card report-phase-evaluation">
      <span className="phase-eyebrow">{phase.eyebrow}</span>
      <h3>{phase.title}</h3>
      <p>{phase.text}</p>

      <div className="phase-checklist">
        {phase.blocks?.map((item) => (
          <div className="phase-check" key={item}>
            <span aria-hidden="true" />
            {item}
          </div>
        ))}
      </div>

      <div className="competitor-box">
        <strong>Competitor trovati</strong>
        {phase.competitors?.map((competitor) => (
          <div className="competitor-row" key={competitor.name}>
            <span>{competitor.name}</span>
            <b>{competitor.score}/100</b>
          </div>
        ))}
      </div>
    </article>
  );
}

function ResultPanel() {
  const phase = phases[1];

  return (
    <article className="report-phase-card report-phase-result">
      <span className="phase-eyebrow">{phase.eyebrow}</span>
      <h3>{phase.title}</h3>
      <p>{phase.text}</p>

      <div className="report-score-strip">
        <div>
          <strong>{phase.score}</strong>
          <span>/100</span>
        </div>
        <small>Risultato complessivo</small>
      </div>

      <div className="metric-list">
        {phase.metrics?.map((metric) => (
          <div className="metric-row" key={metric.label}>
            <span>{metric.label}</span>
            <div className="metric-track" aria-hidden="true">
              <i style={{ width: `${metric.value}%` }} />
            </div>
            <b>{metric.value}</b>
          </div>
        ))}
      </div>
    </article>
  );
}

function ImprovePanel() {
  const phase = phases[2];

  return (
    <article className="report-phase-card report-phase-improve">
      <span className="phase-eyebrow">{phase.eyebrow}</span>
      <h3>{phase.title}</h3>
      <p>{phase.text}</p>

      <div className="phase-checklist">
        {phase.blocks?.map((item) => (
          <div className="phase-check" key={item}>
            <span aria-hidden="true" />
            {item}
          </div>
        ))}
      </div>

      <div className="soft-cta-box">
        <strong>Priorità suggerita</strong>
        <span>
          Prima di aumentare campagne o visibilità esterna, conviene rendere il
          sito più chiaro, misurabile e coerente con i segnali emersi.
        </span>
      </div>
    </article>
  );
}

function PhasePanel({ id }: { id: string }) {
  if (id === "evaluation") return <EvaluationPanel />;
  if (id === "result") return <ResultPanel />;
  return <ImprovePanel />;
}

export function ReportPhases() {
  const [activePhase, setActivePhase] = useState(phases[0].id);

  return (
    <section className="report-phases-section" id="sample-report">
      <div className="report-section-heading">
        <span>REPORT COMPLETO</span>
        <h2>Un report in tre fasi, pensato per capire e migliorare la visibilità</h2>
        <p>
          La struttura separa ciò che viene valutato, il risultato ottenuto e le
          azioni consigliate per rendere la presenza digitale più affidabile.
        </p>
      </div>

      <div className="mobile-phase-tabs" role="tablist" aria-label="Report phases">
        {phases.map((phase) => (
          <button
            type="button"
            role="tab"
            aria-selected={activePhase === phase.id}
            className={activePhase === phase.id ? "active" : ""}
            key={phase.id}
            onClick={() => setActivePhase(phase.id)}
          >
            {phase.label}
          </button>
        ))}
      </div>

      <div className="mobile-phase-panel">
        <PhasePanel id={activePhase} />
      </div>

      <div className="desktop-phase-grid" aria-label="Complete report phases">
        <EvaluationPanel />
        <ResultPanel />
        <ImprovePanel />
      </div>
    </section>
  );
}
