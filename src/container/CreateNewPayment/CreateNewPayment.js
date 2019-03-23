import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {reduxForm, Field} from "redux-form";
import validate from "../../component/validate";
import MenuItem from "@material-ui/core/MenuItem";
import {connect} from "react-redux";

// import Select from "@material-ui/core/Select";
import {TextField, Select} from "redux-form-material-ui";
import {postCreatePayment} from "../../reducers/actionCreator";

const styles = theme => ({
  root: {
    width: "50%",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  backButton: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  next: {
    marginTop: theme.spacing.unit * 3
  }
});


class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      paymentId: 0,
      paymentStatusArray: ["Initiated", "Failed", "Dropped", "Success", "Refunded"]

    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const date = new Date();

    const values = {
      paymentId: parseInt(event.target.paymentId.value),
      paymentStatus: event.target.paymentStatus.value,
      merchantId: parseInt(event.target.merchantId.value),
      customerEmail: event.target.customerEmail.value,
      amount: event.target.amount.value,
      orderDate: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    };
    this.props.dispatch(postCreatePayment(values, this.successCreateStudent));
    this.props.closeModal();
  }

      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1
        }));
      };

      handleReset = () => {
        this.setState({
          activeStep: 0
        });
      };

      redirect = () => {
        this.props.history.push("/student-list");
      };

      render() {
        const {classes, handleFormSubmit} = this.props;

        return (
          <div className={classes.root}>
            <div className={classes.paper} >

              <form onSubmit={(e, values) => this.handleFormSubmit(e, values)}
              >

                <Field
                  name="paymentId"
                  component={TextField}
                  label="Payment Id"
                  floatingLabelText="Payment Id*"
                />
                <Field
                  name="merchantId"
                  component={TextField}
                  label="Marchant Id"
                  floatingLabelText="Merchant Id*"
                  fullWidth
                />
                <Field
                  name="customerEmail"
                  component={TextField}
                  label="Customer Email"
                  floatingLabelText="Customer Email*"
                  fullWidth
                />
                <Field
                  name="amount"
                  component={TextField}
                  label="Amount"
                  floatingLabelText="Amount*"
                  fullWidth
                />
                <Field
                  name="paymentStatus"
                  component={Select}
                  placeholder="select Status"
                  fullWidth
                >
                  {this.state.paymentStatusArray.map((e, keyIndex) => (<MenuItem key={keyIndex} value={e}>{e}</MenuItem>))}
                </Field>
                <Button variant="contained" color="primary" type="submit" className={classes.next}>
                      Submmit
                </Button>
              </form>
              <div />
            </div>
          </div>
        );
      }
}

CreateUser.propTypes = {
  classes: PropTypes.object,
  handleFormSubmit: PropTypes.func,
  dispatch: PropTypes.func,
  history: PropTypes.any,
  values: PropTypes.object,
  fields: PropTypes.object,
  closeModal: PropTypes
};

CreateUser = reduxForm({
  form: "CreateUserForm",
  validate,
  fields: ["paymentId",
    "orderDate",
    "paymentStatus",
    "merchantId",
    "customerEmail",
    "amount"]

})(CreateUser);

const mapStateToProps = state => ({
  payments: state.payments.PaymentData,
  selectedPaymentData: state.payments.selectedPaymentData,
  values: state.form
});

export default connect(mapStateToProps, null)(withStyles(styles)(CreateUser));
