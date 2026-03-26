import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="hidden md:flex relative bg-emerald-900">
        <img
          src="/images/signup-background.png"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/40 to-transparent" />
        <div className="relative z-10 p-16 flex flex-col justify-end text-white">
          <span className="max-w-max inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold tracking-widest uppercase mb-6">
            Institutional Access
          </span>
          <h1 className="text-5xl font-extrabold leading-tight">
            Join the <span className="text-green-300">Precision Curator</span>{' '} Ecosystem
          </h1>
          <p className="mt-6 text-white/70 max-w-md">
            Experience an editorial approach to high-
            frequency trading where clarity meets
            sophisticated execution.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-10 border-t border-white/10 pt-6">
            <div>
              <div className="text-2xl font-bold">0.01ms</div>
              <div className="text-xs text-green-300 uppercase mt-1">Order Latency</div>
            </div>
            <div>
              <div className="text-2xl font-bold">Top 1%</div>
              <div className="text-xs text-green-300 uppercase mt-1">Curated Assets</div>
            </div>
          </div>

        </div>
      </div>
      <div className="flex items-center justify-center bg-background">
        <SignupForm />
      </div>
    </div>
  )
}