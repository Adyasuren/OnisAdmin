import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { getDistrict } from "../../../actions/district_action";
import { getGoodsClass } from "../../../actions/GoodsClass_Action";
import { checkregnum } from "../../../actions/checkregnum_action";
import { storeInfo } from "../../../actions/storeinfo_action";
import { checkemail } from "../../../actions/email_action";
import { Link } from "react-router";
/* import { SubmissionError } from "redux-form"; */
import { getCustomer } from "../../../actions/customer_action";
import { addDeskStore, editDesktopStore } from "../../../actions/desktop_action";
var myObj = { beginDate: "2000-01-01", endDate: "2999-01-01" };

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
      isvatpayer: Number('0'),
      vatpercent: Number('10'),
      citytaxpercent: Number(formProps.citytaxpercent),
      address: formProps.address,
      status: formProps.status,
      activity: formProps.activity,
      contractcd: formProps.contractcd,
      seller: formProps.seller,
      custid: Number(localStorage.getItem("id")),
      contractdate: formProps.contractdate,
      insertdate: formProps.insertdate,
    };
    this.props.editDesktopStore(this.props.data.storeid, param)
  }

  handleChange(e) {
    this.props.checkregnum(e.target.value);
    this.props.storeInfo(e.target.value);
  }

  handleChanges(e) {
    this.props.checkemail(e.target.value);
  }

  Change() {
    this.props.checkregnum(1);
  }

  componentWillMount() {
    this.setState({ Loading: true });
    this.props.getGoodsClass();
    this.props.getDistrict();
    this.props.getCustomer(myObj);
  }

  render() {
    /* console.log("haha", this.props.haha) */
    const { handleSubmit, rows, rowsd, val, mail, error } = this.props;
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

    var classcode = Object.keys(rowsd).map(function (key) {
      var user = rowsd[key];
      user.name = key;
      return user.classcode;
    });

    var classname = Object.keys(rowsd).map(function (key) {
      var user = rowsd[key];
      user.name = key;
      return user.classname;
    });
    var classOptions = classcode.map(function (item, index) {
      return (
        <option key={index} value={item}>
          {classname[index]}
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
                        ref="store"
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
                      И мэйл<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="email"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        onBlur={this.handleChanges.bind(this)}
                        required
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
                        type="number"
                        style={divStyle}
                        name="citytaxpercent"
                        className="form-control"
                        min="0"
                        max="99"
                        required
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
                    <label htmlFor="country" className="col-md-3">
                      Гэрээ хийсэн огноо
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="contractdate"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="date"
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
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Төлөв<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="status"
                        component="select"
                        style={divStyle}
                        className="form-control"
                      /* required */
                      >
                        <option key={1} value="1">
                          Идэвхитэй
                        </option>
                        <option key={2} value="0">
                          Идэвхигүй
                        </option>
                      </Field>
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
                      Бүртгэсэн огноо
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="insertdate"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        disabled
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
    data: state.desktop.edit,
    message: state.desktop.message,
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
    haha: state.desktop.edit,
    initialValues: {
      storename: state.desktop.edit.storename === null ? "" : state.desktop.edit.storename,
      regnum: state.desktop.edit.regnum === null ? "" : state.desktop.edit.regnum,
      ownername: state.desktop.edit.ownername === null ? "" : state.desktop.edit.ownername,
      phonenum: state.desktop.edit.phonenum === null ? "" : state.desktop.edit.phonenum,
      email: state.desktop.edit.email === null ? "" : state.desktop.edit.email,
      distcode: state.desktop.edit.distcode === null ? "" : state.desktop.edit.distcode,
      isvatpayer: state.desktop.edit.isvatpayer === null ? "" : state.desktop.edit.isvatpayer,
      vatpercent: state.desktop.edit.vatpercent === null ? "" : state.desktop.edit.vatpercent,
      citytaxpercent: state.desktop.edit.citytaxpercent === null ? "" : state.desktop.edit.citytaxpercent,
      address: state.desktop.edit.address === null ? "" : state.desktop.edit.address,
      status: state.desktop.edit.status === null ? "" : state.desktop.edit.status,
      insertuser: state.desktop.edit.insertuser === null ? "" : state.desktop.edit.insertuser,
      updateuser: state.desktop.edit.updateuser === null ? "" : state.desktop.edit.updateuser,
      activity: state.desktop.edit.activity === null ? "" : state.desktop.edit.activity,
      contractcd: state.desktop.edit.contractcd === null ? "" : state.desktop.edit.contractcd,
      seller: state.desktop.edit.seller === null ? "" : state.desktop.edit.seller,
      custid: state.desktop.edit.custid === null ? "" : state.desktop.edit.custid,
      insymd: currentdate.toLocaleDateString(),
      contractdate: state.desktop.edit.contractdate === null ? "" : state.desktop.edit.contractdate.slice(0, 10).slice(0, 10),
      insertdate: state.desktop.edit.insertdate === null ? "" : state.desktop.edit.insertdate.slice(0, 10).slice(0, 10)
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
    editDesktopStore
  }
)(form(Components));
