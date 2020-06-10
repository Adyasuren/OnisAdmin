import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  column: [
    {
      property: "statementid",
      header: {
        label: ""
      }
    },
    {
      property: "insymd",
      header: {
        label: "Огноо"
      }
    },
    {
      property: "trancode",
      header: {
        label: ""
      }
    },
    {
      property: "payamt",
      header: {
        label: "Дүн"
      }
    },
    {
      property: "description",
      header: {
        label: "Гүйлгээний утга"
      }
    },
    {
      property: "typeid",
      header: {
        label: "Төлбөрийн хэлбэр"
      }
    },
    {
      property: "issuccess",
      header: {
        label: "Лиценз сунгагдсан эсэх"
      }
    },
    {
      property: "insymd",
      header: {
        label: ""
      }
    },
    {
      property: "username",
      header: {
        label: "Нэвтрэх дугаар"
      }
    },
    {
      property: "licenseid",
      header: {
        label: ""
      }
    },
    {
      property: "updymd",
      header: {
        label: "Зассан огноо"
      }
    },
    {
      property: "updemp",
      header: {
        label: "Зассан хэрэглэгч"
      }
    }
  ],
  rows: [],
  edit: {},
  SearchObj: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.PAYMENTLIST_SUCCESS:
      return { ...state, error: "", message: "", rows: action.payload };
    case types.PAYMENTLIST_CLEAR:
      return { ...state, error: "", message: "", rows: [] };
    case types.PAYMENTSEARCH_SUCCESS:
      return { ...state, error: "", message: "", SearchObj: action.payload };
    case types.PAYMENTEDIT_SUCCESS:
      return { ...state, error: "", message: "", edit: action.payload };
    case types.PAYMENTNEW_SUCCESS:
      return { ...state, error: "", message: "", SearchObj: action.payload };
    default:
      return state;
  }
}
