import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions, api } from 'app';
import { ManagerLogin } from 'app/types';
import { RootState } from 'shared/types';

import LoginForm from './LoginForm';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    async handleSubmit(values: ManagerLogin) {
      dispatch(actions.login.started(undefined));

      try {
        const organization = await api.login(values);

        dispatch(
          actions.login.done({
            params: undefined,
            result: organization,
          }),
        );
      } catch (e) {
        dispatch(
          actions.login.failed({
            params: undefined,
            error: e.response.data.message,
          }),
        );
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm as any);
