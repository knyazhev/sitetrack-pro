import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { OfflineAction } from '@/types';

interface OfflineContextType {
  isOnline: boolean;
  queue: OfflineAction[];
  addToQueue: (action: Omit<OfflineAction, 'id' | 'created_at' | 'retry_count'>) => void;
  syncQueue: () => Promise<void>;
  clearQueue: () => void;
  isSyncing: boolean;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

const QUEUE_STORAGE_KEY = 'tt_offline_queue';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function OfflineProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queue, setQueue] = useState<OfflineAction[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load queue from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(QUEUE_STORAGE_KEY);
    if (stored) {
      try {
        setQueue(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse offline queue:', e);
      }
    }
  }, []);

  // Persist queue to localStorage on change
  useEffect(() => {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  }, [queue]);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addToQueue = useCallback((action: Omit<OfflineAction, 'id' | 'created_at' | 'retry_count'>) => {
    const newAction: OfflineAction = {
      ...action,
      id: generateId(),
      created_at: new Date().toISOString(),
      retry_count: 0,
    };
    setQueue(prev => [...prev, newAction]);
  }, []);

  const syncQueue = useCallback(async () => {
    if (!isOnline || queue.length === 0 || isSyncing) return;

    setIsSyncing(true);
    const successIds: string[] = [];
    const failedActions: OfflineAction[] = [];

    for (const action of queue) {
      try {
        // TODO: Replace with actual API call based on action.type
        console.log('Syncing action:', action);
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API call
        successIds.push(action.id);
      } catch (error) {
        failedActions.push({
          ...action,
          retry_count: action.retry_count + 1,
          last_error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    setQueue(failedActions);
    setIsSyncing(false);
  }, [isOnline, queue, isSyncing]);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && queue.length > 0) {
      syncQueue();
    }
  }, [isOnline, queue.length, syncQueue]);

  return (
    <OfflineContext.Provider value={{ isOnline, queue, addToQueue, syncQueue, clearQueue, isSyncing }}>
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
}
