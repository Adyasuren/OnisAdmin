import React, { Component } from "react";
import { Accordion, AccordionItem } from "react-sanfona";
import Number from "../customerDashboard/customerNumber";
import { connect } from "react-redux";

//tabs
// import RTabs from '../../components/RTabs';
// import PieChart from '../Charts/PieChart';
import LineChart from "../Charts/LineChart";
//action
import { getTodayStatus } from "../../actions/todayStatus_action";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { isHourShow: true, isDayShow: false };
    this.onClickTabItem = this.onClickTabItem.bind(this);
  }
  myFunction() {
    if (this.state.isHourShow === false) {
      this.setState({ isHourShow: true }, function() {
        console.log(this.state);
      });
    } else {
      this.setState({ isHourShow: false }, function() {
        console.log(this.state);
      });
    }
  }
  myFunctionForDay() {
    if (this.state.isHourShow === true) {
    }
  }
  componentWillMount() {
    this.props.getTodayStatus();
  }

  onClickTabItem = () => {
    if (this.state.tabIndex === 0) {
      return (
        <div className="col-md-12">
          {" "}
          <LineChart
            name="chart1"
            id="LineChart"
            Format=""
            chartType="dayChart"
            data={this.props.data}
          />{" "}
        </div>
      );
    } else if (this.state.tabIndex === 1) {
      return (
        <div className="col-md-12">
          {" "}
          <LineChart
            name="chart1"
            id="LineChart1"
            Format=""
            chartType="dayChart"
            data={this.props.data}
          />{" "}
        </div>
      );
    }
  };
  render() {
    return (
      <div className="animated fadeIn">
        <div className="container">
          <div className="card">
            <Accordion>
              {[1].map(item => {
                return (
                  <AccordionItem
                    key={item}
                    title={
                      <div className="card-header dash-board-header">
                        <span className="float-right">
                          {" "}
                          <i className="fa fa-angle-down" />{" "}
                        </span>
                        <t>Өнөөдөрийн статистик</t>
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
                        data="Өнөөдөр бүртгүүлсэн шинэ хэрэглэгчийн тоо"
                        onis={this.props.data.singUpUsersOnis}
                        onisPlus={this.props.data.singUpUsersOnisPlus}
                      />
                      <Number
                        data="Өнөөдөр системд хандсан хэрэглэгчийн тоо"
                        onis={this.props.data.systemUsedUsersOnis}
                        onisPlus={this.props.data.systemUsedUsersOnisPlus}
                      />
                      <Number
                        data="Өнөөдөр мессеж илгээсэн хэрэглэгчийн тоо"
                        onis={this.props.data.messageSentUserOnis}
                        onisPlus={this.props.data.messageSentUserOnisPlus}
                      />
                      <Number
                        data="Өнөөдөр лиценз сунгасан хэрэглэгчийн тоо"
                        onis={this.props.data.buyLicenseTodayOnis}
                        onisPlus={this.props.data.buyLicenseTodayOnisPlus}
                      />
                      <Number
                        data="Өнөөдөр санал хүсэлт илгээсэн хэрэглэгчийн тоо"
                        onis={this.props.data.feedBackTodayOnis}
                        onisPlus={this.props.data.feedBackTodayOnisPlus}
                      />
                      <Number
                        data="Өнөөдөр системээр хийгдсэн гүйлгээний тоо"
                        onis={this.props.data.transactionTodayOnis}
                        onisPlus={this.props.data.transactionTodayOnisPlus}
                      />
                      <Number
                        data="Өнөөдөр илгээсэн мессежний тоо"
                        onis={this.props.data.messageCountOnis}
                        failedOnis={this.props.data.failedMessageCountOnis}
                        onisPlus={this.props.data.messageCountOnisPlus}
                        failedOnisPlus={
                          this.props.data.failedMessageCountOnisPlus
                        }
                      />
                      <Number
                        data="Өнөөдөр лицензын хугацаа дууссан хэрэглэгчийн тоо"
                        onis={this.props.data.licenseExpiredOnis}
                        onisPlus={this.props.data.licenseExpiredOnisPlus}
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
                        <span className="float-right">
                          {" "}
                          <i className="fa fa-angle-down" />{" "}
                        </span>
                        <t>Систем ашиглалт /цагаар/</t>
                      </div>
                    }
                    expanded={true}
                  >
                    {/* <RTabs menuTitle1="Идэвхтэй ашигладаг цаг" menuTitle2="Идэвхитэй ашигладаг өдөр" data={this.props.data}/> */}

                    {/* <button type="button" onClick={()=>this.myFunction()}>Цагаар харах</button>
                    <button type="button" onClick={()=>this.myFunctionForDay()}>Өдрөөр харах</button> */}
                    {this.state.isHourShow ? (
                      <div>
                        <LineChart
                          name="chart1"
                          id="LineChart"
                          Format=""
                          chartType="hourChart"
                          data={this.props.data}
                        />
                        {/* <div className="col-md-6 d-inline-block float-left"><PieChart name="PieChart1" title="Хэрэглэгчийн бүтэц" legend={false} legend1="Оньс" legend2="Оньс Плас" titleColor="black" chartType="userStructure" data={this.props.data}/> </div>
                          <div className="col-md-6 d-inline-block float-right"><PieChart name="PieChart0" title="" legend={true} legend1="Оньс" legend2="Оньс Плас" titleColor="black" chartType="userStructure" data={this.props.data}/></div> */}
                      </div>
                    ) : (
                      <div>
                        <LineChart
                          name="chart1"
                          id="LineChart1"
                          Format=""
                          chartType="dayChart"
                          data={this.props.data}
                        />
                      </div>
                    )}
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
                        <span className="float-right">
                          {" "}
                          <i className="fa fa-angle-down" />{" "}
                        </span>
                        <t>Систем ашиглалт /өдрөөр/</t>
                      </div>
                    }
                    expanded={true}
                  >
                    <div>
                      <LineChart
                        name="chart1"
                        id="LineChart1"
                        Format=""
                        chartType="dayChart"
                        data={this.props.data}
                      />
                    </div>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.dashboard.rows
  };
}

export default connect(
  mapStateToProps,
  { getTodayStatus }
)(Dashboard);
