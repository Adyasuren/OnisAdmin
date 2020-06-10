import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
//import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { insertCustomer } from "../../actions/customer_action";
import { getDistrict } from "../../actions/district_action";
import { getGoodsClass } from "../../actions/GoodsClass_Action";
import { checkregnum } from "../../actions/checkregnum_action";
import { storeInfo } from "../../actions/storeinfo_action";
import { checkemail } from "../../actions/email_action";
import { Link } from "react-router";
import { SubmissionError } from "redux-form";
import { getCustomer } from "../../actions/customer_action";
//import Loading from '../../components/Loading';

var myObj = { beginDate: "2000-01-01", endDate: "2999-01-01" };

class CustomerAddList extends Component {
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
    this.setState({ Loading: true });
    var arrregnum = [];
    var arremail = [];
    if (this.props.stores) {
      formProps.storeid = this.props.stores.storeid;
    }
    //var insdate = formProps.insymd;
    //this.insymd = currentdate.toLocaleDateString()+'T'+currentdate.getHours()+':'+currentdate.getMinutes()+':'+currentdate.getSeconds()
    // for(var key in this.props.custinfo){
    //   arrregnum.push(this.props.custinfo[key].regnum);
    //   arremail.push(this.props.custinfo[key].email);
    // }
    for (var i = 1; i > this.props.custinfo.length; i++) {
      arrregnum.push(this.props.custinfo[i].regnum);
      arremail.push(this.props.custinfo[i].email);
    }
    if (arremail.includes(this.props.useremail)) {
      throw new SubmissionError({
        useremail: "Энэ мэйл хаяг бүртгэгдсэн байна",
        _error: "Энэ мэйл хаяг бүртгэгдсэн байна"
      });
    } else if (formProps.regnum.length >= 11) {
      throw new SubmissionError({
        regnum: "Регистрийн дугаар 10 тэмдэгтээс богино байх ёстой",
        _error: "Регистрийн дугаар 10 тэмдэгтээс богино байх ёстой"
      });
    } else if (formProps.regnum.length <= 6) {
      throw new SubmissionError({
        regnum: "Регистрийн дугаар 7 тэмдэгтээс урт байх ёстой",
        _error: "Регистрийн дугаар 7 тэмдэгтээс урт байх ёстой"
      });
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.props.useremail)
    ) {
      throw new SubmissionError({
        useremail: "Мэйл хаяг оруулна уу",
        _error: "Мэйл хаяг оруулна уу"
      });
    } else if (formProps.userphonenum.length >= 9) {
      throw new SubmissionError({
        useremail: "Утасны дугаар 9 тэмдэгтээс богино байх ёстой",
        _error: "Утасны дугаар 9 тэмдэгтээс богино байх ёстой"
      });
    } else if (formProps.password.length < 4) {
      throw new SubmissionError({
        password: " Нууц үг 4 тэмдэгтээс урт байх ёстой",
        _error: "Нууц үг 4 тэмдэгтээс урт байх ёстой"
      });
    } else if (this.props.val === null) {
      throw new SubmissionError({
        regnum: "Татварт бүртгэлтэй байх ёстой",
        _error: "Татварт бүртгэлтэй байх ёстой"
      });
    } else {
      this.props.insertCustomer(formProps);
      //console.log(formProps);
    }
    this.setState({ Loading: false });
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
    console.log(this.props);
    this.setState({ Loading: false });
  }

  render() {
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

    var distcode = Object.keys(rows).map(function(key) {
      var user = rows[key];
      user.name = key;
      return user.distcode;
    });

    var distname = Object.keys(rows).map(function(key) {
      var user = rows[key];
      user.name = key;
      return user.distname;
    });
    var distOptions = distcode.map(function(item, index) {
      return (
        <option key={index} value={item}>
          {distname[index]}
        </option>
      );
    });

    var classcode = Object.keys(rowsd).map(function(key) {
      var user = rowsd[key];
      user.name = key;
      return user.classcode;
    });

    var classname = Object.keys(rowsd).map(function(key) {
      var user = rowsd[key];
      user.name = key;
      return user.classname;
    });
    var classOptions = classcode.map(function(item, index) {
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
        name="CustomerAddList"
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <div className="animated fadeIn ">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <strong>Хэрэглэгчийн мэдээлэл</strong>
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
                        name="classcode"
                        component="select"
                        style={divStyle}
                        className="form-control"
                        required
                      >
                        <option />
                        {classOptions}
                      </Field>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Удирдлагын нэр<span className="red">*</span>
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
                        name="userphonenum"
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
                      И мэйл<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="useremail"
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
                        name="dealernum"
                        style={divStyle}
                        type="number"
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
                    <label htmlFor="street" className="col-md-3">
                      Нууц үг<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="password"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="password"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Бүртгүүлсэн огноо
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="date"
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
                  <Link to={"/customerlist"}>
                    {" "}
                    <button
                      type="reset"
                      className="btn btn-sm btn-primary button-ban"
                    >
                      {" "}
                      <i className="fa fa-ban" /> Болих
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-danger button-save"
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

// Decorate the form component
const form = reduxForm({
  form: "CustomerAddList",
  enableReinitialize: true,
  touchOnBlur: false
});
const selector = formValueSelector("CustomerAddList"); // <-- same as form name

function mapStateToProps(state) {
  const regnumber = selector(state, "regnum");
  const useremail = selector(state, "useremail");
  const phone = selector(state, "userphonenum");
  var currentdate = new Date();
  return {
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
      storename: "",
      val: "",
      insymd: currentdate.toLocaleDateString()
    }
  };
}

export default connect(
  mapStateToProps,
  {
    insertCustomer,
    getCustomer,
    getDistrict,
    getGoodsClass,
    checkregnum,
    checkemail,
    storeInfo
  }
)(form(CustomerAddList));
