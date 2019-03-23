import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import "./CustomTable.css";

const styles = theme => ({
  card: {
    maxWidth: "90%"
  }
});

function CustomTable(props) {
  const {payments, onSort, classes} = props;

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <div className="table" id="results">
          <div className='theader'>
            <div className='table_header' />
            <div className='table_header' onClick={() => onSort("paymentId")}>PaymentId</div>
            <div className='table_header' onClick={() => onSort("orderDate")}>OrderDate</div>
            <div className='table_header' onClick={() => onSort("merchantId")}>MerchantId</div>
            <div className='table_header' onClick={() => onSort("customerEmail")}>CustomerEmail</div>
            <div className='table_header' onClick={() => onSort("amount")}>Amount</div>
            <div className='table_header' onClick={() => onSort("paymentStatus")}>PaymentStatus</div>
            <div className='table_header'>Actions</div>
          </div>
          <div className='table_row'>
            <div className='table_small'>
              <div className='table_cell'>
                {props.isDelete ?
                  <IconButton aria-label="Delete" onClick={() => props.delete()}>
                    <DeleteIcon className={classes.icon} />
                  </IconButton> : null }
              </div>
            </div>
            <div className='table_small'>
              <div className='table_cell' />
            </div>
            <div className='table_small'>
              <div className='table_cell' />
            </div>
            <div className='table_small'>
              <div className='table_cell' />
            </div>
            <div className='table_small'>
              <div className='table_cell' />
            </div>
            <div className='table_small'>
              <div className='table_cell' />
            </div>
            <div className='table_small'>
              <div className='table_cell'>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="payment-simple">Filter</InputLabel>
                  <Select
                    value={props.paymentStatus}
                    onChange={e => props.onFilter(e, props.payments)}
                    inputProps={{
                      name: "paymentStatus",
                      id: "payment-simple"
                    }}
                    fullWidth
                    autoWidth
                  >
                    {props.status.map((e, keyIndex) => (<MenuItem key={keyIndex} value={e}>{e}</MenuItem>))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className='table_small'>
              <div className='table_cell' />
            </div>
          </div>
          {payments.map(payment => (
            <div className='table_row' key={payment.paymentId}>
              <div className="table_small">
                <div className="table_cell">
                  <Checkbox
                    value="checkedA"
                    onClick={e => props.handleCheckBoxChange(e, payment.paymentId)}
                  />
                </div>
              </div>
              <div className='table_small'>
                <div className='table_cell'>{payment.paymentId}</div>
              </div>
              <div className='table_small'>
                <div className='table_cell'>{payment.orderDate}</div>
              </div>
              <div className='table_small'>

                <div className='table_cell'>{payment.merchatId}</div>
              </div>
              <div className='table_small'>

                <div className='table_cell'>{payment.customerEmail}</div>
              </div>
              <div className='table_small'>

                <div className='table_cell'>{payment.amount}</div>
              </div>
              <div className='table_small'>

                <div className='table_cell'>{payment.paymentStatus}</div>
              </div>
              <div className='table_small'>
                <IconButton aria-label="Delete" onClick={() => props.delete(payment.paymentId)}>
                  <DeleteIcon className={classes.icon} />
                </IconButton>
                <IconButton aria-label="Edit" onClick={() => props.edit(payment)}>
                  <EditIcon className={classes.icon}/>
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </React.Fragment>
  );
}

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  payments: PropTypes.array,
  onSort: PropTypes.func,
  edit: PropTypes.func,
  delete: PropTypes.func,
  status: PropTypes.array,
  onFilter: PropTypes.func,
  paymentStatus: PropTypes.string,
  isSelected: PropTypes.func,
  handleCheckBoxChange: PropTypes.func,
  isDelete: PropTypes.bool
};

export default withStyles(styles)(CustomTable);
