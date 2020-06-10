import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  columns: [
    {
      property: "number",
      header: {
        label: "№"
      }
    },
    {
      property: "rank",
      header: {
        label: "Д.д"
      }
    },
    {
      property: "userType",
      header: {
        label: "Систем"
      }
    },
    {
      property: "storeId",
      header: {
        label: "Д/код"
      }
    },
    {
      property: "regNum",
      header: {
        label: "Регистрийн дугаар"
      }
    },
    {
      property: "storeName",
      header: {
        label: "Дэлгүүрийн нэр"
      }
    },
    {
      property: "ownerName",
      header: {
        label: "Удирдлагын нэр"
      }
    },
    {
      property: "calssName",
      header: {
        label: "Үйл ажиллагааны чиглэл"
      }
    }
  ],
  rows: [],
  year: [],
  stores: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SALELIST_YEAR_SUCCESS:
      return { ...state, error: "", message: "", year: action.payload };
    case types.SALELIST_SUCCESS:
      return { ...state, error: "", message: "", rows: action.payload };
    case types.SALELIST_CLEAR:
      return { ...state, error: "", message: "", rows: [], year: [] };
    case types.STORELIST_SUCCESS:
      return { ...state, error: "", message: "", stores: action.payload };
    default:
      return state;
  }
}
