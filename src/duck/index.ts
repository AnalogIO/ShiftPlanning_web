import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';

import app from 'app/ducks';
import employees from 'employees/ducks';
import scheduledShifts from 'scheduled_shifts/ducks';
import schedules from 'schedules/ducks';
import shifts from 'shifts/ducks';
import titles from 'titles/ducks';

export const reducers = combineReducers({
  app,
  employees,
  router,
  schedules,
  scheduledShifts,
  shifts,
  titles,
});
