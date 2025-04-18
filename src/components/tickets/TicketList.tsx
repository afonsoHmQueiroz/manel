
import { Ticket as TicketIcon, Clock, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { TicketStatusBadge } from "./TicketStatusBadge";
import { TicketPriorityBadge } from "./TicketPriorityBadge";
import { TicketCategoryBadge } from "./TicketCategoryBadge";

interface Ticket {
  id: string;
  title: string;
  status: "open" | "pending" | "closed";
  priority: "low" | "medium" | "high";
  category: "technical" | "billing" | "sales" | "domains" | "other";
  createdAt: string;
  lastUpdated: string;
  messages: number;
}

interface TicketListProps {
  tickets: Ticket[];
  isLoading: boolean;
}

export const TicketList = ({ tickets, isLoading }: TicketListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <TicketIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No tickets found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          No tickets match your current search or filter criteria. Try changing your search or create a new ticket.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Link to={`/tickets/${ticket.id}`} key={ticket.id}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <TicketIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg leading-tight">{ticket.title}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        Ticket ID: {ticket.id}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 items-center sm:justify-end">
                  <TicketStatusBadge status={ticket.status} />
                  <TicketPriorityBadge priority={ticket.priority} />
                  <TicketCategoryBadge category={ticket.category} />
                </div>
              </div>
              
              <div className="flex items-center mt-4 text-sm text-muted-foreground">
                <div className="flex items-center mr-4">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>
                    {new Date(ticket.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  <span>{ticket.messages} messages</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
