import React, { Component } from "react";

class License extends Component {
  render() {
    return (
      <div className="col-md-12 table-responsive">
        <table className="table-bordered license col-md-12">
          <tr className="table-title-tr">
            <td />
            <td>Хэрэглэгчийн тоо</td>
            <td>Хэрэглэгчийн тоогоор эзлэх %</td>
            <td>Лиценз сунгалтын дүн</td>
          </tr>
          <tr>
            <td>Шинэ хэрэглэгч</td>
            <td className="Orange">{this.props.newusers}</td>
            <td className="Orange">38%</td>
            <td className="Orange">75%</td>
          </tr>
          <tr>
            <td>Хуучин хэрэглэгч</td>
            <td className="Orange">186</td>
            <td className="Orange">62%</td>
            <td className="Orange">25%</td>
          </tr>
          <tr className="table-title-tr">
            <td>Бүгд</td>
            <td>301</td>
            <td />
            <td />
          </tr>
        </table>
      </div>
    );
  }
}

export default License;
