import React, { Component } from "react";
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
import LoadingBar from "react-redux-loading-bar";
// import * as authActions from '../actions/auth_action';
import LoginForm from "../components/LoginForm";

class LoginPage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {credentials:{email: 'sophie@email.com', password: 'password'}};
  //   this.onChange = this.onChange.bind(this);
  //   this.onLogin = this.onLogin.bind(this);
  // }
  // onChange(event) {
  //   const field = event.target.name;
  //   const credentials = this.state.credentials;
  //   credentials[field] = event.target.value;
  //   return this.setState({credentials: credentials});
  // }
  // onLogin(event) {
  //   event.preventDefault();
  //   this.props.actions.loginUser(this.state.credentials);
  // }

  render() {
    return (
      <div className="login-form">
        <LoadingBar />
        <div className="app flex-row align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5 login-main">
                <div className="onis-logo" />
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(authActions, dispatch)
//   };
// }
// export default connect(null, mapDispatchToProps)(Login);
export default LoginPage;
