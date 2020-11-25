import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Accordion, AccordionItem } from "react-sanfona";
import { GetAllDistricts, GetAllDistrictsShop } from "../../actions/district_action";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.hiddenclick = this.hiddenclick.bind(this);
    this.myColor = this.myColor.bind(this);
    var tmp = window.location.pathname;

    switch (tmp) {
      case "/customerlist":
        this.state = {
          active: 0,
        };
        break;
      case "/paymentlist":
        this.state = {
          active: 1,
        };
        break;
      case "/license":
        this.state = {
          active: 2,
        };
        break;

      case "/licenselist":
        this.state = {
          active: 3,
        };
        break;
      case "/salelist":
        this.state = {
          active: 4,
        };
        break;
      case "/feedbacklist":
        this.state = {
          active: 5,
        };
        break;
      case "/dashboard":
        this.state = {
          active: 6,
        };
        break;
      case "/customerdashboard":
        this.state = {
          active: 7,
        };
        break;
      case "/paymentDashboard":
        this.state = {
          active: 8,
        };
        break;
      case "/licenseStatus":
        this.state = {
          active: 9,
        };
        break;
      case "/sellerCalculation":
        this.state = {
          active: 10,
        };
        break;
      case "/licenseReport":
        this.state = {
          active: 11,
        };
        break;
      case "/desktopUser":
        this.state = {
          active: 12,
        };
        break;
      case "/desktopPayment":
        this.state = {
          active: 13,
        };
        break;
      case "/userAPI":
        this.state = {
          active: 17,
        };
        break;
      default:
        this.state = {
          active: null,
        };
    }
    this.hiddenclick(this.state.active);
  }

  componentWillMount() {
    this.props.GetAllDistricts();
    this.props.GetAllDistrictsShop();
  }

  hiddenclick(position) {
    if (this.state.active === position) {
    } else {
      this.setState({ active: position });
    }
  }

  myColor(position) {
    if (this.state.active === position) {
      return "#157191";
    } else {
      return "";
    }
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle("open");
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1
      ? "nav-item nav-dropdown open"
      : "nav-item nav-dropdown";
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav list-nav">
            <Accordion>
            {[1].map((item) => {
                return (
                  <AccordionItem
                    key={item}
                    title={
                      <li className="nav-item">
                        <Link
                          style={{ background: this.myColor() }}
                          className="nav-link"
                        >
                          <i className="fa fa-angle-down" />
                          <span>Оньс Mobile</span>
                        </Link>
                      </li>
                    }
                  >
                    <div>
                    <li className="nav-item">
              <Link
                to={"/customerlist"}
                style={{ background: this.myColor(0) }}
                className="nav-link nav-link-item"
                onClick={() => this.hiddenclick(0)}
              >
                <i className="icon-user" /> <span>Хэрэглэгчийн жагсаалт</span>{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/paymentlist"}
                style={{ background: this.myColor(1) }}
                className="nav-link nav-link-item"
                onClick={() => this.hiddenclick(1)}
              >
                <i className="icon-list" /> <span>Төлбөрийн гүйлгээ</span>
              </Link>
            </li>

            <li className="nav-item" hidden>
              <Link
                to={"/license"}
                style={{ background: this.myColor(2) }}
                className="nav-link nav-link-item"
                onClick={() => this.hiddenclick(2)}
              >
                <i className="icon-clock" />
                <span> Лицензийн жагсаалт </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/licenselist"}
                style={{ background: this.myColor(3) }}
                className="nav-link nav-link-item"
                onClick={() => this.hiddenclick(3)}
              >
                <i className="fa fa-clock-o" />{" "}
                <span>Хэрэглэгчийн лиценз </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/sellerCalculation"}
                style={{ background: this.myColor(10) }}
                className="nav-link nav-link-item"
                onClick={() => this.hiddenclick(10)}
              >
                <i className="icon-clock" />
                <span>Борлуулагчийн тооцоо</span>
              </Link>
            </li>
            <li className="nav-item" hidden>
              <Link
                to={"/licenseReport"}
                style={{ background: this.myColor(11) }}
                className="nav-link nav-link-item"
                onClick={() => this.hiddenclick(11)}
              >
                <i className="icon-clock" />
                <span>Лицензийн тайлан</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/salelist"}
                style={{ background: this.myColor(4) }}
                className="nav-link nav-link-item"
                onClick={() => this.hiddenclick(4)}
              >
                <i className="icon-graph" />
                <span> Борлуулалт </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/feedbacklist"}
                style={{ background: this.myColor(5) }}
                className="nav-link nav-link-item"
                onClick={() => this.hiddenclick(5)}
              >
                <i className="fa fa-bullhorn" />
                <span>Санал хүсэлт</span>
              </Link>
            </li>
                      </div>
                    </AccordionItem>
                )
                  })
              }
            </Accordion>
            <Accordion>
              {[1].map((item) => {
                return (
                  <AccordionItem
                    key={item}
                    title={
                      <li className="nav-item">
                        <Link
                          style={{ background: this.myColor() }}
                          className="nav-link"
                        >
                          <i className="fa fa-angle-down" />
                          <span>Тайлан</span>
                        </Link>
                      </li>
                    }
                  >
                    <div>
                      {
                        <li className="nav-item">
                          <Link
                            to={"/dashboard"}
                            style={{ background: this.myColor(6) }}
                            className="nav-link nav-link-item"
                            onClick={() => this.hiddenclick(6)}
                          >
                            <i className="fa fa-line-chart " />
                            <span>Хянах самбар</span>
                          </Link>
                        </li>
                      }
                      {
                        <li className="nav-item">
                          <Link
                            to={"/customerDashboard"}
                            style={{ background: this.myColor(7) }}
                            className="nav-link nav-link-item"
                            onClick={() => this.hiddenclick(7)}
                          >
                            <i className="fa fa-user" />
                            <span>Хэрэглэгч</span>
                          </Link>
                        </li>
                      }
                      {
                        <li className="nav-item">
                          <Link
                            to={"/paymentDashboard"}
                            style={{ background: this.myColor(8) }}
                            className="nav-link nav-link-item"
                            onClick={() => this.hiddenclick(8)}
                          >
                            <i className="fa fa-credit-card-alt" />
                            <span>Төлбөр төлөлт</span>
                          </Link>
                        </li>
                      }
                      {
                        <li className="nav-item">
                          <Link
                            to={"/licenseStatus"}
                            style={{ background: this.myColor(9) }}
                            className="nav-link nav-link-item"
                            onClick={() => this.hiddenclick(9)}
                          >
                            <i className="fa fa-credit-card-alt" />
                            <span>Лиценз сунгалт</span>
                          </Link>
                        </li>
                      }
                    </div>
                  </AccordionItem>
                );
              })}
            </Accordion>

            <Accordion>
              {[1].map((item) => {
                return (
                  <AccordionItem
                    key={item}
                    title={
                      <li className="nav-item">
                        <Link
                          style={{ background: this.myColor() }}
                          className="nav-link"
                        >
                          <i className="fa fa-angle-down" />
                          <span>Оньс десктоп систем</span>
                        </Link>
                      </li>
                    }
                  >
                    <div>
                      {
                        <li className="nav-item">
                          <Link
                            to={"/desktopUser"}
                            style={{ background: this.myColor(12) }}
                            className="nav-link nav-link-item"
                            onClick={() => this.hiddenclick(12)}
                          >
                            <i className="fa fa-user" />
                            <span>Хэрэглэгч</span>
                          </Link>
                        </li>
                      }
                    </div>
                    <div>
                      {
                        <li className="nav-item">
                          <Link
                            to={"/desktopPayment"}
                            style={{ background: this.myColor(13) }}
                            className="nav-link nav-link-item"
                            onClick={() => this.hiddenclick(13)}
                          >
                            <i className="fa fa-credit-card" />
                            <span>Төлбөр</span>
                          </Link>
                        </li>
                      }
                    </div>
                  </AccordionItem>
                );
              })}
            </Accordion>
            <Accordion>
              <AccordionItem
                title={
                  <li className="nav-item">
                    <Link
                      style={{ background: this.myColor() }}
                      className="nav-link"
                    >
                      <i className="fa fa-angle-down" />
                      <span>Оньс шоп систем</span>
                    </Link>
                  </li>
                }
              >
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/ShopUserList"}
                      style={{ background: this.myColor(14) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(14)}
                    >
                      <i className="fa fa-users" />
                      <span>Хэрэглэгчийн жагсаалт</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/userPosApi"}
                      style={{ background: this.myColor(15) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(15)}
                    >
                      <i className="fa fa-shield" />
                      <span>Хэрэглэгчийн PosAPI</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/ShopBannerList"}
                      style={{ background: this.myColor(17) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(17)}
                    >
                      <i className="fa fa-shield" />
                      <span>Баннер</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/ShopUpdateList"}
                      style={{ background: this.myColor(18) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(18)}
                    >
                      <i className="fa fa-shield" />
                      <span>Програмын шинэчлэл</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/umoneyConnectList"}
                      style={{ background: this.myColor(19) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(19)}
                    >
                      <i className="fa fa-shield" />
                      <span>Umoney холболт</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/upointConnectList"}
                      style={{ background: this.myColor(20) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(20)}
                    >
                      <i className="fa fa-shield" />
                      <span>Upoint холболт</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/merchantList"}
                      style={{ background: this.myColor(21) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(21)}
                    >
                      <i className="fa fa-shield" />
                      <span>Merchant холболт</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/feedbackList"}
                      style={{ background: this.myColor(22) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(22)}
                    >
                      <i className="fa fa-shield" />
                      <span>Санал хүсэлт</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/shopMasterList"}
                      style={{ background: this.myColor(23) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(23)}
                    >
                      <i className="fa fa-shield" />
                      <span>Шоп үнэ бүртгэл</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/shopLicense"}
                      style={{ background: this.myColor(24) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(24)}
                    >
                      <i className="fa fa-shield" />
                      <span>Шоп Лиценз</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/qpayList"}
                      style={{ background: this.myColor(25) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(25)}
                    >
                      <i className="fa fa-shield" />
                      <span>Qpay холболт</span>
                    </Link>
                  </li>
                </div>
              </AccordionItem>
            </Accordion>
            <Accordion>
              <AccordionItem
                title={
                  <li className="nav-item">
                    <Link
                      style={{ background: this.myColor() }}
                      className="nav-link"
                    >
                      <i className="fa fa-angle-down" />
                      <span>Оньс шоп Мобиком</span>
                    </Link>
                  </li>
                }
              >
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/mobicomDillerSaleList"}
                      style={{ background: this.myColor(25) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(25)}
                    >
                      <i className="fa fa-shield" />
                      <span>Диллер Борлуулалт</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/mobicomDillerCharge"}
                      style={{ background: this.myColor(26) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(26)}
                    >
                      <i className="fa fa-shield" />
                      <span>Диллер Цэнэглэлт</span>
                    </Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link
                      to={"/mobicomDillerList"}
                      style={{ background: this.myColor(27) }}
                      className="nav-link nav-link-item"
                      onClick={() => this.hiddenclick(27)}
                    >
                      <i className="fa fa-shield" />
                      <span>Харилцагчийн жагсаалт</span>
                    </Link>
                  </li>
                </div>
              </AccordionItem>
            </Accordion>
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.district.data,
  };
}

export default connect(mapStateToProps, { GetAllDistricts, GetAllDistrictsShop })(Sidebar);
