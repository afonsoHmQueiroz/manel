
import { Suspense, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/dashboard/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { PageLoader } from '@/components/ui/page-loader';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full bg-background">
      <Header />
      <Sidebar />
      
      <main className={cn(
        "pt-24 pb-16 transition-all duration-300",
        isMobile ? "px-4" : "px-6 sm:px-10 lg:px-16",
        isMobile ? "ml-0" : "ml-64"
      )}>
        <Suspense fallback={<PageLoader />}>
          {children || <Outlet />}
        </Suspense>
      </main>
    </div>
  );
}
