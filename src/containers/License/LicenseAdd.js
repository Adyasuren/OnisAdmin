import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router";
import { connect } from "react-redux";
import { insertLicense, clearLicense } from "../../actions/license_action";
import { getCustomer } from "../../actions/customer_action";

class LicenseAdd extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    document.title = "Лиценз нэмэх - Оньс админ";
    // this.state = {
    //   value: ''
    // };
  }

  handleFormSubmit(formProps) {
    if (this.props.stores) {
      formProps.storeid = this.props.stores.storeid;
    } else {
      this.props.insertLicense(formProps);
    }
  }

  componentWillMount() {
    this.props.clearLicense();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form name="LicenseAdd" onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div className="animated fadeIn ">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <strong>Лицензийн мэдээлэл засах</strong>
                </div>
                <div className="card-block">
                  <div className="form-group row">
                    <label htmlFor="company" className="col-md-3">
                      Нэвтрэх дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="username"
                        component="input"
                        className="form-control"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Төлбөрийн эх үүсвэр<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="paymenttype"
                        component="select"
                        className="form-control"
                        required
                      >
                        <option />
                        <option value="0">Энгийн</option>
                        <option value="1">Скайтел</option>
                        <option value="2">Хаан банк</option>
                        <option value="3">Онлайнаар</option>
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="street" className="col-md-3">
                      Төлбөр төлсөн<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="payddate"
                        component="input"
                        className="form-control"
                        type="date"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Төлсөн дүн<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="paydamount"
                        ref="paydamount"
                        component="input"
                        className="form-control"
                        type="number"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="country" className="col-md-3">
                      Бүртгэсэн<span className="red">*</span>
                    </label>
                    <div className="col-md-9">
                      <Field
                        name="insemp"
                        component="input"
                        className="form-control"
                        type="text"
                        value={localStorage.getItem("logname")}
                        placeholder={localStorage.getItem("logname")}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer card-right">
                  <Link to={"/license"}>
                    {" "}
                    <button
                      type="submit"
                      className="btn btn-sm btn-danger button-ban"
                    >
                      <i className="fa fa-ban" /> Болих
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary button-save"
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
  form: "LicenseAdd",
  enableReinitialize: true
});
function mapStateToProps(state) {
  if (state.license.edit.username !== null) {
    return {
      rows: state.customer.rows,
      columns: state.customer.columns,
      message: state.licenseAdd.message,
      initialValues: {
        username: state.license.edit.userName
      }
    };
  } else {
    return {
      rows: state.customer.rows,
      columns: state.customer.columns,
      message: state.licenseAdd.message
    };
  }
}

export default connect(
  mapStateToProps,
  { insertLicense, getCustomer, clearLicense }
)(form(LicenseAdd));
