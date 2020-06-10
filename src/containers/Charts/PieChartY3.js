import React, { Component } from "react";
import CanvasJS from "./canvasjs";

class PieChart extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.title);
  }

  componentDidMount() {
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
          type: "doughnut",
          //startAngle: 60,
          //innerRadius: 60,
          indexLabelFontSize: 12,
          indexLabel: "#percent%",
          toolTipContent: "<b>{label}:</b> {y} (#percent%)",
          dataPoints: [
            { y: 93, label: "Скайтел", color: "#0070c0" },
            { y: 7, label: "Бэлнээр", color: "#ffc000" },
            { y: 100, label: "Хаан", color: "#548235" }
          ]
        }
      ]
    });
    chart.render();
  }
  render() {
    return (
      <div>
        <div id={this.props.name} />
      </div>
    );
  }
}

export default PieChart;
