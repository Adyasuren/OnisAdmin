import React, { Component } from "react";
import CanvasJS from "./canvasjs";

class ColumnChart extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data != null) {
      let onisTmp = [];
      let onisPlusTmp = [];
      for (let i = 0; i < nextProps.data.thisAndLastYear.length; i++) {
        if (nextProps.data.thisAndLastYear[i].userType === 1) {
          onisTmp.push({
            label: nextProps.data.thisAndLastYear[i].years,
            y: nextProps.data.thisAndLastYear[i].cnt,
            color: "#ed7d31"
          });
        } else if (nextProps.data.thisAndLastYear[i].userType === 2) {
          onisPlusTmp.push({
            label: nextProps.data.thisAndLastYear[i].years,
            y: nextProps.data.thisAndLastYear[i].cnt,
            color: "#5b9bd5"
          });
        } else {
        }
      }
      this.renderData(onisTmp, onisPlusTmp);
    }
  }

  componentDidMount() {}
  renderData = (onisTmp, onisPlusTmp) => {
    var chart = new CanvasJS.Chart("ColumnChart", {
      animationEnabled: true,
      title: {
        text: this.props.title,
        fontColor: this.props.titleColor,
        fontSize: 15,
        fontFamily: "arial",
        horizontalAlign: "center"
      },
      axisY: {
        lineColor: "grey",
        labelFontColor: "#ed7d31",
        tickColor: "#4F81BC"
      },
      axisX: {
        interval: 1
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer"
      },
      data: [
        {
          type: "column",
          name: "Оньс",
          legendText: "Оньс",
          color: "#ed7d31",
          indexLabel: "{y}",
          showInLegend: true,
          dataPoints: onisTmp
        },
        {
          type: "column",
          name: "Оньс Плас",
          legendText: "Оньс Плас",
          color: "#0e4b68",
          indexLabel: "{y}",
          showInLegend: true,
          dataPoints: onisPlusTmp
        }
      ]
    });
    chart.render();
  };
  render() {
    return (
      <div>
        <div id="ColumnChart" />
      </div>
    );
  }
}

export default ColumnChart;
