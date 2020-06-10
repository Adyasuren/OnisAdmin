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
import { addDeskStore, deskcheckregnum, clearNew } from "../../../actions/desktop_action";
var myObj = { beginDate: "2000-01-01", endDate: "2999-01-01" };
var onChangeSearch = {};

Object.defineProperty(onChangeSearch, "date", {
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
      storename: formProps.storename,
      regnum: formProps.regnum,
      ownername: formProps.ownername,
      phonenum: formProps.phonenum,
      email: formProps.email,
      distcode: formProps.distcode,
      isvatpayer: this.props.vat.vatpayer ? 1 : 0,
      vatpercent: this.props.vat.vatpayer ? 10 : 0,
      citytaxpercent: Number(formProps.citytaxpercent),
      address: formProps.address,
      status: 1,
      activity: formProps.activity,
      contractcd: formProps.contractcd,
      seller: formProps.seller,
      custid: Number(localStorage.getItem("id")),
      contractdate: formProps.date,
      insertdate: formProps.insertdate,
    };
    this.props.addDeskStore(param);
  }

  handleChange(e) {
    this.props.deskcheckregnum(e.target.value)
    this.props.storeInfo(e.target.value);
  }

  handleChanges(e) {
    this.props.checkemail(e.target.value);
  }

  Change() {
    console.log('chagnge')
    this.props.checkregnum(1);
  }

  componentWillMount() {
    this.props.clearNew();
    this.setState({ Loading: true });
    this.props.getGoodsClass();
    this.props.getDistrict();
    this.props.getCustomer(myObj);
  }
  onChange1(formProps) {
    this.props.vat = null;
  }

  /* handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('enter press here! ')
    }
  } */

  render() {
    const { handleSubmit, rows, vat, mail, error } = this.props;
    var valemailtrue = "";
    var vatpayer = 0;
    var caution = "";

    if (vat.length === 0) {
      this.props.change("storename", " ");
    }
    else {
      if (vat) {
        vatpayer = vat.vatpayer;
        caution = "";
        this.props.change("storename", vat.name);
        this.props.change("citytaxpercent", vat.citypayer ? 1 : 0);
      } else if (vat.name === null) {
        caution = "Регистрийн дугаар татварт бүртгэгдээгүй байна";
      } else {
        caution = "";
      }
    }


    var mailCheck = mail.toString();
    if (mailCheck === "true") {
      valemailtrue = "";
    } else if (mailCheck === "false") {
      valemailtrue = "Энэ хаяг бүртгэлтэй байгаа тул өөр хаяг оруулна уу!";
    }

    var logname = localStorage.getItem("logname");
    var id = localStorage.getItem("id")

    var distcode = Object.keys(rows).map(function (key) {
      var user = rows[key];
      user.name = key;
      return user.distcode;
    });

    var distname = Object.keys(rows).map(function (key) {
      var user = rows[key];
      user.name = key;
      return user.distname;
    });
    var distOptions = distcode.map(function (item, index) {
      return (
        <option key={index} value={item}>
          {distname[index]}
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
                  <strong>Харилцагчийн бүртгэл</strong>
                </div>

                <div className="card-block">
                  <Field
                    name="insymd"
                    component="input"
                    className="form-control"
                    type="text"
                    hidden
                  />
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
                        onBlur={this.handleChange.bind(this)}
                        required
                      />
                      <div className="caution">{caution}</div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="vat" className="col-md-3">
                      Дэлгүүрийн нэр<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="storename"
                        ref="storename"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="street" className="col-md-3">
                      Үйл ажиллагааны чиглэл <span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="activity"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        required
                      >
                      </Field>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Харилцагчийн нэр<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="ownername"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Утас<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="phonenum"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      И мэйл<span className="red"></span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="email"
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
                      Дүүрэг<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="distcode"
                        component="select"
                        style={divStyle}
                        className="form-control"
                        required
                      >
                        <option />
                        {distOptions}
                      </Field>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      НӨАТ төлөгч эсэх<span className="red">*</span>
                    </label>
                    <div className="col-md-6">
                      <Field
                        name="isvatpayer"
                        component="input"
                        id="squaredFour"
                        className="form-control"
                        type="checkbox"
                        checked={vatpayer}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      НӨАТ %<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        component="input"
                        type="number"
                        style={divStyle}
                        name="vatpercent"
                        className="form-control"
                        min="0"
                        max="99"
                        placeholder="10"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      {" "}
                      НХАТ %<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        component="input"
                        style={divStyle}
                        name="citytaxpercent"
                        className="form-control"
                        required
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Гэрээний дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="contractcd"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>


                  <div className="form-group row">
                    <label htmlFor="street" className="col-md-3">
                      Гэрээ хийсэн огноо<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="date"
                        component="input"
                        style={divStyle}
                        type="date"
                        className="form-control dateclss"
                      />
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
                      Борлуулагч
                    </label>
                    <div className="col-md-9">
                      <Field
                        component="input"
                        name="seller"
                        style={divStyle}
                        className="form-control"
                        type="number"
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
                        type="date"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Бүртгүүлсэн хэрэглэгч
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
                  <Link to={"/desktopUser"}>
                    <button
                      /* type="reset" */
                      className="btn btn-sm btn-primary button-ban"
                      style={{ marginRight: "10px" }}
                      onClick={() => this.onChange1()}
                    >
                      <i className="fa fa-ban" /> Болих
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-danger button-save"
                    style={{ marginRight: "10px" }}
                  /* onKeyPress={this.handleKeyPress} */
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
  form: "DesktopStoreList",
  enableReinitialize: true,
  touchOnBlur: false
});
const selector = formValueSelector("DesktopStoreList");

function mapStateToProps(state) {
  const regnumber = selector(state, "regnum");
  const useremail = selector(state, "useremail");
  const phone = selector(state, "userphonenum");
  var currentdate = new Date();
  return {
    message: state.desktop.message,
    rows: state.district.rows,
    columns: state.district.columns,
    rowsd: state.goodsclass.rows,
    columnsd: state.goodsclass.columns,
    val: state.checkregnum.rows,
    vat: state.desktop.vat,
    stores: state.store.rows,
    mail: state.email.rows,
    custinfo: state.customer.rows,
    regnumber,
    useremail,
    phone,
    initialValues: {
      storename: "",
      regnum: "",
      ownername: "",
      phonenum: "",
      email: "",
      distcode: "",
      isvatpayer: 0,
      vatpercent: "",
      citytaxpercent: "",
      address: "",
      status: 1,
      insertuser: 0,
      updateuser: 0,
      activity: "",
      contractcd: "",
      seller: "",
      custid: 0,
      insymd: currentdate.toLocaleDateString(),
      insertdate: new Date().toISOString().slice(0, 10),
      date: new Date().toISOString().slice(0, 10),
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
    addDeskStore,
    deskcheckregnum,
    clearNew
  }
)(form(Components));
