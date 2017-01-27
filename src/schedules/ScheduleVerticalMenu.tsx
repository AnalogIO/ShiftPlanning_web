import { connect } from 'react-redux';

import { RootState } from 'shared/types';

import { getSchedules } from 'schedules/selectors';
import VerticalMenu from 'shared/VerticalMenu';

const mapStateToProps = (state: RootState, { match, link, createNew }: any) => {
  const id = parseInt(match.params.id, 10);

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

export default connect(mapStateToProps)(VerticalMenu);
