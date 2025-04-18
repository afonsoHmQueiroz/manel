
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/common/Logo";
import { DarkModeToggle } from "@/components/theme/DarkModeToggle";
import { useSignIn } from "@clerk/clerk-react";
import { useToast } from "@/components/ui/use-toast";
=======
import { Link } from "react-router-dom";
>>>>>>> 549599ad9937a4de19c036d251ff596d1b2b0f9b

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isLoaded: clerkLoaded } = useSignIn();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clerkLoaded) {
      toast({
        variant: "destructive",
        title: "Authentication service not loaded",
        description: "Please try again in a moment.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      
      if (result.status === "complete") {
        // User has been successfully logged in
        toast({
          title: "Login successful",
          description: "Redirecting to dashboard...",
        });
        navigate("/");
      } else {
        // The user needs to complete additional steps
        console.log("Additional authentication steps required");
      }
    } catch (error: any) {
      // Handle error
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.errors?.[0]?.message || "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>

      <div className="mb-8">
        <Logo />
      </div>

=======

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
>>>>>>> 549599ad9937a4de19c036d251ff596d1b2b0f9b
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <LogIn className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
<<<<<<< HEAD
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
=======
            <Button type="submit" className="w-full">
              Sign in
>>>>>>> 549599ad9937a4de19c036d251ff596d1b2b0f9b
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="underline hover:text-primary">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
