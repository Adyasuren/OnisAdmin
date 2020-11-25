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

  handleRowClass = (record) => {
    if (record.rank == this.state.selectedId) {
      return "rowbordertopbottomselected";
    } else {
      return "";
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
      return tmp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ₮';
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
          return (
            cell.toString().slice(0, 4) +
            "-" +
            cell.slice(4, 6) +
            "-" +
            cell.slice(6, 8)
          );
        } else if (cell.length > 8) {
          return cell.toString().substring(0, 10);
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
      return <img className="table-img" src={API_URL_NEW + cell} />;
    }
  };

  disableBtnFormatter = (cell, row) => {
    if (row.isenable === 1) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleClick}>
        
          <i className="fa fa-trash" />
          Идэвхигүй болгох
        </button>
      );
    } else if (row.isenable === 2) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleClick}>
          <i className="fa fa-trash" />
          Идэвхитэй болгох
        </button>
      );
    }
  };

  statusFormatter = (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return (
        <span className="label label-success" style={{ fontSize: "12px" }}>
          Идэвхитэй
        </span>
      );
    } else if (cell === 0 || cell === 2) {
      return (
        <span className="label label-danger" style={{ fontSize: "12px" }}>
          Идэвхигүй
        </span>
      );
    }
  };

  yesNoFromatter = (cell, row) => {
    if (cell === null) {
      return null;
    } else if (cell === 1) {
      return (
        <span className="label label-success" style={{ fontSize: "12px" }}>
          Тийм
        </span>
      );
    } else if (cell === 0 || cell === 2) {
      return (
        <span className="label label-danger" style={{ fontSize: "12px" }}>
          Үгүй
        </span>
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
  }

  SelectFormatter = (cell, row) => {
    let tmp = row.mastert.map((item, i) => (
      <option key={i} value={item.id}>{`${item.unit} ${item.term == '1' ? 'Жил' : 'Сар'}`}</option>
    ));
    return (
      <select onChange={(e) => this.handleChangeSelect(e, row)}>
        <option value="0">- Сонгох -</option>
        {tmp}
      </select>
    )
  }

  handleChangeSelect = (e, row) => {
    if(e.target.value == "0") {
      row.price = 0;
      row.masterid = 0;
    } else {
      let selectedValue = row.mastert.find(i => i.id == e.target.value)
      row.price = selectedValue.price;
      row.masterid = selectedValue.id;
    }
    this.props.changePrice();
  }

  YearSelectFormatter = (cell, row) => {
    return (
      <select>
        <option value="1">Жил</option>
        <option value="2">Сар</option>
      </select>
    )
  }
  TypeFormatter = (cell,row) => {
      if (cell === 1) {
      return( 
        <p2> Заавал</p2>
        );
      }
      else if(cell === 2) { 
        return(
          
        <p2>Заавал биш </p2>
    );
        }
  }
  BaazFormatter = (cell,row) => {
    if (cell === 1) {
    return( 
      <p2> Тийм</p2>
      );
    }
    else if(cell === 2) { 
      return(
        
      <p2>Үгүй </p2>
  );
      }
}
  merchantFormatter = (cell, row) => {
    if (cell == null) {
      return (
        <span
          className="label label-default"
          style={{ fontSize: "12px" }}
          onClick={() => this.headerClick(cell, row)}
        >
          No
        </span>
      );
    } else if (cell === 1) {
      return (
        <span
          className="label label-success"
          style={{ fontSize: "12px" }}
          onClick={() => this.headerClick(cell, row)}
        >
          On
        </span>
      );
    } else if (cell === 2) {
      return (
        <span
          className="label label-danger"
          style={{ fontSize: "12px" }}
          onClick={() => this.headerClick(cell, row)}
        >
          Off
        </span>
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
  }

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
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.BaazFormatter}
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
          case "yesno":
            return (
              <TableHeaderColumn
                {...item.props}
                key={i}
                dataField={item.data}
                dataAlign="center"
                headerAlign="center"
                dataFormat={this.yesNoFromatter}
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
                dataFormat={this.disableBtnFormatter}
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
                headerAlign="center"
                dataFormat={this.merchantFormatter}
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
          case "termType":
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
        }
      });

      return renderTitles;
    }
  };

  render() {
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
      <BootstrapTable
        data={this.props.data}
        tableHeaderClass="tbl-header-class"
        tableBodyClass="tbl-body-class"
        ref="table"
        trClassName={this.handleRowClass}
        options={options}
        bordered={true}
        selectRow={selectRowProp}
        striped={true}
        hover={true}
        pagination={true}
        condensed={true}
      >
        <TableHeaderColumn
          width="30px"
          dataField="rank"
          dataAlign="center"
          headerAlign="center"
          dataSort={true}
          isKey
        >
          <span className="descr">Д.д</span>
        </TableHeaderColumn>
        {this.renderTableTitles()}
      </BootstrapTable>
    );
  }
}

export default TableFok;
