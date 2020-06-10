import * as types from '../actions/action_types';

const INITIAL_STATE = {
	error: '',
	message: '',
	content: '',
	rows: '',
	rows1: ''
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case types.CHECKREGNUM_SUCCESS:
			return { ...state, error: '', message: '', rows: action.payload };
		default:
			return state;
	}
}
