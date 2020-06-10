import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  data: {
    singUpUsersOnisPlus: 0,
    singUpUsersOnis: 0,
    singUpUsersOnisMonth: 0,
    singUpUsersOnisPlusMonth: 0,
    singUpUsersOnisPlusYear: 0,
    singUpUsersOnisYear: 0,
    singUpUsersOnisPlusTotal: 0,
    singUpUsersOnisTotal: 0,
    lastYearUsersOnis: 0,
    lastYearUsersOnisPlus: 0,
    thisYearUsersOnis: 0,
    thisYearUsersOnisPlus: 0,
    totalUsersOnis: 0,
    totalUsersOnisPlus: 0,
    storeCountByUser: [],
    statusByLocation: [],
    oneOrManyStores: [],
    thisAndLastYear: []
  },
  columns: [],
  rows: [],
  edit: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.CUSTOMER_STATUS_ALL:
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
