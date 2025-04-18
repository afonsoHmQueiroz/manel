
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DarkModeToggle() {
<<<<<<< HEAD
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Initialize dark mode on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
=======
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for system preference on component mount
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
>>>>>>> 549599ad9937a4de19c036d251ff596d1b2b0f9b
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleDarkMode}
      className="rounded-full w-9 h-9 transition-all duration-200"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-muted-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
