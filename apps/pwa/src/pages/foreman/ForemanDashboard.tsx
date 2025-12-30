import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LayoutDashboard,
  Users,
  AlertTriangle,
  LogIn,
  LogOut,
  ArrowRightLeft,
  FileText,
  Clock,
  TrendingUp
} from 'lucide-react';

// Mock data
const STATS = {
  totalWorkers: 24,
  onSite: 18,
  inMovement: 2,
  departed: 4,
  anomaliesToday: 3,
  pendingReports: 5,
};

const RECENT_ARRIVALS = [
  { id: '1', name: 'Петров И.А.', time: '08:15', zone: 'Блок А, этаж 5' },
  { id: '2', name: 'Сидоров В.М.', time: '08:10', zone: 'Блок Б, этаж 2' },
  { id: '3', name: 'Козлов А.П.', time: '08:05', zone: 'Склад' },
];

const ACTIVE_ANOMALIES = [
  { id: '1', type: 'late_arrival', employee: 'Иванов С.К.', severity: 'medium' },
  { id: '2', type: 'overdue_tool', employee: 'Николаев Д.А.', severity: 'high' },
];

export default function ForemanDashboard() {
  const { employee } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<LayoutDashboard className="h-5 w-5" />}
        title={`Панель прораба`}
        subtitle={`ЖК "Северная Звезда" • ${new Date().toLocaleDateString('ru-RU')}`}
        actions={
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Смена 08:00–17:00
          </Button>
        }
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/foreman/arrival-scan">
          <Button variant="success" size="touch" className="w-full justify-start">
            <LogIn className="h-5 w-5 mr-2" />
            Прибытие
          </Button>
        </Link>
        <Link to="/foreman/departure-scan">
          <Button variant="secondary" size="touch" className="w-full justify-start">
            <LogOut className="h-5 w-5 mr-2" />
            Убытие
          </Button>
        </Link>
        <Link to="/foreman/move-open">
          <Button variant="info" size="touch" className="w-full justify-start">
            <ArrowRightLeft className="h-5 w-5 mr-2" />
            Перемещение
          </Button>
        </Link>
        <Link to="/foreman/reports">
          <Button variant="outline" size="touch" className="w-full justify-start">
            <FileText className="h-5 w-5 mr-2" />
            Отчёты
            {STATS.pendingReports > 0 && (
              <span className="ml-auto bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                {STATS.pendingReports}
              </span>
            )}
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="На объекте"
          value={STATS.onSite}
          icon={<Users className="h-5 w-5" />}
          variant="success"
        />
        <StatCard
          label="В движении"
          value={STATS.inMovement}
          icon={<ArrowRightLeft className="h-5 w-5" />}
          variant="warning"
        />
        <StatCard
          label="Убыли"
          value={STATS.departed}
          icon={<LogOut className="h-5 w-5" />}
          variant="default"
        />
        <StatCard
          label="Аномалии"
          value={STATS.anomaliesToday}
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="accent"
        />
      </div>

      {/* Anomalies Alert */}
      {ACTIVE_ANOMALIES.length > 0 && (
        <Card className="border-warning/30 bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Активные аномалии
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ACTIVE_ANOMALIES.map((anomaly) => (
              <div
                key={anomaly.id}
                className="flex items-center justify-between p-2 bg-background rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium">{anomaly.employee}</p>
                  <p className="text-xs text-muted-foreground">
                    {anomaly.type === 'late_arrival' ? 'Опоздание' : 'Просрочка инструмента'}
                  </p>
                </div>
                <StatusBadge type="severity" status={anomaly.severity} />
              </div>
            ))}
            <Link to="/foreman/anomalies">
              <Button variant="ghost" size="sm" className="w-full mt-2">
                Все аномалии
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Recent Arrivals */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Последние прибытия
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              Сегодня
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {RECENT_ARRIVALS.map((arrival) => (
            <div
              key={arrival.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium">{arrival.name}</p>
                <p className="text-xs text-muted-foreground">{arrival.zone}</p>
              </div>
              <span className="text-sm font-mono-data text-muted-foreground">
                {arrival.time}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
