import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Building2,
  Plus,
  User,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock dispatch data
const OBJECTS_WITH_CAPACITY = [
  { id: 'o1', name: 'ЖК "Северная Звезда"', assigned: 42, capacity: 50, needed: [] },
  { id: 'o2', name: 'БЦ "Меридиан"', assigned: 28, capacity: 35, needed: ['Сварщик', 'Электрик'] },
  { id: 'o3', name: 'ТЦ "Галерея"', assigned: 35, capacity: 40, needed: ['Плиточник'] },
  { id: 'o4', name: 'Склад "Логистик"', assigned: 18, capacity: 20, needed: [] },
];

const AVAILABLE_WORKERS = [
  { id: 'w1', name: 'Смирнов П.А.', position: 'Каменщик', status: 'available' },
  { id: 'w2', name: 'Волков И.С.', position: 'Сварщик', status: 'available' },
  { id: 'w3', name: 'Орлов Д.В.', position: 'Электрик', status: 'available' },
];

export default function TimekeeperDispatch() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<Users className="h-5 w-5" />}
        title="Распределение"
        subtitle="Назначение работников на объекты"
      />

      {/* Objects Capacity */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          Объекты
        </h3>
        <div className="space-y-3">
          {OBJECTS_WITH_CAPACITY.map((obj) => {
            const fillPercent = (obj.assigned / obj.capacity) * 100;
            const isNearCapacity = fillPercent >= 80;

            return (
              <Card key={obj.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm">{obj.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {obj.assigned} / {obj.capacity} чел.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Назначить
                    </Button>
                  </div>

                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        isNearCapacity ? 'bg-warning' : 'bg-success'
                      )}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>

                  {obj.needed.length > 0 && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Нужны:</span>
                      {obj.needed.map((pos) => (
                        <span key={pos} className="bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                          {pos}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Available Workers */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          Свободные работники
        </h3>
        <div className="space-y-2">
          {AVAILABLE_WORKERS.map((worker) => (
            <Card key={worker.id} className="card-interactive">
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-full">
                    <User className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{worker.name}</p>
                    <p className="text-xs text-muted-foreground">{worker.position}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Назначить
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
