import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { insertCompany } from "../../actions/company_action";

class CompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.insertCompany(formProps);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <strong>Байгууллагын мэдээлэл</strong>
          </div>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className="card-block">
              <div className="form-group">
                <label htmlFor="company">Байгууллагын нэр</label>
                <Field
                  name="name"
                  component="input"
                  className="form-control"
                  type="text"
                  placeholder="Enter your company name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="vat">Байгууллагын регистерийн дугаар</label>
                <Field
                  name="regnum"
                  component="input"
                  className="form-control"
                  type="text"
                  placeholder="PL1234567890"
                />
              </div>

              <div className="form-group">
                <label htmlFor="street">Хэрэглэгчийн төрөл</label>
                <Field
                  name="usertype"
                  component="input"
                  className="form-control"
                  type="text"
                  placeholder="Usertype"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Байгууллагын хаяг</label>
                <Field
                  name="address"
                  component="input"
                  className="form-control"
                  type="text"
                  placeholder="Address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Захирлын нэр</label>
                <Field
                  name="director"
                  component="input"
                  className="form-control"
                  type="text"
                  placeholder="directorName"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Утасны дугаар</label>
                <Field
                  name="phone"
                  component="input"
                  className="form-control"
                  type="text"
                  placeholder="Phonenumber"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Факс дугаар</label>
                <Field
                  name="fax"
                  component="input"
                  className="form-control"
                  type="text"
                  placeholder="FAX Num"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Вэб хаяг</label>
                <Field
                  name="web"
                  component="input"
                  className="form-control"
                  type="text"
                  placeholder="Web site"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Имэйл хаяг</label>
                <Field
                  name="email"
                  component="input"
                  className="form-control"
                  type="text"
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Байгууллагын лого</label>
                <Field
                  name="logo"
                  component="input"
                  className="form-control"
                  type="text"
                  placeholder="Logo"
                />
              </div>
            </div>

            <div className="card-footer">
              <button type="submit" className="btn btn-sm btn-primary">
                <i className="fa fa-dot-circle-o" /> Submit
              </button>
              <button type="reset" className="btn btn-sm btn-danger">
                <i className="fa fa-ban" /> Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// Decorate the form component
const form = reduxForm({
  form: "companyInfo"
});

export default connect(
  null,
  { insertCompany }
)(form(CompanyInfo));
