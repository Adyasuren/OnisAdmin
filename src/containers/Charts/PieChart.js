import React, { Component } from "react";
import CanvasJS from "./canvasjs";

class PieChart extends Component {
  componentDidMount() {
    this.renderData(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data != null) {
      if (this.props.chartType === "totalUser") {
        let data = [
          {
            y: nextProps.data.totalUsersOnis,
            label: this.props.legend1,
            color: "#ed7d31",
            legendText: this.props.legend1
          },
          {
            y: nextProps.data.totalUsersOnisPlus,
            label: this.props.legend2,
            color: "#5b9bd5",
            legendText: this.props.legend2
          }
        ];
        this.renderData(data);
      } else if (this.props.chartType === "userCountOnis") {
        let data = [];
        for (let i = 0; i < nextProps.data.oneOrManyStores.length; i++) {
          if (nextProps.data.oneOrManyStores[i].type === "one") {
            data.push({
              y: nextProps.data.oneOrManyStores[i].onis,
              label: "Нэг хэрэглэгчтэй",
              color: "#ffc000",
              legendText: "Нэг хэрэглэгчтэй"
            });
          } else if (nextProps.data.oneOrManyStores[i].type === "many") {
            data.push({
              y: nextProps.data.oneOrManyStores[i].onis,
              label: "Олон хэрэглэгчтэй",
              color: "#548235",
              legendText: "Олон хэрэглэгчтэй"
            });
          } else {
            console.log("error");
          }
        }
        this.renderData(data);
      } else if (this.props.chartType === "userCountOnisPlus") {
        let data = [];
        for (let i = 0; i < nextProps.data.oneOrManyStores.length; i++) {
          if (nextProps.data.oneOrManyStores[i].type === "one") {
            data.push({
              y: nextProps.data.oneOrManyStores[i].onisplus,
              label: "Нэг хэрэглэгчтэй",
              color: "#ffc000",
              legendText: "Нэг хэрэглэгчтэй"
            });
          } else if (nextProps.data.oneOrManyStores[i].type === "many") {
            data.push({
              y: nextProps.data.oneOrManyStores[i].onisplus,
              label: "Олон хэрэглэгчтэй",
              color: "#548235",
              legendText: "Олон хэрэглэгчтэй"
            });
          } else {
            console.log("error");
          }
        }
        this.renderData(data);
      } else if (this.props.chartType === "paymentTypeOnis") {
        let data = [];
        for (let i = 0; i < nextProps.data.buyLicenseAmounts.length; i++) {
          if (nextProps.data.buyLicenseAmounts[i].typeid === 0) {
            data.push({
              y: nextProps.data.buyLicenseAmounts[i].onis,
              label: nextProps.data.buyLicenseAmounts[i].description,
              color: "#ffc000"
            });
          } else if (nextProps.data.buyLicenseAmounts[i].typeid === 1) {
            data.push({
              y: nextProps.data.buyLicenseAmounts[i].onis,
              label: nextProps.data.buyLicenseAmounts[i].description,
              color: "#0070c0"
            });
          } else if (nextProps.data.buyLicenseAmounts[i].typeid === 2) {
            data.push({
              y: nextProps.data.buyLicenseAmounts[i].onis,
              label: nextProps.data.buyLicenseAmounts[i].description,
              color: "#548235"
            });
          } else if (nextProps.data.buyLicenseAmounts[i].typeid === 3) {
            data.push({
              y: nextProps.data.buyLicenseAmounts[i].onis,
              label: nextProps.data.buyLicenseAmounts[i].description,
              color: "#548235"
            });
          } else {
            data.push({
              y: nextProps.data.buyLicenseAmounts[i].onis,
              label: nextProps.data.buyLicenseAmounts[i].description,
              color: "#ed7d31"
            });
          }
        }
        this.renderData(data);
      } else if (this.props.chartType === "paymentTypeOnisPlus") {
        let data = [];
        for (let i = 0; i < nextProps.data.buyLicenseAmounts.length; i++) {
          if (nextProps.data.buyLicenseAmounts[i].typeid === 0) {
            data.push({
              y: nextProps.data.buyLicenseAmounts[i].onisplus,
              label: nextProps.data.buyLicenseAmounts[i].description,
              color: "#ffc000"
            });
          } else if (nextProps.data.buyLicenseAmounts[i].typeid === 1) {
            data.push({
              y: nextProps.data.buyLicenseAmounts[i].onisplus,
              label: nextProps.data.buyLicenseAmounts[i].description,
              color: "#0070c0"
            });
          } else if (nextProps.data.buyLicenseAmounts[i].typeid === 2) {
            data.push({
              y: nextProps.data.buyLicenseAmounts[i].onisplus,
              label: nextProps.data.buyLicenseAmounts[i].description,
              color: "#548235"
            });
          } else if (nextProps.data.buyLicenseAmounts[i].typeid === 3) {
            data.push({
              y: nextProps.data.buyLicenseAmounts[i].onisplus,
              label: nextProps.data.buyLicenseAmounts[i].description,
              color: "#ed7d31"
            });
          } else if (nextProps.data.buyLicenseAmounts[i].typeid === 4) {
            data.push({
              y: nextProps.data.buyLicenseAmounts[i].onisplus,
              label: nextProps.data.buyLicenseAmounts[i].description,
              color: "#ed7d31"
            });
          }
        }
        this.renderData(data);
      } else if (this.props.chartType === "userStructure") {
        let data = [
          {
            y: nextProps.data.totalUsersOnis,
            label: this.props.legend1,
            color: "#5b9bd5",
            legendText: this.props.legend1
          },
          {
            y: nextProps.data.totalUsersOnisPlus,
            label: this.props.legend2,
            color: "#ed7d31",
            legendText: this.props.legend2
          }
        ];
        this.renderData(data);
      } else {
        let data = [
          {
            y: 0,
            label: this.props.legend1,
            color: "#5b9bd5",
            legendText: this.props.legend1
          },
          {
            y: 0,
            label: this.props.legend2,
            color: "#ed7d31",
            legendText: this.props.legend2
          }
        ];
        this.renderData(data);
      }
    }
  }

  renderData = data => {
    var chart = new CanvasJS.Chart(this.props.name, {
      animationEnabled: true,
      title: {
        text: this.props.title,
        fontSize: "15",
        fontColor: this.props.titleColor,
        fontFamily: "arial"
      },
      data: [
        {
          type: "doughnut",
          indexLabelFontSize: 13,
          indexLabelFontStyle: "italic",
          indexLabel: "{label}: {y} (#percent%)",
          showInLegend: this.props.legend,
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

export default PieChart;
