import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Shield, 
  Clock,
  MapPin,
  Wrench,
  AlertTriangle,
  Camera,
  Save
} from 'lucide-react';

const POLICIES = [
  {
    category: 'Время',
    icon: Clock,
    settings: [
      { id: 'late_threshold', label: 'Порог опоздания (мин)', value: 15, type: 'number' },
      { id: 'overtime_alert', label: 'Уведомление о переработке', value: true, type: 'boolean' },
      { id: 'auto_checkout', label: 'Авто-убытие в конце смены', value: true, type: 'boolean' },
    ],
  },
  {
    category: 'Геолокация',
    icon: MapPin,
    settings: [
      { id: 'gps_required', label: 'Обязательная GPS-метка', value: true, type: 'boolean' },
      { id: 'zone_tracking', label: 'Отслеживание зон', value: true, type: 'boolean' },
      { id: 'geofence_radius', label: 'Радиус геозоны (м)', value: 100, type: 'number' },
    ],
  },
  {
    category: 'Инструменты',
    icon: Wrench,
    settings: [
      { id: 'tool_return_hours', label: 'Срок возврата (часы)', value: 48, type: 'number' },
      { id: 'photo_on_issue', label: 'Фото при выдаче', value: true, type: 'boolean' },
      { id: 'signature_required', label: 'Подпись при получении', value: false, type: 'boolean' },
    ],
  },
  {
    category: 'Аномалии',
    icon: AlertTriangle,
    settings: [
      { id: 'auto_detect', label: 'Авто-обнаружение аномалий', value: true, type: 'boolean' },
      { id: 'notify_foreman', label: 'Уведомлять прораба', value: true, type: 'boolean' },
      { id: 'escalate_critical', label: 'Эскалация критических', value: true, type: 'boolean' },
    ],
  },
  {
    category: 'Фотоотчёты',
    icon: Camera,
    settings: [
      { id: 'min_photos', label: 'Мин. кол-во фото', value: 1, type: 'number' },
      { id: 'max_photos', label: 'Макс. кол-во фото', value: 5, type: 'number' },
      { id: 'geotagging', label: 'Геотегирование фото', value: true, type: 'boolean' },
    ],
  },
];

export default function AdminPolicies() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<Shield className="h-5 w-5" />}
        title="Политики"
        subtitle="Настройки правил и ограничений"
        actions={
          <Button variant="accent">
            <Save className="h-4 w-4 mr-2" />
            Сохранить
          </Button>
        }
      />

      <div className="space-y-6">
        {POLICIES.map((policy) => {
          const Icon = policy.icon;

          return (
            <Card key={policy.category}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {policy.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {policy.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between py-2"
                  >
                    <Label
                      htmlFor={setting.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {setting.label}
                    </Label>
                    {setting.type === 'boolean' ? (
                      <Switch
                        id={setting.id}
                        defaultChecked={setting.value as boolean}
                      />
                    ) : (
                      <input
                        type="number"
                        id={setting.id}
                        defaultValue={setting.value as number}
                        className="w-20 h-9 px-3 text-sm text-right bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
