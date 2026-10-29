"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { usePrototypeStore } from "./prototype-store";

const previewRows = [
  ["Love the quality and how quickly it arrived.", "Everyday Backpack", "5", "May 20, 2025"],
  ["The zipper feels a little stiff after a week.", "Weekender Tote", "3", "May 19, 2025"],
  ["Beautiful colors. I would love a larger size!", "Spring Collection", "5", "May 18, 2025"],
];

export default function UploadWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const { addDataset, completeDataset } = usePrototypeStore();
  const router = useRouter();

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const startAnalysis = () => {
    setIsImporting(true);
    const id = addDataset(fileName || "customer-feedback-sample.csv");
    window.setTimeout(() => completeDataset(id), 1800);
    window.setTimeout(() => router.push(`/datasets/${id}`), 450);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="upload-modal" role="dialog" aria-modal="true" aria-labelledby="upload-title">
        <button className="modal-close" onClick={onClose} aria-label="Close upload window">×</button>
        <div className="upload-modal-heading"><span className="upload-modal-icon">↑</span><div><span className="section-kicker">NEW DATASET</span><h2 id="upload-title">Bring your feedback in</h2><p>Import a CSV and explore the signals inside.</p></div></div>
        <div className="wizard-progress"><div className={step >= 1 ? "done" : ""}><i>{step > 1 ? "✓" : "1"}</i><span>Choose file</span></div><b /><div className={step >= 2 ? "done" : ""}><i>{step > 2 ? "✓" : "2"}</i><span>Map columns</span></div><b /><div className={step >= 3 ? "done" : ""}><i>3</i><span>Review</span></div></div>

        {step === 1 && <div className="wizard-step"><label className="drop-zone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const file = event.dataTransfer.files[0]; if (file) setFileName(file.name); }}><input type="file" accept=".csv,text/csv" onChange={handleFile} /><span className="drop-icon">⇧</span><strong>{fileName || "Choose a CSV file"}</strong><span>{fileName ? "Ready to preview" : "or drag it here · CSV up to 20 MB"}</span><span className="browse-button">Browse files</span></label><div className="demo-data-note"><span>✦</span><p><strong>Prototype demo</strong><br />This walkthrough uses sample feedback. Your selected file is not parsed or saved.</p><button onClick={() => { setFileName("customer-feedback-sample.csv"); setStep(2); }}>Use sample CSV</button></div></div>}

        {step === 2 && <div className="wizard-step"><div className="selected-file"><span className="file-badge">CSV</span><span><strong>{fileName}</strong><small>18 sample rows · 4 columns recognized</small></span><button onClick={() => setStep(1)}>Change</button></div><div className="mapping-grid"><label>Comment column<select defaultValue="comment"><option value="comment">comment</option><option>review_text</option><option>feedback</option></select></label><label>Product column<select defaultValue="product"><option value="product">product</option><option>item</option><option>None</option></select></label><label>Rating column<select defaultValue="rating"><option value="rating">rating</option><option>stars</option><option>None</option></select></label><label>Date column<select defaultValue="date"><option value="date">date</option><option>created_at</option><option>None</option></select></label></div><div className="preview-table-wrap"><table className="preview-table"><thead><tr><th>comment</th><th>product</th><th>rating</th><th>date</th></tr></thead><tbody>{previewRows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div><p className="sample-disclaimer">Showing a hardcoded sample preview. No real file is read in this prototype.</p></div>}

        {step === 3 && <div className="wizard-step"><div className="import-summary"><span className="summary-check">✓</span><h3>Ready to analyze</h3><p>We found <strong>18 sample comments</strong> with product, rating, and date fields.</p><div><span>Sentiment analysis</span><b>Included</b></div><div><span>Spam signals</span><b>Included</b></div><div><span>Language detection</span><b>Included</b></div></div><p className="sample-disclaimer">This is a demo import. Sample records will appear in your prototype workspace.</p></div>}

        <div className="wizard-footer"><span className="step-count">Step {step} of 3</span><div>{step > 1 && <button className="button button-outline" onClick={() => setStep(step - 1)}>Back</button>}{step < 3 ? <button className="button button-dark" disabled={step === 1 && !fileName} onClick={() => setStep(step + 1)}>Continue <span>→</span></button> : <button className="button button-dark" disabled={isImporting} onClick={startAnalysis}>{isImporting ? "Starting analysis…" : "Import & analyze"} <span>→</span></button>}</div></div>
      </section>
    </div>
  );
}
