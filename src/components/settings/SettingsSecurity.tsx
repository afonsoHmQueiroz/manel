
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const SettingsSecurity = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" />
            </div>
          </div>
          
          <Button>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
};
