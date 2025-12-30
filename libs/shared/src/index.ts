import { z } from 'zod'

export const RoleSchema = z.enum(['worker', 'foreman', 'timekeeper', 'director', 'admin'])
export type Role = z.infer<typeof RoleSchema>

export const EmployeeSchema = z.object({
  id: z.number().int(),
  fullName: z.string(),
  position: z.string().optional(),
  phone: z.string().optional()
})
export type Employee = z.infer<typeof EmployeeSchema>

export const ObjectSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  location: z.string().optional()
})
export type ConstructionObject = z.infer<typeof ObjectSchema>

export const AssignmentSchema = z.object({
  id: z.number().int(),
  employeeId: z.number().int(),
  objectId: z.number().int(),
  workDate: z.string(),
  shift: z.string().optional()
})
export type Assignment = z.infer<typeof AssignmentSchema>

export const DailyTaskSchema = z.object({
  id: z.number().int(),
  assignmentId: z.number().int(),
  title: z.string(),
  notes: z.string().optional()
})
export type DailyTask = z.infer<typeof DailyTaskSchema>

export const PhotoReportSchema = z.object({
  id: z.number().int(),
  assignmentId: z.number().int(),
  caption: z.string().optional(),
  fileUrl: z.string()
})
export type PhotoReport = z.infer<typeof PhotoReportSchema>

export const AuditEventSchema = z.object({
  id: z.number().int(),
  actor: z.string(),
  role: RoleSchema,
  action: z.string(),
  entity: z.string(),
  entityId: z.number().optional(),
  at: z.string()
})
export type AuditEvent = z.infer<typeof AuditEventSchema>
