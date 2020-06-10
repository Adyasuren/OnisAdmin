import React, { Component } from "react";
import CanvasJS from "./canvasjs";

class ColumnChartY3 extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data != null) {
      let onisTmp = [];
      let onisPlusTmp = [];
      console.log(nextProps.data);
      for (let i = 0; i < nextProps.data.buyLicenseAmounts.length; i++) {
        switch (nextProps.data.buyLicenseAmounts[i].typeid) {
          case 0:
            nextProps.data.buyLicenseAmounts[i].description = "Бэлнээр";
            break;
          case 1:
            nextProps.data.buyLicenseAmounts[i].description = "Скайтел";
            break;
          case 2:
            nextProps.data.buyLicenseAmounts[i].description = "Хаан Банк";
            break;
          case 3:
            nextProps.data.buyLicenseAmounts[i].description = "Онлайн";
            break;
          case 4:
            nextProps.data.buyLicenseAmounts[i].description = "ПОС";
            break;
          default:
            console.log(nextProps.data.buyLicenseAmounts[i].typeid);
        }
      }

      for (let i = 0; i < nextProps.data.buyLicenseAmounts.length; i++) {
        onisTmp.push({
          label: nextProps.data.buyLicenseAmounts[i].description,
          y: nextProps.data.buyLicenseAmounts[i].onis,
          color: "#ed7d31"
        });
        onisPlusTmp.push({
          label: nextProps.data.buyLicenseAmounts[i].description,
          y: nextProps.data.buyLicenseAmounts[i].onisplus,
          color: "#5b9bd5"
        });
      }
      this.renderData(onisTmp, onisPlusTmp);
    }
  }

  componentDidMount() {}
  renderData = (onisTmp, onisPlusTmp) => {
    var chart = new CanvasJS.Chart("ColumnChartY3", {
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
        <div id="ColumnChartY3" />
      </div>
    );
  }
}

export default ColumnChartY3;
