
import { Button } from '@/components/ui/button';
import { ServiceHeader } from '@/components/services/ServiceHeader';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { ServicePricing } from '@/components/services/ServicePricing';
import { Link } from 'react-router-dom';
import { ServerCog } from 'lucide-react';

const VPS = () => {
  const features = [
    'Full root access and complete control',
    'SSD storage for fast performance',
    'Dedicated IP address',
    'Choose your favorite Linux distribution',
    'Instant provisioning',
    'Reliable 99.9% uptime guarantee'
  ];

  const plans = [
    {
      name: 'Basic VPS',
      price: '€9.99',
      period: '/month',
      specs: {
        cpu: '1 vCPU',
        ram: '2 GB RAM',
        storage: '20 GB SSD',
        bandwidth: '1 TB'
      },
      isPopular: false
    },
    {
      name: 'Standard VPS',
      price: '€19.99',
      period: '/month',
      specs: {
        cpu: '2 vCPU',
        ram: '4 GB RAM',
        storage: '50 GB SSD',
        bandwidth: '2 TB'
      },
      isPopular: true
    },
    {
      name: 'Professional VPS',
      price: '€39.99',
      period: '/month',
      specs: {
        cpu: '4 vCPU',
        ram: '8 GB RAM',
        storage: '100 GB SSD',
        bandwidth: '4 TB'
      },
      isPopular: false
    }
  ];

  return (
    <div className="animate-fade-in">
      <ServiceHeader 
        title="Virtual Private Servers" 
        subtitle="High-performance VPS hosting with dedicated resources and full root access"
        icon={ServerCog}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <ServiceFeatures 
            title="Why choose LAYA VPS Hosting?"
            description="Our VPS solutions give you the perfect balance of performance, control, and affordability."
            features={features}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-secondary/30 p-6 rounded-lg border border-border/50">
            <h3 className="text-lg font-medium mb-4">All VPS plans include:</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <ServerCog className="w-4 h-4 text-primary" />
                </span>
                Free control panel
              </li>
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <ServerCog className="w-4 h-4 text-primary" />
                </span>
                Weekly backups included
              </li>
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <ServerCog className="w-4 h-4 text-primary" />
                </span>
                24/7 technical support
              </li>
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <ServerCog className="w-4 h-4 text-primary" />
                </span>
                Global data center locations
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/order">
                <Button className="w-full">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <ServicePricing 
        title="Choose Your VPS Plan"
        description="Select the VPS plan that matches your needs. All plans include 24/7 support and a 30-day money-back guarantee."
        plans={plans}
      />
      
      <div className="text-center mt-12">
        <p className="mb-4 text-muted-foreground">Need a custom solution?</p>
        <Link to="/order">
          <Button variant="outline">Contact our sales team</Button>
        </Link>
      </div>
    </div>
  );
};

export default VPS;
