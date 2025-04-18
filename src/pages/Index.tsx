import { useState, useEffect } from 'react';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { ResourceUsage } from '@/components/dashboard/ResourceUsage';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Server, Database, Shield, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="flex flex-col items-center">
            <RefreshCw className="w-10 h-10 text-primary animate-spin-slow" />
            <p className="mt-4 text-muted-foreground animate-pulse">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="mb-8">
            <div className="max-w-xl">
              <h1 className="text-3xl font-semibold tracking-tight">Dashboard Overview</h1>
              <p className="mt-2 text-muted-foreground">
                Monitor your server performance and resource utilization in real-time.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <MetricsCard 
              title="Total Servers" 
              value={12} 
              change={2.5} 
              trend="up" 
              isPercentage={false} 
              maxValue={20} 
            />
            <MetricsCard 
              title="Average CPU Usage" 
              value={42.3} 
              change={-5.2} 
              trend="down" 
              suffix="%" 
              isPercentage={true} 
            />
            <MetricsCard 
              title="Memory Allocation" 
              value={68.7} 
              change={3.8} 
              trend="up" 
              suffix="%" 
              isPercentage={true} 
            />
            <MetricsCard 
              title="Uptime" 
              value={99.96} 
              change={0.02} 
              trend="up" 
              suffix="%" 
              isPercentage={true} 
            />
          </div>
          
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-medium">Service Status</h2>
              <Link 
                to="/servers" 
                className="flex items-center text-sm text-primary hover:underline transition-colors"
              >
                View all servers
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatusCard 
                name="Production API" 
                status="online" 
                type="server" 
                uptime="99.92%" 
                region="US West" 
                lastChecked="Just now" 
              />
              <StatusCard 
                name="Database Cluster" 
                status="online" 
                type="database" 
                uptime="99.98%" 
                region="EU Central" 
                lastChecked="2 min ago" 
              />
              <StatusCard 
                name="CDN Network" 
                status="warning" 
                type="network" 
                uptime="97.32%" 
                region="Global" 
                lastChecked="5 min ago" 
              />
              <StatusCard 
                name="Staging Server" 
                status="maintenance" 
                type="server" 
                uptime="N/A" 
                region="US East" 
                lastChecked="10 min ago" 
              />
            </div>
          </div>
          
          <div className="mb-10">
            <ResourceUsage />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className={cn(
              "col-span-1 md:col-span-1 p-5 rounded-xl border border-border/30",
              "glassmorphism",
              "animate-slide-up"
            )}>
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-left transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-blue-500/10 mr-3">
                      <Server className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-sm font-medium">Add New Server</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-left transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-purple-500/10 mr-3">
                      <Database className="w-4 h-4 text-purple-500" />
                    </div>
                    <span className="text-sm font-medium">Database Backup</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-left transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-green-500/10 mr-3">
                      <Shield className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-sm font-medium">Security Scan</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            
            <div className={cn(
              "col-span-1 md:col-span-2 p-5 rounded-xl border border-border/30",
              "glassmorphism",
              "animate-slide-up"
            )}
              style={{ animationDelay: '100ms' }}
            >
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-blue-500/10 mr-3">
                    <Server className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Server us-west-prod-01 restarted</p>
                    <p className="text-xs text-muted-foreground">Today, 10:45 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-green-500/10 mr-3">
                    <Shield className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Security updates installed on 5 servers</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 11:32 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-purple-500/10 mr-3">
                    <Database className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Database backup completed successfully</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 03:15 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-red-500/10 mr-3">
                    <Server className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">High CPU usage detected on eu-central-prod-01</p>
                    <p className="text-xs text-muted-foreground">2 days ago, 07:22 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/30">
                <Link 
                  to="/activity" 
                  className="flex items-center text-sm text-primary hover:underline transition-colors"
                >
                  View all activity
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
