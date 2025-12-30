import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOffline } from '@/contexts/OfflineContext';
import { MobileNav } from './MobileNav';
import { DesktopSidebar } from './DesktopSidebar';
import { OfflineBanner } from './OfflineBanner';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  const { user } = useAuth();
  const { isOnline, queue, isSyncing } = useOffline();

  const isPWARole = user?.role === 'worker' || user?.role === 'foreman';

  return (
    <div className="min-h-screen bg-background">
      {/* Offline status banner */}
      <OfflineBanner 
        isOnline={isOnline} 
        queueLength={queue.length} 
        isSyncing={isSyncing} 
      />

      {/* Desktop sidebar for web roles */}
      {!isPWARole && <DesktopSidebar />}

      {/* Main content area */}
      <main
        className={cn(
          'flex flex-col min-h-screen',
          !isPWARole && 'lg:pl-64', // Sidebar offset for desktop
          isPWARole && 'pb-20', // Bottom nav offset for PWA
          className
        )}
      >
        <div className="flex-1 container py-4 lg:py-6">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav for PWA roles */}
      {isPWARole && <MobileNav />}
    </div>
  );
}
