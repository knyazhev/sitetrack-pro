import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  User,
  Camera,
  ChevronRight,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock reports
const REPORTS = [
  {
    id: 'r1',
    employee: 'Петров И.А.',
    type: 'progress',
    description: 'Завершена кладка стен на 5 этаже, блок А',
    photos: 3,
    submittedAt: '12:15',
    status: 'submitted',
  },
  {
    id: 'r2',
    employee: 'Сидоров В.М.',
    type: 'issue',
    description: 'Обнаружена трещина в перекрытии',
    photos: 2,
    submittedAt: '11:45',
    status: 'submitted',
  },
  {
    id: 'r3',
    employee: 'Козлов А.П.',
    type: 'completion',
    description: 'Монтаж окон завершён',
    photos: 4,
    submittedAt: '10:30',
    status: 'approved',
    reviewedAt: '10:45',
  },
];

const REPORT_TYPE_CONFIG: Record<string, { label: string; class: string }> = {
  progress: { label: 'Прогресс', class: 'bg-success/15 text-success' },
  issue: { label: 'Проблема', class: 'bg-warning/15 text-warning' },
  completion: { label: 'Завершение', class: 'bg-info/15 text-info' },
  safety: { label: 'Безопасность', class: 'bg-destructive/15 text-destructive' },
};

export default function ForemanReports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const { toast } = useToast();

  const pendingReports = REPORTS.filter((r) => r.status === 'submitted');
  const reviewedReports = REPORTS.filter((r) => r.status !== 'submitted');

  const handleApprove = (reportId: string) => {
    toast({
      title: 'Отчёт одобрен',
      description: 'Работник получит уведомление',
    });
    setSelectedReport(null);
  };

  const handleReject = (reportId: string) => {
    toast({
      variant: 'destructive',
      title: 'Отчёт отклонён',
      description: 'Работник должен переделать отчёт',
    });
    setSelectedReport(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<FileText className="h-5 w-5" />}
        title="Фотоотчёты"
        subtitle="Проверка отчётов работников"
      />

      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            На проверке ({pendingReports.length})
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Проверены
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3 mt-4">
          {pendingReports.map((report) => (
            <Card
              key={report.id}
              className="card-interactive"
              onClick={() => setSelectedReport(report.id)}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{report.employee}</span>
                  </div>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full', REPORT_TYPE_CONFIG[report.type].class)}>
                    {REPORT_TYPE_CONFIG[report.type].label}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {report.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Camera className="h-3 w-3" />
                      {report.photos} фото
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {report.submittedAt}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="success"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(report.id);
                    }}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Одобрить
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReject(report.id);
                    }}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Отклонить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-3 mt-4">
          {reviewedReports.map((report) => (
            <Card key={report.id} className="bg-muted/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{report.employee}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-success">
                    <CheckCircle2 className="h-3 w-3" />
                    Одобрен
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {report.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Camera className="h-3 w-3" />
                    {report.photos} фото
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Проверен в {report.reviewedAt}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
