
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Server, Shield, Database, Globe, Cloud } from "lucide-react";

const categories = [
  { name: "Getting Started", icon: Server, color: "text-blue-500" },
  { name: "Security", icon: Shield, color: "text-green-500" },
  { name: "Databases", icon: Database, color: "text-purple-500" },
  { name: "Domains", icon: Globe, color: "text-orange-500" },
  { name: "Cloud Services", icon: Cloud, color: "text-sky-500" },
];

export const CategoryList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {categories.map(({ name, icon: Icon, color }) => (
        <Button
          key={name}
          variant="outline"
          className="h-auto py-6 flex flex-col gap-2"
        >
          <Icon className={cn("h-6 w-6", color)} />
          <span>{name}</span>
        </Button>
      ))}
    </div>
  );
};
