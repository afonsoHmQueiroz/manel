
import { useState, useEffect } from 'react';
import { BarChart3, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  duration?: string;
  maxValue?: number;
  isPercentage?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function MetricsCard({
  title,
  value,
  change,
  trend = 'neutral',
  duration = '24h',
  maxValue = 100,
  isPercentage = false,
  prefix = '',
  suffix = '',
  className
}: MetricsCardProps) {
  const [countUp, setCountUp] = useState(0);
  
  useEffect(() => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    let start = 0;
    const end = numValue;
    const duration = 1000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = isPercentage 
        ? Math.round((start + (end - start) * progress) * 10) / 10
        : Math.floor(start + (end - start) * progress);
        
      setCountUp(currentCount);
      
      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);
    
    return () => clearInterval(timer);
  }, [value, isPercentage]);
  
  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return 'text-green-500 bg-green-500/10';
      case 'down': return 'text-red-500 bg-red-500/10';
      case 'neutral': return 'text-muted-foreground bg-secondary';
      default: return 'text-muted-foreground bg-secondary';
    }
  };
  
  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return ArrowUpRight;
      case 'down': return ArrowDownRight;
      default: return MoreHorizontal;
    }
  };
  
  const TrendIcon = getTrendIcon(trend);
  const percentageValue = typeof value === 'string' ? parseFloat(value) : value;
  const percentageOfMax = (percentageValue / maxValue) * 100;
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300",
        "p-5 border border-border/40 glassmorphism",
        "hover:translate-y-[-2px] hover:shadow-apple-hover",
        "animate-scale-in",
        className
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-1.5 rounded-md bg-secondary/70">
          <BarChart3 className="w-4 h-4 text-foreground/70" />
        </div>
      </div>
      
      <div className="flex items-end justify-between mb-4">
        <div className="flex items-baseline">
          {prefix && <span className="text-lg text-muted-foreground mr-0.5">{prefix}</span>}
          <span className="text-2xl font-semibold tracking-tight">
            {isPercentage ? countUp.toFixed(1) : countUp}
          </span>
          {suffix && <span className="text-lg text-muted-foreground ml-0.5">{suffix}</span>}
        </div>
        
        {change !== undefined && (
          <div className={cn(
            "flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
            getTrendColor(trend)
          )}>
            <TrendIcon className="w-3 h-3 mr-0.5" />
            {change > 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
      
      {/* Progress indicator */}
      <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
          style={{ width: `${percentageOfMax}%` }}
        />
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        Last {duration}
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 pointer-events-none" />
    </div>
  );
}
