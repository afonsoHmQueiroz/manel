
import { ServiceHeader } from '@/components/services/ServiceHeader';
import { ShoppingCart } from 'lucide-react';
import { ProductSelector } from '@/components/order/ProductSelector';

const Order = () => {
  return (
    <div className="animate-fade-in">
      <ServiceHeader 
        title="Order Services" 
        subtitle="Get started with LAYA Host services today"
        icon={ShoppingCart}
      />
      
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Select a Service to Order</h2>
        <ProductSelector />
      </div>
      
      <div className="bg-secondary/30 p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-semibold mb-4">Need Custom Solutions?</h2>
        <p className="text-muted-foreground mb-4">
          Our team can help you design a custom hosting solution that perfectly meets your business requirements.
          Contact us for a personalized quote.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="border border-border/50 rounded-lg p-4 bg-background">
            <h3 className="font-medium mb-2">Enterprise Hosting</h3>
            <p className="text-sm text-muted-foreground">
              High-performance dedicated servers and private cloud solutions for enterprise workloads.
            </p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-background">
            <h3 className="font-medium mb-2">Managed Services</h3>
            <p className="text-sm text-muted-foreground">
              Let our experts handle server administration, security updates, and optimization.
            </p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-background">
            <h3 className="font-medium mb-2">Custom Development</h3>
            <p className="text-sm text-muted-foreground">
              Custom web application development, migration services, and infrastructure automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
