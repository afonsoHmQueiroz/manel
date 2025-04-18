
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFeaturesProps {
  title: string;
  description: string;
  features: string[];
  className?: string;
}

export function ServiceFeatures({ 
  title, 
  description, 
  features,
  className 
}: ServiceFeaturesProps) {
  return (
    <div className={cn("p-6 rounded-lg border border-border/50 bg-secondary/30", className)}>
      <h2 className="text-xl font-medium mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="p-1 rounded-full bg-primary/10 mr-3 mt-0.5">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
