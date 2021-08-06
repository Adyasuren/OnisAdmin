import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  columns: [
    {
      property: "rank",
      header: {
        label: "№",
      },
    },
    {
      property: "userType",
      header: {
        label: "Систем",
      },
    },
    {
      property: "storeId",
      header: {
        label: "Дэлгүүрийн код",
      },
    },
    {
      property: "storeName",
      header: {
        label: "Дэлгүүрийн нэр",
      },
    },
    {
      property: "regNum",
      header: {
        label: "Регистрийн дугаар",
      },
    },
    {
      property: "userName",
      header: {
        label: "Нэвтрэх дугаар",
      },
    },
    {
      property: "licenseDay",
      header: {
        label: "Лицензын хоног",
      },
    },
    {
      property: "phoneNum",
      header: {
        label: "Утасны дугаар",
      },
    },
    {
      property: "status",
      header: {
        label: "Төлөв",
      },
    },
  ],
  rows: [],
  smsReport: [],
  firstUserList: [],
  secondUserList: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LICENSE_ALL:
      return { ...state, error: "", message: "", rows: action.payload };
    case types.LICENSE_CLEAR:
      return { ...state, error: "", message: "", rows: [] };
    case types.LICENSE_EDIT_SUCCESS:
      return { ...state, error: "", message: "", edit: action.payload };
    case types.GET_SMS_REPORT:
      return { ...state, error: "", message: "", smsReport: action.payload };
    case types.GET_FIRST_USER_LIST:
      return { ...state, error: "", message: "", firstUserList: action.payload };
    case types.GET_SECOND_USER_LIST:
      return { ...state, error: "", message: "", secondUserList: action.payload };
    default:
      return state;
  }
}
