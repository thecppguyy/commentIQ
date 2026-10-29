"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/app-shell";
import { usePrototypeStore } from "../components/prototype-store";
import type { DemoComment } from "../lib/demo-data";
import { downloadCsv } from "../lib/export-csv";

const pageSize = 8;

export default function CommentsPage() {
  const { datasets, comments } = usePrototypeStore();
  const [query, setQuery] = useState("");
  const [dataset, setDataset] = useState("all");
  const [product, setProduct] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [sentiment, setSentiment] = useState("all");
  const [language, setLanguage] = useState("all");
  const [spam, setSpam] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<DemoComment | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const datasetParam = params.get("dataset");
    const sentimentParam = params.get("sentiment");
    const productParam = params.get("product");
    const queryParam = params.get("q");
    if (datasetParam) setDataset(datasetParam);
    if (sentimentParam) setSentiment(sentimentParam.toLowerCase());
    if (productParam && productParam !== "all") setProduct(productParam);
    if (queryParam) setQuery(queryParam);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return comments.filter((comment) => {
      const matchQuery = !needle || `${comment.comment} ${comment.customer} ${comment.product} ${comment.topics.join(" ")}`.toLowerCase().includes(needle);
      const withinRange = dateRange === "all" || new Date(`${comment.date}T00:00:00Z`).getTime() >= new Date("2025-05-20T00:00:00Z").getTime() - Number(dateRange) * 86400000;
      return matchQuery && (dataset === "all" || comment.datasetId === dataset) && (product === "all" || comment.product === product) && withinRange && (sentiment === "all" || comment.sentiment.toLowerCase() === sentiment) && (language === "all" || comment.language.toLowerCase() === language) && (spam === "all" || (spam === "flagged" ? comment.spam : !comment.spam));
    }).sort((a, b) => sort === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));
  }, [comments, query, dataset, product, dateRange, sentiment, language, spam, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const reset = () => { setQuery(""); setDataset("all"); setProduct("all"); setDateRange("all"); setSentiment("all"); setLanguage("all"); setSpam("all"); setSort("newest"); setPage(1); };
  const exportComments = () => downloadCsv("commentiq-analyzed-comments.csv", [["comment", "sentiment", "confidence", "language", "spam_signal", "spam_reason", "product", "date", "region", "source"], ...filtered.map((comment) => [comment.comment, comment.sentiment, String(comment.confidence), comment.language, comment.spam ? "Yes" : "No", comment.spamReason ?? "", comment.product, comment.date, comment.region, comment.source])]);

  return (
    <AppShell>
      <div className="page-heading-row"><div><span className="page-eyebrow">YOUR FEEDBACK LIBRARY</span><h1>Comment explorer</h1><p>Search, filter, and inspect feedback from your demo datasets.</p></div><button className="button button-dark" onClick={exportComments}>↓ <span>Export CSV</span></button></div>
      <div className="comments-summary-strip"><div><strong>{filtered.length}</strong><span>sample comments shown</span></div><span className="summary-separator" /><div><strong>{filtered.filter((comment) => comment.spam).length}</strong><span>spam signals</span></div><span className="summary-separator" /><div><strong>{new Set(filtered.map((comment) => comment.language)).size}</strong><span>languages</span></div></div>
      <section className="app-panel explorer-panel">
        <div className="explorer-tools"><label className="comment-search"><span>⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search comments, products, topics..." /></label><label className="compact-select"><span>Dataset</span><select value={dataset} onChange={(event) => { setDataset(event.target.value); setPage(1); }}><option value="all">All datasets</option>{datasets.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label className="compact-select"><span>Sentiment</span><select value={sentiment} onChange={(event) => { setSentiment(event.target.value); setPage(1); }}><option value="all">All sentiment</option><option value="positive">Positive</option><option value="neutral">Neutral</option><option value="negative">Negative</option></select></label><button className={`filter-toggle${spam === "flagged" ? " selected" : ""}`} onClick={() => { setSpam(spam === "flagged" ? "all" : "flagged"); setPage(1); }}>⚑ <span>Spam signals</span></button><button className="reset-filters" onClick={reset}>Reset</button></div>
        <div className="secondary-filters"><label className="compact-select"><span>Language</span><select value={language} onChange={(event) => { setLanguage(event.target.value); setPage(1); }}><option value="all">All languages</option>{[...new Set(comments.map((comment) => comment.language))].map((item) => <option value={item.toLowerCase()} key={item}>{item}</option>)}</select></label><label className="compact-select"><span>Product</span><select value={product} onChange={(event) => { setProduct(event.target.value); setPage(1); }}><option value="all">All products</option>{[...new Set(comments.map((comment) => comment.product))].map((item) => <option value={item} key={item}>{item}</option>)}</select></label><label className="compact-select"><span>Date</span><select value={dateRange} onChange={(event) => { setDateRange(event.target.value); setPage(1); }}><option value="all">All dates</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select></label><label className="compact-select"><span>Spam status</span><select value={spam} onChange={(event) => { setSpam(event.target.value); setPage(1); }}><option value="all">All comments</option><option value="flagged">Has spam signal</option><option value="clean">No signal</option></select></label><label className="compact-select"><span>Sort by date</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label><span className="sample-only-note">Sample data · {filtered.length} results</span></div>
        <div className="table-scroll"><table className="comments-table"><thead><tr><th>COMMENT</th><th>SENTIMENT</th><th>LANGUAGE</th><th>PRODUCT</th><th>DATE</th><th>SPAM</th><th /></tr></thead><tbody>{pageItems.map((comment) => <tr key={comment.id}><td><button className="comment-cell-button" onClick={() => setSelected(comment)}><span className="comment-avatar small-avatar">{comment.initials}</span><span><strong>{comment.customer}</strong><small>{comment.comment}</small><em>{comment.topics.map((topic) => `#${topic}`).join("  ")}</em></span></button></td><td><span className={`sentiment-badge ${comment.sentiment.toLowerCase()}`}><i />{comment.sentiment}<small>{comment.confidence}%</small></span></td><td>{comment.language}</td><td>{comment.product}</td><td>{new Date(`${comment.date}T12:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" })}</td><td>{comment.spam ? <span className="spam-chip">Flagged</span> : <span className="clean-label">Clear</span>}</td><td><button className="row-more" onClick={() => setSelected(comment)} aria-label="View comment details">···</button></td></tr>)}</tbody></table>{!pageItems.length && <div className="empty-state"><span>⌕</span><strong>No comments found</strong><p>Try changing your filters or search terms.</p><button className="button button-outline" onClick={reset}>Clear filters</button></div>}</div>
        <div className="table-footer"><span>Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} sample comments</span><div className="pagination"><button disabled={page === 1} onClick={() => setPage(page - 1)}>← Previous</button><span>{page} / {totalPages}</span><button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next →</button></div></div>
      </section>
      <div className="demo-footer-note">Demo mode · Filters and search run on hardcoded sample comments.</div>
      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="comment-detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close comment details">×</button><span className="page-eyebrow">COMMENT DETAIL</span><h2 id="detail-title">Customer feedback</h2><p className="detail-quote">“{selected.comment}”</p><div className="detail-badges"><span className={`sentiment-badge ${selected.sentiment.toLowerCase()}`}><i />{selected.sentiment} · {selected.confidence}% confidence</span>{selected.spam && <span className="spam-chip">Spam signal</span>}</div><dl className="detail-grid"><div><dt>Customer</dt><dd>{selected.customer}</dd></div><div><dt>Product</dt><dd>{selected.product}</dd></div><div><dt>Language</dt><dd>{selected.language}</dd></div><div><dt>Date</dt><dd>{selected.date}</dd></div><div><dt>Region provided</dt><dd>{selected.region}</dd></div><div><dt>Source</dt><dd>{selected.source}</dd></div></dl>{selected.spamReason && <div className="spam-explanation"><strong>Why it has a signal</strong><p>{selected.spamReason}. This is a heuristic indicator, not proof of fraud.</p></div>}<div className="detail-topics">{selected.topics.map((topic) => <span className="topic-chip" key={topic}>{topic}</span>)}</div></section></div>}
    </AppShell>
  );
}
