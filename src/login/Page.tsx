import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions, api } from 'app';
import { ManagerLogin } from 'app/types';
import { RootState } from 'shared/types';

import LoginForm from './LoginForm';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  async handleSubmit(values: ManagerLogin) {
    dispatch(actions.login.started(undefined));

    try {
      const organization = await api.login(values);

      // We also issue also want trigger RFR thunks since this will not cause
      // a redirect so RFR never sees this. This would only be relevant for
      // when the user is not signed in but visits /employees directly.
      //
      // TODO: figure out if there is not a better way to do this.
      dispatch(
        actions.login.done(
          {
            params: undefined,
            result: organization,
          },
          {
            trigger: true,
          },
        ),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
