export type Roles = number;

export interface AppState {
  loggingIn: boolean;
  currentUser?: CurrentUser;
}

export interface CurrentUser {
  active: boolean;
  checkInCount: number;
  email: string;
  employeeTitle: string;
  employeeTitleId: number;
  firstName: string;
  friendshipIds: number[];
  id: number;
  lastName: string;
  photoRef: string;
  roles: Roles;
  wantShifts: number;
}

export interface LoginData {
  organizationName: string;
  organizationId: number;
  token: string;
  expires: number; // in seconds
  expiresWhen: Date;
  employee: CurrentUser;
}

export interface ManagerLogin {
  email: string;
  password: string;
}
