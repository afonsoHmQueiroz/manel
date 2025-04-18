
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Server,
  BarChart3,
  Settings,
  FileText,
  Globe,
  Cloud,
  ServerCog,
  ShoppingCart,
  MessageCircle,
  Ticket,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DarkModeToggle } from '@/components/theme/DarkModeToggle';

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

interface NavItemWithSubmenu extends Omit<NavItem, 'path'> {
  items: NavItem[];
}

type NavigationItem = NavItem | NavItemWithSubmenu;

interface NavSectionProps {
  title: string;
  items: NavigationItem[];
  collapsed: boolean;
}

const primaryNav: NavigationItem[] = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Servers', icon: Server, path: '/servers' },
  { 
    name: 'Statistics', 
    icon: BarChart3, 
    items: [
      { name: 'Resources', icon: BarChart3, path: '/statistics' },
      { name: 'Activity', icon: BarChart3, path: '/statistics?tab=activity' }
    ]
  },
  { name: 'Referrals', icon: UserPlus, path: '/referral' },
];

const servicesNav: NavItem[] = [
  { name: 'VPS Hosting', icon: ServerCog, path: '/vps' },
  { name: 'Web Hosting', icon: Globe, path: '/hosting' },
  { name: 'Domains', icon: Globe, path: '/domains' },
  { name: 'Cloud', icon: Cloud, path: '/cloud' },
  { name: 'Order', icon: ShoppingCart, path: '/order' },
];

const secondaryNav: NavigationItem[] = [
  { name: 'Docs', icon: FileText, path: '/docs' },
  { 
    name: 'Personal', 
    icon: User, 
    items: [
      { name: 'Profile', icon: User, path: '/settings' },
      { name: 'Tickets', icon: MessageCircle, path: '/tickets' }
    ]
  },
];

const isNavItemWithSubmenu = (item: NavigationItem): item is NavItemWithSubmenu => {
  return 'items' in item;
};

function NavSection({ title, items, collapsed }: NavSectionProps) {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if current path matches any submenu item
    items.forEach(item => {
      if (isNavItemWithSubmenu(item)) {
        const hasActiveChild = item.items.some(subItem => 
          location.pathname === subItem.path || 
          location.pathname.startsWith(subItem.path + '/')
        );
        if (hasActiveChild) {
          setOpenSubmenu(item.name);
        }
      }
    });
  }, [location.pathname, items]);
  
  return (
    <div className="mb-8">
      {!collapsed && (
        <h3 className="px-4 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {items.map((item) => {
          const isSubmenuItem = isNavItemWithSubmenu(item);
          const isSubmenuOpen = openSubmenu === item.name;
          
          // For submenu items, check if any child is active
          let isActive = false;
          if (isSubmenuItem) {
            isActive = item.items.some(subItem => 
              location.pathname === subItem.path || 
              location.pathname.startsWith(subItem.path + '/')
            );
          } else {
            isActive = location.pathname === item.path ||
                      (item.path !== '/' && location.pathname.startsWith(item.path + '/'));
          }
          
          // Render different UI for collapsed state
          if (collapsed) {
            return (
              <li key={item.name}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {isSubmenuItem ? (
                        <div
                          className={cn(
                            "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                            "justify-center relative overflow-hidden cursor-pointer",
                            isActive 
                              ? "text-primary-foreground bg-primary" 
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          )}
                          onClick={() => setOpenSubmenu(isSubmenuOpen ? null : item.name)}
                        >
                          <span className="relative z-10">
                            <item.icon className="w-5 h-5" />
                          </span>
                          
                          {isActive && (
                            <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 z-0" />
                          )}
                          
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white" />
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          className={cn(
                            "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                            "justify-center relative overflow-hidden",
                            isActive 
                              ? "text-primary-foreground bg-primary" 
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          )}
                        >
                          <span className="relative z-10">
                            <item.icon className="w-5 h-5" />
                          </span>
                          
                          {isActive && (
                            <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 z-0" />
                          )}
                          
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white" />
                          )}
                        </Link>
                      )}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                {/* Even when collapsed, we need a way to show submenu */}
                {isSubmenuItem && isSubmenuOpen && (
                  <div className="absolute left-16 top-0 w-48 bg-popover border rounded-lg shadow-lg py-1 z-50">
                    {item.items.map(subItem => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={cn(
                          "flex items-center px-4 py-2 text-sm",
                          location.pathname === subItem.path
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        )}
                      >
                        <subItem.icon className="w-4 h-4 mr-2" />
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          }
          
          // Expanded view
          if (isSubmenuItem) {
            return (
              <li key={item.name}>
                <Collapsible
                  open={isSubmenuOpen}
                  onOpenChange={() => setOpenSubmenu(isSubmenuOpen ? null : item.name)}
                >
                  <CollapsibleTrigger className={cn(
                    "flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive 
                      ? "text-foreground bg-secondary/80" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}>
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      isSubmenuOpen && "transform rotate-180"
                    )} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-12 pr-4 py-1 space-y-1">
                    {item.items.map(subItem => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={cn(
                          "flex items-center px-2 py-1.5 rounded-md text-sm",
                          location.pathname === subItem.path || 
                          (subItem.path !== '/' && location.pathname.startsWith(subItem.path + '/'))
                            ? "bg-secondary/80 text-foreground"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        )}
                      >
                        <subItem.icon className="w-4 h-4 mr-2" />
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </li>
            );
          }
          
          return (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                  "justify-start relative overflow-hidden",
                  isActive 
                    ? "text-primary-foreground bg-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <span className="relative z-10">
                  <item.icon className="w-5 h-5 mr-3" />
                </span>
                
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 z-0" />
                )}
                
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white" />
                )}
                
                <span className="relative z-10">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out",
          "glassmorphism border-r border-border/50 overflow-y-auto flex flex-col",
          isMobile ? "w-64" : collapsed ? "w-16" : "w-64",
          isMobile && !isOpen ? "-ml-64" : "ml-0",
          "animate-slide-in"
        )}
      >
        <div className="flex-none pt-6 pb-2 px-4">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-lg font-semibold tracking-tight">LAYA Host</h1>
              </div>
            )}
            
            {!isMobile && (
              <Button
                onClick={() => setCollapsed(!collapsed)}
                variant="ghost"
                size="icon"
                className="w-6 h-6 rounded-full"
              >
                {collapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      
        <div className="flex-1 px-2 py-6">
          <NavSection title="Menu" items={primaryNav} collapsed={collapsed} />
          <NavSection title="Services" items={servicesNav} collapsed={collapsed} />
          <NavSection title="Settings" items={secondaryNav} collapsed={collapsed} />
        </div>
        
        <div className="flex-none p-4">
          {!collapsed ? (
            <div className="p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium">Jane Doe</h4>
                    <Badge variant="outline" className="text-xs mt-1">Admin</Badge>
                  </div>
                </div>
                <DarkModeToggle />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
              <DarkModeToggle />
            </div>
          )}
        </div>
      </aside>
      
      {isMobile && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg",
            "bg-primary text-primary-foreground",
            "flex items-center justify-center",
            "transition-transform duration-300 hover:scale-105"
          )}
          size="icon"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </Button>
      )}
    </>
  );
}
