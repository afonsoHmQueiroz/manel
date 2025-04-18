
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export const SettingsBilling = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Update your billing information and view payment history
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <CreditCard className="h-6 w-6" />
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/24</p>
            </div>
            <Button variant="outline" className="ml-auto">Change</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your recent transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b last:border-0">
                <div>
                  <p className="font-medium">Monthly Subscription</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <p className="font-medium">$29.99</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
