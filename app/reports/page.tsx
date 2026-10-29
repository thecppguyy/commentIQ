"use client";

import { useState } from "react";
import AppShell from "../components/app-shell";
import { downloadCsv } from "../lib/export-csv";

type Report = { id: number; name: string; period: string; comments: number; created: string; format: string };
const initialReports: Report[] = [
  { id: 1, name: "May customer pulse", period: "May 1–20, 2025", comments: 4248, created: "May 20, 2025", format: "CSV" },
  { id: 2, name: "Spring collection review", period: "May 1–18, 2025", comments: 2458, created: "May 18, 2025", format: "CSV" },
];

export default function ReportsPage() {
  const [reports, setReports] = useState(initialReports);
  const [message, setMessage] = useState("");
  const createReport = () => {
    const report = { id: Date.now(), name: "New feedback report", period: "Last 30 days", comments: 4248, created: "Just now", format: "CSV" };
    setReports((current) => [report, ...current]);
    setMessage("Your demo report is ready to download.");
  };
  const downloadReport = (report: Report) => downloadCsv(`${report.name.toLowerCase().replaceAll(" ", "-")}.csv`, [["metric", "value"], ["Report", report.name], ["Period", report.period], ["Comments analyzed", String(report.comments)], ["Positive sentiment", "68.4%"], ["Negative sentiment", "10.4%"], ["Spam signals", "86"]]);

  return <AppShell><div className="page-heading-row"><div><span className="page-eyebrow">SHAREABLE FEEDBACK SUMMARIES</span><h1>Reports</h1><p>Export a clear snapshot of feedback for your team.</p></div><button className="button button-dark" onClick={createReport}>＋ <span>Generate report</span></button></div>{message && <div className="success-banner"><span>✓</span>{message}<button onClick={() => setMessage("")}>×</button></div>}<div className="report-summary-cards"><article><span>Reports created</span><strong>{reports.length}</strong></article><article><span>Latest report</span><strong>{reports[0]?.created ?? "—"}</strong></article><article><span>Available format</span><strong>CSV export</strong></article></div><section className="app-panel reports-panel"><div className="panel-title-row"><div><h2>Your reports</h2><p>Saved in this temporary demo session</p></div><button className="panel-more-button" aria-label="Reports menu" onClick={() => setMessage("Reports are stored only until you refresh this demo.")}>···</button></div>{reports.map((report) => <article className="report-row" key={report.id}><span className="report-file-icon">▧</span><div className="report-row-main"><strong>{report.name}</strong><span>{report.period} · {report.comments.toLocaleString("en-IN")} comments</span></div><span className="report-format">{report.format}</span><span className="report-created">{report.created}</span><button className="button button-outline report-download" onClick={() => downloadReport(report)}>↓ Download</button><button className="row-more" aria-label={`Delete ${report.name}`} onClick={() => { setReports((current) => current.filter((item) => item.id !== report.id)); setMessage("Report removed from this demo session."); }}>···</button></article>)}{!reports.length && <div className="empty-state"><span>▧</span><strong>No saved reports</strong><p>Generate a report to get started.</p></div>}</section><section className="report-callout"><span>✦</span><div><strong>Reports are based on demo data</strong><p>In the full product, reports would reflect your selected datasets and filters.</p></div></section><div className="demo-footer-note">Demo mode · Exports contain hardcoded example metrics.</div></AppShell>;
}
