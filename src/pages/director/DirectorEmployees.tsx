import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { 
  Users, 
  Search, 
  Building2,
  Phone,
  ChevronRight,
  Plus,
  Filter
} from 'lucide-react';

// Mock employees
const EMPLOYEES = [
  { 
    id: 'e1', 
    firstName: 'Петров',
    lastName: 'Иван Александрович',
    position: 'Каменщик',
    phone: '+7 999 111 2233',
    object: 'ЖК "Северная Звезда"',
    status: 'on_object',
    photo: null
  },
  { 
    id: 'e2', 
    firstName: 'Сидоров',
    lastName: 'Василий Михайлович',
    position: 'Сварщик',
    phone: '+7 999 222 3344',
    object: 'БЦ "Меридиан"',
    status: 'on_object',
    photo: null
  },
  { 
    id: 'e3', 
    firstName: 'Козлов',
    lastName: 'Андрей Петрович',
    position: 'Плотник',
    phone: '+7 999 333 4455',
    object: 'ТЦ "Галерея"',
    status: 'in_movement',
    photo: null
  },
  { 
    id: 'e4', 
    firstName: 'Иванов',
    lastName: 'Сергей Константинович',
    position: 'Электрик',
    phone: '+7 999 444 5566',
    object: 'ЖК "Северная Звезда"',
    status: 'departed',
    photo: null
  },
  { 
    id: 'e5', 
    firstName: 'Николаев',
    lastName: 'Дмитрий Алексеевич',
    position: 'Разнорабочий',
    phone: '+7 999 555 6677',
    object: 'Склад "Логистик"',
    status: 'assigned',
    photo: null
  },
];

export default function DirectorEmployees() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = EMPLOYEES.filter((emp) =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.object.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<Users className="h-5 w-5" />}
        title="Сотрудники"
        subtitle={`${EMPLOYEES.length} всего`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="accent">
              <Plus className="h-4 w-4 mr-2" />
              Добавить
            </Button>
          </div>
        }
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по имени, должности или объекту..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Employees List */}
      <div className="space-y-2">
        {filteredEmployees.map((employee) => (
          <Link key={employee.id} to={`/director/employee/${employee.id}`}>
            <Card className="card-interactive">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.photo || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {employee.firstName[0]}{employee.lastName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm truncate">
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <StatusBadge type="assignment" status={employee.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {employee.position}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {employee.object}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {employee.phone}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
