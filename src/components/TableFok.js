/* import React, { Component } from "react";
import Handsontable from "handsontable";
import HotTable from "react-handsontable";
import "handsontable-pro/dist/handsontable.full.css";
import PropTypes from "prop-types";

const defaultProps = {
  pagination: false,
  filterRow: false,
  filterAll: false,
  footer: false,
  subTotalField: "",
  fixedColumnsLeft: 0,
  isNestedHeader: true,
  isSort: false,
  round: 1,
  hiddenColumns: [],
  swapLastRow: false,
  totalRowNumber: 1
};

const ROW_HEIGHT = 24;

class HandsonTableFok extends Component {
  constructor(props) {
    super(props);
    this.getColIdByFieldName = this.getColIdByFieldName.bind(this);
    this.afterOnCellMouseDown = this.afterOnCellMouseDown.bind(this);
    this.filterPlugin = this.filterPlugin.bind(this);
    this.cellRenderer = this.cellRenderer.bind(this);
    this.textRenderer = this.textRenderer.bind(this);
    this.numberRenderer = this.numberRenderer.bind(this);
    this.setTitle = this.setTitle.bind(this);

    this.state = {
      nestedHeaders: ["A"],
      columns: [],
      colLabels: [],
      mergeCells: [],
      //mergeCells: this.hotTable.mergeCells.mergedCellInfoCollection,
      data: [[]],
      height: 100,
      hiddenCols: [],
      colWidths: []
    };
  }

  render() {
    return (
      <HotTable
        root={hotRef}
        ref={hotTable => {
          this.hotTable = hotTable;
        }}
        settings={settings}
      />
    );
  }
}

HandsonTableFok.defaultProps = defaultProps;
HandsonTableFok.propTypes = propTypes;

export default HandsonTableFok;
 */
