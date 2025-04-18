
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Server, Globe, Cloud, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  price: string;
  type: string;
  popular?: boolean;
}

interface ProductSelectorProps {
  className?: string;
}

export function ProductSelector({ className }: ProductSelectorProps) {
  const products: Product[] = [
    {
      id: 'vps-starter',
      name: 'VPS Hosting Starter',
      description: 'Virtual private server with 2 cores, 4GB RAM and 80GB SSD.',
      icon: Server,
      price: 'From $19.99/mo',
      type: 'vps',
      popular: true
    },
    {
      id: 'hosting-basic',
      name: 'Web Hosting Basic',
      description: 'Shared hosting with 10GB space, unlimited bandwidth and emails.',
      icon: Globe,
      price: 'From $9.99/mo',
      type: 'hosting'
    },
    {
      id: 'domain-registration',
      name: 'Domain Registration',
      description: 'Register or transfer your domain names with free WHOIS privacy.',
      icon: Globe,
      price: 'From $14.99/yr',
      type: 'domain'
    },
    {
      id: 'cloud-business',
      name: 'Cloud Business',
      description: 'Scalable cloud infrastructure with enterprise support and high availability.',
      icon: Cloud,
      price: 'From $49.99/mo',
      type: 'cloud'
    }
  ];
  
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {products.map((product) => (
        <Card key={product.id} className={cn(
          "flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md",
          product.popular && "border-primary/50"
        )}>
          <CardHeader className="pb-2">
            {product.popular && (
              <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Popular
              </div>
            )}
            <div className="p-2 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-2">
              <product.icon className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <CardDescription className="mt-1">
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="font-semibold text-lg">{product.price}</p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild className="w-full">
              <Link to={`/order/${product.id}`}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order Now
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
