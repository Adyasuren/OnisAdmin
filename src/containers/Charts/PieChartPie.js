import React, { Component } from "react";
import CanvasJS from "./canvasjs";

class PieChartPie extends Component {
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== null) {
      if (this.props.chartType === "pieChartOnis") {
        let data = [];
        for (let i = 0; i < nextProps.data.paymentTypeAmounts.length; i++) {
          if (nextProps.data.paymentTypeAmounts[i].name === "day") {
            data.push({
              y: nextProps.data.paymentTypeAmounts[i].onis,
              label: "Өдөр",
              color: "#0070c0"
            });
          } else if (nextProps.data.paymentTypeAmounts[i].name === "month") {
            data.push({
              y: nextProps.data.paymentTypeAmounts[i].onis,
              label: "Сар",
              color: "#ffc000"
            });
          } else {
            data.push({
              y: nextProps.data.paymentTypeAmounts[i].onis,
              label: "Жил",
              color: "#548235"
            });
          }
        }
        this.renderData(data);
      } else if (this.props.chartType === "pieChartOnisPlus") {
        let data = [];
        for (let i = 0; i < nextProps.data.paymentTypeAmounts.length; i++) {
          if (nextProps.data.paymentTypeAmounts[i].name === "day") {
            data.push({
              y: nextProps.data.paymentTypeAmounts[i].onisplus,
              label: "Өдөр",
              color: "#0070c0"
            });
          } else if (nextProps.data.paymentTypeAmounts[i].name === "month") {
            data.push({
              y: nextProps.data.paymentTypeAmounts[i].onisplus,
              label: "Сар",
              color: "#ffc000"
            });
          } else {
            data.push({
              y: nextProps.data.paymentTypeAmounts[i].onisplus,
              label: "Жил",
              color: "#548235"
            });
          }
        }
        this.renderData(data);
      }
    }
  }

  renderData = data => {
    var chart = new CanvasJS.Chart(this.props.name, {
      animationEnabled: true,
      title: {
        text: this.props.title,
        fontColor: this.props.titleColor,
        fontSize: 15,
        fontFamily: "arial",
        horizontalAlign: "center"
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "pie",
          //startAngle: 60,
          //innerRadius: 60,
          indexLabelFontSize: 12,
          indexLabel: "{label}:{y}(#percent%)",
          indexLabelFontStyle: "italic",
          toolTipContent: "<b>{label}:</b> {y} (#percent%)",
          dataPoints: data
        }
      ]
    });
    chart.render();
  };
  render() {
    return (
      <div>
        <div id={this.props.name} />
      </div>
    );
  }
}

export default PieChartPie;
