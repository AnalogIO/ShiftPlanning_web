import { combineReducers, Reducer } from 'redux';
import { LocationState } from 'redux-first-router';

import app from 'app/ducks';
import employees from 'employees/ducks';
import preferences from 'preferences/ducks';
import scheduledShifts from 'scheduled_shifts/ducks';
import schedules from 'schedules/ducks';
import shifts from 'shifts/ducks';
import titles from 'titles/ducks';

export const createReducers = (location: Reducer<LocationState>) =>
  combineReducers({
    app,
    employees,
    location,
    preferences,
    scheduledShifts,
    schedules,
    shifts,
    titles,
  });
