
import { ResourceUsage } from '@/components/dashboard/ResourceUsage';

const Resources = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight">Resource Usage</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor CPU, memory, and network usage across all your servers.
          </p>
        </div>
      </div>
      
      <ResourceUsage />
    </div>
  );
};

export default Resources;
