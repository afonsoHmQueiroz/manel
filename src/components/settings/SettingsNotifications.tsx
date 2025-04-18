
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const SettingsNotifications = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose what notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifs">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive email updates about your account activity
            </p>
          </div>
          <Switch id="email-notifs" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="marketing">Marketing Emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new features and special offers
            </p>
          </div>
          <Switch id="marketing" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="security">Security Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about important security updates
            </p>
          </div>
          <Switch id="security" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};
