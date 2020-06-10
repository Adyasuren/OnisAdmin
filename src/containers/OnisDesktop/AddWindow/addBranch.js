import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { getDistrict } from "../../../actions/district_action";
import { getGoodsClass } from "../../../actions/GoodsClass_Action";
import { checkregnum } from "../../../actions/checkregnum_action";
import { storeInfo } from "../../../actions/storeinfo_action";
import { checkemail } from "../../../actions/email_action";
import { Link } from "react-router";
import { getCustomer } from "../../../actions/customer_action";
import { addDesktopBranch, getDeskStore } from "../../../actions/desktop_action";

var myObj = { beginDate: "2000-01-01", endDate: "2999-01-01" };
var SearchObj1 = {};
var onChangeSearch = {};
Object.defineProperty(onChangeSearch, "beginDate", {
  value: new Date().toISOString(),
  writable: true,
  enumerable: true,
  configurable: true
});

class Components extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.Change = this.Change.bind(this);
    this.state = {
      value: "",
      Loading: false
    };
    document.title = "Хэрэглэгч нэмэх - Оньс админ";
  }
  handleFormSubmit(formProps, val) {
    const param = {
      branchname: formProps.branchname,
      lclbranchid: Number(formProps.lclbranchid),
      macaddress: formProps.macaddress,
      status: Number(formProps.status),
      note: formProps.note,
      hasdatabank: formProps.hasdatabank ? 1 : 0,
      databankurl: formProps.databankurl,
      storeid: Number(formProps.storeid),
      custid: Number(localStorage.getItem("id")),
      phonenum: formProps.phonenum,
      address: formProps.address,
      insertdate: formProps.insertdate,
    };

    this.props.user.map((item, index) => {
      if (Number(formProps.ownername) === item.storeid) {
        param.storeid = item.storeid
      }
    })
    console.log(param);
    this.props.addDesktopBranch(param);
  }

  handleChange(e) {
    this.props.checkregnum(e.target.value);
    this.props.storeInfo(e.target.value);
  }

  handleChanges(e) {
    this.props.checkemail(e.target.value);
  }

  handleChangeRegnum(e) {
    this.props.user.map((item, index) => {
      if (item.storeid === Number(e.target.value)) {
        this.props.change("regnum", item.regnum);
        this.props.change("ownername", item.storename)
      }
    })
  }

  Change() {
    this.props.checkregnum(1);
  }

  componentWillMount() {
    this.props.getGoodsClass();
    this.props.getDistrict();
    this.props.getCustomer(myObj);
    SearchObj1 = {
      startDate: "2000-01-01",
      endDate: "2999-12-31"
    };
    this.props.getDeskStore(SearchObj1);
  }

  render() {
    const { handleSubmit/* , rows */, rowsd, val, mail, error, user } = this.props;
    var valemailtrue = "";
    var vatpayer = 0;
    var caution = "";

    if (val) {
      vatpayer = 1;
      caution = "";
      this.props.change("storename", JSON.parse(val)[0].STORENAME);
    } else if (val === null) {
      caution = "Регистрийн дугаар татварт бүртгэгдээгүй байна";
    } else {
      caution = "";
    }

    var mailCheck = mail.toString();
    if (mailCheck === "true") {
      valemailtrue = "";
    } else if (mailCheck === "false") {
      valemailtrue = "Энэ хаяг бүртгэлтэй байгаа тул өөр хаяг оруулна уу!";
    }

    var logname = localStorage.getItem("logname");

    var ownerOption = user.map(function (item, index) {
      return (
        <option key={item.storeid} value={item.storeid}>
          {item.storename}
        </option>
      );
    });
    var currentdate = new Date();

    const divStyle = {
      width: "inherit"
    };

    return (
      <form
        name="DesktopStoreList"
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <div className="animated fadeIn ">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <strong>Салбарын бүртгэл</strong>
                </div>

                <div className="card-block">

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Харилцагч<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="ownername"
                        component="select"
                        style={divStyle}
                        className="form-control"
                        onChange={this.handleChangeRegnum.bind(this)}
                      >
                        <option />
                        {ownerOption}
                      </Field>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      Регистрийн дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="regnum"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="vat" className="col-md-3">
                      Салбарын нэр<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="branchname"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Төрөл<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="lclbranchid"
                        component="select"
                        style={divStyle}
                        className="form-control"
                      >
                        <option key={1} value="3">
                          Салбар
                        </option>
                        <option key={2} value="1">
                          Толгой
                        </option>
                      </Field>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Mac хаяг<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="macaddress"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Төлөв<span className="red" />
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="status"
                        component="select"
                        style={divStyle}
                        className="form-control"
                        type="number"
                        min="0"
                      >
                        <option key={1} value="1">
                          Идэвхтэй
                        </option>
                        <option key={0} value="0">
                          Идэвхгүй
                        </option>
                      </Field>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Хаяг
                    </label>
                    <div className="col-md-9">
                      <Field
                        component="textarea"
                        name="address"
                        style={divStyle}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Утас<span className="red" />
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="phonenum"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        onBlur={this.handleChanges.bind(this)}
                      />
                      <div className="caution">{valemailtrue}</div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Дата банк ашигладаг эсэх<span className="red" />
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="hasdatabank"
                        component="input"
                        className="form-control"
                        type="checkbox"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Дата банк хаяг<span className="red" />
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="databankurl"
                        component="input"
                        style={divStyle}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Тэмдэглэл<span className="red" />
                    </label>
                    <div className="col-md-9">
                      <Field
                        component="textarea"
                        style={divStyle}
                        name="note"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-block">
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Бүртгүүлсэн огноо
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="insertdate"
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
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Бүртгэсэн хэрэглэгч
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="insemp"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        value={logname}
                        placeholder={logname}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="card-footer card-right">
                  {error && <div className="caution">{error}</div>} <br />
                  <Link to={"/desktopBranch"}>
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
                    className="btn btn-sm btn-danger button-save"
                    style={{ marginRight: "10px" }}
                  >
                    <i className="fa fa-save" /> Хадгалах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const form = reduxForm({
  form: "DesktopBranchList",
  enableReinitialize: true,
  touchOnBlur: false
});
const selector = formValueSelector("DesktopBranchList");

function mapStateToProps(state) {
  const regnumber = selector(state, "regnum");
  const useremail = selector(state, "useremail");
  const phone = selector(state, "userphonenum");
  var currentdate = new Date();
  return {
    message: state.desktop.message,
    user: state.desktop.rows,
    rows: state.district.rows,
    columns: state.district.columns,
    rowsd: state.goodsclass.rows,
    columnsd: state.goodsclass.columns,
    val: state.checkregnum.rows,
    checksave: state.custaddreducer.message,
    stores: state.store.rows,
    mail: state.email.rows,
    custinfo: state.customer.rows,
    regnumber,
    useremail,
    phone,
    initialValues: {
      branchname: "",
      lclbranchid: 3,
      macaddress: "",
      status: 1,
      note: "",
      licenseexpdate: "",
      hasdatabank: 0,
      databankurl: "",
      storeid: 0,
      custid: 0,
      phonenum: "",
      address: "",
      insertdate: new Date().toISOString().slice(0, 10),
    }
  };
}

export default connect(
  mapStateToProps,
  {
    getCustomer,
    getDistrict,
    getGoodsClass,
    checkregnum,
    checkemail,
    storeInfo,
    addDesktopBranch,
    getDeskStore
  }
)(form(Components));
