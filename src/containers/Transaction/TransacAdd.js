import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { insertLicense } from "../../actions/license_action";
import {
  insertPayment,
  getPaymentListtmp,
  cancelEdit
} from "../../actions/transac_action";
import { getCustomer } from "../../actions/customer_action";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import UserAddPopup from "./UserAddPopup";
import licenseApi from "../../api/licenseApi";
import MDSpinner from "react-md-spinner";
import niceAlert from "sweetalert";

var myObj = {
  beginDate: "2000-01-01",
  endDate: "2999-01-01"
};
var onChangeSearch = {};
Object.defineProperty(onChangeSearch, "beginDate", {
  value: new Date().toISOString(),
  writable: true,
  enumerable: true,
  configurable: true
});

class TransacAdd extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.Change = this.Change.bind(this);
    this.state = {
      value: true,
      isActive: false,
      selectedRows: [],
      modalOpen: false,
      isLoading: false
    };
    this.cellButton = this.cellButton.bind(this);
    document.title = "Төлбөр нэмэх - Оньс админ";
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  handleFormSubmit(formProps) {
    if (formProps.payamt > 0) {
      this.setState({ isLoading: true });
      let userName = this.state.selectedRows.map((item, i) => {
        return { userName: item.username };
      });
      let tmp = {
        paymentType: formProps.typeid,
        payedAmount: formProps.payamt,
        description: formProps.description,
        userName: userName
      };
      licenseApi.insertMultipleCustomerPayment(tmp).then(Response => {
        this.setState({ isLoading: false });
        console.log(Response);
        niceAlert(Response.message);
        window.location.href = "/paymentlist";
      });
    } else {
      niceAlert("Төлсөн дүн 0 байж болохгүй!");
    }
  }

  handleChange(e) {
    var tmp;
    for (var key in this.props.rows) {
      if (e.target.value === this.props.rows[key].username) tmp = key;
    }
    this.props.change("storename", this.props.rows[tmp].storename);
    this.props.change("regnum", this.props.rows[tmp].regnum);
    this.props.change("phonenumber", this.props.rows[tmp].phonenum);
  }
  hiddenclick() {
    this.props.cancelEdit();
  }
  tmp(formProps) {
    console.log(formProps);
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
  handleChanges(e) {
    this.props.checkemail(e.target.value);
  }
  Change() {
    this.props.checkregnum(1);
  }
  componentWillMount() {
    this.setState({ Loading: true });
    this.props.getCustomer(myObj);
    this.setState({ Loading: false });
  }

  componentDidMount() { }

  rowdel(e) {
    var index = this.state.products.indexOf(e);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  }

  buttonFormatter(cell, row, formatExtraData, rowIdx) {
    return (
      <button
        onClick={() => this.editClick(row)}
        className="btn btn-warning btn-sm btn-edit"
        style={{
          lineHeight: "0.5px",
          height: "27px",
          marginTop: "-11px",
          marginBottom: "-9px"
        }}
      >
        Засах
      </button>
    );
  }
  cellButton(cell, row, formatExtraData, rowIdx) {
    return (
      <button className="button" onClick={() => this.handleRemove(row)}>
        <i className="fa fa-trash-o" />
      </button>
    );
  }

  handleRemove = row => {
    console.log(this.state);
    var index = this.state.selectedRows.indexOf(row);
    this.state.selectedRows.splice(index, 1);
    this.setState(this.state.selectedRows);
  };

  handleSaveList = list => {
    console.log(list);
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  handleSelectedRow = list => {
    let temp = this.state.selectedRows.concat(list);
    this.setState({ selectedRows: temp });

    this.toggleModal();
  };

  render() {
    console.log("transacAdd");
    const { handleSubmit } = this.props;
    const appFormat = {
      "1": "Oньс",
      "2": "ОньсПлас"
    };

    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    function enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }
    const options = {
      page: 1, // which page you want to show as default
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      // you can change the dropdown list for size per page
      hideSizePerPage: true,
      onRowDoubleClick: this.handleDoubleClick,
      // Accept bool or function
      prePage: "Өмнөх", // Previous page button text
      nextPage: "Дараах", // Next page button text
      firstPage: "Эхнийх", // First page button text
      lastPage: "Сүүлийх",
      // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationPosition: "bottom",
      hidePageListOnlyOnePage: true,
      noDataText: "Өгөгдөл олдсонгүй"
    };
    var currentdate = new Date();
    const divStyle = {
      width: "inherit"
    };
    if (this.state.isLoading === true) {
      return <MDSpinner className="spinner" size={100} />;
    }
    return (
      <form name="TransAdd" onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div className="animated fadeIn ">
          <div className="card-header">
            <strong>&lt;&lt; Шинэ гүйлгээ</strong>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-block">
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Төлбөрийн хэлбэр<span className="red">*</span>
                    </label>
                    <div className="col-md-7">
                      <Field
                        name="typeid"
                        component="select"
                        style={divStyle}
                        className="form-control"
                      >
                        <option />
                        <option value="0">Энгийн</option>
                        <option value="1">Скайтел</option>
                        <option value="2">Хаан банк</option>
                        <option value="3">Онлайнаар</option>
                        <option value="4">Посоор</option>
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="street" className="col-md-3">
                      Гүйлгээний огноо<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="beginDate"
                        component="input"
                        style={divStyle}
                        type="date"
                        className="form-control dateclss"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Төлсөн дүн<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="payamt"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="number"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Гүйлгээний утга<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="description"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Бүртгэсэн хэрэглэгч<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="updemp"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        value={localStorage.getItem("logname")}
                        placeholder={localStorage.getItem("logname")}
                        disabled="disabled"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="street" className="col-md-3">
                      Бүртгэсэн огноо<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="updymd"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        placeholder={
                          currentdate.toLocaleDateString() +
                          " " +
                          currentdate.getHours() +
                          ":" +
                          currentdate.getMinutes() +
                          ":" +
                          currentdate.getSeconds()
                        }
                        disabled="disabled"
                      />
                    </div>
                  </div>
                  <div className="card-footer card-right">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary button-ban"
                      onClick={() => this.hiddenclick()}
                    >
                      <i className="fa fa-ban" />
                      Болих
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary button-save"
                    >
                      <i className="fa fa-save" />
                      Хадгалах
                    </button>
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-block">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary button-save"
                    onClick={this.toggleModal}
                  >
                    + Хэрэглэгч нэмэх
                  </button>
                </div>
                <div className="card-block tmpresponsive">
                  <BootstrapTable
                    data={this.state.selectedRows}
                    hover={true}
                    tableHeaderClass="tbl-header-class sticky-header"
                    tableBodyClass="tbl-body-class"
                    ref="table"
                    options={options}
                    maxHeight={"500px"}
                    width="100%"
                    bordered={true}
                    striped={true}
                    condensed={true}
                  >
                    <TableHeaderColumn
                      dataField="rank"
                      width="60px"
                      headerAlign="center"
                      dataAlign="center"
                      dataSort={true}
                      dataFormat={indexN}
                      isKey
                    >
                      <span className="descr">Д.д&nbsp;&nbsp;&nbsp;</span>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="usertype"
                      width="90px"
                      headerAlign="center"
                      dataAlign="center"
                      dataSort={true}
                      dataFormat={enumFormatter}
                      formatExtraData={appFormat}
                    >
                      <span className="descr">Систем&nbsp;&nbsp;&nbsp;</span>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      ref="username"
                      width="90px"
                      headerAlign="center"
                      dataField="username"
                      dataAlign="center"
                      dataSort={true}
                    >
                      <span className="descr">
                        Нэвтрэх дугаар&nbsp;&nbsp;&nbsp;
                      </span>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      ref="regnum"
                      width="80px"
                      headerAlign="center"
                      dataField="regnum"
                      dataAlign="center"
                      dataSort={true}
                    >
                      <span className="descr">
                        Регистрийн дугаар&nbsp;&nbsp;&nbsp;
                      </span>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      ref="phonenum"
                      width="80px"
                      headerAlign="center"
                      dataField="phonenum"
                      dataAlign="center"
                      dataSort={true}
                    >
                      <span className="descr">
                        Утасны дугаар&nbsp;&nbsp;&nbsp;
                      </span>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="storename"
                      width="150px"
                      headerAlign="center"
                      dataAlign="center"
                      dataSort={true}
                    >
                      <span className="descr">
                        Дэлгүүрийн нэр&nbsp;&nbsp;&nbsp;
                      </span>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      datafield="button"
                      width="90px"
                      dataFormat={this.cellButton}
                      headerAlign="center"
                      dataAlign="center"
                    >
                      <span className="descr">Устгах</span>
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserAddPopup
          modalOpen={this.state.modalOpen}
          closeModal={() => this.setState({ modalOpen: false })}
          handleSelectedRow={this.handleSelectedRow}
        />
      </form>
    );
  }
}

const form = reduxForm({ form: "TransacAdd", enableReinitialize: true });

function mapStateToProps(state) {
  return {
    rows: state.customer.rows,
    columns: state.customer.columns,
    message: state.licenseAdd.message,
    initialValues: {
      beginDate: new Date().toISOString().slice(0, 10)
    }
  };
}
export default connect(
  mapStateToProps,
  { insertLicense, getCustomer, insertPayment, getPaymentListtmp, cancelEdit }
)(form(TransacAdd));
