import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users,
  Clock,
  Building2,
  Download,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Mock summary data
const SUMMARY_STATS = {
  totalAssigned: 142,
  present: 135,
  absent: 7,
  avgHours: '7.8',
  overtime: 12,
  lateArrivals: 4,
};

const HOURLY_DATA = [
  { hour: '07', count: 12 },
  { hour: '08', count: 85 },
  { hour: '09', count: 28 },
  { hour: '10', count: 8 },
  { hour: '11', count: 2 },
  { hour: '12', count: 0 },
];

const OBJECT_SUMMARY = [
  { name: 'ЖК "Северная Звезда"', present: 40, assigned: 42 },
  { name: 'БЦ "Меридиан"', present: 27, assigned: 28 },
  { name: 'ТЦ "Галерея"', present: 33, assigned: 35 },
  { name: 'Склад "Логистик"', present: 18, assigned: 18 },
];

export default function TimekeeperSummary() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<BarChart3 className="h-5 w-5" />}
        title="Сводка"
        subtitle={`Данные на ${new Date().toLocaleDateString('ru-RU')}`}
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        }
      />

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Присутствуют"
          value={SUMMARY_STATS.present}
          icon={<Users className="h-5 w-5" />}
          variant="success"
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          label="Отсутствуют"
          value={SUMMARY_STATS.absent}
          icon={<Users className="h-5 w-5" />}
          variant="warning"
        />
        <StatCard
          label="Средние часы"
          value={SUMMARY_STATS.avgHours}
          icon={<Clock className="h-5 w-5" />}
          variant="info"
        />
        <StatCard
          label="Опоздания"
          value={SUMMARY_STATS.lateArrivals}
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="accent"
        />
      </div>

      {/* Arrival Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Распределение прибытий
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HOURLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="hour" 
                  fontSize={12}
                  tickFormatter={(v) => `${v}:00`}
                />
                <YAxis fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  labelFormatter={(v) => `${v}:00`}
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--accent))" 
                  radius={[4, 4, 0, 0]}
                  name="Прибытий"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Object Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            По объектам
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {OBJECT_SUMMARY.map((obj) => {
            const percent = (obj.present / obj.assigned) * 100;
            const isFull = percent === 100;

            return (
              <div key={obj.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{obj.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isFull ? 'bg-success' : 'bg-accent'}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {obj.present}/{obj.assigned}
                    </span>
                  </div>
                </div>
                {isFull ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-warning" />
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
