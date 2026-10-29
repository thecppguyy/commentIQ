"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AppShell from "../components/app-shell";
import { usePrototypeStore } from "../components/prototype-store";
import type { DemoComment } from "../lib/demo-data";

const baseMetrics: Record<string, { total: number; positive: number; neutral: number; negative: number; spam: number }> = {
  all: { total: 4248, positive: 68.4, neutral: 21.2, negative: 10.4, spam: 86 },
  "spring-reviews": { total: 2458, positive: 67.8, neutral: 22.1, negative: 10.1, spam: 47 },
  "support-feedback": { total: 1206, positive: 74.2, neutral: 16.7, negative: 9.1, spam: 13 },
  "launch-comments": { total: 584, positive: 63.7, neutral: 21.5, negative: 14.8, spam: 26 },
};

function SentimentBadge({ sentiment }: { sentiment: string }) {
  return <span className={`sentiment-badge ${sentiment.toLowerCase()}`}><i />{sentiment}</span>;
}

function FeedbackItem({ comment }: { comment: DemoComment }) {
  return <article className="feedback-item"><span className={`feedback-rail ${comment.sentiment.toLowerCase()}`} /><span className="comment-avatar">{comment.initials}</span><div className="feedback-body"><div className="feedback-meta"><strong>{comment.customer}</strong><span>{comment.date}</span></div><p>{comment.comment}</p><div className="feedback-tags"><SentimentBadge sentiment={comment.sentiment} />{comment.topics.slice(0, 2).map((topic) => <span className="topic-chip" key={topic}>{topic}</span>)}{comment.spam && <span className="spam-chip">Spam signal</span>}</div></div></article>;
}

