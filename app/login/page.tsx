import LoginForm from "@/components/LoginForm"

export default function Home() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="hidden md:flex flex-1 relative flex-col justify-center px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/login-background.png"
            alt="trading"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-700 text-xs font-bold tracking-widest uppercase mb-6">
            Institutional Precision
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-8 text-gray-900">
            Professional <br />
            <span className="text-green-600">Trading Platform</span>
          </h1>
          <div className="space-y-6 border-l-2 border-green-500/20 pl-8 py-2">
            <p className="text-lg text-gray-600 italic max-w-md leading-relaxed">
              "Precision is not just a metric; it is our foundation. We curate a high-performance ecosystem for the discerning institutional trader."
            </p>
            <div className="flex items-center gap-4 text-green-600">
              <div className="h-px w-12 bg-green-500/30"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                The Curator Standard
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-background">
        <LoginForm />
      </div>
    </div>
  )
}