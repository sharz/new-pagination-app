import React from "react";
import PropTypes from "prop-types";
import {updatedpaymentData} from "../../reducers/actionCreator";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  accountText: {
    marginTop: theme.spacing.unit * 2,
    textAlign: "center"
  },
  grid: {
    paddingRight: "20px"
  }
});

class EditPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerEmail: "",
      amount: "",
      paymentStatus: "",
      paymentStatusArray: ["Initiated", "Failed", "Dropped", "Success", "Refunded"],
      paymentId: 0,
      orderDate: "",
      merchatId: ""
    };
  }

  componentDidMount = () => {
    this.setState({
      customerEmail: this.props.payment.customerEmail,
      amount: this.props.payment.amount,
      paymentStatus: this.props.payment.paymentStatus,
      paymentId: this.props.payment.paymentId,
      orderDate: this.props.payment.orderDate,
      merchatId: this.props.payment.merchatId
    });
    // this.props.dispatch(updateSinglepayment(this.state.id, this.singlepaymentData));
  }

  singlepaymentData = payment => {
    if (payment) {
      this.setState({
        customerEmail: this.props.payment.customerEmail,
        amount: this.props.payment.amount,
        avatar: payment.data.avatar

      });
    }
  };

  handleEmailChange = e => {
    this.setState({customerEmail: e.target.value});
  };

  handleAmountChange = e => {
    this.setState({amount: e.target.value});
  }


   updatepayment = e => {
     e.preventDefault();
     this.props.updatedpaymentData(this.state).then(() => {
       this.props.closeModal();
     });
   }


   handleStatusChange = event => {
     this.setState({[event.target.name]: event.target.value});
   };

   render() {
     const {classes} = this.props;
     return (
       <React.Fragment>
         <h3>Edit payment Details</h3>
         <form className={classes.form} onSubmit={this.updatepayment}>
           <Grid container>
             <Grid item lg={12} md={12} sm={12} xs={12}>
               <TextField
                 id="standard-name"
                 label="Customer Email Id"
                 color="primary"
                 name="customerEmail"
                 value={this.state.customerEmail}
                 onChange={e => this.handleEmailChange(e)}
                 margin="normal"
                 fullWidth
               />
             </Grid>
           </Grid>
           <Grid container className={classes.grid}>
             <Grid item lg={6} md={6} sm={12} xs={12} style={{paddingRight: "20px"}}>
               <TextField
                 id="standard-name"
                 label="Amount"
                 color="primary"
                 name="amount"
                 type="Number"
                 value={this.state.amount}
                 onChange={e => this.handleAmountChange(e)}
                 margin="normal"
                 fullWidth
               />
             </Grid>
             <Grid item lg={6} md={6} sm={12} xs={12}
             >
               <FormControl className={classes.formControl}>
                 <InputLabel htmlFor="payment-simple">Payment Status</InputLabel>
                 <Select
                   value={this.state.paymentStatus}
                   onChange={this.handleStatusChange}
                   inputProps={{
                     name: "paymentStatus",
                     id: "payment-simple"
                   }}
                   fullWidth
                   autoWidth
                 >
                   <MenuItem value="">
                     <em>None</em>
                   </MenuItem>
                   {this.state.paymentStatusArray.map((e, keyIndex) => (<MenuItem key={keyIndex} value={e}>{e}</MenuItem>))}
                 </Select>
               </FormControl>
             </Grid>
           </Grid>
           <div>
             <Button
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
               type='submit'
             >Update
             </Button>
           </div>
         </form>
       </React.Fragment>
     );
   }
}

EditPayment.propTypes = {
  payment: PropTypes.object,
  dispatch: PropTypes.func,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  history: PropTypes.any,
  closeModal: PropTypes.func,
  updatedpaymentData: PropTypes.func
};

const mapStateToProps = state => ({
  singlepaymentData: state.singlepaymentData
});


const mapDispatchToProps = dispatch => ({
  updatedpaymentData: payment => dispatch(updatedpaymentData(payment))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPayment));
