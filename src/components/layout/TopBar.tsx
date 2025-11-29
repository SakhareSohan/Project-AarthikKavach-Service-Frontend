import { useState } from 'react';
import { Bell, User, Settings, LogOut, Sun, Moon, Shield, CheckCircle2 } from 'lucide-react';
import { useZerodhaAuth } from '@/contexts/ZerodhaAuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';

export function TopBar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isConnected, userId, profileData, connectWithZerodha, disconnect } = useZerodhaAuth();

  const mockNotifications = [
    { id: '1', title: 'RPN Alert', message: 'Your risk level increased by 12 points', time: '5m ago' },
    { id: '2', title: 'Market Update', message: 'Tech sector volatility detected', time: '1h ago' },
    { id: '3', title: 'Report Ready', message: 'Monthly analysis generated', time: '2h ago' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-16 glass-strong backdrop-blur-xl border-b border-border/40 shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
            <Shield className="w-5 h-5" />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Aarthik Kavach</h1>
            <p className="text-xs text-muted-foreground font-medium">Intelligent Shield</p>
          </div>
        </div>

        {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Zerodha Connection */}
        {!isConnected ? (
          <Button 
            onClick={connectWithZerodha}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            Connect with Zerodha
          </Button>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Connected: {userId?.slice(0, 8)}...
            </span>
          </div>
        )}

        {/* Notifications */}
        <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <button 
                className="relative p-2.5 hover:bg-muted/80 rounded-xl transition-all duration-200 hover:scale-105 group"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                <Badge 
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive shadow-lg shadow-destructive/30 animate-pulse"
                >
                  3
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockNotifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="font-medium text-sm">{notif.title}</div>
                  <div className="text-xs text-muted-foreground">{notif.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">{notif.time}</div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu - Always visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:opacity-90 transition-all duration-200 hover:scale-105">
                <Avatar className="w-9 h-9 ring-2 ring-primary/20 hover:ring-primary/40 transition-all shadow-md">
                  {isConnected && profileData?.user.image_url ? (
                    <img 
                      src={profileData.user.image_url} 
                      alt={profileData.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold text-sm">
                    {isConnected && profileData 
                      ? profileData.user.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                      : 'U'
                    }
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isConnected && profileData ? (
                <>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profileData.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {profileData.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
                    {theme === 'dark' ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Dark Mode
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive"
                    onClick={disconnect}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">User</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
                    {theme === 'dark' ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Dark Mode
                      </>
                    )}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
