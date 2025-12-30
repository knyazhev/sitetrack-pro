import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { 
  ArrowRightLeft, 
  User,
  Building2,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock open movements
const OPEN_MOVEMENTS = [
  { 
    id: 'm1', 
    employee: 'Петров Иван Александрович',
    fromObject: 'ЖК "Северная Звезда"',
    toObject: 'БЦ "Меридиан"',
    openedAt: '10:30',
    status: 'open' as const,
  },
  { 
    id: 'm2', 
    employee: 'Сидоров Василий Михайлович',
    fromObject: 'ЖК "Северная Звезда"',
    toObject: 'ТЦ "Галерея"',
    openedAt: '11:15',
    status: 'open' as const,
  },
];

export default function ForemanMoveClose() {
  const [selectedMovement, setSelectedMovement] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCloseMovement = async () => {
    if (!selectedMovement) return;

    setIsClosing(true);
    await new Promise((r) => setTimeout(r, 1000));

    toast({
      title: 'Перемещение закрыто',
      description: 'Работник прибыл на новый объект',
    });

    navigate('/foreman/dashboard');
  };

  if (OPEN_MOVEMENTS.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          icon={<ArrowRightLeft className="h-5 w-5" />}
          title="Закрыть перемещение"
          subtitle="Подтверждение прибытия на объект"
        />
        <EmptyState
          icon={<ArrowRightLeft className="h-12 w-12" />}
          title="Нет открытых перемещений"
          description="Все работники на своих объектах"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <PageHeader
        icon={<ArrowRightLeft className="h-5 w-5" />}
        title="Закрыть перемещение"
        subtitle="Подтверждение прибытия на объект"
      />

      <div className="space-y-3">
        {OPEN_MOVEMENTS.map((movement) => (
          <Card
            key={movement.id}
            className={cn(
              'cursor-pointer card-interactive',
              selectedMovement === movement.id && 'ring-2 ring-accent border-accent'
            )}
            onClick={() => setSelectedMovement(movement.id)}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{movement.employee}</span>
                </div>
                <StatusBadge type="movement" status={movement.status} />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">{movement.fromObject}</span>
                <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                <span className="font-medium">{movement.toObject}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Открыто в {movement.openedAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Close Button */}
      {selectedMovement && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <Button
            variant="success"
            size="xl"
            className="w-full"
            onClick={handleCloseMovement}
            disabled={isClosing}
          >
            {isClosing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Закрытие...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Закрыть перемещение
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
