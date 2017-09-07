import React from 'react';
import Loadable from 'react-loadable';

import { logout } from 'app/routes';
import { paths as pathsEmployees } from 'employees/routes';
import { paths as pathsPreferences } from 'preferences/routes';
import { paths as pathsSchedules } from 'schedules/routes';
import { paths as pathsShifts } from 'shifts/routes';

const LoadingComponent = () => <div />;

// TODO: Not implemented yet
const pathsCalendar = [] as string[];
const pathsSettings = [] as string[];

export enum RoleFlag {
  Anyone = -1,
  Manager = 1 << 0,
  Employee = 1 << 1,
}

const routes = [
  {
    name: 'Shifts',
    path: '/shifts',
    paths: Object.keys(pathsShifts),
    Component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Shifts' */ 'shifts/Page'),
      loading: LoadingComponent,
    }),
    roles: RoleFlag.Manager,
  },
  {
    name: 'Schedules',
    path: '/schedules',
    paths: Object.keys(pathsSchedules),
    Component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Schedules' */ 'schedules/Page'),
      loading: LoadingComponent,
    }),
    roles: RoleFlag.Manager,
  },
  {
    name: 'Employees',
    path: '/employees',
    paths: Object.keys(pathsEmployees),
    Component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Employees' */ 'employees/Page'),
      loading: LoadingComponent,
    }),
    roles: RoleFlag.Manager,
  },
  {
    name: 'Settings',
    path: '/settings',
    paths: Object.keys(pathsSettings),
    Component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Settings' */ 'settings/Page'),
      loading: LoadingComponent,
    }),
    roles: RoleFlag.Employee,
  },
  {
    name: 'Preferences',
    path: '/preferences',
    paths: Object.keys(pathsPreferences),
    Component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Preferences' */ 'preferences/Page'),
      loading: LoadingComponent,
    }),
    roles: RoleFlag.Employee,
  },
  {
    name: 'Calendar',
    path: '/calendar',
    paths: Object.keys(pathsCalendar),
    Component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Calendar' */ 'calendar/Page'),
      loading: LoadingComponent,
    }),
    roles: RoleFlag.Employee,
  },
  {
    name: 'Sign out',
    path: '/logout',
    paths: [logout.type],
    Component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Logout' */ 'logout/Page'),
      loading: LoadingComponent,
    }),
    roles: RoleFlag.Anyone,
  },
];

export default (roles: number) => routes.filter(r => !!(r.roles & roles));
