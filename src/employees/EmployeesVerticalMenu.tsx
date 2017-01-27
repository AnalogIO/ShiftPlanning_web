import { connect } from 'react-redux';

import { RootState } from 'shared/types';
import { getEmployees } from './selectors';
import { Employee } from './types';

import VerticalMenu from 'shared/VerticalMenu';

const mapStateToProps = (state: RootState, { match }: any) => {
  const id = parseInt(match.params.id, 10);

  const items = getEmployees(state).map((e: Employee) => ({
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
    creatingNewItem: !id,
  };
};

export default connect(mapStateToProps)(VerticalMenu);
