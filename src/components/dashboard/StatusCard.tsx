
import { Server, Cpu, Network, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusType = 'online' | 'offline' | 'maintenance' | 'warning';

interface StatusCardProps {
  name: string;
  status: StatusType;
  type: 'server' | 'database' | 'network';
  uptime?: string;
  region?: string;
  lastChecked?: string;
  className?: string;
}

export function StatusCard({ 
  name, 
  status, 
  type, 
  uptime, 
  region, 
  lastChecked,
  className 
}: StatusCardProps) {
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-red-500';
      case 'maintenance': return 'text-amber-500';
      case 'warning': return 'text-amber-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBg = (status: StatusType) => {
    switch (status) {
      case 'online': return 'bg-green-500/10';
      case 'offline': return 'bg-red-500/10';
      case 'maintenance': return 'bg-amber-500/10';
      case 'warning': return 'bg-amber-500/10';
      default: return 'bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: StatusType) => {
    switch (status) {
      case 'online': return CheckCircle;
      case 'offline': return AlertCircle;
      case 'maintenance': return Clock;
      case 'warning': return AlertCircle;
      default: return CheckCircle;
    }
  };

  const getTypeIcon = (type: 'server' | 'database' | 'network') => {
    switch (type) {
      case 'server': return Server;
      case 'database': return Cpu;
      case 'network': return Network;
      default: return Server;
    }
  };

  const StatusIcon = getStatusIcon(status);
  const TypeIcon = getTypeIcon(type);

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl p-5 transition-all duration-300",
        "hover:translate-y-[-2px] hover:shadow-apple-hover",
        "border border-border/40 glassmorphism",
        "animate-scale-in",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "p-2 rounded-lg",
            getStatusBg(status)
          )}>
            <TypeIcon className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <div className="flex items-center mt-1">
              <StatusIcon className={cn("w-3.5 h-3.5 mr-1", getStatusColor(status))} />
              <span className={cn("text-xs capitalize", getStatusColor(status))}>
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {uptime && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Uptime</span>
            <span className="text-xs font-medium">{uptime}</span>
          </div>
        )}
        
        {region && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Region</span>
            <span className="text-xs font-medium">{region}</span>
          </div>
        )}
        
        {lastChecked && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Last checked</span>
            <span className="text-xs font-medium">{lastChecked}</span>
          </div>
        )}
      </div>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 pointer-events-none" />
    </div>
  );
}
