import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { selectors, thunks } from 'schedules';
import { ScheduleDto } from 'schedules/types';
import { RootState } from 'shared/types';
import { interval } from 'utils';

import Button from 'shared/Button';
import LinkButton from 'shared/LinkButton';
import WeekSchedule from './WeekSchedule';

interface StateProps {
  schedule: ScheduleDto;
}

interface DispatchProps {
  handleDelete: (id: number) => void;
  generateOptimalSchedule: (id: number) => void;
}

export class EditSchedule extends Component<StateProps & DispatchProps, {}> {
  render() {
    const { schedule, handleDelete, generateOptimalSchedule } = this.props;

    if (!schedule) {
      return <div />;
    }

    return (
      <div>
        {interval(schedule.numberOfWeeks).map(i => (
          <WeekSchedule newShifts key={i} weekNumber={i} schedule={schedule} />
        ))}

        <Button primary onClick={() => generateOptimalSchedule(schedule.id)}>
          Generate optimal schedule
        </Button>
        <LinkButton primary to={`/schedules/${schedule.id}/rollout`}>
          Roll out
        </LinkButton>
        <Button negative basic onClick={() => handleDelete(schedule.id)}>
          Delete schedule
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  schedule: selectors.getById(state, state.location.payload.scheduleId),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  async generateOptimalSchedule(id: number) {
    return dispatch(thunks.generateOptimalSchedule(id));
  },
  async handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete the schedule?')) {
      return;
    }

    return dispatch(thunks.remove(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSchedule);
