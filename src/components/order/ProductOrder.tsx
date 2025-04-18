
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Check, Package, Server, ShoppingCart } from 'lucide-react';
import { ServiceHeader } from '@/components/services/ServiceHeader';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

type ProductType = 'vps' | 'hosting' | 'domain' | 'cloud';

interface ProductInfo {
  id: string;
  type: ProductType;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  features: string[];
  options: {
    [key: string]: string[];
  };
}

export function ProductOrder() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    quantity: '1',
    duration: '1 Month',
    options: {} as Record<string, string>
  });
  
  // This would typically come from an API call based on the productId
  const getProductInfo = (id?: string): ProductInfo => {
    const products: Record<string, ProductInfo> = {
      'vps-starter': {
        id: 'vps-starter',
        type: 'vps',
        name: 'VPS Starter',
        title: 'VPS Starter Plan',
        subtitle: 'Perfect for small applications and websites',
        description: 'Our starter VPS plan provides reliable performance for small to medium websites and applications.',
        price: '$19.99/month',
        features: [
          '2 vCPU Cores',
          '4GB RAM',
          '80GB SSD Storage',
          '1TB Bandwidth',
          'Linux/Windows OS',
          '24/7 Support'
        ],
        options: {
          'operating-system': ['Ubuntu 22.04', 'CentOS 8', 'Debian 11', 'Windows Server 2022'],
          'backup': ['Daily', 'Weekly', 'None']
        }
      },
      'hosting-basic': {
        id: 'hosting-basic',
        type: 'hosting',
        name: 'Web Hosting Basic',
        title: 'Web Hosting Basic Plan',
        subtitle: 'Reliable hosting for personal websites',
        description: 'Our basic web hosting plan is perfect for personal websites, blogs, and small online portfolios.',
        price: '$9.99/month',
        features: [
          '10GB SSD Storage',
          'Unlimited Bandwidth',
          '5 Email Accounts',
          '1-Click WordPress Install',
          'Free SSL Certificate',
          '99.9% Uptime Guarantee'
        ],
        options: {
          'control-panel': ['cPanel', 'Plesk', 'DirectAdmin'],
          'domain': ['Register New', 'Use Existing']
        }
      },
      'domain-registration': {
        id: 'domain-registration',
        type: 'domain',
        name: 'Domain Registration',
        title: 'Domain Registration Service',
        subtitle: 'Secure your online identity',
        description: 'Register your domain name with LAYA Host and protect your online brand identity.',
        price: '$14.99/year',
        features: [
          'Free WHOIS Privacy',
          'DNS Management',
          'Email Forwarding',
          'Auto-Renewal Option',
          'Domain Lock Protection',
          '24/7 Support'
        ],
        options: {
          'domain-extension': ['.com', '.net', '.org', '.io', '.dev'],
          'registration-period': ['1 Year', '2 Years', '5 Years']
        }
      },
      'cloud-business': {
        id: 'cloud-business',
        type: 'cloud',
        name: 'Cloud Business',
        title: 'Cloud Business Solution',
        subtitle: 'Scalable cloud infrastructure for businesses',
        description: 'Our cloud business solution provides enterprise-grade infrastructure with maximum flexibility and scalability.',
        price: '$49.99/month',
        features: [
          'Dedicated vCPU Cores',
          'Scalable RAM',
          'SSD Storage',
          'Load Balancing',
          'Automated Backups',
          'Enterprise Support'
        ],
        options: {
          'deployment-region': ['US East', 'US West', 'Europe', 'Asia Pacific'],
          'managed-services': ['Basic', 'Advanced', 'Enterprise']
        }
      }
    };
    
    return products[id || 'vps-starter'] || products['vps-starter'];
  };
  
  const product = getProductInfo(productId);
  
  const handleChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, options: { ...prev.options, [name]: value } }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    console.log('Order submitted:', { product, ...formState });
    
    // Show success toast
    toast.success('Order submitted successfully', {
      description: `Your order for ${product.name} has been received.`,
      action: {
        label: 'View Order',
        onClick: () => navigate('/order')
      }
    });
    
    // Redirect to order confirmation
    navigate('/order');
  };

  return (
    <div className="animate-fade-in">
      <ServiceHeader 
        title={`Order ${product.name}`}
        subtitle={product.subtitle}
        icon={product.type === 'vps' ? Server : ShoppingCart}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription className="mt-1">{product.description}</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/${product.type}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to {product.type.toUpperCase()} Plans
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Options based on product type */}
                  {Object.entries(product.options).map(([optionKey, optionValues]) => (
                    <div key={optionKey}>
                      <label htmlFor={optionKey} className="block text-sm font-medium mb-1">
                        {optionKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </label>
                      <Select 
                        onValueChange={(value) => handleChange(optionKey, value)}
                        defaultValue={optionValues[0]}
                      >
                        <SelectTrigger id={optionKey}>
                          <SelectValue placeholder={`Select ${optionKey.replace(/-/g, ' ')}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {optionValues.map(value => (
                            <SelectItem key={value} value={value}>{value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                  
                  {/* Common options for all products */}
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium mb-1">
                      Billing Period
                    </label>
                    <Select 
                      onValueChange={(value) => setFormState(prev => ({ ...prev, duration: value }))}
                      defaultValue={formState.duration}
                    >
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select billing period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 Month">1 Month</SelectItem>
                        <SelectItem value="3 Months">3 Months (5% Off)</SelectItem>
                        <SelectItem value="6 Months">6 Months (10% Off)</SelectItem>
                        <SelectItem value="1 Year">1 Year (15% Off)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {product.type !== 'domain' && (
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                        Quantity
                      </label>
                      <Select 
                        onValueChange={(value) => setFormState(prev => ({ ...prev, quantity: value }))}
                        defaultValue={formState.quantity}
                      >
                        <SelectTrigger id="quantity">
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                
                <Button type="submit" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Place Order
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b">
                  <span className="font-medium">{product.name}</span>
                  <span>{product.price}</span>
                </div>
                
                {formState.quantity !== '1' && product.type !== 'domain' && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{formState.quantity}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing Period</span>
                  <span>{formState.duration}</span>
                </div>
                
                {Object.entries(formState.options).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                    <span>{value}</span>
                  </div>
                ))}
                
                <div className="pt-4 border-t mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{product.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-secondary/30 rounded-lg p-4">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4" />
                  What's included:
                </h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="text-sm flex gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
