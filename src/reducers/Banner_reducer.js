import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  columns: [
    {
        property: "bannernm",
        header: {
            label: "Д.д"
        }
    },
    // {
    //   property: "username",
    //   header: {
    //     label: "Баннерын нэр"
    //   }
    // },
    // {
    //   property: "address",
    //   header: {
    //     label: "Баннерын байршил"
    //   }
    // },
    {
      property: "startymd",
      header: {
        label: "Эхлэх огноо"
      }
    },
    {
        property: "endymd",
        header: {
            label: "Дуусах огноо"
        }
    },
    {
      property: "imgnm",
      header: {
        label: "Banner URL"
      }
    },
    {
      property: "insymd",
      header: {
        label: "Бүртгүүлсэн огноо"
      }
    },
    {
      property: "isenable",
      header: {
        label: "Төлөв"
      }
    }
  ],
  rows: [],
  edit: {},
  row: [],
  data: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.BANNER_ADD_SUCCESS: 
    return {...state, error: "",message: "", rows: action.payload};
    case types.BANNER_ALL:
      return { ...state, error: "", message: "", row: [], data: action.payload };
    case types.BANNEREDIT_ALL:
      return { ...state, error: "", message: "", edit: action.payload };
    default:
      return state;
  }
}
