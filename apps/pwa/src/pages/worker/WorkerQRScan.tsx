import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode, Camera, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type ScanState = 'idle' | 'scanning' | 'success' | 'error';

export default function WorkerQRScan() {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [lastScan, setLastScan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStartScan = () => {
    setScanState('scanning');
    
    // Simulate scan process
    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (success) {
        setScanState('success');
        setLastScan(new Date().toLocaleTimeString('ru-RU'));
        toast({
          title: 'Отметка успешна',
          description: 'Вы отмечены на объекте ЖК "Северная Звезда"',
        });
      } else {
        setScanState('error');
        toast({
          variant: 'destructive',
          title: 'Ошибка сканирования',
          description: 'QR-код не распознан. Попробуйте снова.',
        });
      }
      
      // Reset after delay
      setTimeout(() => setScanState('idle'), 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<QrCode className="h-5 w-5" />}
        title="Сканер QR"
        subtitle="Отметка прибытия и убытия"
      />

      {/* Scanner Area */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div 
            className={cn(
              'relative aspect-square max-w-sm mx-auto flex items-center justify-center',
              'bg-gradient-to-br from-muted to-muted/50'
            )}
          >
            {/* Scanner frame */}
            <div className="absolute inset-8 border-2 border-dashed border-accent/50 rounded-2xl" />
            
            {/* Corner markers */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-lg" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-lg" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-lg" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-lg" />

            {/* State indicators */}
            {scanState === 'idle' && (
              <div className="text-center">
                <Camera className="h-16 w-16 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Наведите камеру на QR-код
                </p>
              </div>
            )}

            {scanState === 'scanning' && (
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse-ring rounded-full bg-accent/30" />
                  <Loader2 className="h-16 w-16 text-accent mx-auto animate-spin" />
                </div>
                <p className="text-sm text-accent mt-4 font-medium">
                  Сканирование...
                </p>
              </div>
            )}

            {scanState === 'success' && (
              <div className="text-center animate-fade-in">
                <CheckCircle2 className="h-20 w-20 text-success mx-auto mb-2" />
                <p className="text-lg font-semibold text-success">
                  Успешно!
                </p>
              </div>
            )}

            {scanState === 'error' && (
              <div className="text-center animate-fade-in">
                <XCircle className="h-20 w-20 text-destructive mx-auto mb-2" />
                <p className="text-lg font-semibold text-destructive">
                  Ошибка
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scan Button */}
      <Button
        variant="scan"
        size="xl"
        className="w-full"
        onClick={handleStartScan}
        disabled={scanState === 'scanning'}
      >
        {scanState === 'scanning' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Сканирование...
          </>
        ) : (
          <>
            <QrCode className="h-5 w-5" />
            Сканировать QR-код
          </>
        )}
      </Button>

      {/* Last scan info */}
      {lastScan && (
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
            <div>
              <p className="text-sm font-medium">Последняя отметка</p>
              <p className="text-xs text-muted-foreground">
                Сегодня в {lastScan}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-2 text-sm">Инструкция</h3>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li className="flex gap-2">
              <span className="text-accent">1.</span>
              Найдите QR-код на входе объекта
            </li>
            <li className="flex gap-2">
              <span className="text-accent">2.</span>
              Наведите камеру на код
            </li>
            <li className="flex gap-2">
              <span className="text-accent">3.</span>
              Дождитесь подтверждения отметки
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
