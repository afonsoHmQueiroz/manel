
import { ServerList } from '@/components/dashboard/ServerList';
import { ServiceHeader } from '@/components/services/ServiceHeader';
import { Server } from 'lucide-react';

const Servers = () => {
  return (
    <div className="animate-fade-in">
      <ServiceHeader
        title="Servers"
        subtitle="Manage and monitor all your server instances from a single dashboard"
        icon={Server}
      />
      
      <ServerList />
    </div>
  );
};

export default Servers;
