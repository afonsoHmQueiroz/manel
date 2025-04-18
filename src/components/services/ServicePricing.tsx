
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

interface PlanSpec {
  [key: string]: string;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  specs: PlanSpec;
  isPopular: boolean;
}

interface ServicePricingProps {
  title: string;
  description: string;
  plans: Plan[];
  className?: string;
}

export function ServicePricing({ 
  title, 
  description, 
  plans,
  className 
}: ServicePricingProps) {
  return (
    <div className={cn("", className)}>
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={cn(
              "relative p-6 rounded-xl border transition-all duration-300",
              "hover:shadow-lg hover:border-primary/30",
              plan.isPopular 
                ? "border-primary/50 bg-primary/5 shadow-md" 
                : "border-border/50 bg-secondary/30"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Most Popular
              </div>
            )}
            
            <h3 className="text-lg font-medium mb-1">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>
            
            <div className="space-y-3 mb-6">
              {Object.entries(plan.specs).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <div className="p-1 rounded-full bg-primary/10 mr-3">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">
                    <span className="font-medium">{value}</span>
                  </span>
                </div>
              ))}
            </div>
            
            <Link to="/order" className="block mt-auto">
              <Button 
                className="w-full" 
                variant={plan.isPopular ? "default" : "outline"}
              >
                Select Plan
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
