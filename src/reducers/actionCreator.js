import * as ActionTypes from "./ActionTypes";

export const paymentData = () => ({
  type: ActionTypes.GET_PAYMENT_DATA,
  payload: ""
});

export const getAllPaymentData = () => dispatch => {
  dispatch(paymentData());
};


export const searchSinglePayment = searchInput => ({
  type: ActionTypes.SEARCH,
  payload: searchInput
});

export const searchPayment = searchInput => dispatch => {
  dispatch(searchSinglePayment(searchInput));
};

export const createPayment = paymentInfo => ({
  type: ActionTypes.CREATE_NEW_PAYMENT,
  payload: paymentInfo
});

export const postCreatePayment = paymentInfo => dispatch => {
  dispatch(createPayment(paymentInfo));
};


export const deletePayment = id => ({
  type: ActionTypes.DELETE_PAYMENT,
  payload: id
});

export const deleteSinglePayment = (id, cb) => dispatch => new Promise((resolve, reject) => {
  dispatch(deletePayment(id));
  resolve();
});

export const updatePayment = data => ({
  type: ActionTypes.EDIT_PAYMENT,
  payload: data
});

export const updatedpaymentData = updatedData => dispatch => new Promise((resolve, reject) => {
  dispatch(updatePayment(updatedData));
  resolve();
});

