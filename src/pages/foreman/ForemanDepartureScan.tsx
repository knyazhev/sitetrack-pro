import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  LogOut, 
  QrCode, 
  Search, 
  CheckCircle2, 
  User,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock on-site workers
const ON_SITE_WORKERS = [
  { id: 'e1', name: 'Петров Иван Александрович', position: 'Каменщик', arrivedAt: '07:55', hoursWorked: '8:05' },
  { id: 'e2', name: 'Сидоров Василий Михайлович', position: 'Сварщик', arrivedAt: '08:02', hoursWorked: '7:58' },
  { id: 'e3', name: 'Козлов Андрей Петрович', position: 'Плотник', arrivedAt: '08:10', hoursWorked: '7:50' },
];

export default function ForemanDepartureScan() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredWorkers = ON_SITE_WORKERS.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirmDeparture = () => {
    if (!selectedWorker) return;
    
    toast({
      title: 'Убытие подтверждено',
      description: 'Работник отмечен как убывший',
    });
    setSelectedWorker(null);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <PageHeader
        icon={<LogOut className="h-5 w-5" />}
        title="Убытие"
        subtitle="Отметка убытия работников"
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

      {/* Workers on site */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          На объекте ({filteredWorkers.length})
        </h3>
        <div className="space-y-2">
          {filteredWorkers.map((worker) => (
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
                  <div className="p-2 bg-success/20 rounded-full">
                    <User className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{worker.name}</p>
                    <p className="text-xs text-muted-foreground">{worker.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono-data">{worker.hoursWorked}</p>
                    <p className="text-xs text-muted-foreground">отработано</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      {selectedWorker && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <Button
            variant="secondary"
            size="xl"
            className="w-full"
            onClick={handleConfirmDeparture}
          >
            <LogOut className="h-5 w-5" />
            Подтвердить убытие
          </Button>
        </div>
      )}
    </div>
  );
}
