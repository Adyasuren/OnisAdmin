import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  columns: [
    {
      property: "rank",
      header: {
        label: "№"
      }
    },
    {
      property: "userType",
      header: {
        label: "Систем"
      }
    },
    {
      property: "storeId",
      header: {
        label: "Дэлгүүрийн код"
      }
    },
    {
      property: "storeName",
      header: {
        label: "Дэлгүүрийн нэр"
      }
    },
    {
      property: "regNum",
      header: {
        label: "Регистрийн дугаар"
      }
    },
    {
      property: "userName",
      header: {
        label: "Нэвтрэх дугаар"
      }
    },
    {
      property: "licenseDay",
      header: {
        label: "Лицензын хоног"
      }
    },
    {
      property: "phoneNum",
      header: {
        label: "Утасны дугаар"
      }
    },
    {
      property: "status",
      header: {
        label: "Төлөв"
      }
    }
  ],
  rows: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LICENSE_ALL:
      return { ...state, error: "", message: "", rows: action.payload };
    case types.LICENSE_CLEAR:
      return { ...state, error: "", message: "", rows: [] };
    case types.LICENSE_EDIT_SUCCESS:
      return { ...state, error: "", message: "", edit: action.payload };
    default:
      return state;
  }
}
