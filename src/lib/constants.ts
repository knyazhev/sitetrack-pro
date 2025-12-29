import type { UserRole, NavItem, AssignmentStatus, MovementStatus, ToolStatus, AnomalyType, AnomalySeverity } from '@/types';

// =============================================
// NAVIGATION CONFIGURATION (Role-Based)
// =============================================

export const NAVIGATION: Record<UserRole, NavItem[]> = {
  worker: [
    { label: 'Главная', href: '/worker/home', icon: 'Home', roles: ['worker'] },
    { label: 'Сканер QR', href: '/worker/qr', icon: 'QrCode', roles: ['worker'] },
    { label: 'Зона', href: '/worker/zone-scan', icon: 'MapPin', roles: ['worker'] },
    { label: 'Отчёт', href: '/worker/report-create', icon: 'Camera', roles: ['worker'] },
    { label: 'История', href: '/worker/history', icon: 'History', roles: ['worker'] },
  ],
  foreman: [
    { label: 'Панель', href: '/foreman/dashboard', icon: 'LayoutDashboard', roles: ['foreman'] },
    { label: 'Прибытие', href: '/foreman/arrival-scan', icon: 'LogIn', roles: ['foreman'] },
    { label: 'Убытие', href: '/foreman/departure-scan', icon: 'LogOut', roles: ['foreman'] },
    { label: 'Перемещение', href: '/foreman/move-open', icon: 'ArrowRightLeft', roles: ['foreman'] },
    { label: 'Отчёты', href: '/foreman/reports', icon: 'FileText', roles: ['foreman'] },
    { label: 'Аномалии', href: '/foreman/anomalies', icon: 'AlertTriangle', roles: ['foreman'] },
    { label: 'Журнал', href: '/foreman/journal', icon: 'BookOpen', roles: ['foreman'] },
  ],
  timekeeper: [
    { label: 'Назначения', href: '/timekeeper/assignments', icon: 'CalendarDays', roles: ['timekeeper'] },
    { label: 'Распределение', href: '/timekeeper/dispatch', icon: 'Users', roles: ['timekeeper'] },
    { label: 'Сводка', href: '/timekeeper/summary', icon: 'BarChart3', roles: ['timekeeper'] },
  ],
  director: [
    { label: 'Обзор', href: '/director/dashboard', icon: 'PieChart', roles: ['director'] },
    { label: 'Объекты', href: '/director/objects', icon: 'Building2', roles: ['director'] },
    { label: 'Сотрудники', href: '/director/employees', icon: 'Users', roles: ['director'] },
    { label: 'Отчёты', href: '/director/reports', icon: 'FileBarChart', roles: ['director'] },
  ],
  admin: [
    { label: 'Справочники', href: '/admin/dictionaries', icon: 'Database', roles: ['admin'] },
    { label: 'Пользователи', href: '/admin/users', icon: 'UserCog', roles: ['admin'] },
    { label: 'Политики', href: '/admin/policies', icon: 'Shield', roles: ['admin'] },
  ],
};

// =============================================
// STATUS LABELS & COLORS
// =============================================

export const ASSIGNMENT_STATUS_CONFIG: Record<AssignmentStatus, { label: string; class: string }> = {
  assigned: { label: 'Назначен', class: 'status-assigned' },
  on_object: { label: 'На объекте', class: 'status-on-object' },
  in_movement: { label: 'В движении', class: 'status-in-movement' },
  departed: { label: 'Убыл', class: 'status-departed' },
};

export const MOVEMENT_STATUS_CONFIG: Record<MovementStatus, { label: string; class: string }> = {
  open: { label: 'Открыто', class: 'bg-info/15 text-info' },
  closed: { label: 'Закрыто', class: 'bg-success/15 text-success' },
  expired: { label: 'Истекло', class: 'bg-warning/15 text-warning' },
  cancelled: { label: 'Отменено', class: 'bg-muted text-muted-foreground' },
};

export const TOOL_STATUS_CONFIG: Record<ToolStatus, { label: string; class: string }> = {
  warehouse: { label: 'На складе', class: 'bg-secondary text-secondary-foreground' },
  issued: { label: 'Выдан', class: 'bg-info/15 text-info' },
  returned: { label: 'Возвращён', class: 'bg-success/15 text-success' },
  repair: { label: 'Ремонт', class: 'bg-warning/15 text-warning' },
  written_off: { label: 'Списан', class: 'bg-destructive/15 text-destructive' },
};

export const ANOMALY_TYPE_LABELS: Record<AnomalyType, string> = {
  late_arrival: 'Опоздание',
  early_departure: 'Ранний уход',
  overtime: 'Переработка',
  missed_checkin: 'Пропуск отметки',
  wrong_object: 'Неверный объект',
  unauthorized_zone: 'Неавторизованная зона',
  gps_mismatch: 'Несоответствие GPS',
  overdue_tool: 'Просрочка инструмента',
  missing_tool: 'Отсутствие инструмента',
  unauthorized_tool: 'Неавторизованный инструмент',
};

export const ANOMALY_SEVERITY_CONFIG: Record<AnomalySeverity, { label: string; class: string }> = {
  low: { label: 'Низкая', class: 'bg-muted text-muted-foreground' },
  medium: { label: 'Средняя', class: 'bg-warning/15 text-warning' },
  high: { label: 'Высокая', class: 'bg-destructive/15 text-destructive' },
  critical: { label: 'Критическая', class: 'bg-destructive text-destructive-foreground' },
};

// =============================================
// ROLE LABELS
// =============================================

export const ROLE_LABELS: Record<UserRole, string> = {
  worker: 'Рабочий',
  foreman: 'Прораб',
  timekeeper: 'Табельщик',
  director: 'Директор',
  admin: 'Администратор',
};

// =============================================
// STATE MACHINE TRANSITIONS
// =============================================

export const ASSIGNMENT_TRANSITIONS: Record<AssignmentStatus, AssignmentStatus[]> = {
  assigned: ['on_object'],
  on_object: ['in_movement', 'departed'],
  in_movement: ['on_object'],
  departed: [],
};

export const MOVEMENT_TRANSITIONS: Record<MovementStatus, MovementStatus[]> = {
  open: ['closed', 'expired', 'cancelled'],
  closed: [],
  expired: [],
  cancelled: [],
};

export const TOOL_TRANSITIONS: Record<ToolStatus, ToolStatus[]> = {
  warehouse: ['issued'],
  issued: ['returned'],
  returned: ['warehouse', 'repair', 'written_off'],
  repair: ['warehouse', 'written_off'],
  written_off: [],
};
