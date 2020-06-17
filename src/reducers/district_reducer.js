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
    case types.DISTRICT_ALL:
      return { ...state, error: "", message: "", rows: action.payload };
    default:
      return state;
  }
}
