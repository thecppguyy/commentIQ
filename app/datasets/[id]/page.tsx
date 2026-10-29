"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import AppShell from "../../components/app-shell";
import { usePrototypeStore } from "../../components/prototype-store";
import { downloadCsv } from "../../lib/export-csv";

export default function DatasetDetailPage() {
  return (
    <Suspense fallback={<main className="product-content"><section className="app-panel detail-loading"><span className="button-spinner" /><strong>Loading dataset details…</strong></section></main>}>
      <AppShell>
        <DatasetDetailContent />
      </AppShell>
    </Suspense>
  );
}

function DatasetDetailContent() {
  const { id } = useParams<{ id: string }>();
  const { datasets, comments, reanalyzeDataset } = usePrototypeStore();
  const dataset = datasets.find((item) => item.id === id);
  const records = comments.filter((item) => item.datasetId === id);

  if (!dataset) return <section className="empty-dataset-card"><span className="empty-dataset-icon">?</span><h2>Dataset not found</h2><p>It may have been deleted or is no longer in this demo session.</p><Link className="button button-dark" href="/datasets">Back to datasets</Link></section>;

  const positive = records.filter((item) => item.sentiment === "Positive").length;
  const negative = records.filter((item) => item.sentiment === "Negative").length;
  const exportDataset = () => downloadCsv(`${dataset.name.toLowerCase().replaceAll(" ", "-")}.csv`, [["comment", "sentiment", "confidence", "language", "spam_signal", "product", "date"], ...records.map((item) => [item.comment, item.sentiment, String(item.confidence), item.language, item.spam ? "Yes" : "No", item.product, item.date])]);

  return (
    <>
      <div className="dataset-back-row"><Link href="/datasets">← All datasets</Link><span>/</span><span>{dataset.name}</span></div>
      <div className="page-heading-row dataset-detail-heading"><div><span className="page-eyebrow">DATASET OVERVIEW</span><h1>{dataset.name}</h1><div className="dataset-detail-meta"><span className={`status-pill ${dataset.status.toLowerCase()}`}><i />{dataset.status}</span><span>{dataset.source}</span><span>Created {dataset.created}</span></div></div><div className="heading-button-group"><button className="button button-outline" onClick={() => reanalyzeDataset(id)}>↻ <span>Reanalyze sample</span></button><button className="button button-dark" onClick={exportDataset}>↓ <span>Export CSV</span></button></div></div>
      {dataset.status === "Processing" && <div className="processing-banner"><span className="button-spinner" /><div><strong>Analysis in progress</strong><p>Demo analysis will complete shortly. You can keep exploring this page.</p></div><span className="processing-percent">68%</span><div className="processing-progress"><i /></div></div>}
      <div className="dataset-overview-cards detail-stats"><article><span>Total comments</span><strong>{dataset.commentsCount.toLocaleString("en-IN")}</strong><small>Imported into this dataset</small></article><article><span>Positive sample</span><strong>{records.length ? Math.round(positive / records.length * 100) : 0}%</strong><small>From the displayed sample</small></article><article><span>Negative sample</span><strong>{records.length ? Math.round(negative / records.length * 100) : 0}%</strong><small>From the displayed sample</small></article><article><span>Products</span><strong>{dataset.products.length}</strong><small>Included in this dataset</small></article></div>
      <div className="dashboard-grid detail-grid"><section className="app-panel dataset-about"><div className="panel-title-row"><div><h2>About this dataset</h2><p>Import details and available fields</p></div><span className="dataset-cell-icon">▤</span></div><dl className="detail-grid dataset-fields"><div><dt>Dataset name</dt><dd>{dataset.name}</dd></div><div><dt>Source</dt><dd>{dataset.source}</dd></div><div><dt>Comments</dt><dd>{dataset.commentsCount.toLocaleString("en-IN")} records</dd></div><div><dt>Date field</dt><dd>Available in sample</dd></div><div><dt>Region</dt><dd>Provided for some comments</dd></div><div><dt>Analysis status</dt><dd>{dataset.status}</dd></div></dl><div className="dataset-product-tags"><span>Products in dataset</span><div>{dataset.products.map((product) => <span className="topic-chip" key={product}>{product}</span>)}</div></div></section><section className="app-panel dataset-sentiment"><div className="panel-title-row"><div><h2>Sentiment snapshot</h2><p>Based on visible sample comments</p></div><Link href="/comments" className="subtle-link">Explore all ↗</Link></div><div className="snapshot-bars"><div><span>Positive</span><i><em className="bar-pos" style={{ width: `${records.length ? positive / records.length * 100 : 0}%` }} /></i><b>{records.length ? Math.round(positive / records.length * 100) : 0}%</b></div><div><span>Neutral</span><i><em className="bar-neu" style={{ width: `${records.length ? records.filter((item) => item.sentiment === "Neutral").length / records.length * 100 : 0}%` }} /></i><b>{records.length ? Math.round(records.filter((item) => item.sentiment === "Neutral").length / records.length * 100) : 0}%</b></div><div><span>Negative</span><i><em className="bar-neg" style={{ width: `${records.length ? negative / records.length * 100 : 0}%` }} /></i><b>{records.length ? Math.round(negative / records.length * 100) : 0}%</b></div></div></section></div>
      <section className="app-panel recent-panel dataset-comments-preview"><div className="panel-title-row"><div><h2>Sample comments</h2><p>A few records from this dataset</p></div><Link href={`/comments?dataset=${dataset.id}`} className="subtle-link">Open explorer ↗</Link></div>{records.slice(0, 4).map((comment) => <article className="feedback-item" key={comment.id}><span className={`feedback-rail ${comment.sentiment.toLowerCase()}`} /><span className="comment-avatar">{comment.initials}</span><div className="feedback-body"><div className="feedback-meta"><strong>{comment.customer}</strong><span>{comment.date}</span></div><p>{comment.comment}</p><span className={`sentiment-badge ${comment.sentiment.toLowerCase()}`}><i />{comment.sentiment}</span></div></article>)}</section>
      <div className="demo-footer-note">Demo mode · Analysis status and sample results are simulated in memory.</div>
    </>
  );
}
