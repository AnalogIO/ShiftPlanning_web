import { schema } from 'normalizr';

export const employeeSchema = new schema.Entity('employees');

export const titleSchema = new schema.Entity('titles');

export const scheduledShiftSchema = new schema.Entity('scheduledShifts', {
  employees: [employeeSchema],
});

export const scheduleSchema = new schema.Entity('schedules', {
  scheduledShifts: [scheduledShiftSchema],
});

export const checkInSchema = new schema.Entity('checkIns', {
  employee: employeeSchema,
});

export const shiftSchema = new schema.Entity('shifts', {
  checkIns: [checkInSchema],
  employees: [employeeSchema],
});
