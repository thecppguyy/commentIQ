"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/app-shell";
import UploadWizard from "../components/upload-wizard";
import { usePrototypeStore } from "../components/prototype-store";

export default function DatasetsPage() {
  const { datasets, deleteDataset } = usePrototypeStore();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("new")) setUploadOpen(true);
  }, []);
  const filtered = useMemo(() => datasets.filter((dataset) => dataset.name.toLowerCase().includes(query.toLowerCase()) && (status === "all" || dataset.status.toLowerCase() === status)), [datasets, query, status]);

  return (
    <AppShell>
      <div className="page-heading-row"><div><span className="page-eyebrow">YOUR FEEDBACK WORKSPACE</span><h1>Datasets</h1><p>Organize your customer feedback by source, product, or campaign.</p></div><button className="button button-dark" onClick={() => setUploadOpen(true)}>＋ <span>New dataset</span></button></div>
      <div className="dataset-overview-cards"><article><span>All datasets</span><strong>{datasets.length}</strong><small>In your workspace</small></article><article><span>Comments analyzed</span><strong>{datasets.filter((item) => item.status === "Completed").reduce((sum, item) => sum + item.commentsCount, 0).toLocaleString("en-IN")}</strong><small>Across completed datasets</small></article><article><span>Being analyzed</span><strong>{datasets.filter((item) => item.status === "Processing").length}</strong><small>Demo processing queue</small></article></div>
      <section className="app-panel datasets-panel"><div className="dataset-tools"><label className="comment-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search datasets..." /></label><label className="compact-select"><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option><option value="completed">Completed</option><option value="processing">Processing</option><option value="failed">Failed</option></select></label></div><div className="table-scroll"><table className="datasets-table"><thead><tr><th>DATASET</th><th>SOURCE</th><th>COMMENTS</th><th>CREATED</th><th>STATUS</th><th /></tr></thead><tbody>{filtered.map((dataset) => <tr key={dataset.id}><td><Link className="dataset-name-cell" href={`/datasets/${dataset.id}`}><span className="dataset-cell-icon">▤</span><span><strong>{dataset.name}</strong><small>{dataset.products.slice(0, 3).join(" · ")}</small></span></Link></td><td><span className="source-pill">{dataset.source}</span></td><td><strong className="table-number">{dataset.commentsCount.toLocaleString("en-IN")}</strong></td><td>{dataset.created}</td><td><span className={`status-pill ${dataset.status.toLowerCase()}`}><i />{dataset.status}</span></td><td><div className="dataset-row-actions"><Link href={`/datasets/${dataset.id}`} className="row-action-button">Open</Link><button className="row-more" onClick={() => setDeleteId(dataset.id)} aria-label={`Delete ${dataset.name}`}>···</button></div></td></tr>)}</tbody></table>{!filtered.length && <div className="empty-state"><span>▤</span><strong>No datasets match</strong><p>Try another search or status filter.</p></div>}</div><div className="dataset-table-footer">Showing {filtered.length} of {datasets.length} datasets <span>Demo workspace · changes are temporary</span></div></section>
      {!datasets.length && <section className="empty-dataset-card"><span className="empty-dataset-icon">▤</span><h2>Your next insight starts here</h2><p>Upload a CSV to see how CommentIQ organizes and analyzes customer feedback.</p><button className="button button-dark" onClick={() => setUploadOpen(true)}>＋ Create your first dataset</button></section>}
      <div className="demo-footer-note">Demo mode · Dataset actions update temporary in-memory sample data only.</div>
      {uploadOpen && <UploadWizard onClose={() => setUploadOpen(false)} />}
      {deleteId && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDeleteId(null); }}><section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><span className="confirm-icon">!</span><h2 id="delete-title">Delete this dataset?</h2><p>This removes it from your current demo session and updates the sample comment lists.</p><div><button className="button button-outline" onClick={() => setDeleteId(null)}>Cancel</button><button className="button button-danger" onClick={() => { deleteDataset(deleteId); setDeleteId(null); }}>Delete dataset</button></div></section></div>}
    </AppShell>
  );
}
