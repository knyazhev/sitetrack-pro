import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Search, 
  Users, 
  MapPin,
  Calendar,
  ChevronRight,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock objects
const OBJECTS = [
  { 
    id: 'o1', 
    name: 'ЖК "Северная Звезда"', 
    code: 'NS-001',
    address: 'ул. Строителей, 15',
    workers: 42, 
    progress: 68,
    status: 'active',
    startDate: '2024-01-15',
    foreman: 'Михайлов С.А.'
  },
  { 
    id: 'o2', 
    name: 'БЦ "Меридиан"', 
    code: 'MR-002',
    address: 'пр. Ленина, 45',
    workers: 28, 
    progress: 45,
    status: 'active',
    startDate: '2024-03-01',
    foreman: 'Козлов П.В.'
  },
  { 
    id: 'o3', 
    name: 'ТЦ "Галерея"', 
    code: 'GL-003',
    address: 'ул. Мира, 78',
    workers: 35, 
    progress: 82,
    status: 'active',
    startDate: '2023-09-10',
    foreman: 'Сидоров А.М.'
  },
  { 
    id: 'o4', 
    name: 'Склад "Логистик"', 
    code: 'LG-004',
    address: 'Промзона, стр. 5',
    workers: 18, 
    progress: 95,
    status: 'active',
    startDate: '2023-06-20',
    foreman: 'Петров И.К.'
  },
  { 
    id: 'o5', 
    name: 'ЖК "Рассвет"', 
    code: 'RS-005',
    address: 'ул. Парковая, 3',
    workers: 0, 
    progress: 100,
    status: 'completed',
    startDate: '2023-01-10',
    foreman: 'Николаев Д.А.'
  },
];

const STATUS_CONFIG: Record<string, { label: string; class: string }> = {
  active: { label: 'Активен', class: 'bg-success/15 text-success' },
  paused: { label: 'Приостановлен', class: 'bg-warning/15 text-warning' },
  completed: { label: 'Завершён', class: 'bg-muted text-muted-foreground' },
};

export default function DirectorObjects() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredObjects = OBJECTS.filter((obj) =>
    obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    obj.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    obj.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<Building2 className="h-5 w-5" />}
        title="Объекты"
        subtitle={`${OBJECTS.filter(o => o.status === 'active').length} активных объектов`}
        actions={
          <Button variant="accent">
            <Plus className="h-4 w-4 mr-2" />
            Добавить
          </Button>
        }
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию, коду или адресу..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Objects List */}
      <div className="space-y-3">
        {filteredObjects.map((obj) => (
          <Link key={obj.id} to={`/director/object/${obj.id}`}>
            <Card className="card-interactive">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{obj.name}</h3>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                        {obj.code}
                      </code>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {obj.address}
                    </div>
                  </div>
                  <span className={cn('text-xs px-2 py-1 rounded-full', STATUS_CONFIG[obj.status].class)}>
                    {STATUS_CONFIG[obj.status].label}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Работников</p>
                    <p className="font-medium flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {obj.workers}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Прораб</p>
                    <p className="font-medium truncate">{obj.foreman}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Начало</p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(obj.startDate).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="font-medium">{obj.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${obj.progress}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
