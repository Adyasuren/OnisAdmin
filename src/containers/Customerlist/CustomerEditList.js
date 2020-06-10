import React, { Component } from "react";
import { Field, reduxForm, actions } from "redux-form";
import { SubmissionError } from "redux-form";
import { connect } from "react-redux";
import {
  insertCustomer,
  editCustomer,
  updateCustomer
} from "../../actions/customer_action";
import { getDistrict } from "../../actions/district_action";
import { getGoodsClass } from "../../actions/GoodsClass_Action";
import { checkregnum } from "../../actions/checkregnum_action";
import { checkemail } from "../../actions/email_action";
import { Link } from "react-router";
//import Loading from '../../components/Loading';

class CustomerAddList extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.Change = this.Change.bind(this);
    this.state = {
      value: "asda",
      Loading: false
    };
    document.title = "Хэрэглэгч засах - Оньс админ ";
  }
  handleFormSubmit(formProps) {
    // this.setState({Loading: true});
    console.log(formProps);
    var currentdate = new Date();

    if (formProps.phonenum.length > 8) {
      console.log("asd");
      throw new SubmissionError({
        email: "Утасны дугаар 9 тэмдэгтээс богино байх ёстой",
        _error: "Утасны дугаар 9 тэмдэгтээс богино байх ёстой"
      });
    } else if (formProps.password.length < 4) {
      throw new SubmissionError({
        password: " Нууц үг 4 тэмдэгтээс урт байх ёстой",
        _error: "Нууц үг 4 тэмдэгтээс урт байх ёстой"
      });
    } else {
      var tmp1 = formProps.insymd;
      var tmp2 = formProps.insemp;
      formProps.insymd =
        currentdate.toLocaleDateString() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      formProps.insemp = localStorage.getItem("logname");
      console.log(formProps);
      this.props.updateCustomer(formProps);
      formProps.insemp = tmp2;
      formProps.insymd = tmp1;
    }
    // this.setState({Loading: false});
  }

  hiddenclick() {}

  handleChange(e, dispatch, initialValues) {
    this.props.checkregnum(e.target.value);
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
    this.setState({ Loading: false });
  }

  render() {
    const { handleSubmit } = this.props;
    const { rows } = this.props;
    const { rowsd } = this.props;
    const { mail } = this.props;
    const { editrow } = this.props;

    var valemailtrue = "";
    var caution = "";

    var mailCheck = mail.toString();
    if (mailCheck === "true") {
      valemailtrue = "";
    } else if (mailCheck === "false") {
      valemailtrue = "Энэ хаяг бүртгэлтэй байгаа тул өөр хаяг оруулна уу!";
    }

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
    const divStyle = {
      width: "inherit"
    };
    return (
      <form name="addressForm" onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field
          name="storeid"
          component="input"
          className="form-control"
          type="hidden"
        />
        <div className="animated fadeIn ">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <strong>Хэрэглэгчийн мэдээлэл</strong>
                </div>
                <div className="card-block">
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
                        onBlur={() =>
                          actions.blur("addressForm", "storename", "aaa")
                        }
                        onFocus={this.Change.bind(this)}
                        disabled
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
                        name="phonenum"
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
                      И мэйл
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
                    <div className="col-md-9">
                      <Field
                        name="isvatpayer"
                        component="input"
                        style={divStyle}
                        id="squaredFour"
                        className="form-control"
                        type="checkbox"
                        checked={editrow.isvatpayer}
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
                        max="100"
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
                        max="100"
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
                        disabled
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
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Бүртгүүлсэн огноо
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="insymd"
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
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="card-footer card-right">
                  <Link to={"/customerlist"}>
                    {" "}
                    <button
                      type="reset"
                      className="btn btn-sm btn-primary button-ban"
                      onClick={() => this.hiddenclick()}
                    >
                      {" "}
                      <i className="fa fa-ban" />
                      <span> Болих</span>
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
  enableReinitialize: true
});

function mapStateToProps(state) {
  if (Object.keys(state.customer.edit).length !== 0) {
    if (state.customer.edit.insymd !== null) {
      return {
        rows: state.district.rows,
        columns: state.district.columns,
        rowsd: state.goodsclass.rows,
        columnsd: state.goodsclass.columns,
        val: state.checkregnum.rows,
        checksave: state.custaddreducer.message,
        mail: state.email.rows,
        editrow: state.customer.edit,
        initialValues: {
          storename: state.customer.edit.storename,
          regnum: state.customer.edit.regnum,
          userid: state.customer.edit.userid,
          classcode: state.customer.edit.classcode,
          ownername: state.customer.edit.ownername,
          phonenum: state.customer.edit.phonenum,
          email: state.customer.edit.email,
          distcode: state.customer.edit.distcode,
          isvatpayer: state.customer.edit.isvatpayer,
          vatpercent: state.customer.edit.vatpercent,
          citytaxpercent: state.customer.edit.citytaxpercent,
          address: state.customer.edit.address,
          dealernum: state.customer.edit.dealernum,
          password: state.customer.edit.password,
          storeid: state.customer.edit.storeid,
          insemp: state.customer.edit.insemp,
          insymd: state.customer.edit.insymd.replace("T", " ")
        }
      };
    } else {
      return {
        rows: state.district.rows,
        columns: state.district.columns,
        rowsd: state.goodsclass.rows,
        columnsd: state.goodsclass.columns,
        val: state.checkregnum.rows,
        checksave: state.custaddreducer.message,
        mail: state.email.rows,
        editrow: state.customer.edit,
        initialValues: {
          storename: state.customer.edit.storename,
          regnum: state.customer.edit.regnum,
          userid: state.customer.edit.userid,
          classcode: state.customer.edit.classcode,
          ownername: state.customer.edit.ownername,
          phonenum: state.customer.edit.phonenum,
          email: state.customer.edit.email,
          distcode: state.customer.edit.distcode,
          isvatpayer: state.customer.edit.isvatpayer,
          vatpercent: state.customer.edit.vatpercent,
          citytaxpercent: state.customer.edit.citytaxpercent,
          address: state.customer.edit.address,
          dealernum: state.customer.edit.dealernum,
          password: state.customer.edit.password,
          storeid: state.customer.edit.storeid,
          insemp: state.customer.edit.insemp
        }
      };
    }
  } else {
    return {
      rows: state.district.rows,
      columns: state.district.columns,
      rowsd: state.goodsclass.rows,
      columnsd: state.goodsclass.columns,
      val: state.checkregnum.rows,
      checksave: state.custaddreducer.message,
      mail: state.email.rows,
      editrow: state.customer.edit
    };
  }
}

export default connect(
  mapStateToProps,
  {
    insertCustomer,
    getDistrict,
    getGoodsClass,
    checkregnum,
    checkemail,
    editCustomer,
    updateCustomer
  }
)(form(CustomerAddList));
