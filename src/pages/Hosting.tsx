
import { Button } from '@/components/ui/button';
import { ServiceHeader } from '@/components/services/ServiceHeader';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { ServicePricing } from '@/components/services/ServicePricing';
import { Link } from 'react-router-dom';
import { Globe, Cloud } from 'lucide-react';

const Hosting = () => {
  const features = [
    'Free domain registration for 1 year',
    'Unlimited websites & databases',
    'Free SSL certificates',
    '99.9% uptime guarantee',
    'One-click application installer',
    'Easy website builder included'
  ];

  const plans = [
    {
      name: 'Starter',
      price: '€4.99',
      period: '/month',
      specs: {
        space: '10 GB SSD',
        sites: '1 website',
        bandwidth: 'Unmetered',
        email: '10 email accounts'
      },
      isPopular: false
    },
    {
      name: 'Business',
      price: '€9.99',
      period: '/month',
      specs: {
        space: '50 GB SSD',
        sites: 'Unlimited websites',
        bandwidth: 'Unmetered',
        email: 'Unlimited email accounts'
      },
      isPopular: true
    },
    {
      name: 'Premium',
      price: '€19.99',
      period: '/month',
      specs: {
        space: '150 GB SSD',
        sites: 'Unlimited websites',
        bandwidth: 'Unmetered',
        email: 'Unlimited email accounts'
      },
      isPopular: false
    }
  ];

  return (
    <div className="animate-fade-in">
      <ServiceHeader 
        title="Web Hosting" 
        subtitle="Fast, secure, and reliable web hosting for your website"
        icon={Globe}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <ServiceFeatures 
            title="Why choose LAYA Web Hosting?"
            description="Our high-performance web hosting solution is designed to give your website the speed and reliability it deserves."
            features={features}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-secondary/30 p-6 rounded-lg border border-border/50">
            <h3 className="text-lg font-medium mb-4">All hosting plans include:</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <Cloud className="w-4 h-4 text-primary" />
                </span>
                Free website migration
              </li>
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <Cloud className="w-4 h-4 text-primary" />
                </span>
                cPanel control panel
              </li>
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <Cloud className="w-4 h-4 text-primary" />
                </span>
                24/7 customer support
              </li>
              <li className="flex items-center text-sm">
                <span className="bg-primary/10 p-1 rounded mr-2">
                  <Cloud className="w-4 h-4 text-primary" />
                </span>
                30-day money-back guarantee
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/order">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <ServicePricing 
        title="Select Your Hosting Plan"
        description="Choose the perfect hosting plan for your website. Upgrade or downgrade anytime."
        plans={plans}
      />
      
      <div className="text-center mt-12">
        <p className="mb-4 text-muted-foreground">Questions about our hosting plans?</p>
        <Link to="/order">
          <Button variant="outline">Talk to a hosting specialist</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hosting;
