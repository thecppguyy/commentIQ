"use client";

import { useState } from "react";
import AppShell from "../components/app-shell";
import { usePrototypeStore } from "../components/prototype-store";
import { demoInsights } from "../lib/demo-data";
import { downloadCsv } from "../lib/export-csv";

export default function InsightsPage() {
  const { datasets, comments } = usePrototypeStore();
  const [datasetId, setDatasetId] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const datasetName = datasetId === "all" ? "All datasets" : datasets.find((dataset) => dataset.id === datasetId)?.name ?? "Selected dataset";
  const sampleCount = datasetId === "all" ? 4248 : datasets.find((dataset) => dataset.id === datasetId)?.commentsCount ?? comments.filter((item) => item.datasetId === datasetId).length;

  const generate = () => {
    setIsGenerating(true);
    setGenerated(false);
    window.setTimeout(() => { setGenerated(true); setIsGenerating(false); }, 900);
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(demoInsights.summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const exportReport = () => downloadCsv("commentiq-insights-report.csv", [["section", "insight"], ["Summary", demoInsights.summary], ...demoInsights.positives.map((item) => ["Positive feedback", item]), ...demoInsights.concerns.map((item) => ["Customer concern", item]), ...demoInsights.opportunities.map((item) => ["Opportunity", item])]);

  return (
    <AppShell>
      <div className="page-heading-row"><div><span className="page-eyebrow">GROUNDED IN CUSTOMER VOICES</span><h1>Insights</h1><p>Patterns and opportunities from your analyzed feedback.</p></div><button className="button button-dark" onClick={exportReport}>↓ <span>Export report</span></button></div>
      <div className="insights-toolbar"><label className="filter-select"><span>Dataset</span><select value={datasetId} onChange={(event) => { setDatasetId(event.target.value); setGenerated(false); }}><option value="all">All datasets</option>{datasets.map((dataset) => <option value={dataset.id} key={dataset.id}>{dataset.name}</option>)}</select></label><span className="insight-context"><span className="context-check">✓</span> Based on {sampleCount.toLocaleString("en-IN")} analyzed comments in {datasetName}</span><div className="insight-actions"><button className={`button button-outline${saved ? " saved-button" : ""}`} onClick={() => setSaved((value) => !value)}>{saved ? "★ Saved" : "☆ Save insight"}</button><button className="button button-outline" onClick={copySummary}>{copied ? "✓ Copied" : "▢ Copy summary"}</button></div></div>

      <div className="insights-layout"><div className="insights-primary"><section className="app-panel ai-summary-panel"><div className="summary-header"><span className="ai-icon">✦</span><div><span className="section-kicker">CUSTOMER PULSE</span><h2>{generated ? "Your updated customer pulse" : "The customer pulse"}</h2><p>{generated ? "Demo summary refreshed just now" : "Generated from real analysis results in this demo"}</p></div><span className="summary-status"><i /> {generated ? "Just now" : "Updated 2h ago"}</span></div><p className="summary-copy">{demoInsights.summary}</p><div className="summary-grounding"><span>✳</span> This summary is grounded in stored analysis and representative feedback.</div></section>

          <section className="insight-section-card"><div className="insight-section-heading"><span className="insight-section-icon positive-icon">↗</span><div><h2>What customers love</h2><p>Positive feedback that comes up often</p></div><span className="theme-count positive-count">3 themes</span></div><ul className="insight-bullet-list positive-list">{demoInsights.positives.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ul><div className="quote-card"><span className="quote-mark">“</span><p>“{comments.find((comment) => comment.sentiment === "Positive")?.comment}”</p><small>Representative positive comment · sample workspace</small></div></section>

          <section className="insight-section-card"><div className="insight-section-heading"><span className="insight-section-icon concern-icon">!</span><div><h2>Where customers struggle</h2><p>Recurring concerns worth investigating</p></div><span className="theme-count concern-count">3 themes</span></div><ul className="insight-bullet-list concern-list">{demoInsights.concerns.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ul><div className="quote-card concern-quote"><span className="quote-mark">“</span><p>“{comments.find((comment) => comment.sentiment === "Negative")?.comment}”</p><small>Representative concern · sample workspace</small></div></section>

          <section className="insight-section-card improvements-card"><div className="insight-section-heading"><span className="insight-section-icon opportunity-icon">✳</span><div><h2>Possible areas to explore</h2><p>Practical starting points based on the feedback</p></div></div><ul className="opportunity-list">{demoInsights.opportunities.map((item) => <li key={item}><span>↗</span>{item}</li>)}</ul><div className="grounded-note">These are potential areas to investigate, not proven causes or guaranteed outcomes.</div></section>
        </div>

        <aside className="insights-aside"><section className="app-panel mention-card"><div className="panel-title-row"><div><h2>Top mentioned topics</h2><p>Across selected feedback</p></div><span className="panel-more-button">···</span></div>{[{ name: "Design & ease of use", value: "42%", width: 89 }, { name: "Product quality", value: "31%", width: 69 }, { name: "Shipping", value: "18%", width: 45 }, { name: "Customer support", value: "12%", width: 31 }, { name: "Feature requests", value: "9%", width: 23 }].map((item) => <div className="mention-row" key={item.name}><div><span>{item.name}</span><b>{item.value}</b></div><i><em style={{ width: `${item.width}%` }} /></i></div>)}<p className="mentions-disclaimer">Keyword frequency is illustrative sample data.</p></section><section className="app-panel confidence-card"><span className="confidence-icon">ⓘ</span><div><strong>Keep context in mind</strong><p>Sentiment and themes are model estimates. Review example comments before making a decision.</p></div></section><section className="app-panel generate-card"><span className="generate-spark">✦</span><h3>Refresh this summary</h3><p>In a connected version, this would use your latest analyzed comments.</p><button className="button button-dark" disabled={isGenerating} onClick={generate}>{isGenerating ? <><span className="button-spinner" /> Generating…</> : "Generate summary"}</button></section></aside></div>
      <div className="demo-footer-note">Demo mode · Insights are fixed examples for this prototype, not generated from live data.</div>
    </AppShell>
  );
}
