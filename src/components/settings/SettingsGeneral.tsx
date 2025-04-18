
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const SettingsGeneral = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your personal information and profile settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button>Change Avatar</Button>
          </div>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Jane Doe" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="jane@example.com" />
            </div>
          </div>
          
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};
