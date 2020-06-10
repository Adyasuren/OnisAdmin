import React, { Component } from "react";
import Header from "../../containers/Header/";
import Sidebar from "../../containers/Sidebar/";
import Aside from "../../containers/Aside/";
import Footer from "../../containers/Footer/";
import LoadingBar from "react-redux-loading-bar";

var height = 0;

class Full extends Component {
  componentWillMount() {
    height = window.innerHeight;
  }

  render() {
    return (
      <div>
        <div className="app" style={{ height: height }}>
          <LoadingBar showFastActions />
          <Header />
          <div className="app-body">
            <Sidebar {...this.props} />
            <main
              className="main"
              style={{
                width: "-webkit-fill-available",
                maxWidth: "-moz-available"
              }}
            >
              <br />
              {/*<Breadcrumbs wrapperElement="ol" wrapperClass="breadcrumb"  itemClass="breadcrumb-item"
              separator=""  routes={this.props.routes} params={this.props.params}  />*/}
              <div className="container-fluid">{this.props.children}</div>
            </main>
            <Aside />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Full;
