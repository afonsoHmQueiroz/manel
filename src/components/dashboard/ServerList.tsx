
import { useState } from 'react';
import { 
  Server, 
  MoreVertical, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Download, 
  BarChart, 
  Trash2, 
  Settings, 
  Plus,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock server data
const mockServers = [
  { 
    id: '001', 
    name: 'us-west-prod-01', 
    status: 'online', 
    type: 'Production', 
    region: 'US West', 
    uptime: '99.9%', 
    lastRestart: '32 days ago',
    cpu: 42,
    memory: 58,
    storage: 32
  },
  { 
    id: '002', 
    name: 'eu-central-prod-01', 
    status: 'online', 
    type: 'Production', 
    region: 'EU Central', 
    uptime: '99.7%', 
    lastRestart: '14 days ago',
    cpu: 68,
    memory: 72,
    storage: 45
  },
  { 
    id: '003', 
    name: 'asia-east-prod-01', 
    status: 'warning', 
    type: 'Production', 
    region: 'Asia East', 
    uptime: '97.3%', 
    lastRestart: '2 days ago',
    cpu: 88,
    memory: 65,
    storage: 38
  },
  { 
    id: '004', 
    name: 'us-east-staging-01', 
    status: 'maintenance', 
    type: 'Staging', 
    region: 'US East', 
    uptime: '76.5%', 
    lastRestart: '5 hours ago',
    cpu: 12,
    memory: 34,
    storage: 56
  },
  { 
    id: '005', 
    name: 'eu-west-dev-01', 
    status: 'offline', 
    type: 'Development', 
    region: 'EU West', 
    uptime: '0%', 
    lastRestart: '3 days ago',
    cpu: 0,
    memory: 0,
    storage: 28
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'online':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'offline':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    case 'maintenance':
      return <Clock className="w-4 h-4 text-amber-500" />;
    case 'warning':
      return <AlertCircle className="w-4 h-4 text-amber-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

export function ServerList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  
  const filteredServers = mockServers.filter(server => 
    server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative flex-1 w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-3 bg-secondary/50 border-0 rounded-lg focus:ring-1 focus:ring-primary/20 focus:outline-none placeholder:text-muted-foreground/70 text-sm"
            placeholder="Search servers by name, region, or type..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <button className="flex items-center px-3 py-2 bg-secondary/50 text-sm font-medium rounded-lg hover:bg-secondary transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          
          <button className="flex items-center px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Server
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden rounded-xl border border-border/30 glassmorphism">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground tracking-wider">Region</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground tracking-wider">Resources</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground tracking-wider">Uptime</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredServers.map((server) => (
                <tr 
                  key={server.id} 
                  className={cn(
                    "group hover:bg-secondary/40 transition-colors cursor-pointer",
                    selectedServer === server.id ? "bg-secondary/70" : ""
                  )}
                  onClick={() => setSelectedServer(server.id === selectedServer ? null : server.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-md bg-secondary/70 mr-3">
                        <Server className="w-4 h-4 text-foreground/70" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{server.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {server.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <StatusIcon status={server.status} />
                      <span className={cn(
                        "ml-2 text-xs font-medium capitalize",
                        server.status === 'online' ? "text-green-500" :
                        server.status === 'offline' ? "text-red-500" :
                        "text-amber-500"
                      )}>
                        {server.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{server.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{server.region}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">CPU</span>
                        <span className="font-medium">{server.cpu}%</span>
                      </div>
                      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            server.cpu > 80 ? "bg-red-500" :
                            server.cpu > 60 ? "bg-amber-500" :
                            "bg-green-500"
                          )}
                          style={{ width: `${server.cpu}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Memory</span>
                        <span className="font-medium">{server.memory}%</span>
                      </div>
                      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            server.memory > 80 ? "bg-red-500" :
                            server.memory > 60 ? "bg-amber-500" :
                            "bg-blue-500"
                          )}
                          style={{ width: `${server.memory}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{server.uptime}</div>
                    <div className="text-xs text-muted-foreground">Last restart: {server.lastRestart}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                        <Download className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                        <BarChart className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                        <Settings className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredServers.length === 0 && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <Server className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium mb-1">No servers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
