import React, {Component} from "react";
import {connect} from "react-redux";
import CustomTable from "../component/CustomTable/CustomTable";
import SearchBar from "../component/SearchBar/SearchBar";
import TablePagination from "../component/TablePagination/TablePagination";
import PropTypes from "prop-types";
import {searchPayment, deleteSinglePayment, getAllPaymentData} from "../reducers/actionCreator";

import CustomModal from "../component/CustomModal/CustomModal";
import EditPayment from "./EditPayment/EditPayment";
import CreatePayment from "./CreateNewPayment/CreateNewPayment";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2
  },
  input: {
    display: "none"
  },
  container: {
    display: "flex"
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPayment: [],
      searchInput: "",
      paymentStatusArray: ["None", "Initiated", "Failed", "Dropped", "Success", "Refunded"],
      paymentStatus: "",
      arr: [],
      currentPayments: [],
      rowsPerPage: [5, 10, 15],
      numberOfRows: 5,
      total: undefined,
      type: "",
      page: 1,
      show: false,
      studentId: null,
      open: false,
      sort: {
        column: null,
        direction: "desc"
      }

    };
  }


  getRows = tableState => new Promise((resolve, reject) => {
    setTimeout(() => {
      const updatedState = Object.assign({}, tableState);
      const searchRange = this.props.payments.slice(updatedState.numberOfRows * updatedState.page - updatedState.numberOfRows, updatedState.numberOfRows * updatedState.page);
      updatedState.arr = searchRange;
      updatedState.total = this.state.arr.length;
      updatedState.numberOfRows = updatedState.numberOfRows;
      resolve(updatedState);
    }, 50);
  });

  getPaginationData = () => {
    this.setState({arr: this.props.payments});
    this.getRows(this.state).then(updatedState => {
      this.setState({
        arr: updatedState.arr,
        rowsPerPage: updatedState.rowsPerPage,
        numberOfRows: updatedState.numberOfRows,
        page: updatedState.page,
        total: updatedState.total
      });
    });
  }
  componentDidMount = () => {
    // this.props.getAllPaymentData();
    this.getPaginationData();
  }

  componentWillReceiveProps = () => {
    this.getPaginationData();
  }

  changeSearchInput = name => event => {
    this.setState({[name]: event.target.value});
    if (event.target.value !== "") {
      const selectedPaymentData = this.props.payments.filter(item => Object.keys(item).some(key => item[key].toString().search(this.state.searchInput) !== -1)); //   return state;
      this.setState({arr: selectedPaymentData});
    } else {
      this.setState({arr: this.props.payments});
    }
  };

  onSort = column => {
    const direction = this.state.sort.column ? (this.state.sort.direction === "asc" ? "desc" : "asc") : "desc";
    const sortedData = this.state.arr.sort((a, b) => {
      if (column === "customerEmail" || column === "paymentStatus" || column === "orderDate") {
        const nameA = a[column].toUpperCase(); // ignore upper and lowercase
        const nameB = b[column].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
      return a[column] - b[column];
    });


    if (direction === "desc") {
      sortedData.reverse();
    }

    this.setState({
      arr: sortedData,
      sort: {
        column,
        direction
      }
    });
  }

  onPageChanged = paymentData => {
    const {payments} = this.props;
    const {currentPage, totalPages, pageLimit} = paymentData;
    const offset = (currentPage - 1) * pageLimit;
    const currentPayments = payments.slice(offset, offset + pageLimit);
    this.setState({currentPage, currentPayments, totalPages});
  }

  updateRows = state => {
    this.getRows(state).then(updatedState => {
      this.setState({
        arr: updatedState.arr,
        rowsPerPage: updatedState.rowsPerPage,
        numberOfRows: updatedState.numberOfRows,
        page: updatedState.page
      });
    });
  }

  editPaymentDetails = payment => {
    this.setState({show: true, payment: payment, type: "edit"});
  };

  addPaymentDetails = () => {
    this.setState({show: true, type: "add"});
  };
  deletePaymentDetails = id => {
    if (this.state.selectedPayment.length > 0) {
      const paymentLen = this.state.selectedPayment.length;
      this.state.selectedPayment.map((paymentId, i) => {
        this.props.deleteSinglePayment(paymentId).then(() => {
          if (paymentLen === i + 1) {
            this.setState({arr: this.props.payments, selectedPayment: []});
          }
        });
      });
    } else {
      this.props.deleteSinglePayment(id).then(() => {
        this.setState({arr: this.props.payments});
      });
    }
  }
  hideModal = () => {
    this.setState({show: false});
  }

  onFilter = (event, data) => {
    const filterString = event.target.value;
    this.setState({paymentStatus: filterString});
    if (event.target.value !== "None") {
      const newData = data.filter(value => value.paymentStatus === filterString);
      this.setState({arr: newData});
    } else {
      this.getPaginationData();
    }
  }

  handleCheckBoxChange = (e, item) => {
    if (e.target.checked) {
      // append to array
      this.setState({
        selectedPayment: this.state.selectedPayment.concat([item])
      });
    } else {
      // remove from array
      this.setState({
        selectedPayment: this.state.selectedPayment.filter(val => val !== item)
      });
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <div className={classes.container}>
          <SearchBar
            searchInput={this.state.searchInput}
            handleInputChange={this.changeSearchInput("searchInput")}
          />
          <Button variant="contained" color="primary" className={classes.button} onClick={this.addPaymentDetails}>
            <AddIcon className={classes.icon} />
        Add New Payment
          </Button>
        </div>
        {/*  custome table component for pegination, fliter, search, sort
            //user can sort the table field by clicking on header title
            // filter by payment status will work accordingly dropdown value - you can clear the filter by selecting None value from dropdown
        */}
        <CustomTable
          payments={this.state.arr}
          onSort={this.onSort}
          edit={this.editPaymentDetails}
          delete={this.deletePaymentDetails}
          status={this.state.paymentStatusArray}
          paymentStatus={this.state.paymentStatus}
          onFilter={this.onFilter}
          isSelected={this.isSelected}
          handleCheckBoxChange={this.handleCheckBoxChange}
          isDelete={this.state.selectedPayment.length ? true : false}
        />
        <TablePagination
          total={this.state.total}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          numberOfRows={this.state.numberOfRows}
          updateRows={this.updateRows}
        />
        {this.state.show ?
          <CustomModal isOpen={this.state.show} onClose={() => this.hideModal()}>
            {this.state.type === "edit" ? <EditPayment
              payment={this.state.payment}
              closeModal={this.hideModal}
            /> : <CreatePayment
              closeModal={this.hideModal}
            />}
          </CustomModal> :
          null
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  payments: state.payments.PaymentData,
  selectedPaymentData: state.payments.selectedPaymentData
});

Main.propTypes = {
  payments: PropTypes.array,
  selectedPaymentData: PropTypes.array,
  searchPayment: PropTypes.func,
  deleteSinglePayment: PropTypes.func,
  getAllPaymentData: PropTypes.func,
  classes: PropTypes.object.isRequired


};

const mapDispatchToProps = dispatch => ({
  searchPayment: searchName => dispatch(searchPayment(searchName)),
  deleteSinglePayment: paymentId => dispatch(deleteSinglePayment(paymentId)),
  getAllPaymentData: () => dispatch(getAllPaymentData())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Main));
