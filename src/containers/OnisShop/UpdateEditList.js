import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { clearPaymentList } from "../../actions/license_action";
import niceAlert from "sweetalert";
import MDSpinner from "react-md-spinner";
import {
  updatePayment,
  getPaymentListtmp,
  cancelEdit
} from "../../actions/transac_action";
import { getCustomer } from "../../actions/customer_action";
import transacApi from "../../api/transac_api";
import {regPosApi} from "../../actions/UpdateEdit_action";
import UpdateEdit_api from "../../api/UpdateEdit_api";

var myObj = { beginDate: "2000-01-01", endDate: "2999-01-01" };
var inputObj = new Object();

class UpdateEditList extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.hiddenclick = this.hiddenclick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.Change = this.Change.bind(this);
    this.state = {
      value: "asda",
      Loading: false,
      ui32: {},
      ui64: {},
      api32: {},
      api64: {},
    };
    document.title = "Төлбөр засах - Оньс админ";

  }

  hiddenclick() {
    this.props.cancelEdit();
  }

  handleFormSubmit = () => {
    let formProps = {};
    formProps.NAME = this.refs.NAME.value;
    formProps.UIVERSION = this.refs.UIVERSION.value;
    formProps.APIVERSION = this.refs.APIVERSION.value;
    formProps.TYPE = this.refs.TYPE.value;
    formProps.MIGRATE = this.refs.MIGRATE.value;

    // this.setState({ Loading: true });
    inputObj = formProps;
    let formData = new FormData();

    formData.append("ui32", this.state.ui32);
    formData.append("ui64", this.state.ui64);
    formData.append("api32", this.state.api32);
    formData.append("api64", this.state.api64);

    UpdateEdit_api.regPosApi(formData, formProps).then((res) => {
      console.log("res", res);
      if(res.success){
        
      }
    });
    // this.setState({ Loading: false });
  };

  handleChange(e) {
    var tmp;
    for (var key in this.props.rows) {
      if (e.target.value === this.props.rows[key].username) tmp = key;
    }
    this.props.change("storename", this.props.rows[tmp].storename);
    this.props.change("regnum", this.props.rows[tmp].regnum);
    this.props.change("phonenumber", this.props.rows[tmp].phonenum);
  }

  handleChanges(e) {
    this.props.checkemail(e.target.value);
  }

  Change() {
    this.props.checkregnum(1);
  }
  componentDidMount() {
    this.props.getCustomer(myObj);
  }
  // handleFormSubmit(formProps) {
  //   formProps.beginDate = "2000-01-01";
  //   formProps.endDate = "2999-12-31";
  //   this.setState({ Loading: true });
  //   SearchObj1 = formProps;
  //   this.props.getCustomer(formProps);
  //   this.setState({ Loading: false });
  // }

  onChangeFile = (e, type) => {
    if(type == "ui32")
    {
      this.setState({ ui32: e.target.files[0] });
    }else if(type == "ui64"){
      this.setState({ ui64: e.target.files[0] });
    }else if(type == "api32"){
      this.setState({ api32: e.target.files[0] });
    }else if(type == "api64"){
      this.setState({ api64: e.target.files[0] });
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { rows } = this.props;
    const { error } = this.props;

    var shopname = Object.keys(rows).map(function (key) {
      var user = rows[key];
      user.name = key;
      return user.storename;
    });

    var username = Object.keys(rows).map(function (key) {
      var user = rows[key];
      user.name = key;
      return user.username;
    });

    var cOptions = username.map(function (item, index) {
      return (
        <option key={index} value={item}>
          {item}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{shopname[index]}
        </option>
      );
    });
    var currentdate = new Date();
    const divStyle = {
      width: "inherit"
    };
    if (this.state.Loading) {
      return <MDSpinner className="spinner" size={100} />;
    }
    return (
      <form name="TransEdit" onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div className="animated fadeIn ">
          <div className="card-header">
            <strong>>> Програм шинэчлэлт бүртгэх</strong>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-block">
                <form
                  onSubmit={handleSubmit(this.handleFormSubmit)}
                  id="myForm"
                >
                  {/* <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      Шинэчилсэн огноо<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="username"
                        component="input"
                        type="date"
                        style={divStyle}
                        className="form-control"
                        onChange={this.handleChange.bind(this)}
                        required
                      >
                      </Field>
                    </div>
                  </div> */}
                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      Тайлбар<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="NAME"
                        ref="NAME"
                        component="input"
                        type="text"
                        style={divStyle}
                        className="form-control"
                        required
                      >
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      UI version<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="UIVERSION"
                        ref="UIVERSION"
                        component="input"
                        type="number"
                        style={divStyle}
                        className="form-control"
                        required
                      >
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      API version <span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="APIVERSION"
                        ref="APIVERSION"
                        component="input"
                        type="number"
                        style={divStyle}
                        className="form-control"
                        required
                      >
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      Type <span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="TYPE"
                        ref="TYPE"
                        component="select"
                        style={divStyle}
                        className="form-control"
                        required
                      >
                        <option value="1">Заавал</option>
                        <option value="2">Заавал биш</option>
                      </Field>
                    </div>
                  </div><div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      Type <span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="MIGRATE"
                        ref="MIGRATE"
                        component="select"
                        style={divStyle}
                        className="form-control"
                        required
                      >
                        <option value="1">Тийм</option>
                        <option value="2">Үгүй</option>
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      UI url <span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <input
                        name="ui32"
                        type="file"
                        ref="ui32"
                        style={divStyle}
                        className="form-control"
                        onChange={(e) => this.onChangeFile(e, "ui32")}
                        required
                      >
                      </input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                    </label>
                    <div className="col-md-9">
                      <input
                        name="ui64"
                        ref="ui64"
                        type="file"
                        style={divStyle}
                        onChange={(e) => this.onChangeFile(e, "ui64")}
                        className="form-control"
                        required
                      >
                      </input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      API version<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <input
                        name="api32"
                        ref="api32"
                        type="file"
                        style={divStyle}
                        className="form-control"
                        onChange={(e) => this.onChangeFile(e, "api32")}
                        required
                      >
                      </input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                    </label>
                    <div className="col-md-9">
                      <input
                        name="api64"
                        ref="api64"
                        type="file"
                        style={divStyle}
                        className="form-control"
                        required
                        onChange={(e) => this.onChangeFile(e, "api64")}
                      >
                      </input>
                    </div>
                  </div>
                  
                  </form>
              
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-block">
                  
                
                <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Бүртгэсэн хэрэглэгч<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="insemp"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
                        value={localStorage.getItem("logname")}
                        placeholder={localStorage.getItem("logname")}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="street" className="col-md-3">
                      Бүртгэсэн огноо<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="insymd"
                        component="input"
                        style={divStyle}
                        value="asd"
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

                  <div className="card-footer card-right">
                    {error && <div className="caution">{error}</div>} <br />
                    <button
                      type="button"
                      className="btn btn-sm btn-primary button-ban"
                      onClick={() => this.hiddenclick()}
                    >
                      <i className="fa fa-ban" /> Болих
                    </button>
                    <button
                      className="btn btn-sm btn-danger button-save"
                      onClick={this.handleFormSubmit}
                    >
                      <i className="fa fa-save" /> Хадгалах
                    </button>
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

const form = reduxForm({
  form: "TransacEdit",
  enableReinitialize: true,
  touchOnBlur: false
});
function mapStateToProps(state) {
  var ptype = "";
  if (state.paymentlist.edit.typeid === 0) {
    ptype = "Энгийн";
  } else if (state.paymentlist.edit.typeid === 1) {
    ptype = "Скайтел";
  } else if (state.paymentlist.edit.typeid === 2) {
    ptype = "Хаан банк";
  } else if (state.paymentlist.edit.typeid === 3) {
    ptype = "Онлайнаар";
  } else {
    ptype = "Алдаа";
  }
  /*var insertdate = "";*/
  var transacdate = "";
  /*if(state.paymentlist.edit.updymd == null){
    insertdate = null;
  }
  else{
    insertdate = state.paymentlist.edit.updymd.substring(0,10) + " "+ state.paymentlist.edit.updymd.substring(11,19);
  }*/
  if (state.paymentlist.edit.trandate == null) {
    transacdate = null;
  } else {
    transacdate =
      state.paymentlist.edit.trandate.substring(0, 10) +
      " " +
      state.paymentlist.edit.trandate.substring(11, 19);
  }
  return {
    rows: state.customer.rows,
    columns: state.customer.columns,
    message: state.licenseAdd.message,
    editrow: state.paymentlist.row,
    initialValues: {
      transnumber: state.paymentlist.edit.statementid,
      paymenttype: ptype,
      paiddate: transacdate,
      description: state.paymentlist.edit.description,
      paidamount: state.paymentlist.edit.payamt,
      username: state.paymentlist.edit.username,
      storename: state.paymentlist.edit.storename,
      regnum: state.paymentlist.edit.regnum,
      phonenumber: state.paymentlist.edit.phonenum
    }
  };
}

export default connect(
  mapStateToProps,
  {
    getPaymentListtmp,
    updatePayment,
    getCustomer,
    clearPaymentList,
    cancelEdit,
    regPosApi
  }
)(form(UpdateEditList));
