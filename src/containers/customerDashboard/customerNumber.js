import React, { Component } from "react";
class Number extends Component {
  render() {
    return (
      <div className="col-md-3 d-inline-block">
        <div className="my-text d-inline-block">
          <div className="midLine">{this.props.data}</div>
          <div className="onisBox">
            {this.props.onis}
            <t className="failedMessageDiv">
              <a data-toggle="tooltip" title="Яваагүй мессежний тоо">
                {this.props.failedOnis !== undefined
                  ? "(" + this.props.failedOnis + ")"
                  : ""}
              </a>
            </t>
          </div>
          <div className="onisplusBox">
            {this.props.onisPlus}
            <t className="failedMessageDiv">
              <a data-toggle="tooltip" title="Яваагүй мессежний тоо">
                {this.props.failedOnisPlus !== undefined
                  ? "(" + this.props.failedOnisPlus + ")"
                  : ""}
              </a>
            </t>
          </div>
        </div>
      </div>
    );
  }
}

export default Number;
