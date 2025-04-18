
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { Cpu, HardDrive, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataPoint {
  name: string;
  cpu: number;
  memory: number;
  network: number;
}

// Generate random data for demo
const generateMockData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const hours = 24;
  
  for (let i = 0; i < hours; i++) {
    const hour = i.toString().padStart(2, '0') + ':00';
    
    data.push({
      name: hour,
      cpu: Math.floor(20 + Math.random() * 60),
      memory: Math.floor(30 + Math.random() * 40),
      network: Math.floor(10 + Math.random() * 70),
    });
  }
  
  return data;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glassmorphism shadow-lg p-3 rounded-lg border border-border/30">
        <p className="text-xs text-foreground/70 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center my-1">
            <div 
              className="w-2 h-2 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs font-medium">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

interface ResourceCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

function ResourceCard({ title, value, icon: Icon, color, bgColor }: ResourceCardProps) {
  const [countUp, setCountUp] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(start + (end - start) * progress);
      
      setCountUp(currentCount);
      
      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <div className={cn(
      "flex flex-col items-start p-4 rounded-xl border border-border/30",
      "glassmorphism",
      "hover:translate-y-[-2px] hover:shadow-apple-hover transition-all duration-300"
    )}>
      <div className="flex items-center justify-between w-full mb-2">
        <div className={cn("p-2 rounded-lg", bgColor)}>
          <Icon className={cn("w-4 h-4", color)} />
        </div>
        <span className="text-xs text-muted-foreground">Current</span>
      </div>
      
      <div className="mt-1">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline mt-1">
          <span className="text-2xl font-semibold">{countUp}</span>
          <span className="ml-1 text-sm text-muted-foreground">%</span>
        </div>
      </div>
      
      <div className="w-full mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ 
            width: `${countUp}%`,
            backgroundColor: color 
          }}
        />
      </div>
    </div>
  );
}

export function ResourceUsage() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  
  useEffect(() => {
    // Generate random data for the demo
    setData(generateMockData());
  }, []);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResourceCard 
          title="CPU Usage" 
          value={data.length ? data[data.length - 1].cpu : 0} 
          icon={Cpu} 
          color="text-blue-500" 
          bgColor="bg-blue-500/10" 
        />
        <ResourceCard 
          title="Memory Usage" 
          value={data.length ? data[data.length - 1].memory : 0} 
          icon={HardDrive} 
          color="text-purple-500" 
          bgColor="bg-purple-500/10" 
        />
        <ResourceCard 
          title="Network Usage" 
          value={data.length ? data[data.length - 1].network : 0} 
          icon={Activity} 
          color="text-green-500" 
          bgColor="bg-green-500/10" 
        />
      </div>
      
      <div 
        className={cn(
          "mt-6 p-5 rounded-xl border border-border/30",
          "glassmorphism",
          "transition-all duration-300"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Resource Usage Trends</h2>
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center cursor-pointer"
              onMouseEnter={() => setHoveredMetric('cpu')}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <div className={cn(
                "w-3 h-3 rounded-full mr-2 bg-blue-500",
                hoveredMetric === 'cpu' ? 'animate-pulse-subtle' : ''
              )} />
              <span className="text-sm text-muted-foreground">CPU</span>
            </div>
            <div 
              className="flex items-center cursor-pointer"
              onMouseEnter={() => setHoveredMetric('memory')}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <div className={cn(
                "w-3 h-3 rounded-full mr-2 bg-purple-500",
                hoveredMetric === 'memory' ? 'animate-pulse-subtle' : ''
              )} />
              <span className="text-sm text-muted-foreground">Memory</span>
            </div>
            <div 
              className="flex items-center cursor-pointer"
              onMouseEnter={() => setHoveredMetric('network')}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <div className={cn(
                "w-3 h-3 rounded-full mr-2 bg-green-500",
                hoveredMetric === 'network' ? 'animate-pulse-subtle' : ''
              )} />
              <span className="text-sm text-muted-foreground">Network</span>
            </div>
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
                stroke="#94a3b8"
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
                domain={[0, 100]}
                stroke="#94a3b8"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="cpu" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCpu)" 
                activeDot={{ r: 6, strokeWidth: 0 }}
                isAnimationActive={true}
                animationDuration={1500}
                className={hoveredMetric && hoveredMetric !== 'cpu' ? 'opacity-30' : 'opacity-100'}
              />
              <Area 
                type="monotone" 
                dataKey="memory" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorMemory)" 
                activeDot={{ r: 6, strokeWidth: 0 }}
                isAnimationActive={true}
                animationDuration={1500}
                animationBegin={300}
                className={hoveredMetric && hoveredMetric !== 'memory' ? 'opacity-30' : 'opacity-100'}
              />
              <Area 
                type="monotone" 
                dataKey="network" 
                stroke="#10B981" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorNetwork)" 
                activeDot={{ r: 6, strokeWidth: 0 }}
                isAnimationActive={true}
                animationDuration={1500}
                animationBegin={600}
                className={hoveredMetric && hoveredMetric !== 'network' ? 'opacity-30' : 'opacity-100'}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
