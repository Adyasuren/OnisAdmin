import React, { Component } from "react";
import { Accordion, AccordionItem } from "react-sanfona";
import Number from "../customerDashboard/customerNumber";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import ColumnChart from "../Charts/ColumnChart";
import StackedChart from "../Charts/StackedChart";
import { connect } from "react-redux";

import { getCustomerStatus } from "../../actions/customerStatus_action";
class customerDashboard extends Component {
  constructor(props) {
    super(props);
    // Don't do this!
    this.state = {
      isLoading: false
    };
    this.calculateTotalUser = this.calculateTotalUser.bind(this);
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    this.props.getCustomerStatus().then(res => {
      if (this.props.data != null) {
        this.forceUpdate();
      }
    });
  }

  calculateTotalUser(data) {
    let onis = 0;
    let onisPlus = 0;
    if (data !== null) {
      for (var i = 0; i < data.statusByLocation.length; i++) {
        onis += data.statusByLocation[i].onis;
        onisPlus += data.statusByLocation[i].onisPlus;
      }
    }
    return (
      <center>
        <b>Нийт хэрэглэгч:</b> <t style={{ color: "#ed7d31" }}>Оньс({onis})</t>{" "}
        <t style={{ color: "#0e4b68" }}>Оньс Плас({onisPlus})</t>{" "}
      </center>
    );
  }

  render() {
    if (this.props.data === null) {
      return <div>loading</div>;
    }
    return (
      <div>
        <div className="card">
          <Accordion>
            {[1].map(item => {
              return (
                <AccordionItem
                  key={item}
                  title={
                    <div className="card-header dash-board-header">
                      {" "}
                      <span className="float-right">
                        <i className="fa fa-angle-down" />
                      </span>
                      <t>Хэрэглэгчийн тоо</t>
                    </div>
                  }
                  expanded={true}
                >
                  <center>
                    <a style={{ color: "#ed7d31" }}>
                      <b>Оньс</b>
                    </a>{" "}
                    <a style={{ color: "#0e4b68" }}>
                      <b>Оньс Плас</b>
                    </a>
                  </center>
                  <div>
                    <Number
                      data="Өнөөдөр шинэ хэрэглэгч"
                      onis={this.props.data.singUpUsersOnis}
                      onisPlus={this.props.data.singUpUsersOnisPlus}
                    />
                    <Number
                      data="Энэ сарын шинэ хэрэглэгч"
                      onis={this.props.data.singUpUsersOnisMonth}
                      onisPlus={this.props.data.singUpUsersOnisPlusMonth}
                    />
                    <Number
                      data="Энэ жилийн шинэ хэрэглэгч"
                      onis={this.props.data.singUpUsersOnisYear}
                      onisPlus={this.props.data.singUpUsersOnisPlusYear}
                    />
                    <Number
                      data="Нийт хэрэглэгч"
                      onis={this.props.data.singUpUsersOnisTotal}
                      onisPlus={this.props.data.singUpUsersOnisPlusTotal}
                    />
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        <div className="card">
          <Accordion>
            {[1].map(item => {
              return (
                <AccordionItem
                  key={item}
                  title={
                    <div className="card-header dash-board-header">
                      {" "}
                      <span className="float-right">
                        <i className="fa fa-angle-down" />
                      </span>
                      <t>Хэрэглэгчийн статистик</t>
                    </div>
                  }
                  expanded={true}
                >
                  <div className="chart-container col-md-12">
                    <div className="col-md-4 d-inline-block">
                      <ColumnChart
                        title="Хэрэглэгчийн тоо"
                        titleColor="black"
                        data={this.props.data}
                      />
                    </div>
                    <div className="col-md-6 d-inline-block float-right">
                      <PieChart
                        name="PieChart"
                        title="Хэрэглэгчийн эзлэх хувь"
                        legend={true}
                        legend1="Оньс"
                        legend2="Оньс Плас"
                        titleColor="black"
                        data={this.props.data}
                        chartType="totalUser"
                      />
                    </div>
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        <div className="card">
          <Accordion>
            {[1].map(item => {
              return (
                <AccordionItem
                  key={item}
                  title={
                    <div className="card-header dash-board-header">
                      {" "}
                      <span className="float-right">
                        <i className="fa fa-angle-down" />
                      </span>
                      <t>Дэлгүүр</t>
                    </div>
                  }
                  expanded={true}
                >
                  <div className="col-md-12">
                    <div className="col-md-12 ">
                      <BarChart
                        title="Дэлгүүрийн хэрэглэгчийн мэдээлэл"
                        titleColor="black"
                        data={this.props.data}
                      />
                    </div>
                    <br />
                    <div className="PieChartStore-Container">
                      <div className="col-md-6 d-inline-block">
                        <PieChart
                          name="PieChart0"
                          title="Оньс"
                          legend={true}
                          titleColor="#F08B33"
                          data={this.props.data}
                          chartType="userCountOnis"
                        />
                      </div>
                      <div className="col-md-6 d-inline-block">
                        <PieChart
                          name="PieChart1"
                          title="Оньс Плас"
                          legend={true}
                          legend1="Нэг хэрэглэгчтэй"
                          legend2="Олон хэрэглэгчтэй"
                          titleColor="#5b9bd5"
                          data={this.props.data}
                          chartType="userCountOnisPlus"
                        />
                      </div>
                    </div>
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        <div className="card">
          <Accordion>
            {[1].map(item => {
              return (
                <AccordionItem
                  key={item}
                  title={
                    <div className="card-header dash-board-header">
                      {" "}
                      <span className="float-right">
                        <i className="fa fa-angle-down" />
                      </span>
                      <t>Нийт хэрэглэгч байршлаар</t>
                    </div>
                  }
                  expanded={true}
                >
                  <div className="chart-container col-md-12">
                    {this.calculateTotalUser(this.props.data)}
                    <div className="col-md-12">
                      <StackedChart data={this.props.data} />
                    </div>
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { data: state.customerstatus.data };
}
export default connect(
  mapStateToProps,
  { getCustomerStatus }
)(customerDashboard);
