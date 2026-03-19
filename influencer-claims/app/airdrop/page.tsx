"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function AirdropForm() {
  const searchParams = useSearchParams();

  const prefillTwitter = searchParams.get("twitter") || "";
  const prefillWallet = searchParams.get("wallet") || "";
  const prefillDestination = searchParams.get("destination") || "";

  const [formData, setFormData] = useState({
    twitter: prefillTwitter,
    wallet: prefillWallet,
    destination: prefillDestination,
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 2500));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-green-400 mb-3">Airdrop Claimed!</h3>
        <p className="text-gray-400 mb-2">Your tokens are being distributed.</p>
        <p className="text-sm text-gray-500 break-all">
          Destination: <span className="text-green-400 font-mono">{formData.destination}</span>
        </p>
        <div className="mt-6 inline-block px-4 py-2 bg-gray-800 rounded-lg text-xs text-gray-400 font-mono">
          TX: 0x{Math.random().toString(16).slice(2, 18).toUpperCase()}...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleClaim} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Twitter / X Handle
        </label>
        <input
          type="text"
          name="twitter"
          value={formData.twitter}
          onChange={handleChange}
          placeholder="@yourusername"
          required
          disabled={status === "loading"}
          className="w-full px-4 py-3 bg-black/50 border border-cyan-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all disabled:opacity-50 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Winning Wallet
        </label>
        <input
          type="text"
          name="wallet"
          value={formData.wallet}
          onChange={handleChange}
          placeholder="0x..."
          required
          disabled={status === "loading"}
          className="w-full px-4 py-3 bg-black/50 border border-cyan-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all disabled:opacity-50 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Destination Wallet
        </label>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="0x..."
          required
          disabled={status === "loading"}
          className="w-full px-4 py-3 bg-black/50 border border-cyan-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all disabled:opacity-50 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Email <span className="text-gray-500">(optional)</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          disabled={status === "loading"}
          className="w-full px-4 py-3 bg-black/50 border border-cyan-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all disabled:opacity-50 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-lg font-bold tracking-wide hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-3">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing Claim...
          </span>
        ) : (
          "Claim Airdrop →"
        )}
      </button>

      {status === "loading" && (
        <div className="grid grid-cols-3 gap-2 pt-1">
          {["Verifying wallet", "Checking eligibility", "Distributing tokens"].map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-1" style={{ animationDelay: `${i * 0.2}s` }} />
              <p className="text-xs text-gray-500">{step}</p>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}

export default function AirdropPage() {
  return (
    <div className="min-h-screen bg-[#050b14] text-white overflow-hidden">
      {/* Animated background grid */}
      <div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-cyan-900/50 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xs font-black">IC</span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              InfluencerClaims{" "}
              <span className="text-cyan-400 text-sm font-normal">Airdrop</span>
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">Live Drop Active</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-10 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-5">
            🎁 I congratulate you on your victory — Verified Winners Only
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
            Claim Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Prize
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            You&apos;ve been verified by InfluencerClaims. Complete the form below to receive your tokens directly to your wallet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left — stats & info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Prize pool */}
            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-800/50 rounded-2xl p-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Prize Pool</p>
              <p className="text-4xl font-black text-cyan-300">$14.5M</p>
              <p className="text-sm text-gray-500 mt-1">Distributed this season</p>
            </div>

           

            {/* Requirements */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-5">
              <p className="text-sm font-semibold mb-3 text-gray-300">Eligibility</p>
              <ul className="space-y-2">
                {[
                  "Verified Twitter account",
                  "Wallet holding confirmed",
                  "Passed AML check",
                  "No bot activity detected",
                ].map((req) => (
                  <li key={req} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-cyan-400">✓</span> {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900/60 border border-gray-700 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-white">Claim Form</h2>
                  <p className="text-xs text-gray-500">Your data has been pre-verified</p>
                </div>
                <div className="ml-auto px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-md">
                  <span className="text-xs text-green-400">✓ Pre-filled</span>
                </div>
              </div>

              <Suspense fallback={<div className="text-gray-500 text-sm">Loading form...</div>}>
                <AirdropForm />
              </Suspense>

              <p className="text-xs text-gray-600 mt-4 text-center">
                By claiming, you agree to the terms. Tokens arrive within 24h.
              </p>
            </div>
          </div>
        </div>

        {/* Recent claims ticker */}
        <div className="mt-10 bg-gray-900/40 border border-gray-800 rounded-xl p-4 overflow-hidden">
          <p className="text-xs text-gray-600 mb-3 uppercase tracking-widest">Recent Claims</p>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {[
              { addr: "0x3f4a...8b2c", amount: "2 $SOL", time: "2m ago" },
              { addr: "0xa12e...d91f", amount: "0,5 $ETH", time: "5m ago" },
              { addr: "0x77bc...0041", amount: "1 $ETH", time: "9m ago" },
              { addr: "0xcc34...e882", amount: "5,6 $BNB", time: "12m ago" },
              { addr: "0x09df...5a3b", amount: "7,6 $SOL", time: "18m ago" },
            ].map((c, i) => (
              <div key={i} className="flex-shrink-0 flex items-center gap-3 px-4 py-2 bg-black/30 border border-gray-800 rounded-lg">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-xs font-mono text-gray-400">{c.addr}</span>
                <span className="text-xs text-cyan-400 font-semibold">{c.amount}</span>
                <span className="text-xs text-gray-600">{c.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
