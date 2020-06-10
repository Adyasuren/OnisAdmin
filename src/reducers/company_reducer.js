import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.COMPANY_ADD_SUCCESS:
      console.log(action.payload);
      return { ...state, error: "", message: "Амжилттай нэмлээ" };
    default:
      return state;
  }
}
