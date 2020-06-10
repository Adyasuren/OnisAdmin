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

var myObj = { beginDate: "2000-01-01", endDate: "2999-01-01" };

class TransacEdit extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.hiddenclick = this.hiddenclick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.Change = this.Change.bind(this);
    this.state = {
      value: "asda",
      Loading: false
    };
    document.title = "Төлбөр засах - Оньс админ";
  }

  hiddenclick() {
    this.props.cancelEdit();
  }

  handleFormSubmit = async (formProps) => {
    this.setState({ Loading: true });
    if (formProps.username === "") {
      throw new SubmissionError({
        username: "Нэвтрэх дугаараа сонгоно уу!",
        _error: "Нэвтрэх дугаараа сонгоно уу!"
      });
    } else {
      switch (formProps.paymenttype) {
        case "Энгийн":
          formProps.paymenttype = 0;
          break;
        case "Скайтел":
          formProps.paymenttype = 1;
          break;
        case "Хаан банк":
          formProps.paymenttype = 2;
          break;
        case "Онлайнаар":
          formProps.paymenttype = 3;
          break;
        default:
          break;
      }
      // this.props.updatePayment(formProps.transnumber, formProps.username);
      transacApi.updatePayment(formProps.transnumber, formProps.username).then(response => {
        console.log(response);
        this.setState({ Loading: false });
        if (!response.success) {
          niceAlert(response.value);
        } else {
          window.location.href = "/paymentlist";
        }
      })

      switch (formProps.paymenttype) {
        case 0:
          formProps.paymenttype = "Энгийн";
          break;
        case 1:
          formProps.paymenttype = "Скайтел";
          break;
        case 2:
          formProps.paymenttype = "Хаан банк";
          break;
        case 3:
          formProps.paymenttype = "Онлайнаар";
          break;
        default:
          break;
      }
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

  handleChanges(e) {
    this.props.checkemail(e.target.value);
  }

  Change() {
    this.props.checkregnum(1);
  }
  componentDidMount() {
    this.props.getCustomer(myObj);
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
            <strong>Гүйлгээний мэдээлэл засах</strong>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-block">
                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      Гүйлгээний дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="transnumber"
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
                      Төлбөрийн хэлбэр
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="paymenttype"
                        component="input"
                        style={divStyle}
                        id="ptype"
                        className="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="street" className="col-md-3">
                      Гүйлгээний огноо
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="paiddate"
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
                      Төлсөн дүн
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="paidamount"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="number"
                        min="0"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Гүйлгээний утга
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="description"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="text"
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
                    <label htmlFor="company" className="col-md-3">
                      Нэвтрэх дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="username"
                        component="select"
                        style={divStyle}
                        className="form-control"
                        onChange={this.handleChange.bind(this)}
                        required
                      >
                        <option />
                        {cOptions}
                      </Field>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Дэлгүүрийн нэр
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="storename"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="street" className="col-md-3">
                      РД
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
                    <label htmlFor="country" className="col-md-3">
                      Утасны дугаар
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="phonenumber"
                        component="input"
                        style={divStyle}
                        className="form-control"
                        type="number"
                        disabled
                      />
                    </div>
                  </div>

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
                      type="submit"
                      className="btn btn-sm btn-danger button-save"
                      disabled={this.state.Loading}
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
    cancelEdit
  }
)(form(TransacEdit));
