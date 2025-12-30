import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, 
  Users, 
  Building2, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Wrench,
  FileBarChart,
  ChevronRight
} from 'lucide-react';
import { 
  PieChart as RechartsPie, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

// Mock data
const OVERVIEW_STATS = {
  totalEmployees: 156,
  activeToday: 142,
  totalObjects: 8,
  activeObjects: 6,
  anomaliesToday: 12,
  toolsIssued: 234,
};

const WORKER_DISTRIBUTION = [
  { name: 'На объектах', value: 118, color: 'hsl(var(--success))' },
  { name: 'В движении', value: 8, color: 'hsl(var(--warning))' },
  { name: 'Убыли', value: 16, color: 'hsl(var(--muted-foreground))' },
];

const WEEKLY_ATTENDANCE = [
  { day: 'Пн', present: 145, absent: 11 },
  { day: 'Вт', present: 152, absent: 4 },
  { day: 'Ср', present: 148, absent: 8 },
  { day: 'Чт', present: 142, absent: 14 },
  { day: 'Пт', present: 140, absent: 16 },
];

const TOP_OBJECTS = [
  { id: 'o1', name: 'ЖК "Северная Звезда"', workers: 42, progress: 68 },
  { id: 'o2', name: 'БЦ "Меридиан"', workers: 28, progress: 45 },
  { id: 'o3', name: 'ТЦ "Галерея"', workers: 35, progress: 82 },
];

export default function DirectorDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<PieChart className="h-5 w-5" />}
        title="Обзор"
        subtitle={`Данные на ${new Date().toLocaleDateString('ru-RU')}`}
      />

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Сотрудников сегодня"
          value={OVERVIEW_STATS.activeToday}
          icon={<Users className="h-5 w-5" />}
          variant="success"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          label="Активных объектов"
          value={OVERVIEW_STATS.activeObjects}
          icon={<Building2 className="h-5 w-5" />}
          variant="info"
        />
        <StatCard
          label="Аномалий"
          value={OVERVIEW_STATS.anomaliesToday}
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="warning"
          trend={{ value: -15, isPositive: true }}
        />
        <StatCard
          label="Инструментов выдано"
          value={OVERVIEW_STATS.toolsIssued}
          icon={<Wrench className="h-5 w-5" />}
          variant="accent"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Worker Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Распределение персонала
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={WORKER_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {WORKER_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {WORKER_DISTRIBUTION.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.name}: <strong className="text-foreground">{item.value}</strong>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Attendance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Посещаемость за неделю
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_ATTENDANCE}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="day" 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="present" 
                    fill="hsl(var(--success))" 
                    radius={[4, 4, 0, 0]}
                    name="Присутствовали"
                  />
                  <Bar 
                    dataKey="absent" 
                    fill="hsl(var(--muted))" 
                    radius={[4, 4, 0, 0]}
                    name="Отсутствовали"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Objects */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Объекты
            </CardTitle>
            <Link to="/director/objects" className="text-xs text-accent hover:underline">
              Все объекты
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {TOP_OBJECTS.map((obj) => (
            <Link key={obj.id} to={`/director/object/${obj.id}`}>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-sm">{obj.name}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {obj.workers} чел.
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Прогресс: {obj.progress}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${obj.progress}%` }}
                    />
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
