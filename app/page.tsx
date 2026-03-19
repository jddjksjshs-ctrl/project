import Link from "next/link";

export default function Home() {
  const stats = [
    { label: "Influencers", value: "1,250+" },
    { label: "Distributed", value: "$14,500,000+" },
    { label: "Completed", value: "38,000+" },
  ];

  const influencers = ["CryptoWhale", "Altcoin Daily", "TechWizard"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              InfluencerClaims
            </h1>
            <Link
              href="/claim"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/50"
            >
              Claim Prize
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Secure Giveaway Platform
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            The most trusted platform for influencer giveaways and prize
            distribution in the crypto space
          </p>
          <Link
            href="/claim"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-xl shadow-purple-500/50 hover:scale-105"
          >
            Claim Your Prize Now
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 text-center hover:border-purple-500 transition-all shadow-lg"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Influencers */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Trusted by Top Influencers
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {influencers.map((influencer, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:border-purple-500 hover:text-white transition-all"
              >
                {influencer}
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold mb-2">1. Enter Details</h4>
              <p className="text-gray-400">
                Provide your Twitter handle and wallet information
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6">
              <div className="text-4xl mb-4">✅</div>
              <h4 className="text-xl font-semibold mb-2">2. Verification</h4>
              <p className="text-gray-400">
                Automatic AML and bot detection checks
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6">
              <div className="text-4xl mb-4">💰</div>
              <h4 className="text-xl font-semibold mb-2">3. Receive Prize</h4>
              <p className="text-gray-400">
                Get your prize sent directly to your wallet
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-500">
          <p>&copy; 2024 InfluencerClaims. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
