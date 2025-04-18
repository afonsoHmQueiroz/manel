
import { Button } from '@/components/ui/button';
import { ServiceHeader } from '@/components/services/ServiceHeader';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { ServicePricing } from '@/components/services/ServicePricing';
import { Link } from 'react-router-dom';
import { Cloud, CloudCog } from 'lucide-react';

const CloudHosting = () => {
  const features = [
    'Auto-scaling resources',
    'Pay only for what you use',
    'Global CDN integration',
    'High-availability architecture',
    'Rapid deployment capabilities',
    'Enterprise-grade security'
  ];

  const plans = [
    {
      name: 'Startup Cloud',
      price: '€29.99',
      period: '/month',
      specs: {
        cpu: '2 vCPU',
        ram: '4 GB RAM',
        storage: '50 GB SSD',
        transfer: '2 TB'
      },
      isPopular: false
    },
    {
      name: 'Business Cloud',
      price: '€59.99',
      period: '/month',
      specs: {
        cpu: '4 vCPU',
        ram: '8 GB RAM',
        storage: '100 GB SSD',
        transfer: '4 TB'
      },
      isPopular: true
    },
    {
      name: 'Enterprise Cloud',
      price: '€119.99',
      period: '/month',
      specs: {
        cpu: '8 vCPU',
        ram: '16 GB RAM',
        storage: '250 GB SSD',
        transfer: '8 TB'
      },
      isPopular: false
    }
  ];

  return (
    <div className="animate-fade-in">
      <ServiceHeader 
        title="Cloud Hosting" 
        subtitle="Scalable cloud infrastructure for demanding applications"
        icon={Cloud}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <ServiceFeatures 
            title="Why choose LAYA Cloud Hosting?"
            description="Our cloud platform delivers the perfect blend of performance, reliability, and scalability for modern applications."
            features={features}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-secondary/30 p-6 rounded-lg border border-border/50">
            <h3 className="text-lg font-medium mb-4">All cloud plans include:</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <CloudCog className="w-4 h-4 text-primary" />
                </span>
                Advanced monitoring tools
              </li>
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <CloudCog className="w-4 h-4 text-primary" />
                </span>
                Automated backups
              </li>
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <CloudCog className="w-4 h-4 text-primary" />
                </span>
                DDoS protection
              </li>
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <CloudCog className="w-4 h-4 text-primary" />
                </span>
                24/7 priority support
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/order">
                <Button className="w-full">Start with Cloud</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <ServicePricing 
        title="Cloud Hosting Plans"
        description="Powerful cloud infrastructure with flexible resources to meet your needs."
        plans={plans}
      />
      
      <div className="text-center mt-12">
        <p className="mb-4 text-muted-foreground">Need a custom cloud solution?</p>
        <Link to="/order">
          <Button variant="outline">Talk to our cloud experts</Button>
        </Link>
      </div>
    </div>
  );
};

export default CloudHosting;
