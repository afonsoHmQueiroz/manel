
import { ServiceHeader } from "@/components/services/ServiceHeader";
import { Settings2 } from "lucide-react";
import { 
  SettingsGeneral,
  SettingsSecurity,
  SettingsNotifications,
  SettingsBilling,
  SettingsAdvanced 
} from "@/components/settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <ServiceHeader
        title="Personal Settings"
        subtitle="Manage your account settings and preferences"
        icon={Settings2}
      />
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <SettingsGeneral />
        </TabsContent>
        
        <TabsContent value="security">
          <SettingsSecurity />
        </TabsContent>
        
        <TabsContent value="notifications">
          <SettingsNotifications />
        </TabsContent>
        
        <TabsContent value="billing">
          <SettingsBilling />
        </TabsContent>

        <TabsContent value="advanced">
          <SettingsAdvanced />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
