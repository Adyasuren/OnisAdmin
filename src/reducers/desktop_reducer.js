import * as types from '../actions/action_types';

const INITIAL_STATE = {
	error: '',
	message: '',
	content: '',
	rows: [],
	edit: {},
	branch: [],
	vat: ''
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case types.DESKSTORE_ALL:
			return { ...state, error: '', message: '', rows: action.payload };
		case types.CUSTOMER_CLEAR:
			return { ...state, error: '', message: '', rows: [] };
		case types.DESKTOPID_SUCCESS:
			return { ...state, error: '', message: '', edit: action.payload };
		case types.DESKBRANCH_ALL:
			return { ...state, error: '', message: '', branch: action.payload };
		case types.BRANCH_CLEAR:
			return { ...state, error: '', message: '', rows: [] };
		case types.ADD_STORE:
			return { ...state, error: '', message: action.payload, edit: [] };
		case types.ADD_BRANCH:
			return { ...state, error: '', message: action.payload, edit: [] };
		case types.ADD_PAYMENT:
			return { ...state, error: '', message: action.payload, edit: [] };
		case types.DESKTOP_PAYMENT_ALL:
			return { ...state, error: '', message: 'success', rows: action.payload };
		case types.PAYMENT_DATA:
			return { ...state, error: '', message: '', rows: action.payload };
		case types.DESK_CHECKREGNUM_SUCCESS:
			return { ...state, error: '', message: '', vat: action.payload };
		case types.DESKTOP_CLEAR:
			return { ...state, error: '', vat: [] }
		default:
			return state;
	}
}
