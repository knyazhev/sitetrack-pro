import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  LogIn, 
  QrCode, 
  Search, 
  CheckCircle2, 
  User,
  Clock,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock employees
const EXPECTED_WORKERS = [
  { id: 'e1', name: 'Петров Иван Александрович', position: 'Каменщик', scheduled: '08:00', arrived: true, arrivedAt: '07:55' },
  { id: 'e2', name: 'Сидоров Василий Михайлович', position: 'Сварщик', scheduled: '08:00', arrived: true, arrivedAt: '08:02' },
  { id: 'e3', name: 'Козлов Андрей Петрович', position: 'Плотник', scheduled: '08:00', arrived: false },
  { id: 'e4', name: 'Иванов Сергей Константинович', position: 'Электрик', scheduled: '08:00', arrived: false },
  { id: 'e5', name: 'Николаев Дмитрий Алексеевич', position: 'Разнорабочий', scheduled: '09:00', arrived: false },
];

export default function ForemanArrivalScan() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredWorkers = EXPECTED_WORKERS.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingWorkers = filteredWorkers.filter((w) => !w.arrived);
  const arrivedWorkers = filteredWorkers.filter((w) => w.arrived);

  const handleConfirmArrival = () => {
    if (!selectedWorker) return;
    
    toast({
      title: 'Прибытие подтверждено',
      description: 'Работник отмечен на объекте',
    });
    setSelectedWorker(null);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <PageHeader
        icon={<LogIn className="h-5 w-5" />}
        title="Прибытие"
        subtitle="Отметка прибытия работников"
      />

      {/* QR Scanner */}
      <Button variant="scan" size="xl" className="w-full">
        <QrCode className="h-5 w-5" />
        Сканировать QR работника
      </Button>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по имени или должности..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Pending Workers */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Ожидаются ({pendingWorkers.length})
        </h3>
        <div className="space-y-2">
          {pendingWorkers.map((worker) => (
            <Card
              key={worker.id}
              className={cn(
                'cursor-pointer card-interactive',
                selectedWorker === worker.id && 'ring-2 ring-accent border-accent'
              )}
              onClick={() => setSelectedWorker(worker.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{worker.name}</p>
                    <p className="text-xs text-muted-foreground">{worker.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono-data">к {worker.scheduled}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Arrived Workers */}
      {arrivedWorkers.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Прибыли ({arrivedWorkers.length})
          </h3>
          <div className="space-y-2">
            {arrivedWorkers.map((worker) => (
              <Card key={worker.id} className="bg-success/5 border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/20 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{worker.name}</p>
                      <p className="text-xs text-muted-foreground">{worker.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono-data text-success">{worker.arrivedAt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Button */}
      {selectedWorker && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <Button
            variant="success"
            size="xl"
            className="w-full"
            onClick={handleConfirmArrival}
          >
            <CheckCircle2 className="h-5 w-5" />
            Подтвердить прибытие
          </Button>
        </div>
      )}
    </div>
  );
}
