
import { User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isStaff: boolean;
  userName: string;
}

interface TicketMessageProps {
  message: Message;
}

export const TicketMessage = ({ message }: TicketMessageProps) => {
  const isStaff = message.isStaff;
  const initials = message.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className={cn(
      "flex gap-4",
      isStaff && "flex-row-reverse"
    )}>
      <Avatar className={cn(
        "h-10 w-10",
        isStaff ? "bg-primary/10" : "bg-secondary/50"
      )}>
        <AvatarFallback className={cn(
          isStaff ? "text-primary" : "text-foreground"
        )}>
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex flex-col max-w-[80%]",
        isStaff && "items-end"
      )}>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm">{message.userName}</span>
          <span className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {new Date(message.timestamp).toLocaleString()}
          </span>
        </div>
        
        <div className={cn(
          "rounded-lg p-4",
          isStaff 
            ? "bg-primary text-primary-foreground" 
            : "bg-secondary text-secondary-foreground"
        )}>
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
};
