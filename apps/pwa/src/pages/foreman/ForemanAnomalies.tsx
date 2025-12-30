import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { ANOMALY_TYPE_LABELS } from '@/lib/constants';
import { 
  AlertTriangle, 
  User,
  Clock,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import type { AnomalyType, AnomalySeverity } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Mock anomalies
const ANOMALIES = [
  {
    id: 'a1',
    type: 'late_arrival' as AnomalyType,
    severity: 'medium' as AnomalySeverity,
    employee: 'Иванов Сергей Константинович',
    description: 'Опоздание на 25 минут',
    detectedAt: '08:25',
    resolved: false,
  },
  {
    id: 'a2',
    type: 'overdue_tool' as AnomalyType,
    severity: 'high' as AnomalySeverity,
    employee: 'Николаев Дмитрий Алексеевич',
    description: 'Перфоратор T-001 не возвращён (>48ч)',
    detectedAt: '09:00',
    resolved: false,
  },
  {
    id: 'a3',
    type: 'missed_checkin' as AnomalyType,
    severity: 'low' as AnomalySeverity,
    employee: 'Козлов Андрей Петрович',
    description: 'Пропущена отметка зоны',
    detectedAt: '11:30',
    resolved: true,
    resolvedAt: '11:45',
  },
];

export default function ForemanAnomalies() {
  const { toast } = useToast();

  const activeAnomalies = ANOMALIES.filter((a) => !a.resolved);
  const resolvedAnomalies = ANOMALIES.filter((a) => a.resolved);

  const handleResolve = (anomalyId: string) => {
    toast({
      title: 'Аномалия разрешена',
      description: 'Запись добавлена в журнал',
    });
  };

  if (ANOMALIES.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          icon={<AlertTriangle className="h-5 w-5" />}
          title="Аномалии"
          subtitle="Отклонения от нормы"
        />
        <EmptyState
          icon={<CheckCircle2 className="h-12 w-12" />}
          title="Аномалий нет"
          description="Все показатели в норме"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<AlertTriangle className="h-5 w-5" />}
        title="Аномалии"
        subtitle={`${activeAnomalies.length} активных`}
      />

      {/* Active Anomalies */}
      {activeAnomalies.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3 text-destructive flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Требуют внимания
          </h3>
          <div className="space-y-3">
            {activeAnomalies.map((anomaly) => (
              <Card key={anomaly.id} className="border-warning/30">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-sm font-medium">
                        {ANOMALY_TYPE_LABELS[anomaly.type]}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {anomaly.employee}
                        </span>
                      </div>
                    </div>
                    <StatusBadge type="severity" status={anomaly.severity} />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {anomaly.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Обнаружено в {anomaly.detectedAt}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleResolve(anomaly.id)}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Разрешить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Resolved Anomalies */}
      {resolvedAnomalies.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Разрешены сегодня
          </h3>
          <div className="space-y-2">
            {resolvedAnomalies.map((anomaly) => (
              <Card key={anomaly.id} className="bg-muted/30">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">
                        {ANOMALY_TYPE_LABELS[anomaly.type]}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {anomaly.employee}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-success">
                      <CheckCircle2 className="h-3 w-3" />
                      {anomaly.resolvedAt}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
