
import { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  AlertTriangle, 
  Info, 
  Server, 
  Settings, 
  Clock, 
  X 
} from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NotificationType = 'info' | 'warning' | 'success';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
  icon: React.ElementType;
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Server Status',
      message: 'Your server us-west-prod-01 is now online.',
      time: '2 minutes ago',
      read: false,
      type: 'success',
      icon: Server
    },
    {
      id: '2',
      title: 'Usage Warning',
      message: 'Your CPU usage is above 80% on asia-east-prod-01.',
      time: '30 minutes ago',
      read: false,
      type: 'warning',
      icon: AlertTriangle
    },
    {
      id: '3',
      title: 'Maintenance Scheduled',
      message: 'System maintenance scheduled for June 15, 2023.',
      time: '2 hours ago',
      read: true,
      type: 'info',
      icon: Clock
    },
    {
      id: '4',
      title: 'Security Update',
      message: 'Security patches have been applied to your servers.',
      time: '1 day ago',
      read: true,
      type: 'info',
      icon: Settings
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const getTypeStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 text-green-500';
      case 'warning':
        return 'bg-amber-500/10 text-amber-500';
      case 'info':
      default:
        return 'bg-blue-500/10 text-blue-500';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-full transition-colors duration-200">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="end" sideOffset={5}>
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs h-7"
            >
              <CheckCheck className="w-3.5 h-3.5 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-[350px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={cn(
                  "px-4 py-3 border-b last:border-0 relative",
                  !notification.read && "bg-secondary/40"
                )}
              >
                <div className="flex">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center mr-3",
                    getTypeStyles(notification.type)
                  )}>
                    <notification.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <button 
                        onClick={() => removeNotification(notification.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs h-6 px-2"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <Info className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No notifications</p>
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 border-t text-center">
          <Button variant="ghost" size="sm" className="text-xs w-full">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
