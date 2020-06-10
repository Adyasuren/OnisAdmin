import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  columns: [
    {
      property: "userid",
      header: {
        label: "№"
      }
    },
    {
      property: "fullname",
      header: {
        label: "Нэр"
      }
    },
    {
      property: "email",
      header: {
        label: "Имэйл хаяг"
      }
    },
    {
      property: "companyname",
      header: {
        label: "Утасны дугаар"
      }
    },
    {
      property: "type",
      header: {
        label: "Эрх"
      }
    },
    {
      property: "status",
      header: {
        label: "Төлөв"
      }
    },
    {
      property: "password",
      header: {
        label: "Нууц үг"
      }
    }
  ],
  rows: [
    {
      companyname: "Датакейр ХХК",
      email: "zaya@datacare.mn",
      fullname: "ZayaXX",
      password: "132",
      userid: 21
    }
  ]
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.USER_ALL:
      return { ...state, error: "", message: "", rows: action.payload };
    default:
      return state;
  }
}
