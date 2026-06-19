"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, Loader2, Home } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || "Invalid credentials. Please verify your email and password.");
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary-bg p-4">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[30vw] h-[30vw] rounded-full bg-accent-purple/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md card-standard p-8 border-white/5 bg-secondary-bg/20 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-accent-cyan/15 border border-accent-cyan/20 flex items-center justify-center mx-auto mb-4 text-accent-cyan">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black font-space text-white tracking-wide">
            DISYN WORKSPACE
          </h1>
          <p className="text-xs text-text-disabled mt-1 uppercase tracking-wider font-semibold font-space">
            Admin Authority Access Only
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-accent-danger/10 border border-accent-danger/20 text-accent-danger text-xs font-semibold leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 font-space">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-text-disabled" />
              <input
                type="email"
                required
                placeholder="admin@disyn.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 font-space">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-text-disabled" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary ripple-fx w-full mt-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Unlocking Workspace...
              </>
            ) : (
              <>
                Authorize Session
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-text-disabled hover:text-accent-cyan transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Back to Public Site
          </Link>
        </div>
      </div>
    </main>
  );
}
