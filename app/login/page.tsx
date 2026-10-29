"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); router.push("/dashboard"); };
  return <main className="auth-page"><header className="auth-top"><Link className="brand" href="/"><span className="brand-mark"><svg viewBox="0 0 34 34"><path d="M17 3.5c-7.45 0-13.5 6.05-13.5 13.5S9.55 30.5 17 30.5c4.12 0 7.8-1.85 10.28-4.76a9.4 9.4 0 0 1-4.2.99c-5.22 0-9.45-4.23-9.45-9.45s4.23-9.45 9.45-9.45c1.52 0 2.95.36 4.22 1A13.46 13.46 0 0 0 17 3.5Z" /><circle cx="27.25" cy="17" r="3.25" /></svg></span><span>comment<span>IQ</span></span></Link><Link href="/">← Back to home</Link></header><section className="auth-card"><span className="auth-spark">✦</span><span className="section-kicker">WELCOME BACK</span><h1>Good to see you again.</h1><p>Sign in to your CommentIQ workspace.</p>{message && <div className="auth-message">{message}</div>}<form onSubmit={submit}><label htmlFor="login-email">Email address</label><input id="login-email" type="email" placeholder="you@company.com" defaultValue="demo@commentiq.app" required /><label htmlFor="login-password">Password</label><input id="login-password" type="password" placeholder="Enter your password" defaultValue="commentiq-demo" required /><div className="auth-options"><label><input type="checkbox" defaultChecked /> Remember me</label><button type="button" onClick={() => setMessage("Password recovery is not connected in this demo.")}>Forgot password?</button></div><button className="button button-dark auth-submit">Sign in to workspace <span>→</span></button></form><div className="auth-separator"><span />or<span /></div><button className="oauth-button" onClick={() => setMessage("Google sign-in is a visual demo and is not connected.")}><b>G</b> Continue with Google</button><p className="auth-switch">New to CommentIQ? <Link href="/signup">Create an account</Link></p><div className="auth-demo-note">Demo sign-in · Any valid email and password will open the sample workspace.</div></section><footer className="auth-footer">© 2025 CommentIQ <span>Feedback, made useful.</span></footer></main>;
}
