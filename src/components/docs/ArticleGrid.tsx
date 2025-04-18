
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const articles = [
  {
    id: "getting-started",
    title: "Getting Started with LAYA Host",
    description: "Learn how to deploy your first server and get started with our platform.",
    category: "Getting Started",
    readTime: "5 min read"
  },
  {
    id: "security-setup",
    title: "Security Best Practices",
    description: "Essential security measures to protect your servers and applications.",
    category: "Security",
    readTime: "8 min read"
  },
  {
    id: "database-management",
    title: "Database Management Guide",
    description: "Learn how to manage and optimize your databases effectively.",
    category: "Databases",
    readTime: "10 min read"
  }
];

export const ArticleGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link to={`/docs/${article.id}`} key={article.id}>
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge>{article.category}</Badge>
                <span className="text-sm text-muted-foreground">{article.readTime}</span>
              </div>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-primary hover:underline">Read more →</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
