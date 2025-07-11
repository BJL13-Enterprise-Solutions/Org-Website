import { Home, FileText, Gavel, Heart, Building, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";

const quickActions = [
  {
    icon: Home,
    title: "Housing Problems",
    description: "Eviction notices, landlord letters, finding help with rent",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: FileText,
    title: "Health Insurance",
    description: "Medicaid, insurance bills, medical forms you don't understand",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Gavel,
    title: "Court Papers",
    description: "Legal letters, summons, figuring out what they mean",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Heart,
    title: "Food & Money Help",
    description: "SNAP, unemployment, disability - getting benefits you need",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Building,
    title: "Government Stuff",
    description: "Tax forms, licenses, permits, confusing government mail",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: GraduationCap,
    title: "School & Training",
    description: "School forms, financial aid, getting transcripts",
    color: "bg-indigo-100 text-indigo-600",
  },
];

export default function QuickActions() {
  const handleActionClick = (title: string) => {
    // TODO: Implement navigation to specific conversation flows
    console.log("Quick action clicked:", title);
  };

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold text-primary mb-6">Things people often need help with</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Card
            key={action.title}
            className="quick-action-card p-4 cursor-pointer"
            onClick={() => handleActionClick(action.title)}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-primary mb-1">{action.title}</h4>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
