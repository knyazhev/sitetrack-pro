import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ROLE_LABELS } from '@/lib/constants';
import { 
  UserCog, 
  Search,
  Plus,
  Mail,
  Shield,
  MoreVertical,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import type { UserRole } from '@/types';
import { cn } from '@/lib/utils';

// Mock users
const USERS = [
  { id: 'u1', email: 'worker@demo.com', role: 'worker' as UserRole, employee: 'Петров И.А.', active: true, lastLogin: '2024-12-29 08:15' },
  { id: 'u2', email: 'foreman@demo.com', role: 'foreman' as UserRole, employee: 'Михайлов С.А.', active: true, lastLogin: '2024-12-29 07:55' },
  { id: 'u3', email: 'timekeeper@demo.com', role: 'timekeeper' as UserRole, employee: 'Козлова А.В.', active: true, lastLogin: '2024-12-29 09:00' },
  { id: 'u4', email: 'director@demo.com', role: 'director' as UserRole, employee: 'Соколов В.П.', active: true, lastLogin: '2024-12-28 18:30' },
  { id: 'u5', email: 'admin@demo.com', role: 'admin' as UserRole, employee: 'Администратор', active: true, lastLogin: '2024-12-29 10:00' },
  { id: 'u6', email: 'inactive@demo.com', role: 'worker' as UserRole, employee: 'Отключённый пользователь', active: false, lastLogin: '2024-11-15 12:00' },
];

const ROLE_COLORS: Record<UserRole, string> = {
  worker: 'bg-info/15 text-info',
  foreman: 'bg-success/15 text-success',
  timekeeper: 'bg-warning/15 text-warning',
  director: 'bg-accent/15 text-accent',
  admin: 'bg-destructive/15 text-destructive',
};

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = USERS.filter((u) =>
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ROLE_LABELS[u.role].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<UserCog className="h-5 w-5" />}
        title="Пользователи"
        subtitle="Управление учётными записями"
        actions={
          <Button variant="accent">
            <Plus className="h-4 w-4 mr-2" />
            Создать
          </Button>
        }
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по email, имени или роли..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users List */}
      <div className="space-y-2">
        {filteredUsers.map((user) => (
          <Card key={user.id} className={cn('card-interactive', !user.active && 'opacity-60')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {user.employee.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{user.employee}</p>
                    {user.active ? (
                      <CheckCircle2 className="h-3 w-3 text-success shrink-0" />
                    ) : (
                      <XCircle className="h-3 w-3 text-destructive shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={cn('text-xs px-2 py-1 rounded-full flex items-center gap-1', ROLE_COLORS[user.role])}>
                    <Shield className="h-3 w-3" />
                    {ROLE_LABELS[user.role]}
                  </span>
                  <Button variant="ghost" size="icon-sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                Последний вход: {user.lastLogin}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
