import LoginForm from "@/components/LoginForm"

export default function Home() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      
      {/* LEFT SIDE */}
      <div className="p-16 bg-gray-50">
        <h1 className="text-4xl font-bold">
          Professional Trading <span className="text-green-500">Platform</span>
        </h1>

        <p className="mt-4 text-gray-600">
          Manage clients, trading accounts, KYC compliance, and analytics.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-10">
          <Stat title="Active Clients" value="1,847" />
          <Stat title="Assets Under Mgmt" value="$48.2M" />
          <Stat title="Open Positions" value="3,291" />
          <Stat title="Uptime SLA" value="99.9%" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  )
}

function Stat({ title, value }: any) {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl text-green-500 font-bold">{value}</h2>
      <p className="text-gray-500">{title}</p>
    </div>
  )
}