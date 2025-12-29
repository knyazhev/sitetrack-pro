import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/common/StatusBadge';
import { 
  CalendarDays, 
  Search, 
  Plus,
  User,
  Building2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock assignments
const ASSIGNMENTS = [
  { id: 'a1', employee: 'Петров И.А.', object: 'ЖК "Северная Звезда"', shift: '08:00-17:00', status: 'on_object' },
  { id: 'a2', employee: 'Сидоров В.М.', object: 'БЦ "Меридиан"', shift: '08:00-17:00', status: 'on_object' },
  { id: 'a3', employee: 'Козлов А.П.', object: 'ТЦ "Галерея"', shift: '08:00-17:00', status: 'in_movement' },
  { id: 'a4', employee: 'Иванов С.К.', object: 'ЖК "Северная Звезда"', shift: '09:00-18:00', status: 'assigned' },
  { id: 'a5', employee: 'Николаев Д.А.', object: 'Склад "Логистик"', shift: '07:00-16:00', status: 'departed' },
];

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function TimekeeperAssignments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredAssignments = ASSIGNMENTS.filter((a) =>
    a.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.object.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<CalendarDays className="h-5 w-5" />}
        title="Назначения"
        subtitle="Управление назначениями на объекты"
        actions={
          <Button variant="accent">
            <Plus className="h-4 w-4 mr-2" />
            Назначить
          </Button>
        }
      />

      {/* Date Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <p className="font-semibold capitalize">{formatDate(selectedDate)}</p>
              <p className="text-xs text-muted-foreground">
                {filteredAssignments.length} назначений
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Assignments List */}
      <div className="space-y-2">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="card-interactive">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{assignment.employee}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      {assignment.object}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge type="assignment" status={assignment.status} />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    {assignment.shift}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
