import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  columns: [
    {
      property: "usertype",
      header: {
        label: "Систем"
      }
    },
    {
      property: "username",
      header: {
        label: "Нэвтрэх дугаар"
      }
    },
    {
      property: "regnum",
      header: {
        label: "Регистрийн дугаар"
      }
    },
    {
      property: "phonenum",
      header: {
        label: "Утасны дугаар"
      }
    },
    {
      property: "storename",
      header: {
        label: "Дэлгүүрийн нэр"
      }
    }
  ],
  selectedRows: [],
  edit: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.TRANSACADD_ALL:
      return { ...state, error: "", message: "", rows: action.payload };
    case types.TRANSACADD_ERROR:
      return { ...state, error: "", message: "", rows: [] };
    case types.TRANSACADD_SUCCESS:
      return { ...state, error: "", message: "", edit: action.payload };
    default:
      return state;
  }
}
