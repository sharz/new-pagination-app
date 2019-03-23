import * as ActionTypes from "./ActionTypes";
import {PaymentData} from "../shared/payment";

const initialState = {
  PaymentData,
  selectedPaymentData: []
};

export const Payments = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PAYMENT_DATA:
      return state;
    case ActionTypes.SEARCH:
      const selectedPaymentData = state.PaymentData.filter(item => Object.keys(item).some(key => item[key].toString().search(action.payload) !== -1)); //   return state;
      return {...state, selectedPaymentData};
    case ActionTypes.CREATE_NEW_PAYMENT:
      return {...state, PaymentData: [action.payload, ...state.PaymentData]};
    case ActionTypes.DELETE_PAYMENT:
      const updatedPayment = state.PaymentData.filter(paymentData => paymentData.paymentId !== action.payload);
      return {...state, PaymentData: updatedPayment};
    case ActionTypes.EDIT_PAYMENT:
      const payments = state.PaymentData.map(payment => {
        if (payment.paymentId === action.payload.paymentId) {
          return action.payload;
        }
        return payment;
      });
      return {...state, PaymentData: payments};
    default:
      return state;
  }
};
