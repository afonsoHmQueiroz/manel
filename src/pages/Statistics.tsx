
import { useState } from 'react';
import { BarChart3, Activity } from 'lucide-react';
import { ServiceHeader } from "@/components/services/ServiceHeader";
import { ResourceUsage } from '@/components/dashboard/ResourceUsage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('resources');

  return (
    <div className="animate-fade-in space-y-6">
      <ServiceHeader
        title="Statistics"
        subtitle="Monitor your resource usage and account activity"
        icon={BarChart3}
      />
      
      <Tabs 
        defaultValue="resources" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Resources</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Activity</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="mt-6">
          <ResourceUsage />
        </TabsContent>
        
        <TabsContent value="activity" className="mt-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">Activity Feed</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Track all activities on your account including logins, 
                server operations, and system changes.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
