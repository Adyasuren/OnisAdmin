import React, { Component } from "react";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown,
} from "react-bootstrap-table";
import isEmpty from "lodash/isEmpty";
import { API_URL_NEW } from "../../package.json";
const selectRowProp = {
  mode: "radio",
  bgColor: "pink",
  hideSelectColumn: true,
  clickToSelect: true,
};

class TableFok extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
    };
  }

  dateDiff = (edate) => {
    if (edate === null) {
      return false;
    } else {
      const diffInMs = new Date(edate) - new Date();
      const days = diffInMs / (1000 * 60 * 60 * 24);
      if (days < 0) {
        return false;
      }
      return true;
    }
  };

  handleRowClass = (record, e, s) => {
    if (record.rank == this.state.selectedId) {
      return "rowbordertopbottomselected";
    } else if (record.bannernm) {
      if (!this.dateDiff(record.endymd)) {
        return "bgColorPink";
      }
      return "";
    } else if (this.props.isRowError) {
      if (record.endymd) {
        const startDate = new Date();
        const timeEnd = new Date(record.endymd);
        const diffInMs = Math.round(
          (timeEnd - startDate) / (1000 * 60 * 60 * 24)
        );
        if (diffInMs <= 0) {
          return "rowColorRed";
        } else {
          return "";
        }
      }
      return "";
    } else {
      return "";
    }
  };

  priceRoundFormatter = (cell, row) => {
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
  };

  numberFormatter = (cell, row) => {
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
  };

  priceFormatter = (cell, row) => {
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
  };

  percentFormatter = (cell, row) => {
    if (cell === null) {
      return "-";
    } else if (cell === 0) {
      return "-";
    } else if (isNaN(cell)) {
      return "-";
    } else {
      let tmp = Math.round(cell);
      return tmp.toString() + " %";
    }
  };

  indexN = (cell, row, enumObject, index) => {
    return <div>{index + 1}</div>;
  };

  renderSizePerPageDropDown = (props) => {
    return (
      <SizePerPageDropDown
        className="my-size-per-page"
        btnContextual="btn-warning"
        variation="dropdown"
        {...props}
        onClick={() => props.toggleDropDown()}
      />
    );
  };

  dateFormatter = (cell, row) => {
    if (cell) {
      if (cell === null) {
        return null;
      } else {
        if (cell.length === 8) {
          return `${cell.toString().slice(0, 4)}-${cell.slice(
            4,
            6
          )}-${cell.slice(6, 8)}`;
        } else if (cell.length > 8) {
          return cell.toString().substring(0, 10);
        } else {
          return cell.toString();
        }
      }
    }
  };

  datetimeFormatter = (cell, row) => {
    if (cell) {
      if (cell === null) {
        return null;
      } else {
        if (cell.length === 8) {
          return `${cell.toString().slice(0, 4)}-${cell.slice(
            4,
            6
          )}-${cell.slice(6, 8)}`;
        } else if (cell.length > 8) {
          return cell.toString().replace("T", " ");
        } else {
          return cell.toString();
        }
      }
    }
  };

  imageFormatter = (cell, row) => {
    if (cell === null) {
      return null;
    } else {
      return <img className="table-img" src={`${API_URL_NEW}/${cell}`} />;
    }
  };

  linkFormatter = (cell, row) => {
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
  };

  disableBtn = (cell, row) => {
    if (row.isenable === 1) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.props.disableBtn(cell, row)}
        >
          <i className="fa fa-trash" />
          Идэвхигүй болгох
        </button>
      );
    } else if (row.isenable === 2) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.props.disableBtn(cell, row)}
        >
          <i className="fa fa-trash" />
          Идэвхитэй болгох
        </button>
      );
    }
  };

  userTypeFormatter = (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return <span>Оньс</span>;
    } else if (cell === 2) {
      return <span>ОньсПлас</span>;
    }
  };

  paymentTypeFormatter = (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return <span style={{ fontSize: "12px" }}>Бэлэн</span>;
    } else if (cell === 2) {
      return <span style={{ fontSize: "12px" }}>Дансаар</span>;
    } else if (cell === "") {
      return <span style={{ fontSize: "12px" }}>Qpay</span>;
    }
  };

  statusFormatter = (cell, row) => {
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
  };

  isSuccessFormatter = (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return (
        <span className="label label-success" style={{ fontSize: "12px" }}>
          Амжилттай
        </span>
      );
    } else if (cell === 0 || cell === 2) {
      return (
        <span className="label label-danger" style={{ fontSize: "12px" }}>
          Амжилтгүй
        </span>
      );
    }
  };

  yesNoFormatter = (cell, row) => {
    if (cell == null || cell == undefined) {
      return null;
    } else if (cell === 1) {
      return (
        <input
          type="checkbox"
          value={true}
          checked
          className="label label-success"
        />
      );
    } else if (cell === 0 || cell === 2) {
      return (
        <input
          type="checkbox"
          value={false}
          disabled
          className="label label-danger"
        />
      );
    }
  };

  termFormatter = (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return (
        <span className="label label-primary" style={{ fontSize: "12px" }}>
          Жил
        </span>
      );
    } else if (cell === 0 || cell === 2) {
      return (
        <span className="label label-info" style={{ fontSize: "12px" }}>
          Сар
        </span>
      );
    }
  };

  SelectFormatter = (cell, row) => {
    const { isNew, selectedWindows } = this.props;
    let tmp = row.mastert.map((item, i) => (
      <option key={i} value={item.id}>
        {`${item.unit} ${
          item.term == "101" ? "10.1" : item.term == "1" ? "Жил" : "Сар"
        }`}
      </option>
    ));
    return (
      <select
        onChange={(e) => this.handleChangeSelect(e, row)}
        defaultValue={row.masterid}
      >
        <option value={0}>- Сонгох -</option>
        {tmp}
      </select>
    );
  };

  handleChangeSelect = (e, row) => {
    if (e.target.value == "0") {
      row.price = 0;
      row.masterid = 0;
    } else {
      let selectedValue = row.mastert.find((i) => i.id == e.target.value);
      row.price = selectedValue.price;
      row.masterid = selectedValue.id;
    }
    this.props.changePrice();
  };

  YearSelectFormatter = (cell, row) => {
    return (
      <select>
        <option value="1">Жил</option>
        <option value="2">Сар</option>
      </select>
    );
  };

  TermTypeFormatter = (cell, row) => {
    if (cell === 1) {
      return <p2>Жил</p2>;
    } else if (cell === 2) {
      return <p2>Сар </p2>;
    }
  };

  TypeFormatter = (cell, row) => {
    if (cell === 1) {
      return <p2> Заавал</p2>;
    } else if (cell === 2) {
      return <p2>Заавал биш </p2>;
    }
  };
  ISPOSAPIFormatter = (cell, row) => {
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
  };

  invoiceStatusFormatter = (cell, row) => {
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
  };

  isapprovedFormatter = (cell, row) => {
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
  };

  baazFormatter = (cell, row) => {
    if (cell === 1) {
      return <p2> Тийм</p2>;
    } else if (cell === 2) {
      return <p2>Үгүй </p2>;
    }
  };
  merchantFormatter = (cell, row) => {
    if (cell == null || cell == undefined) {
      return (
        <input
          type="checkbox"
          className="label label-danger"
          value={false}
          disabled
        />
      );
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
      return (
        <input
          type="checkbox"
          className="label label-danger"
          value={false}
          disabled
        />
      );
    }
  };

  headerClick = (cell, row) => {
    let tmp = this.props.title;
    // tmp[e.target.closest("td").className - 1]
    this.props.headerClick(cell, row);
  };

  handleRowClick = (row, columnIndex, rowIndex) => {
    this.setState({ selectedId: row.rank });
    if (this.props.rowClick) {
      this.props.rowClick(row, columnIndex, rowIndex);
    }
  };

  handleRowDoubleClick = (row, columnIndex, rowIndex) => {
    // this.setState({ selectedId: row.rank });
    if (this.props.rowDoubleClick) {
      this.props.rowDoubleClick(row, columnIndex, rowIndex);
    }
  };

  renderTableTitles = () => {
    const { title, data } = this.props;

    if (!isEmpty(title)) {
      var renderTitles = title.map((item, i) => {
        switch (item.format) {
          case "custom":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign={
                  item.props.dataAlign ? item.props.dataAlign : "center"
                }
                headerAlign="center"
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "percent":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign={
                  item.props.dataAlign ? item.props.dataAlign : "center"
                }
                headerAlign="center"
                dataFormat={this.percentFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "type":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.TypeFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "baaz":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.baazFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "ISPOSAPI":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.ISPOSAPIFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "invoiceStatus":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.invoiceStatusFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "date":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.dateFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "datetime":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.datetimeFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "status":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.statusFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "isSuccess":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.isSuccessFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "yesno":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.yesNoFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "image":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.imageFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "disableBtn":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.disableBtn}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "merchantType":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                dataSort={true}
                headerAlign="center"
                dataFormat={this.merchantFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "priceRound":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.priceRoundFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "price":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.priceFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "number":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.numberFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "termType":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.TermTypeFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "ISAPPROVED":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.isapprovedFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "select":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.SelectFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "paymentType":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.paymentTypeFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "link":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.linkFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
          case "usertype":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.userTypeFormatter}
              >
                <span className="descr">{item.label}</span>
              </TableHeaderColumn>
            );
        }
      });

      return renderTitles;
    }
  };

  indexN(cell, row, enumObject, index) {
    return <div>{index + 1}</div>;
  }

  render() {
    const { sumValue, sumValueText } = this.props;
    const options = {
      page: 1,
      sizePerPageList: [
        {
          text: "10",
          value: 10,
        },
        {
          text: "20",
          value: 20,
        },
        {
          text: "30",
          value: 30,
        },
        {
          text: "40",
          value: 40,
        },
        {
          text: "Бүгд",
          value: this.props.data.length,
        },
      ],
      hideSizePerPage: true,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      onRowClick: this.handleRowClick,
      onRowDoubleClick: this.handleRowDoubleClick,
      noDataText: "Өгөгдөл олдсонгүй",
      prePage: "Өмнөх",
      nextPage: "Дараах",
      firstPage: "Эхнийх",
      lastPage: "Сүүлийх",
      sizePerPage: 10,
      pageStartIndex: 1,
      paginationPosition: "bottom",
      hidePageListOnlyOnePage: true,
      defaultSortName: "rank",
      defaultSortOrder: "asc",
    };
    return (
      <div>
        <BootstrapTable
          data={this.props.data}
          id={this.props.data}
          tableHeaderClass="tbl-header-class"
          tableBodyClass="tbl-body-class"
          ref="table"
          trClassName={this.handleRowClass}
          options={options}
          bordered={true}
          selectRow={selectRowProp}
          footerData={this.props.footerData}
          /* striped={true} */
          footer={this.props.footerData ? true : false}
          hover={true}
          pagination={true}
          condensed={true}
        >
          <TableHeaderColumn
            width="40px"
            dataField="rank"
            dataAlign="center"
            headerAlign="center"
            dataSort={true}
            isKey
            dataFormat={this.indexN}
            /*  dataFormat={this.rankGenerator} */
          >
            <span className="descr">№</span>
          </TableHeaderColumn>
          {this.renderTableTitles()}
        </BootstrapTable>
        {sumValue != undefined ? (
          <b className="descr">
            {sumValueText ? sumValueText : "Хайлтын нийт дүн:"}{" "}
            {new Intl.NumberFormat("mn-MN").format(sumValue)}
          </b>
        ) : null}
      </div>
    );
  }
}

export default TableFok;
