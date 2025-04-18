
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, 
  MessageCircle, 
  Clock, 
  User, 
  Tag, 
  Calendar, 
  Send,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

import { ServiceHeader } from "@/components/services/ServiceHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketStatusBadge } from "@/components/tickets/TicketStatusBadge";
import { TicketPriorityBadge } from "@/components/tickets/TicketPriorityBadge";
import { TicketCategoryBadge } from "@/components/tickets/TicketCategoryBadge";
import { TicketMessage } from "@/components/tickets/TicketMessage";
import { Separator } from "@/components/ui/separator";

// Define ticket types to match the component prop types
type TicketStatus = "open" | "pending" | "closed";
type TicketPriority = "low" | "medium" | "high";
type TicketCategory = "technical" | "billing" | "sales" | "domains" | "other";

interface TicketMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isStaff: boolean;
  userName: string;
}

interface TicketDetails {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  createdAt: string;
  lastUpdated: string;
  messages: TicketMessage[];
}

// Dummy function to fetch ticket details
const fetchTicketDetails = async (id: string): Promise<TicketDetails> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return {
    id,
    title: "Server connection issue",
    description: "I'm having trouble connecting to my VPS server. It was working fine yesterday but today I can't SSH into it. I've tried restarting but that didn't help.",
    status: "open",
    priority: "high",
    category: "technical",
    createdAt: "2023-10-15T10:30:00Z",
    lastUpdated: "2023-10-15T14:45:00Z",
    messages: [
      {
        id: "msg-1",
        content: "I'm having trouble connecting to my VPS server. It was working fine yesterday but today I can't SSH into it. I've tried restarting but that didn't help.",
        sender: "user",
        timestamp: "2023-10-15T10:30:00Z",
        isStaff: false,
        userName: "Jane Doe",
      },
      {
        id: "msg-2",
        content: "Thank you for reporting this issue. Could you please provide your server IP address and the exact error message you're receiving when attempting to connect?",
        sender: "support",
        timestamp: "2023-10-15T11:15:00Z",
        isStaff: true,
        userName: "Support Agent",
      },
      {
        id: "msg-3",
        content: "The IP address is 192.168.1.100 and I'm getting 'Connection refused' when trying to SSH.",
        sender: "user",
        timestamp: "2023-10-15T11:30:00Z",
        isStaff: false,
        userName: "Jane Doe",
      },
    ],
  };
};

const TicketPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  
  const { data: ticket, isLoading, isError } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => fetchTicketDetails(ticketId || ""),
    enabled: !!ticketId,
  });

  const handleBack = () => {
    navigate("/tickets");
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to the server
    console.log("Sending message:", newMessage);
    
    // Clear the input
    setNewMessage("");
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading ticket details...</div>;
  }
  
  if (isError || !ticket) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Ticket Not Found</h2>
        <p className="text-muted-foreground mb-6">The ticket you're looking for doesn't exist or you don't have access to it.</p>
        <Button onClick={handleBack}>Back to Tickets</Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <ServiceHeader
          title={`Ticket: ${ticket.id}`}
          subtitle={ticket.title}
          icon={MessageCircle}
          className="m-0"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main ticket conversation */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {ticket.messages.map((message) => (
                <TicketMessage key={message.id} message={message} />
              ))}
              
              <Separator className="my-6" />
              
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Ticket details sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Status
                </span>
                <TicketStatusBadge status={ticket.status} />
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Priority
                </span>
                <TicketPriorityBadge priority={ticket.priority} />
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> Category
                </span>
                <TicketCategoryBadge category={ticket.category} />
              </div>
              
              <Separator />
              
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Created
                </span>
                <span className="font-medium">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Last Updated
                </span>
                <span className="font-medium">
                  {new Date(ticket.lastUpdated).toLocaleString()}
                </span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant={ticket.status === "closed" ? "outline" : "destructive"}
                  className="w-full"
                >
                  {ticket.status === "closed" ? "Reopen Ticket" : "Close Ticket"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