export default function DashboardPage() {
  const { datasets, comments, workspaceName } = usePrototypeStore();
  const [datasetId, setDatasetId] = useState("all");
  const [range, setRange] = useState("30 days");
  const [product, setProduct] = useState("All products");
  const selectedDataset = datasets.find((dataset) => dataset.id === datasetId);
  const commentsInScope = useMemo(() => comments.filter((comment) => (datasetId === "all" || comment.datasetId === datasetId) && (product === "All products" || comment.product === product)), [comments, datasetId, product]);
  const recentComments = commentsInScope.slice(0, 4);
  const base = baseMetrics[datasetId] ?? { total: selectedDataset?.commentsCount ?? 18, positive: 67.8, neutral: 22.1, negative: 10.1, spam: 2 };
  const rangeFactor = range === "7 days" ? .27 : range === "90 days" ? 2.4 : 1;
  const allDatasetComments = comments.filter((comment) => datasetId === "all" || comment.datasetId === datasetId);
  const productRatio = product === "All products" ? 1 : commentsInScope.length / (allDatasetComments.length || 1);
  const scopedPositive = commentsInScope.length ? commentsInScope.filter((comment) => comment.sentiment === "Positive").length / commentsInScope.length * 100 : base.positive;
  const scopedNegative = commentsInScope.length ? commentsInScope.filter((comment) => comment.sentiment === "Negative").length / commentsInScope.length * 100 : base.negative;
  const stats = product === "All products" ? base : { ...base, positive: scopedPositive, negative: scopedNegative, neutral: Math.max(0, 100 - scopedPositive - scopedNegative) };
  const total = Math.round(base.total * rangeFactor * productRatio);
  const spam = Math.round(base.spam * rangeFactor * productRatio);

  return (
    <AppShell>
      <div className="page-heading-row"><div><span className="page-eyebrow">YOUR FEEDBACK, IN FOCUS</span><h1>Good morning, {workspaceName} <span className="wave">✦</span></h1><p>Here’s what your customers have been saying.</p></div><Link href="/insights" className="button button-dark">✦ <span>Explore insights</span></Link></div>

      <div className="filter-toolbar"><label className="filter-select"><span>Dataset</span><select value={datasetId} onChange={(event) => { setDatasetId(event.target.value); setProduct("All products"); }}><option value="all">All datasets</option>{datasets.map((dataset) => <option value={dataset.id} key={dataset.id}>{dataset.name}</option>)}</select></label><label className="filter-select"><span>Date range</span><select value={range} onChange={(event) => setRange(event.target.value)}><option>7 days</option><option>30 days</option><option>90 days</option></select></label><label className="filter-select"><span>Product</span><select value={product} onChange={(event) => setProduct(event.target.value)}><option>All products</option>{[...new Set(commentsInScope.map((comment) => comment.product))].map((name) => <option key={name}>{name}</option>)}</select></label><span className="filter-updated"><i /> Updated just now</span></div>

      <div className="metric-grid">
        <article className="metric-card"><div className="metric-top"><span>Total comments</span><span className="metric-icon icon-lime">▤</span></div><strong>{total.toLocaleString("en-IN")}</strong><small className="metric-change">↗ 12.8% <span>vs. previous period</span></small><div className="metric-sparkline"><i style={{ height: "38%" }} /><i style={{ height: "48%" }} /><i style={{ height: "43%" }} /><i style={{ height: "62%" }} /><i style={{ height: "54%" }} /><i style={{ height: "75%" }} /><i style={{ height: "67%" }} /><i style={{ height: "92%" }} /></div></article>
        <article className="metric-card"><div className="metric-top"><span>Positive sentiment</span><span className="metric-icon icon-green">↗</span></div><strong>{stats.positive.toFixed(1)}<em>%</em></strong><small className="metric-change">↗ 4.2% <span>vs. previous period</span></small><div className="metric-underbar"><i style={{ width: `${stats.positive}%` }} /></div></article>
        <article className="metric-card"><div className="metric-top"><span>Negative feedback</span><span className="metric-icon icon-peach">!</span></div><strong>{stats.negative.toFixed(1)}<em>%</em></strong><small className="metric-neutral">Across {commentsInScope.filter((comment) => comment.sentiment === "Negative").length} sample comments</small><div className="metric-underbar negative-underbar"><i style={{ width: `${stats.negative * 2}%` }} /></div></article>
        <article className="metric-card"><div className="metric-top"><span>Spam signals</span><span className="metric-icon icon-purple">⌁</span></div><strong>{spam}</strong><small className="metric-neutral">Heuristic flags · review before action</small><div className="metric-spam-note"><span>ⓘ</span> Signals are not proof of fraud</div></article>
      </div>

      <div className="dashboard-grid two-panels">
        <section className="app-panel trend-panel"><div className="panel-title-row"><div><h2>Sentiment over time</h2><p>How feedback has shifted across the selected period</p></div><div className="chart-legend-app"><span><i className="legend-pos" /> Positive</span><span><i className="legend-neu" /> Neutral</span><span><i className="legend-neg" /> Negative</span></div></div><div className="dashboard-chart"><div className="chart-labels-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-canvas"><div className="chart-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 700 210" preserveAspectRatio="none" aria-label="Sentiment trends" role="img"><path className="svg-pos" d="M0 108 C35 105 48 74 88 85 S143 79 175 70 S227 84 265 58 S324 72 358 56 S405 52 440 46 S496 61 530 36 S586 48 618 27 S665 34 700 18" /><path className="svg-neu" d="M0 148 C32 142 52 152 88 134 S144 130 175 138 S230 120 265 129 S322 110 358 124 S406 105 440 115 S494 103 530 110 S586 88 618 103 S666 85 700 92" /><path className="svg-neg" d="M0 180 C31 173 52 181 88 169 S142 177 175 161 S228 174 265 157 S322 166 358 150 S406 163 440 150 S495 160 530 144 S586 155 618 138 S666 145 700 130" /></svg><div className="chart-labels-x"><span>May 1</span><span>May 7</span><span>May 14</span><span>May 21</span><span>May 30</span></div></div></div><div className="chart-footnote">Illustrative trend from this demo workspace</div></section>
        <section className="app-panel sentiment-panel"><div className="panel-title-row"><div><h2>Sentiment distribution</h2><p>Feedback mood at a glance</p></div><span className="panel-more-button">···</span></div><div className="sentiment-content"><div className="sentiment-donut" style={{ background: `conic-gradient(#96c85b 0 ${stats.positive}%, #89aeb1 ${stats.positive}% ${stats.positive + stats.neutral}%, #e98f78 ${stats.positive + stats.neutral}% 100%)` }}><div><strong>{stats.positive.toFixed(0)}%</strong><span>positive</span></div></div><div className="distribution-legend"><div><i className="legend-pos" /><span>Positive</span><b>{stats.positive.toFixed(1)}%</b></div><div><i className="legend-neu" /><span>Neutral</span><b>{stats.neutral.toFixed(1)}%</b></div><div><i className="legend-neg" /><span>Negative</span><b>{stats.negative.toFixed(1)}%</b></div><div className="distribution-total"><span>Total analyzed</span><b>{total.toLocaleString("en-IN")}</b></div></div></div></section>
      </div>

      <div className="dashboard-grid lower-panels">
        <section className="app-panel topics-list-panel"><div className="panel-title-row"><div><h2>What customers mention</h2><p>Frequent themes in your feedback</p></div><Link href="/comments" className="subtle-link">Explore comments ↗</Link></div>{[{ name: "Design & ease of use", value: 42, color: "topic-lime" }, { name: "Product quality", value: 31, color: "topic-blue" }, { name: "Shipping times", value: 18, color: "topic-orange" }, { name: "Customer support", value: 12, color: "topic-purple" }].map((topic) => <div className="topic-stat-row" key={topic.name}><span>{topic.name}</span><strong>{topic.value}%</strong><div><i className={topic.color} style={{ width: `${topic.value * 1.8}%` }} /></div></div>)}</section>
        <section className="app-panel product-compare-panel"><div className="panel-title-row"><div><h2>Product comparison</h2><p>Positive sentiment by product</p></div><span className="panel-more-button">···</span></div>{[{ name: "Everyday Backpack", value: 78 }, { name: "Travel Bottle", value: 64 }, { name: "Weekender Tote", value: 58 }].map((item) => <div className="product-bar-row" key={item.name}><div><span>{item.name}</span><strong>{item.value}%</strong></div><div className="product-bar"><i style={{ width: `${item.value}%` }} /></div></div>)}<Link href={product === "All products" ? "/comments" : `/comments?product=${encodeURIComponent(product)}`} className="panel-bottom-link">View product feedback <span>→</span></Link><div className="language-mini"><div><strong>Language distribution</strong><span>Detected in sample comments</span></div>{[{ name: "English", value: 78 }, { name: "French", value: 11 }, { name: "Italian", value: 6 }].map((item) => <div className="language-mini-row" key={item.name}><span>{item.name}</span><i><em style={{ width: `${item.value}%` }} /></i><b>{item.value}%</b></div>)}</div></section>
      </div>

      <section className="app-panel recent-panel"><div className="panel-title-row"><div><h2>Recent feedback</h2><p>Latest comments from your selected dataset</p></div><Link href="/comments" className="subtle-link">View all comments ↗</Link></div>{recentComments.length ? recentComments.map((comment) => <FeedbackItem comment={comment} key={comment.id} />) : <div className="empty-state"><span>◷</span><strong>No comments match these filters</strong><p>Try a different dataset or product.</p></div>}</section>
      <div className="demo-footer-note">Demo mode · All metrics and feedback on this page are hardcoded sample data.</div>
    </AppShell>
  );
}
