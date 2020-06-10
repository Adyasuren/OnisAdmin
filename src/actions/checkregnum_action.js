import checkregnumApi from '../api/checkregnum_api';
import * as types from './action_types';

export function checkregnum(value) {
	return function(dispatch) {
		checkregnumApi
			.checkregnum(value)
			.then((response) => {
				dispatch({ type: types.CHECKREGNUM_SUCCESS, payload: response.value });
			})
			.catch((error) => {
				dispatch({ type: types.CHECKREGNUM_ERROR, payload: error });
			});
	};
}
