import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { NAVIGATION, ROLE_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { HardHat, LogOut, Settings } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

type IconName = keyof typeof LucideIcons;

export function DesktopSidebar() {
  const { user, employee, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = NAVIGATION[user.role] || [];

  const getIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as IconName] as React.ComponentType<{ className?: string }>;
    return Icon || LucideIcons.Circle;
  };

  const initials = employee
    ? `${employee.first_name[0]}${employee.last_name[0]}`
    : user.email[0].toUpperCase();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 header-gradient">
        <div className="p-2 bg-accent/20 rounded-lg">
          <HardHat className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-sidebar-foreground">ToolTrack</h1>
          <p className="text-xs text-sidebar-foreground/60">Учёт персонала</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = getIcon(item.icon);
          const isActive = location.pathname.startsWith(item.href);

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
              )}
            </NavLink>
          );
        })}
      </nav>

      <Separator className="bg-sidebar-border" />

      {/* User section */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10 border-2 border-sidebar-accent">
            <AvatarImage src={employee?.photo_url} />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {employee ? `${employee.first_name} ${employee.last_name}` : user.email}
            </p>
            <p className="text-xs text-sidebar-foreground/60">
              {ROLE_LABELS[user.role]}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={logout}
            className="text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
