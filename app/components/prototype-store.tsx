"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { initialComments, initialDatasets, type DemoComment, type DemoDataset } from "../lib/demo-data";

type PrototypeStoreValue = {
  workspaceName: string;
  setWorkspaceName: (name: string) => void;
  datasets: DemoDataset[];
  comments: DemoComment[];
  addDataset: (name: string) => string;
  deleteDataset: (id: string) => void;
  completeDataset: (id: string) => void;
  reanalyzeDataset: (id: string) => void;
  resetDemo: () => void;
};

const PrototypeStoreContext = createContext<PrototypeStoreValue | null>(null);

export function PrototypeStoreProvider({ children }: { children: ReactNode }) {
  const [workspaceName, setWorkspaceName] = useState("Studio North");
  const [datasets, setDatasets] = useState(initialDatasets);
  const [comments, setComments] = useState(initialComments);

  const addDataset = (name: string) => {
    const id = `demo-${Date.now()}`;
    const importedComments = initialComments.slice(0, 12).map((comment, index) => ({
      ...comment,
      id: `${id}-${index}`,
      datasetId: id,
    }));

    setDatasets((current) => [
      { id, name: name.replace(/\.csv$/i, "") || "New feedback dataset", source: "CSV upload", created: "Just now", commentsCount: importedComments.length, status: "Processing", products: [...new Set(importedComments.map((comment) => comment.product))] },
      ...current,
    ]);
    setComments((current) => [...importedComments, ...current]);
    return id;
  };

  const completeDataset = (id: string) => {
    setDatasets((current) => current.map((dataset) => dataset.id === id ? { ...dataset, status: "Completed" } : dataset));
  };

  const reanalyzeDataset = (id: string) => {
    setDatasets((current) => current.map((dataset) => dataset.id === id ? { ...dataset, status: "Processing" } : dataset));
    window.setTimeout(() => completeDataset(id), 1600);
  };

  const deleteDataset = (id: string) => {
    setDatasets((current) => current.filter((dataset) => dataset.id !== id));
    setComments((current) => current.filter((comment) => comment.datasetId !== id));
  };

  const resetDemo = () => {
    setDatasets(initialDatasets);
    setComments(initialComments);
  };

  return (
    <PrototypeStoreContext.Provider value={{ workspaceName, setWorkspaceName, datasets, comments, addDataset, deleteDataset, completeDataset, reanalyzeDataset, resetDemo }}>
      {children}
    </PrototypeStoreContext.Provider>
  );
}

export function usePrototypeStore() {
  const context = useContext(PrototypeStoreContext);
  if (!context) throw new Error("usePrototypeStore must be used inside PrototypeStoreProvider");
  return context;
}
