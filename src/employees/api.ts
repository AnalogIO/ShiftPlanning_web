import { client } from 'api';
import { Employee } from './types';

export const getEmployees = async () => {
  const res = await client.get('/employees');

  return res.data as Employee[];
};

export const createEmployee = async (employee: Employee) => {
  const res = await client.post('/employees', employee);

  return res.data as Employee;
};

export const update = (employee: Employee) => {
  return client.put(`/employees/${employee.id}`, employee);
};

export const remove = async (employeeId: number) => {
  return client.delete(`/employees/${employeeId}`);
};
