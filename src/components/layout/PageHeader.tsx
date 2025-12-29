import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, icon, actions, className }: PageHeaderProps) {
  return (
    <header className={cn('mb-6 lg:mb-8', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2.5 bg-accent/10 text-accent rounded-lg">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
