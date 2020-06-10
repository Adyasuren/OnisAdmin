import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router";
import { insertLicense } from "../../../actions/license_action";
import {
  insertPayment,
  getPaymentListtmp,
  cancelEdit
} from "../../../actions/transac_action";
import { getCustomer } from "../../../actions/customer_action";
import { getBranch, addDesktopPayment } from "../../../actions/desktop_action";
import {
  SizePerPageDropDown
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import MDSpinner from "react-md-spinner";
var SearchObj1 = {};
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

  componentWillMount() {
    SearchObj1.startDate = "2000-01-01";
    SearchObj1.endDate = "2999-12-31";
    this.props.getBranch(SearchObj1);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  handleFormSubmit(formProps) {
    const param = {
      paymenttype: Number(formProps.paymenttype),
      paydate: formProps.paydate,
      amount: Number(formProps.amount),
      branchid: Number(formProps.branchid),
      startdate: formProps.startdate,
      enddate: formProps.enddate,
      custid: Number(localStorage.getItem("id")),
      storeid: 0
    }
    this.props.branch.map((item, index) => {
      if (param.branchid === item.branchid) {
        param.storeid = Number(item.storeid)
      }
    })
    /* console.log(param) */
    this.props.addDesktopPayment(param);
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

  handleChangeRegnum(e) {
    let reg = ""
    let lcl = null
    let licen = ""
    this.props.branch.map(function (item, index) {
      console.log(item)
      if (Number(item.branchid) === Number(e.target.value)) {
        reg = item.regnum
        lcl = item.lclbranchid
        licen = item.licenseexpdate
      }
    });
    this.props.change("regnum", reg)
    this.props.change("startdate", licen.slice(0, 10))
    this.props.change("enddate", licen.slice(0, 10))
    this.props.change("type", lcl === 1 ? "Толгой" : "Салбар")
  }

  render() {
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

    var ownerOption = this.props.branch.map(function (item, index) {
      return (
        <option value={item.branchid}>{item.regnum}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~{item.branchname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~{item.lclbranchid === 1 ? "Толгой" : "Салбар"}</option>
      )
    });

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
            <div className="col-md-6">
              <div className="card">
                <div className="card-block">
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Төлбөрийн хэлбэр<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="paymenttype"
                        component="select"
                        style={divStyle}
                        className="form-control"
                      >
                        <option value="1">Бэлнээр</option>
                        <option value="2">Скайтелээр</option>
                        <option value="3">Хаан банкаар</option>
                        <option value="4">Онлайнаар</option>
                        <option value="5">Посоор</option>
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="street" className="col-md-3">
                      Гүйлгээний огноо<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="paydate"
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
                        name="amount"
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
                    <Link to={"/desktopPayment"}>
                      <button
                        type="reset"
                        className="btn btn-sm btn-primary button-ban"
                        style={{ marginRight: "10px" }}
                      >
                        <i className="fa fa-ban" /> Болих
                    </button>
                    </Link>
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
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <strong>Лицензийн бүртгэл</strong>
                </div>
                <div className="card-block">
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Харилцагч сонгох<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="branchid"
                        component="select"
                        style={divStyle}
                        className="form-control"
                        showSearch
                        onChange={this.handleChangeRegnum.bind(this)}
                      >
                        <option />
                        {ownerOption}
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="street" className="col-md-3">
                      Регистрийн дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="regnum"
                        component="input"
                        style={divStyle}
                        className="form-control dateclss"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Төрөл<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="type"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        placeholder="Толгой"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Лиценз эхлэх хугацаа<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="startdate"
                        component="input"
                        style={divStyle}
                        type="date"
                        className="form-control dateclss"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Лиценз дуусах хугацаа<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="enddate"
                        component="input"
                        style={divStyle}
                        type="date"
                        className="form-control dateclss"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    );
  }
}

const form = reduxForm({ form: "PaymentAdd", enableReinitialize: true });

function mapStateToProps(state) {
  return {
    rows: state.customer.rows,
    columns: state.customer.columns,
    message: state.licenseAdd.message,
    branch: state.desktop.branch,
    initialValues: {
      /* beginDate: new Date().toISOString().slice(0, 10), */
      paymenttype: 1,
      paydate: new Date().toISOString().slice(0, 10),
      amount: "",
      branchid: 0,
      startdate: new Date().toISOString().slice(0, 10),
      enddate: new Date().toISOString().slice(0, 10),
      custid: 0
    }
  };
}
export default connect(
  mapStateToProps,
  { insertLicense, getCustomer, insertPayment, getPaymentListtmp, cancelEdit, getBranch, addDesktopPayment }
)(form(TransacAdd));
