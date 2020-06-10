import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../actions/auth_action";

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.username = "Invalid email address";
  }
  if (!values.password) {
    errors.age = "Required";
  }
  return errors;
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="errorclass">
          <span className="error">{this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className="login-form"
        onSubmit={handleSubmit(this.handleFormSubmit)}
        autoComplete="off"
      >
        {this.renderAlert()}
        <h2 className="onis-title">Оньс админ хуудас</h2>
        <div className="input-group mb-3">
          <span className="input-group-addon login-addon">
            <i className="icon-user" />
          </span>
          <Field
            name="userName"
            component="input"
            className="form-control login-field"
            type="text"
            placeholder="Нэвтрэх нэр"
            autoComplete="off"
          />
        </div>
        <div className="input-group mb-4">
          <span className="input-group-addon login-addon">
            <i className="icon-lock" />
          </span>
          <Field
            name="password"
            component="input"
            className="form-control login-field"
            type="password"
            placeholder="Нууц үг"
          />
        </div>
        <div className="row">
          <div className="col-6">
            <button type="submit" className="btn btn-primary px-4 login-btn">
              <i className="fa fa-check" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

// Decorate the form component
const form = reduxForm({
  form: "login", // a unique name for this form
  validate
});

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated
  };
}

export default connect(
  mapStateToProps,
  { loginUser, logoutUser }
)(form(LoginForm));
