import { connect } from 'react-redux';

import { RootState } from 'shared/types';

import { getSchedules } from 'schedules/selectors';
import VerticalMenu from 'shared/VerticalMenu';

interface OwnProps {
  link: string;
  createNew?: boolean;
}

const mapStateToProps = (
  state: RootState,
  { link, createNew = true }: OwnProps,
) => {
  const id = state.location.payload.scheduleId;

  const items = getSchedules(state).map(s => ({
    title: `${s.name}`,
    subtitle: `# of Weeks: ${s.numberOfWeeks}`,
    key: s.id,
    active: s.id === id,
    data: s,
    link: `/${link}/${s.id}`,
  }));

  return {
    newLink: '/schedules',
    isLoading: false,
    items,
    newItemString: 'New Schedule',
    creatingNewItem: createNew,
  };
};

export default connect(mapStateToProps)(VerticalMenu as any);
