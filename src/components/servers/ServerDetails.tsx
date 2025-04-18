
import { ArrowLeft, CheckCircle2, ExternalLink, HardDrive, Server, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ServerResourceProps {
  name: string;
  used: number;
  total: number;
  unit: string;
}

const ServerResource = ({ name, used, total, unit }: ServerResourceProps) => {
  const percentage = Math.round((used / total) * 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">
          {used} / {total} {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

export function ServerDetails() {
  const { serverId } = useParams<{ serverId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // This would typically come from an API call based on the serverId
  const serverData = {
    id: serverId,
    name: `Server-${serverId}`,
    status: 'active',
    ip: '192.168.1.10',
    location: 'Amsterdam',
    plan: 'Performance',
    os: 'Ubuntu 22.04 LTS',
    resources: {
      cpu: { used: 2.4, total: 8, unit: 'cores' },
      ram: { used: 3.2, total: 16, unit: 'GB' },
      storage: { used: 80, total: 500, unit: 'GB' },
      bandwidth: { used: 120, total: 1000, unit: 'GB' }
    },
    uptime: '99.99%',
    lastReboot: '2023-10-15T14:30:00Z'
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="icon" className="h-9 w-9">
            <Link to="/servers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              {serverData.name}
              <Badge className={cn(
                "ml-2",
                serverData.status === 'active' ? "bg-green-500" : "bg-amber-500"
              )}>
                {serverData.status === 'active' ? 'Online' : 'Maintenance'}
              </Badge>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {serverData.ip} · {serverData.location}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" />
            Connect
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Server Information</CardTitle>
                <CardDescription>Basic details about your server</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium">{serverData.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Operating System</span>
                    <span className="font-medium">{serverData.os}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-medium">{serverData.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Reboot</span>
                    <span className="font-medium">
                      {new Date(serverData.lastReboot).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resource Usage</CardTitle>
                <CardDescription>Current server resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ServerResource 
                  name="CPU" 
                  used={serverData.resources.cpu.used} 
                  total={serverData.resources.cpu.total} 
                  unit={serverData.resources.cpu.unit} 
                />
                <ServerResource 
                  name="Memory" 
                  used={serverData.resources.ram.used} 
                  total={serverData.resources.ram.total} 
                  unit={serverData.resources.ram.unit} 
                />
                <ServerResource 
                  name="Storage" 
                  used={serverData.resources.storage.used} 
                  total={serverData.resources.storage.total} 
                  unit={serverData.resources.storage.unit} 
                />
                <ServerResource 
                  name="Bandwidth" 
                  used={serverData.resources.bandwidth.used} 
                  total={serverData.resources.bandwidth.total} 
                  unit={serverData.resources.bandwidth.unit} 
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Features</CardTitle>
              <CardDescription>Features enabled on your server</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Firewall Protection</div>
                    <div className="text-sm text-muted-foreground">Advanced security</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <HardDrive className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">SSD Storage</div>
                    <div className="text-sm text-muted-foreground">High-performance</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Auto Backup</div>
                    <div className="text-sm text-muted-foreground">Daily snapshots</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Monitor your server's performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Performance charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your server's security configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Security settings will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Server Logs</CardTitle>
              <CardDescription>View recent activity and system logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Server logs will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
