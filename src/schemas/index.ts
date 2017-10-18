import { schema } from 'normalizr';

export const employeeSchema = new schema.Entity('employees');

export const titleSchema = new schema.Entity('titles');

export const scheduledShiftSchema = new schema.Entity('scheduledShifts', {
  employees: [employeeSchema],
});

export const scheduleSchema = new schema.Entity('schedules', {
  scheduledShifts: [scheduledShiftSchema],
});

// export const checkInSchema = new schema.Entity('checkIns', {
//   employee: employeeSchema,
// });

export const shiftSchema = new schema.Entity('shifts', {
  // This fails when uncommented but used to be required before so
  // keeping it for safety if needed later checkIns: [checkInSchema],
  employees: [employeeSchema],
});
