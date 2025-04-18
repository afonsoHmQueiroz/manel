
import { ServiceHeader } from "@/components/services/ServiceHeader";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Article = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <ServiceHeader
        title="Getting Started with LAYA Host"
        subtitle="Essential guide to get you started with our platform"
        icon={FileText}
      />
      
      <div className="flex gap-2 items-center">
        <Badge>Getting Started</Badge>
        <span className="text-sm text-muted-foreground">5 min read</span>
      </div>
      
      <Card>
        <CardContent className="prose dark:prose-invert max-w-none pt-6">
          <p>
            Welcome to LAYA Host! This guide will help you get started with our platform and deploy your first server.
          </p>
          
          <h2>Prerequisites</h2>
          <ul>
            <li>A LAYA Host account</li>
            <li>Basic understanding of server management</li>
            <li>SSH key pair (we'll show you how to create one)</li>
          </ul>
          
          <h2>Step 1: Create Your First Server</h2>
          <p>
            To create your first server, navigate to the Servers page and click on the "Add Server" button.
            You'll need to select:
          </p>
          <ul>
            <li>Server type (VPS, Dedicated, etc.)</li>
            <li>Operating system</li>
            <li>Server location</li>
            <li>Resource configuration</li>
          </ul>
          
          <h2>Step 2: Configure Access</h2>
          <p>
            After your server is created, you'll need to configure access to it.
            We recommend using SSH keys for secure access.
          </p>
          
          <h2>Step 3: Deploy Your Application</h2>
          <p>
            With your server set up and accessible, you can now deploy your application.
            Follow our deployment guides for specific instructions based on your stack.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Article;
