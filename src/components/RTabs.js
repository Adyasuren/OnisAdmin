import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import PieChart from "../containers/Charts/PieChart";
//charts

import LineChart from "../containers/Charts/LineChart";

class RTabs extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
    this.onClickTabItem = this.onClickTabItem.bind(this);
  }
  onClickTabItem = index => {
    console.log(this.state.tabIndex);
    if (index === 0) {
      return (
        <TabPanel>
          <div className="col-md-12">
            {" "}
            <LineChart
              name="chart1"
              id="LineChart"
              Format=""
              chartType="hourChart"
              data={this.props.data}
            />{" "}
          </div>
          <div className="col-md-6 d-inline-block float-left">
            <PieChart
              name="PieChart1"
              title="Хэрэглэгчийн бүтэц"
              legend={false}
              legend1="Оньс"
              legend2="Оньс Плас"
              titleColor="black"
              chartType="userStructure"
              data={this.props.data}
            />{" "}
          </div>
          <div className="col-md-6 d-inline-block float-right">
            <PieChart
              name="PieChart0"
              title=""
              legend={true}
              legend1="Оньс"
              legend2="Оньс Плас"
              titleColor="black"
              chartType="userStructure"
              data={this.props.data}
            />
          </div>
        </TabPanel>
      );
    } else if (index === 0) {
      return (
        <TabPanel>
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
        </TabPanel>
      );
    }
  };
  render() {
    return (
      <Tabs
        defaultIndex={0}
        onSelect={index => this.setState({ tabIndex: index })}
      >
        <TabList>
          <Tab>{this.props.menuTitle1}</Tab>
          <Tab>{this.props.menuTitle2}</Tab>
        </TabList>
        <TabPanel>
          <div className="col-md-12">
            {" "}
            <LineChart
              name="chart1"
              id="LineChart"
              Format=""
              chartType="hourChart"
              data={this.props.data}
            />{" "}
          </div>
          <div className="col-md-6 d-inline-block float-left">
            <PieChart
              name="PieChart1"
              title="Хэрэглэгчийн бүтэц"
              legend={false}
              legend1="Оньс"
              legend2="Оньс Плас"
              titleColor="black"
              chartType="userStructure"
              data={this.props.data}
            />{" "}
          </div>
          <div className="col-md-6 d-inline-block float-right">
            <PieChart
              name="PieChart0"
              title=""
              legend={true}
              legend1="Оньс"
              legend2="Оньс Плас"
              titleColor="black"
              chartType="userStructure"
              data={this.props.data}
            />
          </div>
        </TabPanel>
        <TabPanel>
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
        </TabPanel>
        {this.onClickTabItem(this.state.tabIndex)}
      </Tabs>
    );
  }
}

export default RTabs;
