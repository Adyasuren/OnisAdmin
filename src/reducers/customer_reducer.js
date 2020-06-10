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
      property: "username",
      header: {
        label: "Нэвтрэх дугаар"
      }
    },
    {
      property: "ownername",
      header: {
        label: "Удирдлагын нэр"
      }
    },
    {
      property: "regnum",
      header: {
        label: "РД"
      }
    },
    {
      property: "classcode",
      header: {
        label: "ҮА-ны чиглэл"
      }
    },
    {
      property: "phoneNum",
      header: {
        label: "Утас"
      }
    },
    {
      property: "email",
      header: {
        label: "И мэйл"
      }
    },
    {
      property: "storename",
      header: {
        label: "Дэлгүүрийн нэр"
      }
    },
    {
      property: "distcode",
      header: {
        label: "Дүүрэг"
      }
    },
    {
      property: "isvatpayer",
      header: {
        label: "НӨАТ төлөгч эсэх"
      }
    },
    {
      property: "vatpercent",
      header: {
        label: "НӨАТ %"
      }
    },
    {
      property: "citytaxpercent",
      header: {
        label: "НХАТ %"
      }
    },
    {
      property: "address",
      header: {
        label: "Хаяг"
      }
    },
    {
      property: "sendday",
      header: {
        label: "МТА илгээх өдөр"
      }
    },
    {
      property: "apiurl",
      header: {
        label: "PosApi URL"
      }
    },
    {
      property: "dealernum",
      header: {
        label: "Борлуулагч"
      }
    },
    {
      property: "insymd",
      header: {
        label: "Бүртгүүлсэн огноо"
      }
    },
    {
      property: "isactive",
      header: {
        label: "Төлөв"
      }
    }
  ],
  rows: [],
  edit: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.CUSTOMER_ALL:
      return { ...state, error: "", message: "", rows: action.payload };
    case types.CUSTOMER_CLEAR:
      return { ...state, error: "", message: "", rows: [] };
    case types.CUSTOMEREDIT_SUCCESS:
      return { ...state, error: "", message: "", edit: action.payload };
    default:
      return state;
  }
}
