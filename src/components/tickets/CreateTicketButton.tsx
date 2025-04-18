
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateTicketModal } from "./CreateTicketModal";

export const CreateTicketButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap">
        <Plus className="mr-2 h-4 w-4" />
        New Ticket
      </Button>
      
      <CreateTicketModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};
