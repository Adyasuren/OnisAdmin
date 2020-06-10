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
      property: "userName",
      header: {
        label: "Нэвтрэх дугаар"
      }
    },
    {
      property: "ownerName",
      header: {
        label: "Удирдлагын нэр"
      }
    },
    {
      property: "regNum",
      header: {
        label: "РД"
      }
    },
    {
      property: "phoneNum",
      header: {
        label: "Утас"
      }
    },
    {
      property: "storeName",
      header: {
        label: "Дэлгүүрийн нэр"
      }
    },
    {
      property: "goodsName",
      header: {
        label: "Үйл ажиллагааны чиглэл"
      }
    },
    {
      property: "note",
      header: {
        label: "Санал хүсэлт"
      }
    },
    {
      property: "insYmd",
      header: {
        label: "Илгээсэн огноо"
      }
    }
  ],
  rows: [],
  edit: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FEEDBACK_ALL:
      return { ...state, error: "", message: "", rows: action.payload };
    default:
      return state;
  }
}
