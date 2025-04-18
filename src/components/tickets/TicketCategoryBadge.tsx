
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TicketCategory = "technical" | "billing" | "sales" | "domains" | "other";

interface TicketCategoryBadgeProps {
  category: TicketCategory;
}

export const TicketCategoryBadge = ({ category }: TicketCategoryBadgeProps) => {
  const categoryConfig = {
    technical: {
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      label: "Technical"
    },
    billing: {
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      label: "Billing"
    },
    sales: {
      color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
      label: "Sales"
    },
    domains: {
      color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
      label: "Domains"
    },
    other: {
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      label: "Other"
    }
  };

  const config = categoryConfig[category];

  return (
    <Badge className={cn("font-medium", config.color)} variant="outline">
      {config.label}
    </Badge>
  );
};
