
import { useState } from 'react';
import { ServiceHeader } from "@/components/services/ServiceHeader";
import { UserPlus, Copy, Share2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://layahost.com/ref/user123";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <ServiceHeader
        title="Referral Program"
        subtitle="Invite friends and earn rewards for each successful referral"
        icon={UserPlus}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>
              Share this link with friends to earn rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input value={referralLink} readOnly className="flex-1" />
              <Button onClick={copyToClipboard} variant="outline">
                {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rewards Overview</CardTitle>
            <CardDescription>
              Track your referral rewards and earnings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-4 rounded-lg text-center">
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Total Referrals</div>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg text-center">
                <div className="text-xl font-bold">$0</div>
                <div className="text-sm text-muted-foreground">Total Earnings</div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">How it works</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 text-xs">1</span>
                  <span>Share your unique referral link with friends</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 text-xs">2</span>
                  <span>When they sign up, they get 10% off their first purchase</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 text-xs">3</span>
                  <span>You earn $10 for each successful referral</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
            <CardDescription>
              Track your referral activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <UserPlus className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-1">No referrals yet</h3>
              <p className="text-muted-foreground max-w-md">
                Start sharing your referral link with friends and colleagues to earn rewards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Referral;
