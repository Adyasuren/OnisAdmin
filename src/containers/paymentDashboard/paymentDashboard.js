import React, { Component } from "react";
import { Accordion, AccordionItem } from "react-sanfona";
import Number from "../customerDashboard/customerNumber";
//charts
import PieChart from "../Charts/PieChart";
import PieChartPie from "../Charts/PieChartPie";
import LineChart from "../Charts/LineChart";

import { connect } from "react-redux";
//import BarChart from '../Charts/BarChart';
import ColumnChartY3 from "../Charts/ColumnChartY3";

import { getPaymentDashBoardData } from "../../actions/paymentDashboard_action";
/* import console = require("console"); */

class paymentDashboard extends Component {
  componentWillMount() {
    this.props.getPaymentDashBoardData().then(res => {
      if (this.props.data != null) {
        this.forceUpdate();
      }
    });
  }

  render() {
    console.log(this.props.data);
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
                    <a
                      style={{
                        color: "#ed7d31"
                      }}
                    >
                      <b>Оньс </b>
                    </a>
                    <a
                      style={{
                        color: "#0e4b68"
                      }}
                    >
                      <b>Оньс Плас</b>
                    </a>
                  </center>
                  <div>
                    <Number
                      data="Өнөөдөр төлбөр төлсөн хэрэглэгч"
                      onis={this.props.data.todaysPayedUserOnis}
                      onisPlus={this.props.data.todaysPayedUserOnisPlus}
                    />
                    <Number
                      data="Энэ сард төлбөр төлсөн хэрэглэгч"
                      onis={this.props.data.thisMonthPayedUserOnis}
                      onisPlus={this.props.data.thisMonthPayedUserOnisPlus}
                    />
                    <Number
                      data="Энэ жил төлбөр төлсөн хэрэглэгч"
                      onis={this.props.data.thisYearPayedUserOnis}
                      onisPlus={this.props.data.thisYearPayedUserOnisPlus}
                    />
                    <Number
                      data="Нийт төлбөр төлсөн хэрэглэгч"
                      onis={this.props.data.totalUserCountOnis}
                      onisPlus={this.props.data.totalUserCountOnisPlus}
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
                      <t>Төлбөр төлөлт</t>
                      <span className="float-right">
                        <i className="fa fa-angle-down" />
                      </span>
                    </div>
                  }
                  expanded={true}
                >
                  <div className="col-md-4 d-inline-block">
                    <ColumnChartY3
                      title="Лиценз сунгалт /дүнгээр/"
                      data={this.props.data}
                      titleColor="black"
                    />
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <PieChart
                      name="PieChart1"
                      title="Оньс"
                      titleColor="#ed7d31"
                      data={this.props.data}
                      chartType="paymentTypeOnis"
                    />
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <PieChart
                      name="PieChart"
                      title="Оньс Плас"
                      titleColor="#0e4b68"
                      data={this.props.data}
                      chartType="paymentTypeOnisPlus"
                    />
                  </div>
                  <div className="col-md-12">
                    <LineChart
                      id="LineChart"
                      Format=""
                      data={this.props.data}
                      chartType="paymentIncreaseDecreases"
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
                      <t>Төлбөр төлөлтийн төрөл</t>
                      <span className="float-right">
                        <i className="fa fa-angle-down" />
                      </span>
                    </div>
                  }
                  expanded={true}
                >
                  <div className="row">
                    <div className="col-md-6 col-lg-6 d-inline-block">
                      <PieChartPie
                        name="PaymentTypeOnis"
                        title="Оньс"
                        titleColor="black"
                        data={this.props.data}
                        chartType="pieChartOnis"
                      />
                    </div>
                    <div className="col-md-6 col-lg-6 d-inline-block">
                      <PieChartPie
                        name="PaymentTypeOnisPlus"
                        title="Оньс Плас"
                        titleColor="black"
                        data={this.props.data}
                        chartType="pieChartOnisPlus"
                      />
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
  return { data: state.paymentDashboard.data };
}

export default connect(
  mapStateToProps,
  { getPaymentDashBoardData }
)(paymentDashboard);
