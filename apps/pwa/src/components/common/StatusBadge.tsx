import React from 'react';
import { 
  ASSIGNMENT_STATUS_CONFIG, 
  MOVEMENT_STATUS_CONFIG, 
  TOOL_STATUS_CONFIG,
  ANOMALY_SEVERITY_CONFIG 
} from '@/lib/constants';
import type { AssignmentStatus, MovementStatus, ToolStatus, AnomalySeverity } from '@/types';
import { cn } from '@/lib/utils';

type StatusType = 'assignment' | 'movement' | 'tool' | 'severity';

interface StatusBadgeProps {
  type: StatusType;
  status: string;
  className?: string;
}

export function StatusBadge({ type, status, className }: StatusBadgeProps) {
  let config: { label: string; class: string } | undefined;

  switch (type) {
    case 'assignment':
      config = ASSIGNMENT_STATUS_CONFIG[status as AssignmentStatus];
      break;
    case 'movement':
      config = MOVEMENT_STATUS_CONFIG[status as MovementStatus];
      break;
    case 'tool':
      config = TOOL_STATUS_CONFIG[status as ToolStatus];
      break;
    case 'severity':
      config = ANOMALY_SEVERITY_CONFIG[status as AnomalySeverity];
      break;
  }

  if (!config) {
    return <span className="text-muted-foreground text-xs">{status}</span>;
  }

  return (
    <span className={cn('status-badge', config.class, className)}>
      {config.label}
    </span>
  );
}
