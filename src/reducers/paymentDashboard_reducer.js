import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  data: {
    todaysPayedUserOnis: 0,
    todaysPayedUserOnisPlus: 0,
    thisMonthPayedUserOnis: 0,
    thisMonthPayedUserOnisPlus: 0,
    thisYearPayedUserOnis: 0,
    thisYearPayedUserOnisPlus: 0,
    totalUserCountOnis: 0,
    totalUserCountOnisPlus: 0,
    buyLicenseAmounts: [],
    paymentIncreaseDecreases: [],
    paymentTypeAmounts: []
  },
  columns: [],
  rows: [],
  edit: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.PAYMENT_DASHBOARD_ALL:
      return {
        ...state,
        error: "",
        message: "",
        data: action.payload
      };
    default:
      return state;
  }
}
