<<<<<<< HEAD

=======
>>>>>>> 549599ad9937a4de19c036d251ff596d1b2b0f9b
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { PageLoader } from "./components/ui/page-loader";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { PageLoader } from "./components/ui/page-loader";
>>>>>>> 549599ad9937a4de19c036d251ff596d1b2b0f9b

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Servers = lazy(() => import("./pages/Servers"));
const ServerPage = lazy(() => import("./pages/ServerPage"));
const Statistics = lazy(() => import("./pages/Statistics"));
const VPS = lazy(() => import("./pages/VPS"));
const Hosting = lazy(() => import("./pages/Hosting"));
const Domains = lazy(() => import("./pages/Domains"));
const Cloud = lazy(() => import("./pages/Cloud"));
const Order = lazy(() => import("./pages/Order"));
const ProductOrderPage = lazy(() => import("./pages/ProductOrderPage"));
const Tickets = lazy(() => import("./pages/Tickets"));
const TicketPage = lazy(() => import("./pages/TicketPage"));
const Settings = lazy(() => import("./pages/Settings"));
const Referral = lazy(() => import("./pages/Referral"));
const KnowledgeBase = lazy(() => import("./pages/docs/KnowledgeBase"));
const Article = lazy(() => import("./pages/docs/Article"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/auth/LoginPage"));
const Register = lazy(() => import("./pages/auth/RegisterPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
<<<<<<< HEAD
            {/* Auth routes - accessible when signed out */}
            <Route
              path="/login"
              element={
                <SignedOut>
                  <Login />
                </SignedOut>
              }
            />
            <Route
              path="/register"
              element={
                <SignedOut>
                  <Register />
                </SignedOut>
              }
            />
            
            {/* Dashboard routes - require authentication */}
            <Route
              path="/"
              element={
                <SignedIn>
                  <DashboardLayout />
                </SignedIn>
              }
            >
=======
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Dashboard routes */}
            <Route path="/" element={<DashboardLayout />}>
>>>>>>> 549599ad9937a4de19c036d251ff596d1b2b0f9b
              <Route index element={<Index />} />
              <Route path="servers" element={<Servers />} />
              <Route path="servers/:serverId" element={<ServerPage />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="vps" element={<VPS />} />
              <Route path="hosting" element={<Hosting />} />
              <Route path="domains" element={<Domains />} />
              <Route path="cloud" element={<Cloud />} />
              <Route path="order" element={<Order />} />
              <Route path="order/:productId" element={<ProductOrderPage />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="tickets/:ticketId" element={<TicketPage />} />
              <Route path="docs" element={<KnowledgeBase />} />
              <Route path="docs/:articleId" element={<Article />} />
              <Route path="settings" element={<Settings />} />
              <Route path="referral" element={<Referral />} />
              <Route path="*" element={<NotFound />} />
            </Route>
<<<<<<< HEAD
            
            {/* Catch all unauthorized access attempts */}
            <Route
              path="*"
              element={
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              }
            />
=======
>>>>>>> 549599ad9937a4de19c036d251ff596d1b2b0f9b
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
