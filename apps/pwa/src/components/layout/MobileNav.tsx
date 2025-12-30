import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { NAVIGATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;

export function MobileNav() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = NAVIGATION[user.role] || [];

  const getIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as IconName] as React.ComponentType<{ className?: string }>;
    return Icon || LucideIcons.Circle;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.slice(0, 5).map((item) => {
          const Icon = getIcon(item.icon);
          const isActive = location.pathname === item.href;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors touch-target',
                isActive
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'scale-110')} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
