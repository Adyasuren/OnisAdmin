import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

export function requireAuth(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      const { dispatch } = this.props;
      if (!this.props.authenticated) {
        dispatch(push("/login"));
      }
    }

    componentWillUpdate(nextProps) {
      const { dispatch } = this.props;
      if (!nextProps.authenticated) {
        dispatch(push("/login"));
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}

export function hideLogin(ComposedComponent) {
  class HideLogin extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      const { dispatch } = this.props;
      if (this.props.authenticated) {
        dispatch(push("/"));
      }
    }

    componentWillUpdate(nextProps) {
      const { dispatch } = this.props;
      if (nextProps.authenticated) {
        dispatch(push("/"));
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(HideLogin);
}
