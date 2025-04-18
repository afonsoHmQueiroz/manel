
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TicketPriority = "low" | "medium" | "high";

interface TicketPriorityBadgeProps {
  priority: TicketPriority;
}

export const TicketPriorityBadge = ({ priority }: TicketPriorityBadgeProps) => {
  const priorityConfig = {
    low: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      label: "Low"
    },
    medium: {
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      label: "Medium"
    },
    high: {
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      label: "High"
    }
  };

  const config = priorityConfig[priority];

  return (
    <Badge className={cn("font-medium", config.color)} variant="outline">
      {config.label}
    </Badge>
  );
};
