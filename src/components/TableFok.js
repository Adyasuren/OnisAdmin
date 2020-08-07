import React, { Component } from "react";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown,
} from "react-bootstrap-table";
import isEmpty from "lodash/isEmpty";
const selectRowProp = {
  mode: "radio",
  bgColor: "pink",
  hideSelectColumn: true,
  clickToSelect: true
};

class TableFok extends Component {
  constructor(props) {
    super(props);
  }

  indexN = (cell, row, enumObject, index) => {
    return <div>{index + 1}</div>;
  }

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

  renderTableTitles = () => {
    const { title, data } = this.props;
    if(!isEmpty(title))
    {
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
              >
                <span className="descr">
                  {item.label}
                </span>
              </TableHeaderColumn>
            )
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
                <span className="descr">
                  {item.label}
                </span>
              </TableHeaderColumn>
            )
        }
      });

      return renderTitles;
    }
  }

  render() {
    const options = {
      page: 1,
      sizePerPageList: [
        {
          text: "10",
          value: 10
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "30",
          value: 30
        },
        {
          text: "40",
          value: 40
        },
        {
          text: "Бүгд",
          value: this.props.data.length
        }
      ],
      hideSizePerPage: true,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      onRowClick: this.props.rowClick,
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
      defaultSortOrder: "asc"
    };

    return (
      <BootstrapTable
        data={this.props.data}
        tableHeaderClass="tbl-header-class"
        tableBodyClass="tbl-body-class"
        ref="table"
        options={options}
        bordered={true}
        selectRow={selectRowProp}
        striped={true}
        hover={true}
        pagination={true}
        condensed={true}
      >
        <TableHeaderColumn
          width="60px"
          dataField="rank"
          dataAlign="center"
          headerAlign="center"
          dataSort={true}
          isKey
        >
          <span className="descr">
            Д.д
          </span>
        </TableHeaderColumn>
        {
          this.renderTableTitles()
        }
      </BootstrapTable>
    );
  }
}

export default TableFok;
