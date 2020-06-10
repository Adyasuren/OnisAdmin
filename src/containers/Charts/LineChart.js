import React, { Component } from "react";
import CanvasJS from "./canvasjs";

var onisData = [];
var onisPlusData = [];

class LineChart extends Component {
  componentDidMount() {
    this.renderData(onisData, onisPlusData);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data != null) {
      if (this.props.chartType === "hourChart") {
        if (nextProps.data.systemUsageDashboards.length > 0) {
          let onisDataHour = [];
          let onisPlusDataHour = [];
          for (
            let i = 0;
            i < nextProps.data.systemUsageDashboards.length;
            i++
          ) {
            onisDataHour.push({
              x: nextProps.data.systemUsageDashboards[i].syshour,
              y: nextProps.data.systemUsageDashboards[i].onis
            });
            onisPlusDataHour.push({
              x: nextProps.data.systemUsageDashboards[i].syshour,
              y: nextProps.data.systemUsageDashboards[i].onisplus
            });
          }
          let xValueFormatString = "## цаг";
          this.renderData(onisDataHour, onisPlusDataHour, xValueFormatString);
        }
      } else if (this.props.chartType === "dayChart") {
        if (nextProps.data.systemUsageByDayDashboard.length > 0) {
          let onisDataDay = [];
          let onisPlusDataDay = [];
          for (
            let i = 0;
            i < nextProps.data.systemUsageByDayDashboard.length;
            i++
          ) {
            onisDataDay.push({
              x: nextProps.data.systemUsageByDayDashboard[i].sysday,
              y: nextProps.data.systemUsageByDayDashboard[i].onis
            });
            onisPlusDataDay.push({
              x: nextProps.data.systemUsageByDayDashboard[i].sysday,
              y: nextProps.data.systemUsageByDayDashboard[i].onisplus
            });
          }
          let xValueFormatString = "##-ны өдөр";
          this.renderData(onisDataDay, onisPlusDataDay, xValueFormatString);
        }
      } else if (this.props.chartType === "paymentIncreaseDecreases") {
        if (nextProps.data.paymentIncreaseDecreases.length > 0) {
          let onisDataDay = [];
          let onisPlusDataDay = [];
          for (
            let i = 0;
            i < nextProps.data.paymentIncreaseDecreases.length;
            i++
          ) {
            onisDataDay.push({
              x: new Date(nextProps.data.paymentIncreaseDecreases[i].name),
              y: nextProps.data.paymentIncreaseDecreases[i].onis
            });
            onisPlusDataDay.push({
              x: new Date(nextProps.data.paymentIncreaseDecreases[i].name),
              y: nextProps.data.paymentIncreaseDecreases[i].onisplus
            });
          }
          this.renderData(onisDataDay, onisPlusDataDay);
        }
      } else {
        this.renderData(onisData, onisPlusData);
      }
    }
  }
  renderData = (onisData, onisPlusData, xValueFormatString) => {
    var chart = new CanvasJS.Chart(this.props.id, {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: ""
      },
      axisX: {
        valueFormatString: this.props.Format,
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        },
        interval: 1,
        intervalType: "month"
      },
      toolTip: {
        shared: true
      },
      legend: {
        verticalAlign: "top",
        cursor: "pointer",
        dockInsidePlotArea: true,
        fontFamily: "Tahoma",
        fontSize: 14
      },
      data: [
        {
          type: "line",
          showInLegend: true,
          name: "Оньс",
          markerType: "square",
          xValueFormatString: xValueFormatString,
          color: "#f7a115",
          dataPoints: onisData
        },
        {
          type: "line",
          showInLegend: true,
          name: "Оньс Плас",
          color: "#5b9bd5",
          lineDashType: "dash",
          dataPoints: onisPlusData
        }
      ]
    });
    chart.render();
  };
  render() {
    return (
      <div>
        <div id={this.props.id}> </div>
      </div>
    );
  }
}

export default LineChart;
