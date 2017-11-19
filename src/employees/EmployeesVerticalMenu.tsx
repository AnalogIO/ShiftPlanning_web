import { connect } from 'react-redux';

import { RootState } from 'shared/types';
import { getEmployees } from './selectors';

import VerticalMenu from 'shared/VerticalMenu';

const mapStateToProps = (state: RootState) => {
  const id = state.location.payload.employeeId;

  const items = getEmployees(state).map(e => ({
    title: `${e.firstName} ${e.lastName}`,
    subtitle: `Checkins: ${e.checkInCount}`,
    key: e.id,
    active: e.id === id,
    data: e,
    link: `/employees/${e.id}`,
  }));

  return {
    newLink: '/employees',
    isLoading: false,
    items,
    newItemString: 'New Employee',
    creatingNewItem: true,
  };
};

export default connect(mapStateToProps)(VerticalMenu as any);
