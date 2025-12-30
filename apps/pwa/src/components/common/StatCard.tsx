import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'info';
  className?: string;
}

const variantStyles = {
  default: 'bg-card',
  accent: 'bg-accent/10 border-accent/20',
  success: 'bg-success/10 border-success/20',
  warning: 'bg-warning/10 border-warning/20',
  info: 'bg-info/10 border-info/20',
};

const iconVariantStyles = {
  default: 'bg-muted text-muted-foreground',
  accent: 'bg-accent/20 text-accent',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  info: 'bg-info/20 text-info',
};

export function StatCard({ 
  label, 
  value, 
  icon, 
  trend, 
  variant = 'default',
  className 
}: StatCardProps) {
  return (
    <Card className={cn('card-interactive', variantStyles[variant], className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="text-2xl lg:text-3xl font-bold font-mono-data">
              {value}
            </p>
            {trend && (
              <p className={cn(
                'text-xs font-medium mt-1',
                trend.isPositive ? 'text-success' : 'text-destructive'
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}% vs вчера
              </p>
            )}
          </div>
          {icon && (
            <div className={cn('p-2.5 rounded-lg shrink-0', iconVariantStyles[variant])}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
