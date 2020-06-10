import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  columns: [
    {
      property: "classcode",
      header: {
        label: "Код"
      }
    },
    {
      property: "classname",
      header: {
        label: "Нэр"
      }
    }
  ],
  rows: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GOODSCLASS_ALL:
      return { ...state, error: "", message: "", rows: action.payload };
    default:
      return state;
  }
}
