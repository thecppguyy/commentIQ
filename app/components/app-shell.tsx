"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { usePrototypeStore } from "./prototype-store";

const links = [
  { href: "/dashboard", label: "Overview", icon: "▦" },
  { href: "/comments", label: "Comments", icon: "◷" },
  { href: "/insights", label: "Insights", icon: "✳" },
  { href: "/datasets", label: "Datasets", icon: "▤" },
  { href: "/reports", label: "Reports", icon: "▧" },
];

const titleForPath: Record<string, string> = {
  "/dashboard": "Overview",
  "/comments": "Comments",
  "/insights": "Insights",
  "/datasets": "Datasets",
  "/reports": "Reports",
  "/settings": "Settings",
};

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { workspaceName, setWorkspaceName } = usePrototypeStore();
  const pageTitle = titleForPath[pathname] ?? (pathname.startsWith("/datasets/") ? "Dataset details" : "Workspace");
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    router.push(query ? `/comments?q=${encodeURIComponent(query)}` : "/comments");
    setSearchOpen(false);
  };

  return (
    <div className="product-shell">
      <aside className="product-sidebar">
        <Link className="product-brand" href="/dashboard"><span className="product-brand-mark">c.</span><span>comment<span>IQ</span></span></Link>
        <div className="workspace-switch-wrap"><button className="workspace-switch" type="button" aria-expanded={workspaceOpen} onClick={() => setWorkspaceOpen((value) => !value)}><span className="workspace-avatar">{workspaceName.slice(0, 1)}</span><span>{workspaceName}<small>Free workspace</small></span><span className="switch-chevron">⌄</span></button>{workspaceOpen && <div className="workspace-menu"><span className="workspace-menu-label">DEMO WORKSPACES</span>{["Studio North", "Creator Lab"].map((name) => <button type="button" key={name} className={workspaceName === name ? "current" : ""} onClick={() => { setWorkspaceName(name); setWorkspaceOpen(false); }}><span className="workspace-avatar">{name.slice(0, 1)}</span><span>{name}{workspaceName === name && <small>Current workspace</small>}</span>{workspaceName === name && <b>✓</b>}</button>)}<small className="workspace-menu-note">Both workspaces use sample demo data.</small><Link href="/settings" onClick={() => setWorkspaceOpen(false)}>Manage workspace settings ↗</Link></div>}</div>
        <div className="side-label">WORKSPACE</div>
        <nav className="product-nav" aria-label="Workspace navigation">
          {links.map((link) => <Link className={`product-nav-link${pathname === link.href || (link.href === "/datasets" && pathname.startsWith("/datasets")) ? " active" : ""}`} href={link.href} key={link.href}><span>{link.icon}</span>{link.label}</Link>)}
        </nav>
        <div className="sidebar-upgrade"><span className="upgrade-spark">✦</span><strong>Make room for more</strong><p>You’ve analyzed 204 of 500 comments this month.</p><Link href="/#pricing">Explore plans <span>↗</span></Link></div>
        <div className="sidebar-bottom"><Link className="side-utility" href="/settings"><span>⚙</span> Settings</Link><button className="profile-button" onClick={() => setMenuOpen((value) => !value)}><span className="profile-avatar">{workspaceName.slice(0, 1)}</span><span>{workspaceName}<small>Demo workspace</small></span><span className="profile-more">···</span></button></div>
      </aside>

      <section className="product-main">
        <header className="product-header">
          <div className="mobile-brand"><Link className="product-brand" href="/dashboard"><span className="product-brand-mark">c.</span><span>comment<span>IQ</span></span></Link></div>
          <div className="product-breadcrumb"><span>Workspace</span><b>/</b><strong>{pageTitle}</strong></div>
          <div className="product-header-actions">
            <button className={`icon-button search-jump${searchOpen ? " is-open" : ""}`} aria-label={searchOpen ? "Close search" : "Search comments"} onClick={() => setSearchOpen((value) => !value)}>{searchOpen ? <span>×</span> : <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>}</button>
            <button className={`icon-button notification-button${noticeOpen ? " is-open" : ""}`} aria-label="Notifications" onClick={() => setNoticeOpen((value) => !value)}>♧<i /></button>
            <Link className="button button-dark product-add-button" href="/datasets?new=1">+ <span>New dataset</span></Link>
          </div>
          {noticeOpen && <div className="header-popover notification-popover"><strong>You’re all caught up</strong><p>New analysis updates will appear here.</p><span>Demo workspace notifications</span></div>}
          {searchOpen && <form className="header-popover header-search-popover" onSubmit={submitSearch}><label htmlFor="global-comment-search">Search sample comments</label><div><input id="global-comment-search" autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Try “shipping” or a product name" /><button className="button button-dark">Search</button></div><span>Searches comment text, products, and topics in the demo data.</span></form>}
          {menuOpen && <div className="header-popover profile-popover"><strong>Studio North</strong><span>demo@commentiq.app</span><Link href="/settings" onClick={() => setMenuOpen(false)}>Workspace settings</Link><Link href="/" onClick={() => setMenuOpen(false)}>Back to landing page</Link><Link href="/login" onClick={() => setMenuOpen(false)}>Exit demo</Link></div>}
        </header>
        <main className="product-content">{children}</main>
      </section>
    </div>
  );
}
