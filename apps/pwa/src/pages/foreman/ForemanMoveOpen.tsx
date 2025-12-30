import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowRightLeft, 
  Search, 
  User,
  Building2,
  ArrowRight,
  Send,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock data
const WORKERS = [
  { id: 'e1', name: 'Петров Иван Александрович', position: 'Каменщик' },
  { id: 'e2', name: 'Сидоров Василий Михайлович', position: 'Сварщик' },
];

const OBJECTS = [
  { id: 'o1', name: 'ЖК "Северная Звезда"', current: true },
  { id: 'o2', name: 'БЦ "Меридиан"', current: false },
  { id: 'o3', name: 'ТЦ "Галерея"', current: false },
];

export default function ForemanMoveOpen() {
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredWorkers = WORKERS.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableDestinations = OBJECTS.filter((o) => !o.current);

  const handleSubmit = async () => {
    if (!selectedWorker || !selectedDestination) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));

    toast({
      title: 'Перемещение открыто',
      description: 'Работник направлен на новый объект',
    });

    navigate('/foreman/dashboard');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <PageHeader
        icon={<ArrowRightLeft className="h-5 w-5" />}
        title="Открыть перемещение"
        subtitle="Перевод работника на другой объект"
      />

      {/* Step 1: Select Worker */}
      <div>
        <Label className="text-sm font-medium mb-3 block">1. Выберите работника</Label>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
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
              <CardContent className="p-3 flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">{worker.name}</p>
                  <p className="text-xs text-muted-foreground">{worker.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Step 2: Select Destination */}
      {selectedWorker && (
        <div className="animate-fade-in">
          <Label className="text-sm font-medium mb-3 block">2. Выберите объект назначения</Label>
          <div className="space-y-2">
            {availableDestinations.map((obj) => (
              <Card
                key={obj.id}
                className={cn(
                  'cursor-pointer card-interactive',
                  selectedDestination === obj.id && 'ring-2 ring-accent border-accent'
                )}
                onClick={() => setSelectedDestination(obj.id)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{obj.name}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Notes */}
      {selectedDestination && (
        <div className="animate-fade-in">
          <Label className="text-sm font-medium mb-3 block">3. Примечание (опционально)</Label>
          <Textarea
            placeholder="Причина перемещения..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>
      )}

      {/* Submit */}
      {selectedWorker && selectedDestination && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <Button
            variant="accent"
            size="xl"
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Открытие...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Открыть перемещение
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
