
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NotificationsDropdown } from './NotificationsDropdown';
import { ProfileDropdown } from './ProfileDropdown';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Detect scroll for header appearance change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300 ease-in-out",
        scrolled ? "glassmorphism" : "bg-transparent",
        "animate-fade-in"
      )}
      style={{ 
        backdropFilter: scrolled ? 'blur(15px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(15px)' : 'none',
      }}
    >
      <div className="max-w-full mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-medium tracking-tight">
            Hosting <span className="font-light">Dashboard</span>
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <div 
            className={cn(
              "relative flex items-center",
              searchFocused ? "w-64" : "w-48",
              "transition-all duration-300 ease-in-out"
            )}
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <input 
              type="search" 
              className={cn(
                "w-full py-2 pl-10 pr-3 bg-secondary/50 border-0 rounded-full",
                "focus:ring-1 focus:ring-primary/20 focus:outline-none",
                "transition-all duration-300 ease-in-out",
                "placeholder:text-muted-foreground/70 text-sm"
              )}
              placeholder="Search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          <NotificationsDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
