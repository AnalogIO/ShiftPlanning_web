import { normalize } from 'normalizr';
import { Dispatch } from 'redux';

import { titleSchema } from 'schemas';
import errorHandler from 'shared/errors/handler';
import { actions, api } from 'titles';

export const fetchAll = () => async (dispatch: Dispatch<any>) => {
  try {
    const titlesData = await api.fetchTitles();

    const { result, entities: { titles } } = normalize(titlesData, [
      titleSchema,
    ]);

    dispatch(
      actions.fetchAll.done({
        params: undefined,
        result: { result, ...titles },
      }),
    );
  } catch (e) {
    dispatch(
      actions.fetchAll.failed({
        params: undefined,
        error: errorHandler(e, 10001),
      }),
    );
  }
};
