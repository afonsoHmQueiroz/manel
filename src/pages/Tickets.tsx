import { useQuery } from "@tanstack/react-query";
import { Ticket, MessageCircle, Plus, Search } from "lucide-react";
import { useState } from "react";

import { ServiceHeader } from "@/components/services/ServiceHeader";
import { TicketList } from "@/components/tickets/TicketList";
import { CreateTicketButton } from "@/components/tickets/CreateTicketButton";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketStatusBadge } from "@/components/tickets/TicketStatusBadge";

// Define ticket types to match component props
type TicketStatus = "open" | "pending" | "closed";
type TicketPriority = "low" | "medium" | "high";
type TicketCategory = "technical" | "billing" | "sales" | "domains" | "other";

// Dummy data for tickets
const fetchTickets = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return [
    {
      id: "TIC-001",
      title: "Server connection issue",
      status: "open" as TicketStatus,
      priority: "high" as TicketPriority,
      category: "technical" as TicketCategory,
      createdAt: "2023-10-15T10:30:00Z",
      lastUpdated: "2023-10-15T14:45:00Z",
      messages: 3,
    },
    {
      id: "TIC-002",
      title: "Billing question for VPS service",
      status: "pending" as TicketStatus,
      priority: "medium" as TicketPriority,
      category: "billing" as TicketCategory,
      createdAt: "2023-10-12T08:15:00Z",
      lastUpdated: "2023-10-14T11:20:00Z",
      messages: 4,
    },
    {
      id: "TIC-003",
      title: "Domain transfer assistance",
      status: "closed" as TicketStatus,
      priority: "low" as TicketPriority,
      category: "domains" as TicketCategory,
      createdAt: "2023-10-08T16:45:00Z",
      lastUpdated: "2023-10-10T09:30:00Z",
      messages: 5,
    },
    {
      id: "TIC-004",
      title: "SSL certificate not working",
      status: "open" as TicketStatus,
      priority: "high" as TicketPriority,
      category: "technical" as TicketCategory,
      createdAt: "2023-10-14T13:20:00Z",
      lastUpdated: "2023-10-14T17:10:00Z",
      messages: 2,
    },
    {
      id: "TIC-005",
      title: "Upgrade hosting plan",
      status: "closed" as TicketStatus,
      priority: "medium" as TicketPriority,
      category: "sales" as TicketCategory,
      createdAt: "2023-10-05T11:30:00Z",
      lastUpdated: "2023-10-06T15:45:00Z",
      messages: 6,
    },
  ];
};

const Tickets = () => {
  const [activeTab, setActiveTab] = useState<TicketStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });
  
  const filteredTickets = tickets.filter(ticket => {
    // Filter by tab
    if (activeTab !== "all" && ticket.status !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !ticket.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const ticketStats = {
    all: tickets.length,
    open: tickets.filter(t => t.status === "open").length,
    pending: tickets.filter(t => t.status === "pending").length,
    closed: tickets.filter(t => t.status === "closed").length,
  };

  return (
    <div className="animate-fade-in space-y-6">
      <ServiceHeader
        title="Support Tickets"
        subtitle="Manage and track your support requests"
        icon={MessageCircle}
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tickets..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <CreateTicketButton />
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab as (value: string) => void} className="w-full">
        <TabsList className="grid grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="all" className="flex gap-2 items-center">
            <Ticket className="h-4 w-4" />
            <span>All</span>
            <span className="ml-1 bg-muted text-muted-foreground rounded-full text-xs px-2 py-0.5">
              {ticketStats.all}
            </span>
          </TabsTrigger>
          <TabsTrigger value="open" className="flex gap-2 items-center">
            <span>Open</span>
            <span className="ml-1 bg-muted text-muted-foreground rounded-full text-xs px-2 py-0.5">
              {ticketStats.open}
            </span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex gap-2 items-center">
            <span>Pending</span>
            <span className="ml-1 bg-muted text-muted-foreground rounded-full text-xs px-2 py-0.5">
              {ticketStats.pending}
            </span>
          </TabsTrigger>
          <TabsTrigger value="closed" className="flex gap-2 items-center">
            <span>Closed</span>
            <span className="ml-1 bg-muted text-muted-foreground rounded-full text-xs px-2 py-0.5">
              {ticketStats.closed}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <TicketList tickets={filteredTickets} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tickets;
