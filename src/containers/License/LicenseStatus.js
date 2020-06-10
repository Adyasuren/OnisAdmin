import React, { Component } from "react";
import { Accordion, AccordionItem } from "react-sanfona";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
import License from "./licenseStatusTable";
import { connect } from "react-redux";
import { getLicenseStatus, getLicenseStatusByUsers } from "../../actions/licenseStatus_action";
class LicenseStatus extends Component {
  constructor(props) {
    super(props);
    var dateData = new Date().toISOString().slice(0, 10);
    this.state = {
      filter: {
        beginDate: "2017-11-05T05:36:18.817Z",
        endDate: "2020-03-05T05:36:18.817Z"
      },
      filter1: {
        beginDate: "2017-11-05T05:36:18.817Z",
        endDate: "2020-03-05T05:36:18.817Z"
      }
    };

    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    this.props.getLicenseStatusByUsers(this.state.filter1).then(res => {
      console.log(res);
      if (this.props.data != null) {
        this.forceUpdate();
      }
    });
    this.props.getLicenseStatus(this.state.filter).then(res => {
      if (this.props.data != null) {
        this.forceUpdate();
      }
    });
  }

  renderSizePerPageDropDown = props => {
    return (
      <SizePerPageDropDown
        className="my-size-per-page"
        btnContextual="btn-warning"
        variation="dropdown"
        {...props}
        onClick={() => this.onToggleDropDown(props.toggleDropDown)}
      />
    );
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  renderShowsTotal(start, to, total) {
    return (
      <div
        className="row"
        style={{
          marginLeft: "5px"
        }}
      >
        <p
          style={{
            color: "#607d8b",
            marginRight: "5px",
            cursor: "pointer"
          }}
        >
          Хайлтын нийт дүн: ( {this.numberWithCommas(this.props.total) + "₮"})
        </p>
      </div>
    );
  }

  onToggleDropDown = toggleDropDown => {
    toggleDropDown();
  };

  handleChange(event) {
    if (event.target.name === "startDate") {
      this.setState({
        filter: {
          beginDate: event.target.value,
          endDate: this.state.filter.endDate
        }
      });
    } else {
      this.setState({
        filter: {
          beginDate: this.state.filter.beginDate,
          endDate: event.target.value
        }
      });
    }
  }

  handleChange1(event) {
    if (event.target.name === "startDate") {
      this.setState({
        filter: {
          beginDate: event.target.value,
          endDate: this.state.filter.endDate
        }
      });
    } else {
      this.setState({
        filter: {
          beginDate: this.state.filter.beginDate,
          endDate: event.target.value
        }
      });
    }
  }

  onSubmit() {
    this.props.getLicenseStatus(this.state.filter).then(res => {
      if (this.props.data != null) {
        this.forceUpdate();
      }
    });
  }
  onSubmit1() {
    this.props.getLicenseStatusByUsers(this.state.filter).then(res => {
      if (this.props.data != null) {
        this.forceUpdate();
      }
    });
  }
  render() {
    var tmpArray = this.props.data;
    var newArray = this.props.new;
    function priceFormatter(cell, row) {
      if (cell !== null) {
        return cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";
      }
    }
    const options = {
      page: 1, // which page you want to show as default
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
          value: tmpArray.length
        }
      ], // you can change the dropdown list for size per page
      hideSizePerPage: true,

      sizePerPageDropDown: this.renderSizePerPageDropDown,
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      onRowClick: this.onClickHandler,
      noDataText: "Өгөгдөл олдсонгүй",
      prePage: "Өмнөх", // Previous page button text
      nextPage: "Дараах", // Next page button text
      firstPage: "Эхнийх", // First page button text
      lastPage: "Сүүлийх",
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationPosition: "bottom",
      hidePageListOnlyOnePage: true
    };
    return (
      <div>
        <div className="animated fadeIn">
          <div className="container">
            <div className="card">
              <Accordion>
                {[1].map(item => {
                  return (
                    <AccordionItem
                      key={item}
                      title={
                        <div className="card-header dash-board-header">
                          {" "}
                          <span className="float-right">
                            <i className="fa fa-angle-down" />
                          </span>
                          <t>Хугацаандаа лиценз сунгагдаагүй хэрэглэгч</t>
                        </div>
                      }
                      expanded={true}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-4">
                            <input
                              name="startDate"
                              className="form-control dateclss"
                              type="date"
                              value={this.state.filter.beginDate}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              name="endDate"
                              className="form-control dateclss"
                              type="date"
                              value={this.state.filter.endDate}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <button onClick={this.onSubmit}>
                              <i
                                className="fa fa-search"
                                style={{ color: "#8CA9B6" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group l-status-search-Field" />
                        <BootstrapTable
                          data={tmpArray}
                          hover={true}
                          pagination={true}
                          ref="table"
                          options={options}
                          tableHeaderClass="license-status-table-header"
                          tableBodyClass="LicenseStatusTableHeader"
                          bordered={true}
                          striped
                          condensed
                        >
                          <TableHeaderColumn
                            dataField="rank"
                            width="80px"
                            dataAlign="center"
                            headerAlign="center"
                            isKey
                          >
                            <span className="descr">Д.д&nbsp;&nbsp;&nbsp;</span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="storename"
                            width="80px"
                            dataAlign="center"
                            headerAlign="center"
                          >
                            <span className="descr">
                              Байгууллагын нэр&nbsp;&nbsp;&nbsp;
                            </span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="regnum"
                            width="80px"
                            dataAlign="center"
                            headerAlign="center"
                          >
                            <span className="descr">
                              Регистрийн дугаар&nbsp;&nbsp;&nbsp;
                            </span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="username"
                            width="80px"
                            dataAlign="center"
                            headerAlign="center"
                          >
                            <span className="descr">
                              Нэвтрэх дугаар&nbsp;&nbsp;&nbsp;
                            </span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="description"
                            width="160px"
                            dataAlign="center"
                            headerAlign="center"
                          >
                            <span className="descr">
                              Гүйлгээний утга&nbsp;&nbsp;&nbsp;
                            </span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="payamt"
                            width="80px"
                            dataAlign="center"
                            dataFormat={priceFormatter}
                            headerAlign="center"
                          >
                            <span className="descr">Дүн&nbsp;&nbsp;&nbsp;</span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="insymd"
                            width="80px"
                            dataAlign="center"
                            headerAlign="center"
                          >
                            <span className="descr">
                              Төлсөн огноо&nbsp;&nbsp;&nbsp;
                            </span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="extenddate"
                            width="80px"
                            dataAlign="center"
                            headerAlign="center"
                          >
                            <span className="descr">
                              Сунгасан огноо&nbsp;&nbsp;&nbsp;
                            </span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="insemp"
                            width="80px"
                            dataAlign="center"
                            headerAlign="center"
                          >
                            <span className="descr">
                              Сунгасан хэрэглэгч&nbsp;&nbsp;&nbsp;
                            </span>
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>

            <div className="card">
              <Accordion>
                {[1].map(item => {
                  return (
                    <AccordionItem
                      key={item}
                      title={
                        <div className="card-header dash-board-header">
                          {" "}
                          <span className="float-right">
                            <i className="fa fa-angle-down" />
                          </span>
                          <t>Лиценз сунгалт харьцуулалт</t>
                        </div>
                      }
                      expanded={true}
                    >
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-4">
                            <input
                              name="startDate"
                              className="form-control dateclss"
                              type="date"
                              value={this.state.filter1.beginDate}
                              onChange={this.handleChange1}
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              name="endDate"
                              className="form-control dateclss"
                              type="date"
                              value={this.state.filter1.endDate}
                              onChange={this.handleChange1}
                            />
                          </div>
                          <div className="col-md-4">
                            <button onClick={this.onSubmit1}>
                              <i
                                className="fa fa-search"
                                style={{ color: "#8CA9B6" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                      <div className="form-group l-status-search-Field" />
                      <BootstrapTable
                          data={newArray}
                          hover={true}
                          pagination={true}
                          ref="table"
                          options={options}
                          tableHeaderClass="license-status-table-header"
                          tableBodyClass="LicenseStatusTableHeader"
                          bordered={true}
                          striped
                          condensed
                        >
                          <TableHeaderColumn
                            dataField="caption"
                            width="80px"
                            dataAlign="center"
                            headerAlign="center"
                            isKey
                          >
                            <span className="descr">#&nbsp;&nbsp;&nbsp;</span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="userid"
                            width="80px"
                            dataAlign="center"
                            headerAlign="center"
                          >
                            <span className="descr">
                              Хэрэглэгчийн тоо&nbsp;&nbsp;&nbsp;
                            </span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="userid"
                            width="80px"
                            dataAlign="center"
                            headerAlign="center"
                          >
                            <span className="descr">
                              Хэрэглэгчийн тоогоор эзлэх %&nbsp;&nbsp;&nbsp;
                            </span>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="payamount"
                            width="80px"
                            dataAlign="center"
                            dataFormat={priceFormatter}
                            headerAlign="center"
                          >
                            <span className="descr">
                              Лиценз сунгалтын дүн&nbsp;&nbsp;&nbsp;
                            </span>
                          </TableHeaderColumn>
                          </BootstrapTable>
                        <License
                         newusers="116"/><br></br>
                         </div>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  var total = 0;
  var tmpList = state.licenseStatus.rows;
  var newList = state.licenseStatus.newRows;
  if (tmpList !== undefined) {
    for (var index = 0; index < tmpList.length; index++) {
      if (tmpList[index].payamt !== null) {
        total += tmpList[index].payamt;
      }
    }
  }

  return { data: tmpList, total: total, new: newList };
}
export default connect(
  mapStateToProps,
  { getLicenseStatus, getLicenseStatusByUsers }
)(LicenseStatus);
