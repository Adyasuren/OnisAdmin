import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  columns: [
    {
      property: "distcode",
      header: {
        label: "Код"
      }
    },
    {
      property: "distname",
      header: {
        label: "Нэр"
      }
    }
  ],
  rows: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.ONIS_UPDATE:
      return { ...state, error: "", message: "", rows: action.payload };
    case types.UPDATEEDIT_SUCCESS:
      return { ...state, error: "", message: "", edit: action.payload };
    default:
      return state;
  }
}
