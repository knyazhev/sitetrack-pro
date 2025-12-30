import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileBarChart, 
  Download, 
  Calendar,
  Users,
  Building2,
  Wrench,
  AlertTriangle,
  Clock
} from 'lucide-react';

const REPORT_TYPES = [
  {
    id: 'attendance',
    title: 'Табель учёта',
    description: 'Рабочее время сотрудников',
    icon: Clock,
    color: 'text-info bg-info/10',
  },
  {
    id: 'employees',
    title: 'Кадровый отчёт',
    description: 'Списочный состав и назначения',
    icon: Users,
    color: 'text-success bg-success/10',
  },
  {
    id: 'objects',
    title: 'По объектам',
    description: 'Прогресс и ресурсы объектов',
    icon: Building2,
    color: 'text-accent bg-accent/10',
  },
  {
    id: 'tools',
    title: 'Инструменты',
    description: 'Выдача, возврат, остатки',
    icon: Wrench,
    color: 'text-primary bg-primary/10',
  },
  {
    id: 'anomalies',
    title: 'Аномалии',
    description: 'Нарушения и отклонения',
    icon: AlertTriangle,
    color: 'text-warning bg-warning/10',
  },
];

export default function DirectorReports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<FileBarChart className="h-5 w-5" />}
        title="Отчёты"
        subtitle="Формирование и выгрузка отчётов"
      />

      {/* Period Selector */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Период
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button variant="secondary" size="sm">Сегодня</Button>
            <Button variant="outline" size="sm">Вчера</Button>
            <Button variant="outline" size="sm">Неделя</Button>
            <Button variant="outline" size="sm">Месяц</Button>
            <Button variant="outline" size="sm">Квартал</Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-1" />
              Выбрать
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Types */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REPORT_TYPES.map((report) => {
          const Icon = report.icon;
          
          return (
            <Card key={report.id} className="card-interactive">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${report.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{report.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {report.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Просмотр
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Последние выгрузки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Табель за декабрь 2024</p>
                <p className="text-xs text-muted-foreground">Сформирован 28.12.2024</p>
              </div>
            </div>
            <Button variant="ghost" size="icon-sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Отчёт по объектам Q4</p>
                <p className="text-xs text-muted-foreground">Сформирован 25.12.2024</p>
              </div>
            </div>
            <Button variant="ghost" size="icon-sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
