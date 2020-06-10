import React, { Component } from "react";
import CanvasJS from "./canvasjs";

class BarChart extends Component {
  componentDidMount() {
    this.renderData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data != null) {
      var datasetOnis = [];
      var datasetOnisPlus = [];
      for (var i = 0; i < nextProps.data.storeCountByUser.length; i++) {
        if (nextProps.data.storeCountByUser[i].description === "Оньс") {
          datasetOnis.push({
            y: nextProps.data.storeCountByUser[i].cnt,
            label: nextProps.data.storeCountByUser[i].name
          });
        } else {
          datasetOnisPlus.push({
            y: nextProps.data.storeCountByUser[i].cnt,
            label: nextProps.data.storeCountByUser[i].name
          });
        }
      }
      this.renderData(datasetOnis, datasetOnisPlus);
    }
  }

  renderData = (datasetOnis, datasetOnisPlus) => {
    var chart = new CanvasJS.Chart("BarChart", {
      animationEnabled: true,
      title: {
        text: this.props.title,
        fontColor: this.props.titleColor,
        fontSize: 15,
        fontFamily: "arial",
        horizontalAlign: "center"
      },
      legend: {
        cursor: "pointer"
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "bar",
          showInLegend: true,
          name: "Оньс",
          indexLabel: "{y}",
          color: "#F08B33",
          dataPoints: datasetOnis
        },
        {
          type: "bar",
          showInLegend: true,
          name: "Оньс Плас",
          indexLabel: "{y}",
          color: "#5b9bd5",
          dataPoints: datasetOnisPlus
        }
      ]
    });
    chart.render();
  };

  render() {
    return (
      <div>
        <div id="BarChart" />
      </div>
    );
  }
}

export default BarChart;
