import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FolderOpen, Clock, TrendingUp } from 'lucide-react'

const summaryData = [
  {
    title: "Total Earnings",
    value: "$33,600",
    change: "+12% from last month",
    icon: DollarSign,
    gradient: "from-purple-500 to-purple-600"
  },
  {
    title: "Active Projects",
    value: "8",
    change: "3 due this week",
    icon: FolderOpen,
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "Tasks Due",
    value: "12",
    change: "5 overdue",
    icon: Clock,
    gradient: "from-green-500 to-green-600"
  },
  {
    title: "This Month",
    value: "$7,200",
    change: "+24% from last month",
    icon: TrendingUp,
    gradient: "from-orange-500 to-orange-600"
  }
]

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index} className={`bg-gradient-to-br ${item.gradient} text-white border-0 shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">{item.title}</CardTitle>
              <Icon className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs opacity-90">{item.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
