import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  Building2,
  MapPin,
  Briefcase,
  Wrench,
  Tag,
  ChevronRight,
  Plus
} from 'lucide-react';

const DICTIONARIES = [
  {
    id: 'objects',
    title: 'Объекты',
    description: 'Строительные площадки',
    icon: Building2,
    count: 8,
  },
  {
    id: 'zones',
    title: 'Зоны',
    description: 'Зоны внутри объектов',
    icon: MapPin,
    count: 45,
  },
  {
    id: 'positions',
    title: 'Должности',
    description: 'Категории работников',
    icon: Briefcase,
    count: 24,
  },
  {
    id: 'tools',
    title: 'Инструменты',
    description: 'Каталог инструментов',
    icon: Wrench,
    count: 156,
  },
  {
    id: 'categories',
    title: 'Категории',
    description: 'Классификация инструментов',
    icon: Tag,
    count: 12,
  },
];

export default function AdminDictionaries() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<Database className="h-5 w-5" />}
        title="Справочники"
        subtitle="Управление справочными данными"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {DICTIONARIES.map((dict) => {
          const Icon = dict.icon;
          
          return (
            <Card key={dict.id} className="card-interactive">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{dict.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {dict.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {dict.count} записей
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    Просмотр
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Добавить
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
