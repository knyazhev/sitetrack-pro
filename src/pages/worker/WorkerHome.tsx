import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  QrCode, 
  MapPin, 
  Camera, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Wrench
} from 'lucide-react';

// Mock data
const CURRENT_ASSIGNMENT = {
  object: 'ЖК "Северная Звезда"',
  zone: 'Блок А, этаж 5',
  status: 'on_object' as const,
  scheduled_start: '08:00',
  scheduled_end: '17:00',
  actual_start: '07:55',
};

const TODAY_TOOLS = [
  { id: '1', name: 'Перфоратор Bosch', code: 'T-001' },
  { id: '2', name: 'Шуруповёрт Makita', code: 'T-042' },
];

export default function WorkerHome() {
  const { employee } = useAuth();

  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Доброе утро' : now.getHours() < 18 ? 'Добрый день' : 'Добрый вечер';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        icon={<Home className="h-5 w-5" />}
        title={`${greeting}, ${employee?.first_name || 'Рабочий'}!`}
        subtitle={new Date().toLocaleDateString('ru-RU', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long' 
        })}
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/worker/qr">
          <Button variant="scan" size="xl" className="w-full flex-col h-24 gap-2">
            <QrCode className="h-7 w-7" />
            <span>Сканер QR</span>
          </Button>
        </Link>
        <Link to="/worker/report-create">
          <Button variant="action" size="xl" className="w-full flex-col h-24 gap-2">
            <Camera className="h-7 w-7" />
            <span>Фотоотчёт</span>
          </Button>
        </Link>
      </div>

      {/* Current Assignment */}
      <Card className="card-interactive border-accent/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Текущее назначение</CardTitle>
            <StatusBadge type="assignment" status={CURRENT_ASSIGNMENT.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <MapPin className="h-4 w-4" />
              <span>Объект</span>
            </div>
            <p className="font-medium">{CURRENT_ASSIGNMENT.object}</p>
            <p className="text-sm text-muted-foreground">{CURRENT_ASSIGNMENT.zone}</p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                <span>График</span>
              </div>
              <p className="font-mono-data text-sm">
                {CURRENT_ASSIGNMENT.scheduled_start} — {CURRENT_ASSIGNMENT.scheduled_end}
              </p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Отметился</span>
              </div>
              <p className="font-mono-data text-sm text-success">
                {CURRENT_ASSIGNMENT.actual_start}
              </p>
            </div>
          </div>

          <Link to="/worker/zone-scan" className="block">
            <Button variant="outline" className="w-full justify-between">
              <span>Сменить зону</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Tools */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              Инструменты на смену
            </CardTitle>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {TODAY_TOOLS.length} шт.
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {TODAY_TOOLS.map((tool) => (
              <li
                key={tool.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <span className="font-medium text-sm">{tool.name}</span>
                <code className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded">
                  {tool.code}
                </code>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Часов сегодня"
          value="4:30"
          variant="info"
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard
          label="Отчётов"
          value="2"
          variant="success"
          icon={<Camera className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}
