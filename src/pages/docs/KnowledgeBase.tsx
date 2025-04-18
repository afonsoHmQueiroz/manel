
import { ServiceHeader } from "@/components/services/ServiceHeader";
import { FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ArticleGrid } from "@/components/docs/ArticleGrid";
import { CategoryList } from "@/components/docs/CategoryList";

const KnowledgeBase = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <ServiceHeader
        title="Knowledge Base"
        subtitle="Browse our guides and documentation"
        icon={FileText}
      />
      
      <div className="relative w-full max-w-xl mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search documentation..."
          className="pl-9"
        />
      </div>
      
      <CategoryList />
      <ArticleGrid />
    </div>
  );
};

export default KnowledgeBase;
