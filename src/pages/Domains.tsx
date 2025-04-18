
import { Button } from '@/components/ui/button';
import { ServiceHeader } from '@/components/services/ServiceHeader';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Globe, Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Domains = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const domainPrices = [
    { extension: '.com', price: '€12.99/year', discount: '€9.99 first year' },
    { extension: '.org', price: '€14.99/year', discount: '€11.99 first year' },
    { extension: '.net', price: '€13.99/year', discount: '€10.99 first year' },
    { extension: '.io', price: '€39.99/year', discount: '' },
    { extension: '.co', price: '€29.99/year', discount: '€24.99 first year' },
    { extension: '.eu', price: '€11.99/year', discount: '€8.99 first year' },
  ];

  return (
    <div className="animate-fade-in">
      <ServiceHeader 
        title="Domain Registration" 
        subtitle="Find the perfect domain name for your website"
        icon={Globe}
      />
      
      <div className="bg-secondary/30 p-8 rounded-xl border border-border/50 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Find Your Domain Name</h2>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Enter your domain name"
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Link to="/order">
              <Button size="lg">Search</Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Search for domain names, including .com, .org, .net, and more
          </p>
        </div>
      </div>
      
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6 text-center">Domain Extension Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {domainPrices.map((domain, index) => (
            <div 
              key={domain.extension} 
              className={cn(
                "p-5 rounded-lg border border-border/50 transition-all",
                "hover:border-primary/30 hover:shadow-sm"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{domain.extension}</span>
                <div className="text-right">
                  <div className="font-semibold">{domain.price}</div>
                  {domain.discount && (
                    <div className="text-sm text-primary">{domain.discount}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-secondary/30 p-6 rounded-lg border border-border/50">
          <h3 className="text-lg font-medium mb-4">Domain Features</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                <Globe className="w-4 h-4 text-primary" />
              </span>
              <div>
                <p className="font-medium">Free WHOIS Privacy</p>
                <p className="text-sm text-muted-foreground">Keep your personal information private</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                <Globe className="w-4 h-4 text-primary" />
              </span>
              <div>
                <p className="font-medium">DNS Management</p>
                <p className="text-sm text-muted-foreground">Easy control of your domain records</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                <Globe className="w-4 h-4 text-primary" />
              </span>
              <div>
                <p className="font-medium">Domain Forwarding</p>
                <p className="text-sm text-muted-foreground">Redirect traffic to any website</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-secondary/30 p-6 rounded-lg border border-border/50">
          <h3 className="text-lg font-medium mb-4">Domain Transfer</h3>
          <p className="text-muted-foreground mb-4">
            Already have a domain? Transfer it to LAYA Host and enjoy our premium services.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-sm">
              <span className="bg-primary/10 p-1 rounded mr-2">
                <Globe className="w-4 h-4 text-primary" />
              </span>
              Free transfer process
            </li>
            <li className="flex items-center text-sm">
              <span className="bg-primary/10 p-1 rounded mr-2">
                <Globe className="w-4 h-4 text-primary" />
              </span>
              1-year extension on transfer
            </li>
            <li className="flex items-center text-sm">
              <span className="bg-primary/10 p-1 rounded mr-2">
                <Globe className="w-4 h-4 text-primary" />
              </span>
              24/7 support during transfer
            </li>
          </ul>
          <Link to="/order">
            <Button variant="outline" className="w-full">Transfer Your Domain</Button>
          </Link>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <p className="mb-4 text-muted-foreground">Need help with domain registration?</p>
        <Link to="/order">
          <Button variant="outline">Contact Our Support Team</Button>
        </Link>
      </div>
    </div>
  );
};

export default Domains;
