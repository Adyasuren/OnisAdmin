import React from "react";
import { API_URL_NEW } from "../../package.json";

export const TABLEFOK_FORMATTER = {
  custom: (cell, row) => cell,
  financeFormatPrice: (cell, row) => {
    if (cell === null) {
      return "-";
    } else if (cell === 0) {
      return "-";
    } else if (isNaN(cell)) {
      return "-";
    } else {
      let tmp = Math.round(cell * 100) / 100;
      return tmp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },

  percent: (cell, row) => {
    if (cell === null || cell == undefined) {
      return "-";
    } else if (cell === 0) {
      return "-";
    } else if (isNaN(cell)) {
      return "-";
    } else {
      let tmp = Math.round(cell);
      return tmp.toString() + " %";
    }
  },
  termType: (cell, row) => {
    if (cell === null || cell == undefined) {
      return "-";
    } else if (cell === 0) {
      return "-";
    } else if (isNaN(cell)) {
      return "-";
    } else {
      let tmp = Math.round(cell);
      return tmp.toString() + " %";
    }
  },
  ISAPPROVED: (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return (
        <span className="label label-success" style={{ fontSize: "12px" }}>
          Батлагдсан
        </span>
      );
    } else if (cell === 2 || cell === 0) {
      return (
        <span className="label label-danger" style={{ fontSize: "12px" }}>
          Батлагдаагүй
        </span>
      );
    }
  },
  select: (cell, row) => {
    let tmp = row.mastert.map((item, i) => (
      <option key={i} value={item.id}>
        {`${item.unit} ${item.term == "101" ? "10.1" : item.term == "1" ? "Жил" : "Сар"}`}
      </option>
    ));
    return (
      <select onChange={(e) => this.handleChangeSelect(e, row)} defaultValue={row.masterid}>
        <option value={0}>- Сонгох -</option>
        {tmp}
      </select>
    );
  },
  paymentType: (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return <span style={{ fontSize: "12px" }}>Бэлэн</span>;
    } else if (cell === 2) {
      return <span style={{ fontSize: "12px" }}>Дансаар</span>;
    } else if (cell === "") {
      return <span style={{ fontSize: "12px" }}>Qpay</span>;
    }
  },
  link: (cell, row) => {
    if (cell === null) {
      return null;
    } else {
      return (
        <p
          onClick={() => this.props.linkClick(row)}
          style={{
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
        >
          {cell}
        </p>
      );
    }
  },
  usertype: (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return <span>Оньс</span>;
    } else if (cell === 2) {
      return <span>ОньсПлас</span>;
    }
  },
  number: (cell, row) => {
    if (cell === null) {
      return "-";
    } else if (cell === 0) {
      return "-";
    } else if (isNaN(cell)) {
      return "-";
    } else {
      let tmp = Math.round(cell);
      return tmp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  price: (cell, row) => {
    if (cell === null) {
      return "-";
    } else if (cell === 0) {
      return "-";
    } else if (isNaN(cell)) {
      return "-";
    } else {
      let tmp = Math.round(cell);
      return tmp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₮";
    }
  },
  priceRound: (cell, row) => {
    if (cell === null) {
      return "-";
    } else if (cell === 0) {
      return "-";
    } else if (isNaN(cell)) {
      return "-";
    } else {
      let tmp = Math.round(cell * 100) / 100;
      return tmp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  merchantType: (cell, row) => {
    if (cell == null || cell == undefined) {
      return <input type="checkbox" className="label label-danger" value={false} disabled />;
    } else if (cell === 1) {
      return (
        <input
          type="checkbox"
          className="label label-success checkedCheckBOX"
          value={true}
          checked
          onChange={() => {
            return null;
          }}
        />
      );
    } else if (cell === 2) {
      return <input type="checkbox" className="label label-danger" value={false} disabled />;
    }
  },
  image: (cell, row) => {
    if (cell === null) {
      return null;
    } else {
      return <img className="table-img" src={`${API_URL_NEW}/${cell}`} />;
    }
  },
  yesno: (cell, row) => {
    if (cell == null || cell == undefined) {
      return null;
    } else if (cell === 1) {
      return <input type="checkbox" value={true} checked className="label label-success" />;
    } else if (cell === 0 || cell === 2) {
      return <input type="checkbox" value={false} disabled className="label label-danger" />;
    }
  },
  isSuccess: (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return (
        <span className="label label-success" style={{ fontSize: "12px" }}>
          Амжилттай
        </span>
      );
    } else if (cell === 0) {
      return (
        <span className="label label-danger" style={{ fontSize: "12px" }}>
          Амжилтгүй
        </span>
      );
    } else if (cell === 2) {
      return (
        <span className="label label-grey" style={{ fontSize: "12px" }}>
          Архив
        </span>
      );
    }
  },
  status: (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return (
        <span className="label label-success" style={{ fontSize: "12px" }}>
          Идэвхтэй
        </span>
      );
    } else if (cell === 0 || cell === 2) {
      return (
        <span className="label label-danger" style={{ fontSize: "12px" }}>
          Идэвхгүй
        </span>
      );
    }
  },
  datetime: (cell, row) => {
    if (cell) {
      if (cell === null) {
        return null;
      } else {
        if (cell.length === 8) {
          return `${cell.toString().slice(0, 4)}-${cell.slice(4, 6)}-${cell.slice(6, 8)}`;
        } else if (cell.length > 8) {
          return cell.toString().replace("T", " ");
        } else {
          return cell.toString();
        }
      }
    }
  },
  date: (cell, row) => {
    if (cell) {
      if (cell === null) {
        return null;
      } else {
        if (cell.length === 8) {
          return `${cell.toString().slice(0, 4)}-${cell.slice(4, 6)}-${cell.slice(6, 8)}`;
        } else if (cell.length > 8) {
          return cell.toString().substring(0, 10);
        } else {
          return cell.toString();
        }
      }
    }
  },
  invoiceStatus: (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 2) {
      return (
        <span className="label label-success" style={{ fontSize: "12px" }}>
          Амжилттай
        </span>
      );
    } else if (cell === 1) {
      return (
        <span className="label label-grey" style={{ fontSize: "12px" }}>
          Үүссэн
        </span>
      );
    } else if (cell === 4) {
      return (
        <span className="label label-danger" style={{ fontSize: "12px" }}>
          Цуцлагдсан
        </span>
      );
    }
  },
  ISPOSAPI: (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === true) {
      return (
        <span className="label label-success" style={{ fontSize: "12px" }}>
          Идэвхитэй
        </span>
      );
    } else if (cell === false) {
      return (
        <span className="label label-danger" style={{ fontSize: "12px" }}>
          Идэвхигүй
        </span>
      );
    }
  },
  baaz: (cell, row) => {
    if (cell === 1) {
      return <p2> Тийм</p2>;
    } else if (cell === 2) {
      return <p2>Үгүй </p2>;
    }
  },
  type: (cell, row) => {
    if (cell === 1) {
      return <p2> Заавал</p2>;
    } else if (cell === 2) {
      return <p2>Заавал биш </p2>;
    }
  },
};
