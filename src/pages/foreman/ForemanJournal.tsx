import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  LogIn, 
  LogOut, 
  ArrowRightLeft,
  Camera,
  AlertTriangle,
  Wrench,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock journal entries
const JOURNAL_ENTRIES = [
  {
    id: 'j1',
    type: 'arrival',
    description: 'Петров И.А. прибыл на объект',
    time: '07:55',
    actor: 'Система',
  },
  {
    id: 'j2',
    type: 'arrival',
    description: 'Сидоров В.М. прибыл на объект',
    time: '08:02',
    actor: 'Система',
  },
  {
    id: 'j3',
    type: 'tool',
    description: 'Выдан перфоратор T-001 → Петров И.А.',
    time: '08:10',
    actor: 'Михайлов С.',
  },
  {
    id: 'j4',
    type: 'anomaly',
    description: 'Зафиксировано опоздание: Иванов С.К. (+25 мин)',
    time: '08:25',
    actor: 'Система',
  },
  {
    id: 'j5',
    type: 'movement',
    description: 'Открыто перемещение: Козлов А.П. → БЦ "Меридиан"',
    time: '10:30',
    actor: 'Михайлов С.',
  },
  {
    id: 'j6',
    type: 'report',
    description: 'Фотоотчёт одобрен: Петров И.А. (прогресс)',
    time: '12:20',
    actor: 'Михайлов С.',
  },
  {
    id: 'j7',
    type: 'movement',
    description: 'Закрыто перемещение: Козлов А.П. прибыл на БЦ "Меридиан"',
    time: '11:45',
    actor: 'Прораб БЦ',
  },
  {
    id: 'j8',
    type: 'departure',
    description: 'Николаев Д.А. убыл с объекта',
    time: '17:05',
    actor: 'Система',
  },
];

const ENTRY_TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string }> = {
  arrival: { icon: LogIn, color: 'text-success bg-success/10' },
  departure: { icon: LogOut, color: 'text-muted-foreground bg-muted' },
  movement: { icon: ArrowRightLeft, color: 'text-info bg-info/10' },
  report: { icon: Camera, color: 'text-accent bg-accent/10' },
  anomaly: { icon: AlertTriangle, color: 'text-warning bg-warning/10' },
  tool: { icon: Wrench, color: 'text-primary bg-primary/10' },
};

export default function ForemanJournal() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<BookOpen className="h-5 w-5" />}
        title="Журнал"
        subtitle={`События за ${new Date().toLocaleDateString('ru-RU')}`}
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-3">
          {JOURNAL_ENTRIES.map((entry, index) => {
            const config = ENTRY_TYPE_CONFIG[entry.type] || ENTRY_TYPE_CONFIG.arrival;
            const Icon = config.icon;

            return (
              <div key={entry.id} className="relative pl-12">
                {/* Timeline dot */}
                <div
                  className={cn(
                    'absolute left-3 top-3 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center',
                    config.color
                  )}
                >
                  <Icon className="h-2.5 w-2.5" />
                </div>

                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm">{entry.description}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                        <Clock className="h-3 w-3" />
                        {entry.time}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {entry.actor}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
