// =============================================
// ToolTrack Core Type Definitions
// =============================================

// User roles with strict RBAC enforcement
export type UserRole = 'worker' | 'foreman' | 'timekeeper' | 'director' | 'admin';

// =============================================
// STATE MACHINES
// =============================================

// Assignment: assigned → on_object → in_movement → on_object_B → departed
export type AssignmentStatus = 
  | 'assigned'      // Worker scheduled to object
  | 'on_object'     // Worker checked in
  | 'in_movement'   // Transferring between objects
  | 'departed';     // Worker checked out

// Movement: open → closed | expired | cancelled
export type MovementStatus = 
  | 'open'          // Movement in progress
  | 'closed'        // Successfully completed
  | 'expired'       // Timed out
  | 'cancelled';    // Cancelled by foreman

// Tool: warehouse → issued → returned → repair | written_off
export type ToolStatus = 
  | 'warehouse'     // In storage
  | 'issued'        // Assigned to worker
  | 'returned'      // Back in warehouse
  | 'repair'        // Under maintenance
  | 'written_off';  // Decommissioned

// PhotoReport: submitted → approved | rejected
export type PhotoReportStatus = 
  | 'submitted'     // Pending review
  | 'approved'      // Accepted by foreman
  | 'rejected';     // Requires resubmission

// Anomaly severity levels
export type AnomalySeverity = 'low' | 'medium' | 'high' | 'critical';

// Anomaly types
export type AnomalyType = 
  | 'late_arrival'
  | 'early_departure'
  | 'overtime'
  | 'missed_checkin'
  | 'wrong_object'
  | 'unauthorized_zone'
  | 'gps_mismatch'
  | 'overdue_tool'
  | 'missing_tool'
  | 'unauthorized_tool';

// =============================================
// CORE ENTITIES
// =============================================

export interface User {
  id: string;
  email: string;
  phone?: string;
  role: UserRole;
  employee_id?: string;
  created_at: string;
  last_login?: string;
}

export interface Employee {
  id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  position: string;
  photo_url?: string;
  hire_date: string;
  status: 'active' | 'inactive' | 'suspended';
  certifications: string[];
  emergency_contact?: {
    name: string;
    phone: string;
    relation: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ConstructionObject {
  id: string;
  name: string;
  code: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  status: 'active' | 'paused' | 'completed';
  start_date: string;
  end_date?: string;
  foreman_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Zone {
  id: string;
  object_id: string;
  name: string;
  code: string;
  type: 'work' | 'storage' | 'restricted' | 'break';
  qr_code: string;
  created_at: string;
}

export interface Assignment {
  id: string;
  employee_id: string;
  object_id: string;
  zone_id?: string;
  date: string;
  scheduled_start: string;
  scheduled_end: string;
  actual_start?: string;
  actual_end?: string;
  status: AssignmentStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Movement {
  id: string;
  employee_id: string;
  from_object_id: string;
  to_object_id: string;
  from_zone_id?: string;
  to_zone_id?: string;
  status: MovementStatus;
  opened_at: string;
  opened_by: string;
  closed_at?: string;
  closed_by?: string;
  notes?: string;
  created_at: string;
}

export interface Tool {
  id: string;
  name: string;
  code: string;
  category: string;
  status: ToolStatus;
  current_holder_id?: string;
  object_id?: string;
  zone_id?: string;
  serial_number?: string;
  purchase_date?: string;
  last_maintenance?: string;
  next_maintenance?: string;
  created_at: string;
  updated_at: string;
}

export interface ToolOperation {
  id: string;
  tool_id: string;
  type: 'issue' | 'return' | 'transfer' | 'repair_start' | 'repair_end' | 'write_off';
  from_employee_id?: string;
  to_employee_id?: string;
  object_id: string;
  performed_by: string;
  notes?: string;
  photo_url?: string;
  created_at: string;
}

export interface PhotoReport {
  id: string;
  employee_id: string;
  object_id: string;
  zone_id?: string;
  assignment_id?: string;
  type: 'progress' | 'issue' | 'completion' | 'safety';
  description: string;
  photos: string[];
  status: PhotoReportStatus;
  reviewed_by?: string;
  reviewed_at?: string;
  review_notes?: string;
  created_at: string;
}

export interface Document {
  id: string;
  type: 'permit' | 'certificate' | 'safety' | 'report' | 'contract';
  name: string;
  file_url: string;
  entity_type: 'employee' | 'object' | 'tool';
  entity_id: string;
  expires_at?: string;
  uploaded_by: string;
  created_at: string;
}

export interface Anomaly {
  id: string;
  type: AnomalyType;
  severity: AnomalySeverity;
  entity_type: 'employee' | 'assignment' | 'tool' | 'movement';
  entity_id: string;
  object_id?: string;
  description: string;
  detected_at: string;
  resolved_at?: string;
  resolved_by?: string;
  resolution_notes?: string;
  created_at: string;
}

// =============================================
// AUDIT LOG
// =============================================

export interface AuditLog {
  id: string;
  entity_type: string;
  entity_id: string;
  action: 'create' | 'update' | 'delete' | 'state_change';
  from_state?: string;
  to_state?: string;
  performed_by: string;
  metadata?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// =============================================
// OFFLINE QUEUE
// =============================================

export interface OfflineAction {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  created_at: string;
  retry_count: number;
  last_error?: string;
}

// =============================================
// API TYPES
// =============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// =============================================
// UI HELPERS
// =============================================

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  roles: UserRole[];
}

export interface DashboardStats {
  total_workers: number;
  on_site: number;
  in_movement: number;
  departed: number;
  anomalies_today: number;
  tools_issued: number;
  pending_reports: number;
}
