import { useState } from 'react';
import { NavLink } from '@/components/NavLink';
import { 
  LayoutDashboard, 
  MessageSquare, 
  User, 
  Newspaper, 
  FileText, 
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/chat', label: 'AI Chat', icon: MessageSquare },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/news', label: 'Market News', icon: Newspaper },
  { to: '/reports', label: 'Generated Reports', icon: FileText },
  { to: '/graphics', label: 'Graphics', icon: BarChart3 },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'sticky top-0 h-screen glass-strong border-r border-sidebar-border/40 transition-all duration-300 flex flex-col backdrop-blur-xl shadow-lg',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-end h-16 px-4 border-b border-sidebar-border/40">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-sidebar-accent/80 rounded-lg transition-all hover:scale-105 group"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-sidebar-foreground group-hover:text-sidebar-primary transition-colors" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-sidebar-foreground group-hover:text-sidebar-primary transition-colors" />
          )}
        </button>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
              'hover:bg-sidebar-accent/80 text-sidebar-foreground hover:translate-x-0.5',
              'focus:outline-none focus:ring-1 focus:ring-sidebar-ring group'
            )}
            activeClassName="bg-sidebar-accent/90 text-sidebar-primary font-semibold shadow-sm border border-sidebar-border/30"
          >
            <item.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
