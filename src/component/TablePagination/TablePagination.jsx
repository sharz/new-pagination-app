import React from "react";
import PropTypes from "prop-types";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import IconButton from "@material-ui/core/IconButton";

const styles = {
  paginationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: ".5em",
    fontSize: ".75em"
  },
  paginationSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paginationText: {
    margin: "0 1.25em"
  },
  paginationSelect: {
    width: 75,
    fontSize: "1em"
  },
  navigationLeft: {
    marginRight: ".5em",
    cursor: "pointer"
  },
  navigationLeftFirstPage: {
    marginRight: ".5em",
    color: "rgba(0,0,0,0.26)"
  },
  navigationRight: {
    margin: "0 .5em",
    cursor: "pointer"
  },
  navigationRightLastPage: {
    margin: "0 .5em",
    color: "rgba(0,0,0,0.26)"
  }
};

class Pagination extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.selectRowsPerPage = this.selectRowsPerPage.bind(this);
    this.selectPageNumber = this.selectPageNumber.bind(this);

    this.renderRowsPerPage = this.renderRowsPerPage.bind(this);
    this.renderRowRange = this.renderRowRange.bind(this);

    this.numberOfPages = this.numberOfPages.bind(this);

    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }


  selectRowsPerPage(e) {
    const updatedState = Object.assign({}, this.props);
    updatedState.numberOfRows = parseInt(e.target.value, 10);
    if (updatedState.numberOfRows * this.props.page > this.props.total) {
      const updatedPage = Math.ceil(this.props.total / updatedState.numberOfRows, 10);
      updatedState.page = updatedPage;
      this.props.updateRows(updatedState);
    } else {
      this.props.updateRows(updatedState);
    }
  }

  selectPageNumber(e) {
    const updatedState = Object.assign({}, this.props);
    updatedState.page = parseInt(e.target.value, 10);
    this.props.updateRows(updatedState);
  }

  numberOfPages() {
    const numArray = [];
    for (let i = 0; i < Math.ceil(this.props.total / this.props.numberOfRows); i++) {
      numArray.push(i + 1);
    }
    return numArray.map((pageValue, index) => (
      <MenuItem key={index} value={pageValue}>
        {pageValue}
      </MenuItem>
    ));
  }

  incrementPage() {
    const updatedState = Object.assign({}, this.props);
    updatedState.page++;
    this.props.updateRows(updatedState);
  }

  firstPage() {
    const updatedState = Object.assign({}, this.props);
    updatedState.page = parseInt(1, 10);
    this.props.updateRows(updatedState);
  }

  lastPage() {
    const updatedState = Object.assign({}, this.props);
    updatedState.page = parseInt(3, 10);
    this.props.updateRows(updatedState);
  }

  decrementPage() {
    const updatedState = Object.assign({}, this.props);
    updatedState.page--;
    this.props.updateRows(updatedState);
  }

  renderRowsPerPage() {
    return this.props.rowsPerPage.map((rowValue, index) => (
      <MenuItem key={index} value={rowValue}>
        {rowValue}
      </MenuItem>
    ));
  }

  renderRowRange() {
    return (
      <span>
        {this.props.numberOfRows * this.props.page - this.props.numberOfRows + 1} - {this.props.numberOfRows * this.props.page < this.props.total ? this.props.numberOfRows * this.props.page : this.props.total}
      </span>
    );
  }

  render() {
    const {pageTitle, rowsPerPageTitle, prepositionForRowRange} = this.props;

    return (
      <div style={styles.paginationContainer}>

        <div style={styles.paginationSection}>
          <div style={styles.paginationText}>
            {pageTitle}
          </div>
          <Select
            style={styles.paginationSelect}
            value={this.props.page}
            onChange={this.selectPageNumber}
          >
            {this.props.total === 1 ? null : this.numberOfPages()}
          </Select>
        </div>

        <div style={styles.paginationSection}>
          <div style={styles.paginationText}>
            {rowsPerPageTitle}
          </div>
          <Select
            style={styles.paginationSelect}
            value={this.props.numberOfRows}
            onChange={this.selectRowsPerPage}
          >
            {this.renderRowsPerPage()}
          </Select>
        </div>

        <div style={styles.paginationSection}>
          <div style={styles.paginationText}>
            {this.renderRowRange()} {prepositionForRowRange} {this.props.total}
          </div>
        </div>

        <div style={styles.paginationSection}>
          <IconButton
            name={"navigationFirst"}
            // disabled={this.props.page >= this.props.total / this.props.numberOfRows}
            onClick={this.firstPage}>
            first
          </IconButton>
          <IconButton
            iconStyle={this.props.page <= 1 ? styles.navigationLeftFirstPage : styles.navigationLeft}
            name={"navigationLeft"}
            disabled={this.props.page <= 1}
            onClick={this.decrementPage}>
            <i className="material-icons">
                chevron_left
            </i>
          </IconButton>
          <IconButton
            iconStyle={this.props.page >= this.props.total / this.props.numberOfRows ? styles.navigationRightLastPage : styles.navigationRight}
            name={"navigationRight"}
            disabled={this.props.page >= this.props.total / this.props.numberOfRows}
            onClick={this.incrementPage}>
            <i className="material-icons">
                chevron_right
            </i>
          </IconButton>
          <IconButton
            iconStyle={this.props.page >= this.props.total / this.props.numberOfRows ? styles.navigationRightLastPage : styles.navigationRight}
            name={"navigationRight"}
            disabled={this.props.page >= this.props.total / this.props.numberOfRows}
            onClick={this.lastPage}>
            Last
          </IconButton>
        </div>
      </div>
    );
  }
}

Pagination.defaultProps = {
  total: 0,
  page: 1,
  rowsPerPage: [10, 20, 30],
  numberOfRows: 10,
  pageTitle: "Page:",
  rowsPerPageTitle: "Rows Per Page:",
  prepositionForRowRange: "of"
};

Pagination.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  numberOfRows: PropTypes.number,
  rowsPerPage: PropTypes.array,
  updateRows: PropTypes.func,
  pageTitle: PropTypes.string,
  rowsPerPageTitle: PropTypes.string,
  prepositionForRowRange: PropTypes.string
};

export default Pagination;

