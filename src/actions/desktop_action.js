import api from '../api/desktop_api';
import * as types from './action_types';
import { push } from 'react-router-redux';
import { showLoading } from 'react-redux-loading-bar';
import niceAlert from 'sweetalert';

/* DESKTOP STORE */

export function deskcheckregnum(value) {
	return function (dispatch) {
		api
			.deskcheckregnum(value)
			.then((response) => {
				dispatch({ type: types.DESK_CHECKREGNUM_SUCCESS, payload: response.value });
			})
			.catch((error) => {
				dispatch({ type: types.DESK_CHECKREGNUM_ERROR, payload: error });
			});
	};
}

export function getDeskStore(params) {
	return function (dispatch) {
		dispatch(showLoading());
		api
			.getDeskStore(params)
			.then((response) => {
				dispatch({ type: types.DESKSTORE_ALL, payload: response.value });
			})
			.catch((error) => { });
	};
}

export function addDeskStore(params) {
	return function (dispatch) {
		dispatch(showLoading());
		api
			.addDeskStore(params)
			.then((response) => {
				if (response.success === true) {
					dispatch({ type: types.ADD_STORE, payload: response.message });
					niceAlert(response.message);
					dispatch(push('/desktopUser'));
				} else {
					dispatch({ type: types.ADD_STORE, payload: response.message });
					niceAlert(response.message);
				}
				/* dispatch({ type: types.ADD_STORE, payload: response.message });
				niceAlert('Амжилттай хадгаллаа');
				dispatch(push('/desktopUser')); */
				/* dispatch(push('/desktopcustomeradd')); */
			})
			.catch((error) => { });
	};
}

export function editDesktopStore(storeid, params) {
	return function (dispatch) {
		dispatch(showLoading());
		api
			.editDesktopStore(storeid, params)
			.then((response) => {
				if (response.success === true) {
					dispatch({ type: types.EDIT_STORE, payload: response.message });
					niceAlert(response.message);
					dispatch(push('/desktopUser'));
				} else {
					dispatch({ type: types.EDIT_STORE, payload: response.message });
					niceAlert(response.message);
				}
				/* dispatch({ type: types.EDIT_STORE, payload: response.message });
				niceAlert('Амжилттай хадгаллаа');
				dispatch(push('/desktopUser')); */
			})
			.catch((error) => { });
	};
}

export function editDeskStore(row) {
	return function (dispatch) {
		dispatch({ type: types.DESKTOPID_SUCCESS, payload: row });
		dispatch(push('/desktopcustomeredit'));
	};
}

export function clearNew() {
	return function (dispatch) {
		dispatch({ type: types.DESKTOP_CLEAR, payload: [] });
	};
}

/* DEKSTOP BRANCH */

export function editDesktopBranch(branchid, params) {
	return function (dispatch) {
		dispatch(showLoading());
		api
			.editDesktopBranch(branchid, params)
			.then((response) => {
				if (response.success === true) {
					dispatch({ type: types.EDIT_BRANCH, payload: response.message });
					niceAlert(response.message);
					dispatch(push('/desktopBranch'));
				} else {
					dispatch({ type: types.EDIT_BRANCH, payload: response.message });
					niceAlert(response.message);
				}
			})
			.catch((error) => { });
	};
}

export function editDeskBranch(row) {
	return function (dispatch) {
		dispatch({ type: types.DESKTOPID_SUCCESS, payload: row });
		dispatch(push('/desktopbranchedit'));
	};
}

export function getBranch(credentials) {
	return function (dispatch) {
		dispatch(showLoading());
		api
			.getBranch(credentials)
			.then((response) => {
				dispatch({ type: types.DESKBRANCH_ALL, payload: response.value });
			})
			.catch((error) => { });
	};
}

export function addDesktopBranch(params) {
	return function (dispatch) {
		dispatch(showLoading());
		api
			.addDeskBranch(params)
			.then((response) => {
				if (response.success === true) {
					dispatch({ type: types.ADD_BRANCH, payload: response.message });
					niceAlert(response.message);
					dispatch(push('/desktopBranch'));
				} else {
					dispatch({ type: types.ADD_BRANCH, payload: response.message });
					niceAlert(response.message);
				}
				/* dispatch({ type: types.ADD_BRANCH, payload: response.message });
				niceAlert('Амжилттай хадгаллаа');
				dispatch(push('/desktopBranch')); */
			})
			.catch((error) => { });
	};
}

export function clearBranch() {
	return function (dispatch) {
		dispatch({ type: types.CUSTOMER_CLEAR });
	};
}

/* DESKTOP PAYMENT */

export function editDeskPayment(paymentid, params) {
	return function (dispatch) {
		dispatch(showLoading());
		api
			.editDesktopPayment(paymentid, params)
			.then((response) => {
				if (response.success === true) {
					console.log(response.success);
					niceAlert(response.message);
					dispatch(push('/desktopPayment'));
				} else {
					niceAlert(response.message);
				}
				/* dispatch({ type: types.EDIT_PAYMENT, payload: response.message });
				niceAlert('Амжилттай хадгаллаа');
				dispatch(push('/desktopPayment')); */
			})
			.catch((error) => { });
	};
}

export function editDesktopPayment(row) {
	return function (dispatch) {
		dispatch({ type: types.DESKTOPID_SUCCESS, payload: row });
		dispatch(push('/desktoppaymentedit'));
	};
}

export function getPayment(params) {
	return function (dispatch) {
		dispatch(showLoading());
		api
			.getPayment(params)
			.then((response) => {
				dispatch({ type: types.DESKTOP_PAYMENT_ALL, payload: response.value });
			})
			.catch((error) => { });
	};
}

export function getPaymentData(id, params) {
	return function (dispatch) {
		dispatch(showLoading());
		api
			.getPayment(id, params)
			.then((response) => {
				dispatch({ type: types.PAYMENT_DATA, payload: response.value });
			})
			.catch((error) => { });
	};
}

export function addDesktopPayment(params) {
	return function (dispatch) {
		dispatch(showLoading());
		api
			.addDesktopPayment(params)
			.then((response) => {
				if (response.success === true) {
					dispatch({ type: types.ADD_PAYMENT, payload: response.message });
					niceAlert(response.message);
					dispatch(push('/desktopPayment'));
				} else {
					dispatch({ type: types.ADD_PAYMENT, payload: response.message });
					niceAlert(response.message);
				}
				/* dispatch({ type: types.ADD_PAYMENT, payload: response.message });
				niceAlert('Амжилттай хадгаллаа');
				dispatch(push('/desktopPayment')); */
			})
			.catch((error) => { });
	};
}
