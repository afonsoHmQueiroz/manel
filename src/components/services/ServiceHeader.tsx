
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  className?: string;
}

export function ServiceHeader({ 
  title, 
  subtitle, 
  icon: Icon,
  className 
}: ServiceHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-md bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      </div>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        {subtitle}
      </p>
    </div>
  );
}
