import React, { Component } from "react";
import { Dropdown, DropdownMenu, DropdownItem } from "reactstrap";
import { logoutUser } from "../../actions/auth_action";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      elapsed: 0
    };
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.props.logoutUser();
      }.bind(this),
      7200000
    );
  }

  promptLogout() {
    this.props.logoutUser();
  }

  logout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  toggle(e) {
    if (e != null) e.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-hidden");
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-compact");
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-mobile-show");
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("aside-menu-hidden");
  }

  render() {
    return (
      <header className="app-header navbar onis-header">
        <button
          className="navbar-toggler mobile-sidebar-toggler d-lg-none"
          onClick={this.mobileSidebarToggle}
          type="button"
        >
          &#9776;
        </button>
        <a className="navbar-brand navbar-brands" href="#">
          {" "}
        </a>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <a
              className="nav-link navbar-toggler sidebar-toggler"
              onClick={this.sidebarToggle}
              href="#"
            >
              &#9776;
            </a>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto" style={{ marginRight: "20px" }}>
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <a
                onClick={this.toggle}
                className="nav-link dropdown-toggle nav-link"
                data-toggle="dropdown"
                href=""
                role="button"
                aria-haspopup="true"
                aria-expanded={this.state.dropdownOpen}
              >
                <span className="d-md-down-none"> Нэвтэрсэн: </span>{" "}
                <span className="d-md-down-none login-username">
                  {localStorage.getItem("logname")}
                </span>
              </a>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem onClick={this.logout}>Гарах</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </header>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(Header);
