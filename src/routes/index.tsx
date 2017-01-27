import React from 'react';

const Loadable = require('react-loadable');

import { Roles } from 'app/types';

export enum Role {
  Manager = 1 << 0,
  Employee = 1 << 1,
}

interface Route {
  name: string;
  path: string;
  component: any;
  private: boolean;
  roles: Role;
}

// Using bitwise we can determine if the role can access this route.
// 0 means that we do not have access and !!0 will return false.
const canVisit = (roles: Roles, route: Route) => !!(route.roles & roles);

const LoadingComponent = () => <div />;

const _routes = [
  {
    name: 'Shifts',
    path: '/shifts',
    component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Shifts' */ 'shifts/Page'),
      loading: LoadingComponent,
    }),
    private: true,
    roles: Role.Manager,
  },
  {
    name: 'Schedules',
    path: '/schedules',
    component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Schedules' */ 'schedules/Page'),
      loading: LoadingComponent,
    }),
    private: true,
    roles: Role.Manager,
  },
  {
    name: 'Employees',
    path: '/employees',
    component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Employees' */ 'employees/Page'),
      loading: LoadingComponent,
    }),
    private: true,
    roles: Role.Manager,
  },
  {
    name: 'Settings',
    path: '/settings',
    component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Settings' */ 'settings/Page'),
      loading: LoadingComponent,
    }),
    private: true,
    roles: Role.Employee,
  },
  {
    name: 'Preferences',
    path: '/preferences',
    component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Preferences' */ 'preferences/Page'),
      loading: LoadingComponent,
    }),
    private: true,
    roles: Role.Employee,
  },
  {
    name: 'Calendar',
    path: '/calendar',
    component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Calendar' */ 'calendar/Page'),
      loading: LoadingComponent,
    }),
    private: true,
    roles: Role.Employee,
  },
  {
    name: 'Sign out',
    path: '/logout',
    component: Loadable({
      loader: async () =>
        import(/* webpackChunkName: 'Logout' */ 'logout/Page'),
      loading: LoadingComponent,
    }),
    private: true,
    roles: Role.Employee | Role.Manager,
  },
];

export const routes = (roles: Roles) => _routes.filter(r => canVisit(roles, r));
