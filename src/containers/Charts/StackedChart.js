import React, { Component } from "react";
import CanvasJS from "./canvasjs";

class StackedChart extends Component {
  componentDidMount() {
    this.renderData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data != null) {
      var dataOnis = [];
      var dataOnisPlus = [];
      for (var i = 0; i < nextProps.data.statusByLocation.length; i++) {
        dataOnis.push({
          label: nextProps.data.statusByLocation[i].distName,
          y: nextProps.data.statusByLocation[i].onis,
          color: "#ed7d31"
        });
        dataOnisPlus.push({
          label: nextProps.data.statusByLocation[i].distName,
          y: nextProps.data.statusByLocation[i].onisPlus,
          color: "#5b9bd5"
        });
      }
      this.renderData(dataOnis, dataOnisPlus);
    }
  }

  renderData = (dataOnis, dataOnisPlus) => {
    var chart = new CanvasJS.Chart("StackedChart", {
      animationEnabled: true,
      axisY: {
        gridColor: "#B6B1A8",
        tickColor: "#B6B1A8"
      },
      axisX: {
        interval: 1,
        labelAngle: -70
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "stackedColumn",
          markerType: "square",
          name: "Оньс",
          legendText: "Оньс",
          color: "#ed7d31",
          indexLabelFontStyle: "italic",
          indexLabel: "{y}",
          showInLegend: true,
          dataPoints: dataOnis
        },
        {
          type: "stackedColumn",
          markerType: "square",
          name: "Оньс Плас",
          legendText: "Оньс Плас",
          color: "#5b9bd5",
          indexLabel: "{y}",
          showInLegend: true,
          dataPoints: dataOnisPlus
        }
      ]
    });
    chart.render();
  };
  render() {
    return (
      <div>
        <div id="StackedChart" />
      </div>
    );
  }
}

export default StackedChart;
