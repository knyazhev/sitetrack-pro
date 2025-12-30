import React from 'react';
import { WifiOff, Cloud, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfflineBannerProps {
  isOnline: boolean;
  queueLength: number;
  isSyncing: boolean;
}

export function OfflineBanner({ isOnline, queueLength, isSyncing }: OfflineBannerProps) {
  if (isOnline && queueLength === 0 && !isSyncing) return null;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium safe-top transition-all duration-300',
        isOnline
          ? 'bg-info text-info-foreground'
          : 'bg-warning text-warning-foreground'
      )}
    >
      {isOnline ? (
        <>
          {isSyncing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Cloud className="h-4 w-4" />
          )}
          <span>
            {isSyncing
              ? `Синхронизация... (${queueLength})`
              : `${queueLength} действий ожидают синхронизации`}
          </span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4" />
          <span>Офлайн режим — действия сохраняются локально</span>
        </>
      )}
    </div>
  );
}
