
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TicketStatus = "open" | "pending" | "closed";

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

export const TicketStatusBadge = ({ status }: TicketStatusBadgeProps) => {
  const statusConfig = {
    open: {
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      label: "Open"
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      label: "Pending"
    },
    closed: {
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      label: "Closed"
    }
  };

  const config = statusConfig[status];

  return (
    <Badge className={cn("font-medium", config.color)} variant="outline">
      {config.label}
    </Badge>
  );
};
