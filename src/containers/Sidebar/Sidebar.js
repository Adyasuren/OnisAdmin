import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Accordion, AccordionItem } from "react-sanfona";
import {
  GetAllDistricts,
  GetAllDistrictsShop,
} from "../../actions/district_action";
import { GetDealerList } from "../../actions/OnisShop/MobicomAction";
import { GetOnisUserList } from "../../actions/sale_action";
import { MenuData } from "./Menus";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    var tmp = window.location.pathname;
    this.state = {
      active: "",
    };
  }

  componentWillMount() {
    this.props.GetAllDistricts();
    this.props.GetAllDistrictsShop();
    this.props.GetDealerList();
    this.props.GetOnisUserList();
  }

  hiddenclick = (route) => {
    if (this.state.active !== route) {
      this.setState({ active: route });
    }
  };

  render() {
    const { active } = this.state;
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav list-nav">
            <Accordion>
              {MenuData.map((item, i) => (
                <AccordionItem
                  key={i}
                  title={
                    <li className="nav-item" style={{ cursor: "pointer"}}>
                      <Link className="nav-link">
                        <i className="fa fa-angle-down" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  }
                >
                  {item.subMenus ? (
                    <div>
                      {item.subMenus.map((item1, i1) => (
                        <li className="nav-item" key={i1}>
                          <Link
                            to={`/${item1.route}`}
                            style={{
                              background:
                                item1.route === active ? "#157191" : "",
                            }}
                            className="nav-link nav-link-item"
                            onClick={() => this.hiddenclick(item1.route)}
                          >
                            <i
                              className={
                                item1.icon ? item1.icon : "fa fa-shield"
                              }
                            />
                            <span>{item1.name}</span>
                          </Link>
                        </li>
                      ))}
                    </div>
                  ) : null}
                </AccordionItem>
              ))}
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

export default connect(mapStateToProps, {
  GetAllDistricts,
  GetAllDistrictsShop,
  GetDealerList,
  GetOnisUserList,
})(Sidebar);
